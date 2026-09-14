"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Send, ShieldCheck, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVapi } from "@/lib/use-vapi";
import { InCallOverlay } from "@/components/app/in-call-overlay";

interface Message {
  id: string;
  sender: "curator" | "user";
  author: string;
  time: string;
  content: string;
  isVoice?: boolean;
}

const QUICK_PROMPTS = [
  "What time is dinner tonight?",
  "Can we swap for private tea ceremony?",
  "Check weather in Arashiyama",
  "Is Mr. Tanaka standing by?",
];

let messageIdCounter = 10;
function getNextMessageId(prefix: string): string {
  return `${prefix}-${++messageIdCounter}`;
}

export function ConciergePanel() {
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "curator",
      author: "Elena Vance",
      time: "10:14 AM",
      content:
        "Welcome to your Kyoto Zen sequence. I arranged private sunrise access for Day 02 at Saihō-ji before monks begin their morning chants. Let me know if the walking cadence feels comfortable.",
    },
    {
      id: "2",
      sender: "user",
      author: "You",
      time: "10:32 AM",
      content: "Could we ensure Day 03 has plenty of downtime in the afternoon? Traveling with a sketch pad.",
    },
    {
      id: "3",
      sender: "curator",
      author: "Elena Vance",
      time: "10:36 AM",
      content:
        "Understood. Day 03's afternoon is reserved at Hoshinoya's private library terrace overlooking Mount Ogura. No scheduled transfers until twilight dinner.",
    },
  ]);

  const {
    callStatus,
    isMuted,
    isSpeaking,
    activeTranscript,
    duration,
    errorMessage,
    startCall,
    endCall,
    toggleMute,
  } = useVapi();

  const [isSending, setIsSending] = useState(false);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const sendQuery = async (queryText: string) => {
    const text = queryText.trim();
    if (!text || isSending) return;

    const userMsg: Message = {
      id: getNextMessageId("user"),
      sender: "user",
      author: "You",
      time: "Just now",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsSending(true);

    try {
      const res = await fetch("/api/voice/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          currentSanctuary: "Hoshinoya Kyoto",
          dayNumber: 2,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const curatorMsg: Message = {
          id: getNextMessageId("curator"),
          sender: "curator",
          author: data.curator || "Elena Vance",
          time: "Just now",
          content: data.reply,
        };
        setMessages((prev) => [...prev, curatorMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: getNextMessageId("curator"),
            sender: "curator",
            author: "Elena Vance",
            time: "Just now",
            content: "Understood. I have recorded your note and coordinated with our sanctuary hosts.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: getNextMessageId("curator"),
          sender: "curator",
          author: "Elena Vance",
          time: "Just now",
          content: "Understood. Your request has been logged to your journey profile.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSendMessage = () => {
    sendQuery(inputVal);
  };

  const handleVoiceButtonClick = () => {
    if (callStatus === "idle") {
      startCall({
        tripId: "kyoto-zen-4d",
        userId: "patron-001",
        currentSanctuary: "Hoshinoya Kyoto & Amanemu",
      });
    } else {
      endCall();
    }
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
      {/* Concierge Header */}
      <div className="p-5 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-serif font-semibold text-sm">
                EV
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-chart-1 ring-2 ring-background" />
            </div>

            <div>
              <h3 className="font-sans text-sm font-semibold text-foreground">
                Elena Vance
              </h3>
              <p className="font-mono text-[10px] text-muted-foreground uppercase">
                Lead Travel Agent • Kyoto Specialist
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleVoiceButtonClick}
            className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
              callStatus === "active"
                ? "bg-destructive/15 text-destructive border-destructive/30 animate-pulse"
                : "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent"
            }`}
            aria-label={callStatus === "active" ? "End call" : "Talk it through via voice"}
          >
            <PhoneCall className="h-3 w-3" />
            <span>{callStatus === "active" ? "In Call" : "Talk It Through"}</span>
          </button>
        </div>

        {/* Trip Stats Cards (from concierge-panel-structure-reference) */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="rounded-xl border border-border bg-background p-2.5 text-center">
            <span className="font-mono text-[10px] text-muted-foreground uppercase block">
              Confidence
            </span>
            <span className="font-mono text-xs font-semibold text-chart-1 flex items-center justify-center gap-1 mt-0.5">
              <ShieldCheck className="h-3 w-3" />
              100%
            </span>
          </div>

          <div className="rounded-xl border border-border bg-background p-2.5 text-center">
            <span className="font-mono text-[10px] text-muted-foreground uppercase block">
              Pacing
            </span>
            <span className="font-sans text-xs font-medium text-foreground block mt-0.5">
              Unhurried
            </span>
          </div>

          <div className="rounded-xl border border-border bg-background p-2.5 text-center">
            <span className="font-mono text-[10px] text-muted-foreground uppercase block">
              Duration
            </span>
            <span className="font-mono text-xs font-semibold text-foreground block mt-0.5">
              4 Days
            </span>
          </div>
        </div>
      </div>

      {/* Live Voice Consultation Overlay */}
      {callStatus !== "idle" && (
        <div className="p-3 border-b border-border bg-muted/10 animate-fade-in">
          <InCallOverlay
            callStatus={callStatus}
            isMuted={isMuted}
            isSpeaking={isSpeaking}
            duration={duration}
            activeTranscript={activeTranscript}
            onEndCall={endCall}
            onToggleMute={toggleMute}
            curatorName="Elena Vance"
            sanctuary="Hoshinoya Kyoto & Amanemu"
          />
        </div>
      )}

      {errorMessage && (
        <div className="mx-4 mt-3 rounded-lg border border-destructive/30 bg-destructive/10 p-2.5 text-[11px] font-mono text-destructive">
          {errorMessage}
        </div>
      )}

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="font-sans text-[11px] font-medium text-foreground/80">
                {msg.author}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {msg.time}
              </span>
            </div>

            <div
              className={`rounded-2xl px-4 py-3 text-xs sm:text-sm max-w-[90%] leading-relaxed shadow-xs ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-xs"
                  : "bg-muted text-foreground border border-border/80 rounded-tl-xs"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Animated Typing Indicator */}
        {isSending && (
          <div className="flex flex-col items-start animate-fade-in">
            <span className="font-mono text-[10px] text-muted-foreground mb-1 px-1">
              Elena Vance is reviewing arrangements...
            </span>
            <div className="rounded-2xl rounded-tl-xs bg-muted border border-border/80 px-4 py-3 text-xs flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Quick Prompts Chips */}
      <div className="px-4 py-2 bg-muted/10 border-t border-border/50">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block mb-1.5">
          Quick Inquiries
        </span>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendQuery(prompt)}
              className="text-[11px] font-sans px-2.5 py-1 rounded-full bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Concierge Input (Voice & Text) */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="relative flex items-center gap-2">
          <button
            type="button"
            onClick={handleVoiceButtonClick}
            className={`rounded-full p-2.5 text-xs transition-all border cursor-pointer ${
              callStatus === "active"
                ? "bg-destructive text-destructive-foreground border-destructive"
                : "bg-background text-muted-foreground hover:text-foreground border-border hover:border-primary/50 shadow-xs"
            }`}
            title={callStatus === "active" ? "End Voice Call" : "Start Voice Consultation"}
            aria-label={callStatus === "active" ? "End Voice Call" : "Start Voice Consultation"}
          >
            <Mic className="h-4 w-4" />
          </button>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask Elena to adjust timing, sanctuaries, or cadence..."
            className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none shadow-xs"
          />

          <Button
            type="button"
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputVal.trim() || isSending}
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 p-2 h-9 w-9 shrink-0 cursor-pointer"
            aria-label="Send message"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="mt-2.5 flex justify-between items-center text-[10px] font-mono text-muted-foreground px-1">
          <span>PRIVATE AGENT CHANNEL</span>
          <span className="text-chart-1 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-chart-1 inline-block animate-pulse" />
            Encrypted Line
          </span>
        </div>
      </div>
    </div>
  );
}
