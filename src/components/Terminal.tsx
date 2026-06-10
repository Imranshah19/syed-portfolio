"use client";

import { useEffect, useState } from "react";

type Line = { type: "prompt" | "output"; text: string };

const LINES: Line[] = [
  { type: "prompt", text: "whoami" },
  { type: "output", text: "Syed Imran Shah — AI-Powered HR Professional" },
  { type: "prompt", text: "deploy nexa-hr --production" },
  { type: "output", text: "HRMS live ✓  116/116 tests passing" },
  { type: "prompt", text: "run nexa-hr-agents --evals" },
  { type: "output", text: "10 HR agents ready ✓  35/35 evals passing" },
  { type: "prompt", text: "check uae-compliance --wps" },
  { type: "output", text: "WPS / gratuity / MOHRE ✓  39/39 passing" },
  { type: "prompt", text: "status" },
  {
    type: "output",
    text: "10+ yrs HR  ×  full-stack AI  →  open to UAE & Germany",
  },
];

const TYPE_MS = 30;
const LINE_PAUSE = 350;

function renderOutput(text: string) {
  const idx = text.indexOf("✓");
  if (idx === -1) {
    return <span className="text-slate-300">{text}</span>;
  }
  return (
    <>
      <span className="text-slate-300">{text.slice(0, idx)}</span>
      <span className="text-[#34D399]">{text.slice(idx)}</span>
    </>
  );
}

function renderLine(line: Line, text: string) {
  if (line.type === "prompt") {
    return (
      <>
        <span className="text-blue-400">$ </span>
        <span className="text-slate-200">{text}</span>
      </>
    );
  }
  return (
    <>
      <span className="text-slate-500">{"> "}</span>
      {renderOutput(text)}
    </>
  );
}

export default function Terminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced || lineIdx >= LINES.length) return;
    const line = LINES[lineIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (charIdx < line.text.length) {
      timer = setTimeout(() => setCharIdx((c) => c + 1), TYPE_MS);
    } else {
      timer = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, LINE_PAUSE);
    }
    return () => clearTimeout(timer);
  }, [lineIdx, charIdx, reduced]);

  const finished = reduced || lineIdx >= LINES.length;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0D1320]/90 shadow-2xl shadow-blue-500/10 overflow-hidden font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[11px] text-slate-500">
          syed@hr-tech — zsh
        </span>
      </div>
      <div className="p-4 sm:p-5 min-h-[230px] sm:min-h-[210px] leading-relaxed">
        {LINES.map((line, i) => {
          if (i > lineIdx && !reduced) return null;

          const isCurrent = !reduced && i === lineIdx;
          const text = isCurrent ? line.text.slice(0, charIdx) : line.text;

          return (
            <div key={i} className={line.type === "output" ? "mb-2.5" : ""}>
              {renderLine(line, text)}
              {isCurrent && <span className="typewriter-cursor">|</span>}
            </div>
          );
        })}
        {finished && (
          <div>
            <span className="typewriter-cursor">|</span>
          </div>
        )}
      </div>
    </div>
  );
}
