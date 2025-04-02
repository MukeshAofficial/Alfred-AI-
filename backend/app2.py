from fastapi import FastAPI
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain.tools import Tool
from langgraph.prebuilt import create_react_agent
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mock data
try:
    with open("hotel_data.json", "r") as f:
        hotel_data = json.load(f)
except FileNotFoundError:
    hotel_data = {
        "hotel": {"name": "Sea Breeze Beach House", "services": []},
        "restaurants": [],
        "attractions": []
    }

# Function to format restaurant data dynamically
def format_restaurant_data(restaurants):
    formatted = "At Sea Breeze Beach House, you have some delightful dining options:\n\n"
    for i, restaurant in enumerate(restaurants, 1):
        formatted += f"{i}. **{restaurant['name']}** - This spot offers {restaurant['cuisine']} cuisine.\n"
        formatted += "   Here are a few highlights from their menu:\n"
        for item in restaurant['menu']:
            formatted += f"   - {item['item']} - {item['price']}\n"
        formatted += "\n"
    formatted += "Both restaurants provide a wonderful dining experience, so you can choose based on your mood! If you have any specific preferences or dietary needs, let me know, and I can help further!"
    return formatted

# Tool that provides formatted hotel data
def hotel_info_tool(query: str) -> str:
    """Provides hotel information based on the provided data"""
    if "restaurant" in query.lower() or "dining" in query.lower() or "menu" in query.lower():
        return format_restaurant_data(hotel_data["restaurants"])
    return json.dumps(hotel_data, indent=2)  # Fallback to raw JSON for other queries

# Tool configuration
tools = [
    Tool(
        name="HotelInfoTool",
        func=hotel_info_tool,
        description="Returns structured information about Sea Breeze Beach House including services, restaurants, menus, and nearby attractions. Provides formatted restaurant details when asked about dining options."
    )
]

# Initialize LLM
llm = ChatOpenAI(
    temperature=0,
    model="gpt-4o-mini",
)

# Create ReAct agent
agent = create_react_agent(llm, tools)

# System prompt without example
system_prompt = {
    "role": "system",
    "content": """You are a helpful hotel concierge. Use the HotelInfoTool to access information about Sea Breeze Beach House and answer user queries naturally and conversationally. Provide specific details from the data when relevant, and offer helpful suggestions based on the available information. When the tool provides formatted text, use it directly in your response."""
}

# Request schema
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    response = await agent.ainvoke({
        "messages": [
            system_prompt,
            {"role": "user", "content": req.message}
        ]
    })
    last_message = response['messages'][-1]
    answer = last_message.content if hasattr(last_message, 'content') else str(last_message)
    return {"response": answer}
