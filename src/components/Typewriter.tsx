"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "AI-Powered HR Professional",
  "HRMS & HR-Tech Developer",
  "AI Agent Builder for HR",
  "10+ Years HR x Full-Stack AI",
];

const TYPING_MS = 70;
const DELETING_MS = 40;
const PAUSE_AFTER_TYPE = 1500;
const PAUSE_AFTER_DELETE = 300;

type Phase = "typing" | "pausing" | "deleting" | "waiting";

export default function Typewriter({ className }: { className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reduced, setReduced] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Animation loop
  useEffect(() => {
    if (reduced) {
      setDisplayed(PHRASES[0]);
      return;
    }

    const target = PHRASES[phraseIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timer = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          TYPING_MS
        );
      } else {
        timer = setTimeout(() => setPhase("pausing"), 0);
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timer = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          DELETING_MS
        );
      } else {
        timer = setTimeout(() => setPhase("waiting"), 0);
      }
    } else if (phase === "waiting") {
      timer = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }, PAUSE_AFTER_DELETE);
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, phraseIdx, reduced]);

  if (reduced) {
    return <span className={className}>{PHRASES[0]}</span>;
  }

  return (
    <span className={className}>
      {displayed}
      <span
        aria-hidden="true"
        className="typewriter-cursor"
      >
        |
      </span>
    </span>
  );
}
