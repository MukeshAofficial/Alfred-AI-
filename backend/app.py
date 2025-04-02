import asyncio
import numpy as np
import sounddevice as sd

from agents import Agent, function_tool
from agents.voice import AudioInput, SingleAgentVoiceWorkflow, VoicePipeline
from agents.extensions.handoff_prompt import prompt_with_handoff_instructions

print("Speaking..")
# ---- All Experiences (Mock Data) ----
experiences = [
    {
        "name": "Catamaran Cruises",
        "details": "Embark on a Catamaran cruise and swim, sunbathe and explore the Caribbean waters.",
        "distance": "6.7 Miles",
        "time": "22 Minutes Driving"
    },
    {
        "name": "Ted’s Tours",
        "details": "A fun-filled laid-back day out exploring Barbados with Ted.",
        "distance": "3.3 Miles",
        "time": "14 Minutes Driving"
    },
    {
        "name": "Mount Gay Rum Tour",
        "details": "Discover time-honoured secrets and sample rum at the world’s oldest rum distillery.",
        "distance": "19.4 Miles",
        "time": "44 Minutes Driving"
    },
    {
        "name": "Atlantis Submarine",
        "details": "Explore reefs and shipwrecks 50 metres underwater in a real submarine.",
        "distance": "6.9 Miles",
        "time": "23 Minutes Driving"
    },
    {
        "name": "Jeep Safari",
        "details": "Off-road adventure exploring Barbados' rugged northeast with a guide.",
        "distance": "7.2 Miles",
        "time": "20 Minutes Driving"
    },
    {
        "name": "Harrison’s Cave",
        "details": "Tram ride underground to see stunning stalactites and stalagmites.",
        "distance": "12.5 Miles",
        "time": "32 Minutes Driving"
    },
    {
        "name": "Hunte’s Gardens",
        "details": "Tropical trails with native plants and rum punch on Anthony Hunte’s porch.",
        "distance": "12.8 Miles",
        "time": "31 Minutes Driving"
    },
    {
        "name": "Barbados Wildlife Reserve",
        "details": "Stroll among monkeys, deer, and other wildlife. Feeding time is a must-see.",
        "distance": "19.3 Miles",
        "time": "43 Minutes Driving"
    },
    {
        "name": "Orchid World",
        "details": "1,000+ orchids from Barbados and the Caribbean in tropical gardens.",
        "distance": "9.3 Miles",
        "time": "24 Minutes Driving"
    },
    {
        "name": "Harbour Lights Dinner Show",
        "details": "Beachside BBQ and live Caribbean entertainment including fire dancers.",
        "distance": "4.7 Miles",
        "time": "17 Minutes Driving"
    },
    {
        "name": "George Washington House",
        "details": "Historic house and museum where George Washington stayed in 1751.",
        "distance": "4.2 Miles",
        "time": "16 Minutes Driving"
    },
    {
        "name": "Horse Racing",
        "details": "Watch races, enjoy street food, and join locals at Garrison Savannah.",
        "distance": "6 Miles",
        "time": "22 Minutes Driving"
    },
    {
        "name": "St. Nicholas Abbey",
        "details": "Historic Jacobean plantation with rum distillery and sugarcane museum.",
        "distance": "19.8 Miles",
        "time": "45 Minutes Driving"
    },
    {
        "name": "Barbados National Trust Sites",
        "details": "Historic homes, nature preserves, windmills and weekly heritage hikes.",
        "distance": "3.3 Miles",
        "time": "11 Minutes Driving"
    },
    {
        "name": "Horseback Riding",
        "details": "Ride beaches and plantations on the island’s eastern coast.",
        "distance": "14.5 Miles",
        "time": "35 Minutes Driving"
    },
    {
        "name": "Deep Sea Fishing",
        "details": "Catch tuna, marlin, and more near dramatic reef drop-offs.",
        "distance": "1.6 Miles",
        "time": "7 Minutes Driving"
    },
    {
        "name": "Scuba Diving",
        "details": "Explore shipwrecks and coral reefs in warm, wetsuit-free waters.",
        "distance": "2.9 Miles",
        "time": "11 Minutes Driving"
    },
    {
        "name": "Tennis",
        "details": "Play on standard or road tennis courts; road tennis is a local tradition.",
        "distance": "4.6 Miles",
        "time": "17 Minutes Driving"
    },
    {
        "name": "Surfing",
        "details": "Barbados offers top surf spots for all levels, steps from Sea Breeze.",
        "distance": "20 Feet",
        "time": "1 Minute Walking"
    },
    {
        "name": "Barbados Golf Club",
        "details": "Championship course near the beach with stunning coastal holes.",
        "distance": "3.3 Miles",
        "time": "11 Minutes Driving"
    },
    {
        "name": "Sandy Lane",
        "details": "Three elite golf courses including the Green Monkey by Tom Fazio.",
        "distance": "11.5 Miles",
        "time": "27 Minutes Driving"
    },
    {
        "name": "Apes Hill",
        "details": "One of the world's top-rated golf courses with lush scenery.",
        "distance": "14.2 Miles",
        "time": "33 Minutes Driving"
    },
    {
        "name": "Rockley",
        "details": "Barbados’ first golf course with a unique aviation legacy.",
        "distance": "2.6 Miles",
        "time": "11 Minutes Driving"
    },
    {
        "name": "Car Hire",
        "details": "Rent a car from the airport with unlimited mileage. Drive on the left.",
        "distance": "6.7 Miles",
        "time": "15 Minutes Driving"
    },
    {
        "name": "Local Artist Shops",
        "details": "Self-guided tour of over 25 studios and galleries across the island.",
        "distance": "Various locations",
        "time": "Varies"
    },
]

# ---- Tool Function ----
@function_tool
def find_experience(query: str) -> str:
    """Search the list of experiences and return a relevant response."""
    query_lower = query.lower()
    for exp in experiences:
        if exp["name"].lower() in query_lower or any(word in query_lower for word in exp["name"].lower().split()):
            return (
                f"Yes! {exp['name']} is available just {exp['distance']} away, about {exp['time']}. "
                f"{exp['details']} For more information, you can contact guestservices@sea-breeze.com."
            )
    return "I'm sorry, I couldn’t find anything matching your request. Please try asking about a different activity."

# ---- Agent Setup ----
agent = Agent(
    name="Barbados Concierge",
    instructions=prompt_with_handoff_instructions(
        "You're a friendly hotel concierge at Sea Breeze Beach House. Use the tools to find guest experiences near the hotel. Always respond in clear and friendly English, never use any other language."
    ),
    model="gpt-4o-mini",
    tools=[find_experience],
)

# ---- VOICE INTERACTION MAIN ----
async def main():
    print("🎤 Voice Concierge is ready. Speak to ask about Barbados experiences.")

    pipeline = VoicePipeline(workflow=SingleAgentVoiceWorkflow(agent))
    buffer = np.zeros(24000 * 3, dtype=np.int16)
    player = sd.OutputStream(samplerate=24000, channels=1, dtype=np.int16)
    player.start()

    while True:
        print("\n👂 Listening...")
        audio_input = AudioInput(buffer=buffer)
        result = await pipeline.run(audio_input)

        print("🤖 Responding...")
        async for event in result.stream():
            if event.type == "voice_stream_event_audio":
                player.write(event.data)

        print("✅ Done. Waiting for your next question...")

if __name__ == "__main__":
    asyncio.run(main())