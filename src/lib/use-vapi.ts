"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type CallStatus = "idle" | "connecting" | "active" | "ended" | "error";

export interface UseVapiOptions {
  assistantId?: string;
  tripId?: string;
  userId?: string;
  currentSanctuary?: string;
}

export interface VoiceMessage {
  id: string;
  role: "user" | "assistant";
  transcript: string;
  timestamp: number;
}

interface VapiTranscriptEvent {
  type: string;
  transcript?: string;
  transcriptType?: "partial" | "final";
  role?: "user" | "assistant";
}

interface VapiErrorEvent {
  message?: string;
}

interface VapiClientInstance {
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  start: (assistantIdOrConfig: unknown, options?: unknown) => Promise<unknown>;
  stop: () => Promise<unknown>;
  setMuted: (muted: boolean) => void;
}

export function useVapi() {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTranscript, setActiveTranscript] = useState("");
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [duration, setDuration] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const vapiRef = useRef<VapiClientInstance | null>(null);

  // Timer for active call duration
  useEffect(() => {
    if (callStatus !== "active") return;

    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [callStatus]);

  const startCall = useCallback(
    async (options?: UseVapiOptions) => {
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

      setErrorMessage(null);
      setCallStatus("connecting");
      setActiveTranscript("");
      setDuration(0);

      // If no public key is present, run in resilient local demonstration mode
      if (!publicKey) {
        console.warn(
          "[Vapi Hook] NEXT_PUBLIC_VAPI_PUBLIC_KEY not set in environment. Running in Quiet Concierge interactive preview mode."
        );
        setTimeout(() => {
          setCallStatus("active");
          setActiveTranscript(
            "Good evening. I'm with you — how can I assist with your journey tonight?"
          );
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now()),
              role: "assistant",
              transcript:
                "Good evening. I'm with you — how can I assist with your journey tonight?",
              timestamp: Date.now(),
            },
          ]);
        }, 1200);
        return;
      }

      try {
        // Dynamic lazy import to ensure zero bundle bloat on initial page load
        const { default: Vapi } = await import("@vapi-ai/web");

        if (!vapiRef.current) {
          const vapi = new Vapi(publicKey) as unknown as VapiClientInstance;
          vapiRef.current = vapi;

          vapi.on("call-start", () => {
            setCallStatus("active");
            setIsSpeaking(false);
          });

          vapi.on("call-end", () => {
            setCallStatus("ended");
            setIsSpeaking(false);
            setTimeout(() => {
              setCallStatus("idle");
              setDuration(0);
            }, 2500);
          });

          vapi.on("speech-start", () => {
            setIsSpeaking(true);
          });

          vapi.on("speech-end", () => {
            setIsSpeaking(false);
          });

          vapi.on("message", (msgEvent: unknown) => {
            const msg = msgEvent as VapiTranscriptEvent;
            if (msg?.type === "transcript" && msg.transcript) {
              setActiveTranscript(msg.transcript);
              if (msg.transcriptType === "final") {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: String(Date.now()),
                    role: msg.role === "user" ? "user" : "assistant",
                    transcript: msg.transcript ?? "",
                    timestamp: Date.now(),
                  },
                ]);
              }
            }
          });

          vapi.on("error", (errorEvent: unknown) => {
            const e = errorEvent as VapiErrorEvent;
            console.error("[Vapi Error]", e);
            setErrorMessage(e?.message || "Voice call encountered an issue.");
            setCallStatus("error");
          });
        }

        const assistantId =
          options?.assistantId || process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

        if (assistantId) {
          await vapiRef.current.start(assistantId, {
            variableValues: {
              tripId: options?.tripId || "kyoto-zen-4d",
              userId: options?.userId || "patron-001",
              currentSanctuary: options?.currentSanctuary || "Amanemu (Ise-Shima)",
            },
          });
        } else {
          // If no assistant ID is set, start with inline ephemeral configuration
          await vapiRef.current.start({
            transcriber: {
              provider: "deepgram",
              model: "nova-2",
              language: "en-US",
            },
            voice: {
              provider: "11labs",
              voiceId: "sarah",
            },
            model: {
              provider: "custom-llm",
              systemPrompt:
                "You are TripSpree's Quiet Concierge transport layer. Always call the orchestrate_turn tool.",
            },
            firstMessage:
              "Good evening. I'm with you — how can I assist with your journey tonight?",
          });
        }
      } catch (err: unknown) {
        const error = err as Error;
        console.error("[Vapi Start Error]", error);
        setErrorMessage(error?.message || "Could not start voice session.");
        setCallStatus("error");
      }
    },
    []
  );

  const endCall = useCallback(async () => {
    if (vapiRef.current) {
      try {
        await vapiRef.current.stop();
      } catch (err: unknown) {
        console.error("[Vapi Stop Error]", err);
      }
    }
    setCallStatus("ended");
    setTimeout(() => {
      setCallStatus("idle");
      setDuration(0);
    }, 1500);
  }, []);

  const toggleMute = useCallback(() => {
    if (vapiRef.current) {
      const nextMuted = !isMuted;
      vapiRef.current.setMuted(nextMuted);
      setIsMuted(nextMuted);
    } else {
      setIsMuted((prev) => !prev);
    }
  }, [isMuted]);

  return {
    callStatus,
    isMuted,
    isSpeaking,
    activeTranscript,
    messages,
    duration,
    errorMessage,
    startCall,
    endCall,
    toggleMute,
  };
}
