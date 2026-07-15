"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { answerQuestion, GREETING, SUGGESTIONS } from "@/lib/chatKnowledge";

type Msg = { role: "bot" | "user"; text: string };

// Prefer a female / girl-sounding voice by name across platforms.
const FEMALE_VOICE_HINTS = [
  "samantha",
  "google uk english female",
  "google us english",
  "victoria",
  "karen",
  "moira",
  "tessa",
  "fiona",
  "serena",
  "zira",
  "susan",
  "female",
  "woman",
  "girl",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sound, setSound] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Load a female voice for text-to-speech (voices load asynchronously).
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const byHint = voices.find((v) =>
        FEMALE_VOICE_HINTS.some((h) => v.name.toLowerCase().includes(h))
      );
      const enFemale =
        byHint || voices.find((v) => v.lang.startsWith("en")) || voices[0];
      voiceRef.current = enFemale;
    };
    pick();
    window.speechSynthesis.onvoiceschanged = pick;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.pitch = 1.15; // slightly higher → younger, feminine
    u.rate = 1.0;
    u.volume = 1;
    window.speechSynthesis.speak(u);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing, open]);

  // stop any speech when the panel closes or sound is turned off
  useEffect(() => {
    if (!open || !sound) stopSpeaking();
  }, [open, sound, stopSpeaking]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const a = answerQuestion(q);
      setMsgs((m) => [...m, { role: "bot", text: a }]);
      setTyping(false);
      if (sound) speak(a);
    }, 420 + Math.random() * 300);
  };

  const toggleSound = () => {
    setSound((s) => {
      const next = !s;
      if (!next) stopSpeaking();
      return next;
    });
  };

  return (
    <>
      {/* Launcher button */}
      <button
        aria-label={open ? "Close assistant" : "Open assistant"}
        onClick={() => setOpen((o) => !o)}
        className="chat-fab"
      >
        {open ? (
          <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>×</span>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="4" y="8" width="16" height="11" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="3" r="1.4" fill="currentColor" />
            <circle cx="9" cy="13" r="1.4" fill="currentColor" />
            <circle cx="15" cy="13" r="1.4" fill="currentColor" />
            <path d="M9.5 16.2h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 12H2.4M20 12h1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Dr Treacy assistant">
          <div className="chat-head">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span className="chat-avatar" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="8" width="16" height="11" rx="3.5" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="9" cy="13" r="1.3" fill="currentColor" />
                  <circle cx="15" cy="13" r="1.3" fill="currentColor" />
                </svg>
              </span>
              <div>
                <div className="chat-title">Treacy Assistant</div>
                <div className="chat-status">Online · here to help</div>
              </div>
            </div>

            <button
              className={sound ? "chat-sound on" : "chat-sound"}
              onClick={toggleSound}
              aria-label={sound ? "Turn voice off" : "Turn voice on"}
              title={sound ? "Voice on" : "Voice off"}
            >
              {sound ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                  <path d="M16 8.5a4 4 0 0 1 0 7M18.5 6a7 7 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                  <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "bot" ? "chat-row bot" : "chat-row user"}>
                <div className={m.role === "bot" ? "chat-bubble bot" : "chat-bubble user"}>{m.text}</div>
              </div>
            ))}

            {typing && (
              <div className="chat-row bot">
                <div className="chat-bubble bot chat-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {msgs.length <= 1 && (
              <div className="chat-suggest">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => ask(s)} className="chat-chip">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Dr Treacy…"
              aria-label="Message"
            />
            <button type="submit" aria-label="Send" disabled={!input.trim()}>
              ↑
            </button>
          </form>
        </div>
      )}
    </>
  );
}
