import { Check, Mic } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const VERBATIM = "Refactor the auth middleware to support bearer tokens and add rate limiting.";
const SMART =
  "You are a senior backend engineer. Refactor the auth middleware to support bearer tokens, then add per-IP rate limiting with sane defaults. Explain trade-offs before editing files.";

type Phase = "idle" | "recording" | "done";

function Bars({ active }: { active: boolean }) {
  const [seed, setSeed] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSeed((s) => s + 1), 90);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="flex h-5 items-center gap-[3px]">
      {Array.from({ length: 18 }).map((_, i) => {
        const h = active ? 4 + Math.abs(Math.sin((i + seed) * 0.9)) * 16 : 3;
        return (
          <span
            key={i}
            style={{ height: `${h}px` }}
            className={`w-[2px] rounded-full transition-[height] duration-100 ${
              active ? (i % 3 === 0 ? "bg-emerald" : "bg-cyan") : "bg-subtle"
            }`}
          />
        );
      })}
    </div>
  );
}

export function Simulator() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mode, setMode] = useState<"direct" | "smart">("direct");
  const [elapsed, setElapsed] = useState(0);
  const [typed, setTyped] = useState("");
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const target = mode === "direct" ? VERBATIM : SMART;

  const start = useCallback(() => {
    setPhase((p) => {
      if (p === "recording") return p;
      setElapsed(0);
      setTyped("");
      return "recording";
    });
  }, []);

  const stop = useCallback(() => {
    setPhase((p) => (p === "recording" ? "done" : p));
  }, []);

  useEffect(() => {
    if (phase !== "recording") return;
    const id = setInterval(() => setElapsed((e) => e + 1), 100);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    let i = 0;
    typingRef.current = setInterval(() => {
      i += 1;
      setTyped(target.slice(0, i));
      if (i >= target.length && typingRef.current) clearInterval(typingRef.current);
    }, 22);
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [phase, target]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        start();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        stop();
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [start, stop]);

  const secs = `0:${String(Math.floor(elapsed / 10)).padStart(2, "0")}`;

  return (
    <section id="demo" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-20">
      <div className="text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-subtle">LIVE SIMULATOR</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Feel it before you install it.</h2>
      </div>

      {/* Mock window */}
      <div className="relative mt-10 overflow-hidden rounded-2xl surface-raised glow-ring">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-subtle/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-subtle/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-subtle/50" />
          <span className="ml-3 font-mono text-[11px] text-subtle">cursor — auth.middleware.ts</span>
        </div>

        {/* Floating pill */}
        <div className="relative flex justify-center">
          <div
            className={`absolute top-4 z-10 flex items-center gap-3 rounded-full border border-border-strong bg-background/90 backdrop-blur-md transition-all duration-300 ${
              phase === "idle" ? "px-3 py-2 opacity-70" : "px-5 py-2.5 opacity-100"
            } ${phase === "recording" ? "shadow-[0_0_40px_-12px_var(--cyan)]" : ""}`}
          >
            {phase === "done" ? (
              <>
                <Check className="h-4 w-4 text-emerald" />
                <span className="font-mono text-[11px] text-emerald">Pasted verbatim</span>
              </>
            ) : (
              <>
                <Mic className={`h-4 w-4 ${phase === "recording" ? "text-cyan" : "text-subtle"}`} />
                <Bars active={phase === "recording"} />
                <span className="font-mono text-[11px] text-muted-foreground">
                  {phase === "recording" ? secs : "idle"}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Editor body */}
        <div className="min-h-[240px] bg-canvas px-6 pb-6 pt-20 font-mono text-[13px] leading-7">
          <div className="text-subtle">1&nbsp;&nbsp;// composer prompt</div>
          <div className="text-subtle">2</div>
          <div className="flex gap-2">
            <span className="text-subtle">3</span>
            <span className="text-foreground">
              {typed}
              <span className="caret inline-block w-[7px] translate-y-[2px] bg-cyan">&nbsp;</span>
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          onMouseDown={start}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchStart={(e) => {
            e.preventDefault();
            start();
          }}
          onTouchEnd={stop}
          className="select-none rounded-xl border border-border-strong bg-canvas px-6 py-3.5 text-sm font-medium transition-all hover:border-[color-mix(in_oklab,var(--cyan)_45%,transparent)] active:scale-[0.98]"
        >
          {phase === "recording" ? "Listening… release to paste" : "Hold Space or Click & Hold to Test Voice Dictation"}
        </button>

        <div className="inline-flex rounded-lg surface p-1">
          {(["direct", "smart"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setPhase("idle");
                setTyped("");
              }}
              className={`rounded-md px-3.5 py-1.5 text-xs transition-colors ${
                mode === m ? "bg-accent text-foreground" : "text-subtle hover:text-foreground"
              }`}
            >
              {m === "direct" ? "Direct Dictation (Verbatim)" : "Smart Copilot (Prompt Engineered)"}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
