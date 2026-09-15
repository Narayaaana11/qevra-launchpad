import { Check, Mic, Terminal, MessageSquare, Code2, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SpotlightCard,
  DecryptedText,
  ShinyText,
  Magnet,
  TrueFocus
} from "@/components/reactbits";

type AppType = "cursor" | "vscode" | "slack" | "terminal";
type ModeType = "direct" | "smart";
type Phase = "idle" | "recording" | "done";

interface SampleContent {
  direct: string;
  smart: string;
  filename: string;
  comment: string;
}

const APP_SAMPLES: Record<AppType, SampleContent> = {
  cursor: {
    direct: "Refactor the auth middleware to support bearer tokens and add rate limiting.",
    smart:
      "You are a senior backend architect. Refactor auth.middleware.ts to support bearer JWTs with zero downtime, and add per-IP token-bucket rate limiting with sane defaults.",
    filename: "cursor — auth.middleware.ts",
    comment: "// Composer Prompt (Ctrl+I)",
  },
  vscode: {
    direct: "Add a native Windows keyboard hook to detect Right Alt key release within 180ms.",
    smart:
      "Write a Win32 native hook in C++ using SetWindowsHookEx(WH_KEYBOARD_LL) to track Right Alt press and release duration with sub-millisecond precision.",
    filename: "vscode — win-hook.cc",
    comment: "// Copilot Inline Instruction",
  },
  slack: {
    direct:
      "Hey team, the MVP Windows installer is built and passed all 184 tests. Ready for external testing!",
    smart:
      "Team update: The QEVRA v0.1.0 MVP installer has been compiled and verified with 100% test coverage (184/184 passing). Download links are live in the beta channel.",
    filename: "slack — #product-launch",
    comment: "// Message #product-launch",
  },
  terminal: {
    direct: "git commit -m 'feat: optimize native Win32 window detection for zero focus stealing'",
    smart:
      "git commit -m 'feat(win32): implement GetForegroundWindow preservation with zero focus stealing in context-detector'",
    filename: "powershell — ~/projects/qevra",
    comment: "# PowerShell 7.4 (x64)",
  },
};

function Bars({ active }: { active: boolean }) {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSeed((s) => (s + 1) % 100), 75);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="flex h-5 items-center gap-[3px]">
      {Array.from({ length: 22 }).map((_, i) => {
        const factor = Math.abs(Math.sin((i * 0.45 + seed * 0.6) % Math.PI));
        const height = active ? Math.max(4, Math.round(factor * 18)) : 3;
        const isPeak = i % 4 === 0;

        return (
          <span
            key={i}
            style={{ height: `${height}px` }}
            className={`w-[2px] rounded-full transition-all duration-75 ${
              active
                ? isPeak
                  ? "bg-emerald shadow-[0_0_8px_var(--emerald)]"
                  : "bg-cyan shadow-[0_0_6px_var(--cyan)]"
                : "bg-zinc-700/60"
            }`}
          />
        );
      })}
    </div>
  );
}

export function Simulator() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mode, setMode] = useState<ModeType>("direct");
  const [activeApp, setActiveApp] = useState<AppType>("cursor");
  const [elapsed, setElapsed] = useState(0);
  const [typed, setTyped] = useState("");
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentSample = APP_SAMPLES[activeApp];
  const targetText = mode === "direct" ? currentSample.direct : currentSample.smart;

  const start = useCallback(() => {
    setPhase((p) => {
      if (p === "recording") return p;
      if (typingRef.current) clearInterval(typingRef.current);
      setElapsed(0);
      setTyped("");
      return "recording";
    });
  }, []);

  const stop = useCallback(() => {
    setPhase((p) => (p === "recording" ? "done" : p));
  }, []);

  // Timer counter during active hold
  useEffect(() => {
    if (phase !== "recording") return;
    const id = setInterval(() => setElapsed((e) => e + 1), 100);
    return () => clearInterval(id);
  }, [phase]);

  // Smooth typewriter simulation on release
  useEffect(() => {
    if (phase !== "done") return;
    let i = 0;
    typingRef.current = setInterval(() => {
      i += 1;
      setTyped(targetText.slice(0, i));
      if (i >= targetText.length && typingRef.current) {
        clearInterval(typingRef.current);
      }
    }, 18);

    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [phase, targetText]);

  // Keyboard Space hold listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        start();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) return;
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
    <section id="demo" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-24">
      <div className="text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          INTERACTIVE SIMULATOR
        </p>
        <div className="mt-3 flex justify-center">
          <TrueFocus
            sentence="Feel the speed before you install."
            manualMode={false}
            blurAmount={3}
            borderColor="#38bdf8"
            glowColor="rgba(56, 189, 248, 0.6)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.5}
            className="text-2xl sm:text-4xl font-semibold tracking-[-0.02em] text-foreground"
          />
        </div>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
          Simulate QEVRA’s floating obsidian capsule across your favorite Windows apps. Hold to
          speak, release to paste.
        </p>
      </div>

      {/* Target Application Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <div className="inline-flex rounded-xl border border-border bg-canvas/90 p-1 backdrop-blur-md shadow-sm">
          {[
            { id: "cursor", label: "Cursor IDE", icon: Code2 },
            { id: "vscode", label: "VS Code", icon: Code2 },
            { id: "slack", label: "Slack", icon: MessageSquare },
            { id: "terminal", label: "Terminal", icon: Terminal },
          ].map((app) => (
            <button
              key={app.id}
              onClick={() => {
                setActiveApp(app.id as AppType);
                setPhase("idle");
                setTyped("");
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeApp === app.id
                  ? "border border-border-strong bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <app.icon className="h-3.5 w-3.5" />
              <span>{app.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mock Windows desktop / IDE window wrapped in SpotlightCard */}
      <SpotlightCard
        spotlightColor="rgba(56, 189, 248, 0.18)"
        className="relative mt-6 overflow-hidden rounded-2xl border border-border-strong bg-canvas shadow-2xl p-0"
      >
        {/* Window title bar */}
        <div className="flex items-center justify-between border-b border-border/80 bg-background/60 px-4 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
            <span className="ml-3 font-mono text-[11px] text-zinc-400">
              {currentSample.filename}
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-cyan">
            <DecryptedText
              text="Win32 Focus Preserved"
              speed={40}
              maxIterations={10}
              animateOn="hover"
              className="text-cyan font-semibold"
              encryptedClassName="text-muted-foreground font-mono"
            />
          </div>
        </div>

        {/* Floating Capsule Overlay (Simulating QEVRA Capsule) */}
        <div className="pointer-events-none relative flex justify-center">
          <div
            className={`absolute top-4 z-20 flex items-center gap-3.5 rounded-full border border-white/15 bg-[#0e1017]/95 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 ${
              phase === "idle"
                ? "px-4 py-2 opacity-80"
                : phase === "recording"
                  ? "scale-105 px-5 py-2.5 opacity-100 shadow-[0_0_35px_-8px_rgba(56,189,248,0.5)] ring-1 ring-cyan/40"
                  : "px-5 py-2.5 opacity-100 shadow-[0_0_35px_-8px_rgba(16,185,129,0.5)] ring-1 ring-emerald/40"
            }`}
          >
            {phase === "done" ? (
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald/20 text-emerald">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="font-mono text-xs font-medium text-emerald">
                  {mode === "direct" ? "Pasted verbatim" : "Copilot generated"}
                </span>
                <span className="font-mono text-[10px] text-zinc-400">· 0ms focus loss</span>
              </div>
            ) : (
              <>
                <div className="relative flex items-center justify-center">
                  <Mic
                    className={`h-4 w-4 ${phase === "recording" ? "text-cyan animate-pulse" : "text-zinc-400"}`}
                  />
                </div>
                <Bars active={phase === "recording"} />
                <span className="font-mono text-[11px] font-medium text-zinc-300">
                  {phase === "recording" ? (
                    secs
                  ) : (
                    <DecryptedText
                      text="Hold Right Alt"
                      speed={50}
                      maxIterations={8}
                      animateOn="view"
                      className="text-zinc-300"
                    />
                  )}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Editor Body */}
        <div className="min-h-[220px] bg-[#090a0f] p-6 pt-20 font-mono text-[13px] leading-relaxed text-zinc-300">
          <div className="text-zinc-600">{currentSample.comment}</div>
          <div className="text-zinc-700">1</div>
          <div className="flex gap-2">
            <span className="text-zinc-700 select-none">2</span>
            <div className="text-foreground">
              {typed}
              <span className="inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-cyan align-middle ml-0.5" />
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Simulator Action Controls */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {/* Hold Button with Magnet */}
        <Magnet padding={80} magnetStrength={3}>
          <button
            onMouseDown={start}
            onMouseUp={stop}
            onMouseLeave={stop}
            onTouchStart={(e) => {
              e.preventDefault();
              start();
            }}
            onTouchEnd={stop}
            className={`group relative flex items-center justify-center gap-3 rounded-xl border px-8 py-4 text-sm font-semibold transition-all select-none ${
              phase === "recording"
                ? "border-cyan/50 bg-cyan/10 text-cyan shadow-[0_0_30px_-5px_rgba(56,189,248,0.4)] scale-[0.98]"
                : "border-border-strong bg-canvas/90 text-foreground hover:border-white/20 hover:shadow-lg active:scale-[0.98]"
            }`}
          >
            <Mic
              className={`h-4 w-4 ${phase === "recording" ? "animate-pulse text-cyan" : "text-emerald"}`}
            />
            <span>
              {phase === "recording"
                ? "Listening... release to paste"
                : "Hold Space or Click & Hold to Test Voice Dictation"}
            </span>
            <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground group-hover:text-foreground">
              {phase === "recording" ? "ACTIVE" : "SPACE"}
            </span>
          </button>
        </Magnet>

        {/* Mode Toggle Switcher with ShinyText */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Mode:</span>
          <div className="inline-flex rounded-lg border border-border bg-canvas/90 p-1 shadow-inner">
            {(["direct", "smart"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setPhase("idle");
                  setTyped("");
                }}
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${
                  mode === m
                    ? "border border-border-strong bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "smart" && <Sparkles className="h-3 w-3 text-cyan" />}
                {mode === m ? (
                  <ShinyText
                    text={
                      m === "direct"
                        ? "Direct Dictation (Verbatim)"
                        : "Smart Copilot (Prompt Engineered)"
                    }
                    speed={2.5}
                    color="#ffffff"
                    shineColor="#38bdf8"
                  />
                ) : (
                  <span>
                    {m === "direct"
                      ? "Direct Dictation (Verbatim)"
                      : "Smart Copilot (Prompt Engineered)"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Simulator;
