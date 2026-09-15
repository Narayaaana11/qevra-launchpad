import { CheckCircle2 } from "lucide-react";
import { SpotlightCard, ShinyText } from "@/components/reactbits";

interface PhaseItem {
  tag: string;
  badge: string;
  live: boolean;
  next?: boolean;
  title: string;
  description: string;
  features: string[];
}

const PHASES: PhaseItem[] = [
  {
    tag: "PHASE 1 — TODAY",
    badge: "Live MVP",
    live: true,
    title: "Local-First Windows Hold-to-Talk & Context Engine",
    description:
      "Full native Windows release with sub-180ms Groq Whisper-large-v3 transcription, zero-focus cursor pasting, and direct verbatim dictation.",
    features: [
      "Hardware-hooked Right Alt (WinKeyServer.exe)",
      "Win32 foreground window preservation",
      "Direct Dictation & Smart Copilot modes",
      "Human-in-the-Loop safety approval system",
    ],
  },
  {
    tag: "PHASE 2 — NEXT",
    badge: "In Active Build",
    live: false,
    next: true,
    title: "100% Air-Gapped Local Whisper (ONNX + Transformers.js)",
    description:
      "Zero internet connection required. Run compact Whisper models entirely on local GPU/NPU hardware with quantized weights.",
    features: [
      "Local ONNX Runtime execution",
      "Direct NVIDIA TensorRT & Intel NPU acceleration",
      "Zero egress network guarantees for high-security environments",
      "Local vector RAG semantic memory indexing",
    ],
  },
  {
    tag: "PHASE 3",
    badge: "Planned",
    live: false,
    title: "macOS & Linux Companion Architecture",
    description:
      "Cross-platform parity with global accessibility hooks, native Wayland/X11 support, and per-app prompt templates.",
    features: [
      "macOS Apple Silicon (Metal) native binary",
      "Application-specific prompt presets (e.g. Cursor vs Slack vs Word)",
      "Global multi-monitor capsule positioning",
    ],
  },
  {
    tag: "PHASE 4",
    badge: "Planned",
    live: false,
    title: "Team Dictionary & Enterprise Vocabulary Sync",
    description:
      "Collaborative domain dictionaries for engineering organizations, medical terminology, and proprietary codebase symbols.",
    features: [
      "Real-time synchronized custom vocabulary",
      "Enterprise audit logging and compliance verification",
      "Self-hosted team dictionary relays",
    ],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <div className="text-center sm:text-left">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          PRODUCT ROADMAP
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
          How we are moving forward.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          From today’s live MVP to a fully autonomous, offline ambient intelligence platform.
        </p>
      </div>

      <div className="mt-14 relative border-l border-border/80 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-12">
        {PHASES.map((p) => (
          <div key={p.tag} className="relative group">
            {/* Timeline node marker */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1 flex h-4 w-4 items-center justify-center rounded-full border bg-background transition-transform group-hover:scale-110 ${
                p.live
                  ? "border-emerald/40 shadow-[0_0_12px_var(--emerald)]"
                  : p.next
                    ? "border-cyan/40 shadow-[0_0_12px_var(--cyan)]"
                    : "border-border"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  p.live ? "bg-emerald animate-pulse" : p.next ? "bg-cyan" : "bg-zinc-600"
                }`}
              />
            </div>

            {/* Card Content wrapped in SpotlightCard */}
            <SpotlightCard
              spotlightColor={
                p.live
                  ? "rgba(16, 185, 129, 0.2)"
                  : p.next
                    ? "rgba(56, 189, 248, 0.2)"
                    : "rgba(255, 255, 255, 0.08)"
              }
              className="rounded-2xl border border-white/10 bg-[#0c0e14]/80 p-6 shadow-md backdrop-blur-md transition-all hover:border-white/20"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-muted-foreground">
                  {p.tag}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium ${
                    p.live
                      ? "border-emerald/40 bg-emerald/10 text-emerald"
                      : p.next
                        ? "border-cyan/40 bg-cyan/10 text-cyan"
                        : "border-border bg-canvas text-muted-foreground"
                  }`}
                >
                  {p.live ? (
                    <ShinyText text={p.badge} speed={2} color="#10b981" shineColor="#ffffff" />
                  ) : p.next ? (
                    <ShinyText text={p.badge} speed={2.5} color="#38bdf8" shineColor="#ffffff" />
                  ) : (
                    p.badge
                  )}
                </span>
              </div>

              <h3 className="mt-2.5 text-lg font-semibold text-foreground tracking-tight">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>

              <div className="mt-4 grid gap-2 pt-3 border-t border-border/50 sm:grid-cols-2">
                {p.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 shrink-0 ${p.live ? "text-emerald" : "text-cyan"}`}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Roadmap;
