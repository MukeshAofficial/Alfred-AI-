"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Header from "@/components/header"
import { useToast } from "@/hooks/use-toast"

export default function VoicePage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [waveAmplitude, setWaveAmplitude] = useState(20)

  const { toast } = useToast()

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setWaveAmplitude(Math.random() * 40 + 10)
      }, 100)

      // Simulate receiving transcript after 3 seconds
      const timeout = setTimeout(() => {
        setIsListening(false)

        // Randomly select one of several possible voice commands
        const commands = [
          "Book a dinner reservation for two at 7 PM tonight",
          "I need extra towels in my room please",
          "Book a spa appointment for tomorrow afternoon",
          "What time does the pool close today?",
        ]
        const selectedCommand = commands[Math.floor(Math.random() * commands.length)]
        setTranscript(selectedCommand)

        // Simulate AI response based on the command
        setTimeout(() => {
          let response = ""

          if (selectedCommand.includes("dinner")) {
            response =
              "I've booked a dinner reservation for two at 7 PM tonight at our main restaurant. Your table is confirmed. Is there anything else you need?"
          } else if (selectedCommand.includes("towels")) {
            response =
              "I've arranged for extra towels to be delivered to your room within the next 15 minutes. Is there anything else you need?"
          } else if (selectedCommand.includes("spa")) {
            response =
              "I've scheduled a spa appointment for you tomorrow at 2 PM. Would you like me to send a confirmation to your phone?"
          } else if (selectedCommand.includes("pool")) {
            response = "The pool is open until 10 PM today. Would you like me to book a poolside cabana for you?"
          }

          setAiResponse(response)

          // Simulate text-to-speech by playing audio
          if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(response)
            speech.rate = 0.9
            speech.pitch = 1
            speech.volume = 1
            window.speechSynthesis.speak(speech)
          }
        }, 1000)
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel()
        }
      }
    }
  }, [isListening])

  const startVoiceRecognition = () => {
    setIsListening(true)

    // This is just for demonstration - in a real app, you would use the Web Speech API
    // if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    //   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //   const recognition = new SpeechRecognition();
    //   recognition.continuous = false;
    //   recognition.interimResults = false;
    //   recognition.onresult = (event) => {
    //     const transcript = event.results[0][0].transcript;
    //     setTranscript(transcript);
    //     // Process the transcript...
    //   };
    //   recognition.start();
    // }
  }

  const handleToggleListen = () => {
    if (!isListening) {
      setTranscript("")
      setAiResponse("")
      startVoiceRecognition()
    } else {
      setIsListening(false)
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Voice Assistant" />

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        <Link href="/" className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div
          className={cn(
            "w-full max-w-md aspect-square rounded-full flex items-center justify-center relative",
            "bg-gradient-to-br from-background to-muted",
            "border border-primary/10",
            "transition-all duration-300",
            isListening ? "scale-105 shadow-lg shadow-primary/10" : "",
          )}
        >
          {/* Animated waveform */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-1 mx-0.5 bg-primary/60 rounded-full transition-all duration-150",
                  isListening ? "animate-pulse" : "h-1",
                )}
                style={{
                  height: isListening ? `${Math.sin(i * 0.5) * waveAmplitude + 20}px` : "4px",
                  opacity: isListening ? 0.2 + Math.sin(i * 0.5) * 0.8 : 0.3,
                }}
              />
            ))}
          </div>

          <Button
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className={cn(
              "rounded-full h-24 w-24 transition-all duration-300",
              isListening
                ? "bg-destructive/90 hover:bg-destructive/100 shadow-lg"
                : "bg-primary/90 hover:bg-primary/100",
            )}
            onClick={handleToggleListen}
          >
            {isListening ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
          </Button>
        </div>

        {transcript && (
          <div className="mt-8 w-full max-w-md">
            <div className="bg-muted rounded-2xl p-4 text-sm">
              <p className="text-xs text-muted-foreground mb-1">You said:</p>
              <p>{transcript}</p>
            </div>
          </div>
        )}

        {aiResponse && (
          <div className="mt-4 w-full max-w-md">
            <div className="bg-primary/10 rounded-2xl p-4 text-sm border border-primary/20">
              <p className="text-xs text-primary mb-1">AI Butler:</p>
              <p>{aiResponse}</p>
            </div>
          </div>
        )}

        {aiResponse && (
          <div className="mt-8 flex justify-center">
            <Button
              className="rounded-full px-6"
              onClick={() => {
                toast({
                  title: "Booking Confirmed",
                  description: "Your request has been processed successfully.",
                  duration: 3000,
                })
              }}
            >
              Confirm & Book
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

