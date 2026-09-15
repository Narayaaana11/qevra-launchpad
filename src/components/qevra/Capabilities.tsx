import { Mic, Zap, Target, Cloud, ScanEye, Keyboard, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { SpotlightCard, ShinyText, BorderGlow } from "@/components/reactbits";

function BentoCard({
  icon: Icon,
  badge,
  title,
  children,
  className = "",
  spotlightColor = "rgba(56, 189, 248, 0.2)"
}: {
  icon: typeof Mic;
  badge?: string;
  title: string;
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  return (
    <SpotlightCard
      spotlightColor={spotlightColor}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e14]/90 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-canvas transition-colors group-hover:border-[color-mix(in_oklab,var(--cyan)_40%,transparent)]">
          <Icon className="h-4.5 w-4.5 text-cyan" />
        </div>
        {badge && (
          <span className="rounded-full border border-border bg-canvas/80 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            <ShinyText text={badge} speed={3} color="#a1a1aa" shineColor="#38bdf8" />
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">{title}</h3>
      <div className="mt-2.5 space-y-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </SpotlightCard>
  );
}

export function Capabilities() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <div className="text-center sm:text-left">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          CORE CAPABILITIES
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
          Engineered as a native Windows power-tool. Not another browser wrapper.
        </h2>
      </div>

      {/* 6-Card Responsive Bento Grid */}
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Hold-to-Talk with BorderGlow */}
        <div className="lg:col-span-2">
          <BorderGlow
            borderRadius={16}
            glowColor="190 85 65"
            glowRadius={30}
            glowIntensity={0.8}
            colors={["#38bdf8", "#10b981", "#818cf8"]}
            className="w-full h-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-canvas">
                  <Mic className="h-4.5 w-4.5 text-cyan" />
                </div>
                <span className="rounded-full border border-border bg-canvas/80 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  <ShinyText text="Wispr Flow Native" speed={2.5} color="#38bdf8" shineColor="#ffffff" />
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                Hold-to-Talk (Sub-180ms Trigger)
              </h3>
              <div className="mt-2.5 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Press and hold <span className="kbd font-mono">Right Alt</span> (or{" "}
                  <span className="kbd font-mono">F8</span> / <span className="kbd font-mono">Fn</span>)
                  for ≥180ms. The non-activating obsidian capsule floats at the top without stealing
                  window focus.
                </p>
                <p>
                  Release the key to transcribe via Groq and paste directly at your exact cursor position
                  across any Windows application.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-border/50">
                  {[
                    "Cursor IDE",
                    "VS Code",
                    "Google Chrome",
                    "Slack",
                    "Discord",
                    "Notepad",
                    "Windows Terminal",
                  ].map((app) => (
                    <span
                      key={app}
                      className="rounded-md border border-border/60 bg-background/60 px-2 py-0.5 font-mono text-[10px] text-zinc-400 hover:text-cyan transition-colors"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* Card 2: Double-Tap Persistent Mode */}
        <BentoCard
          icon={Zap}
          badge="380ms Window"
          title="Double-Tap Persistent Mode"
          spotlightColor="rgba(16, 185, 129, 0.25)"
        >
          <p>
            Double-tap <span className="kbd font-mono">Right Alt</span> within 380ms to lock the HUD
            open for long-form dictation, meetings, or multi-step prompt drafting.
          </p>
          <p>
            Features interactive on-screen controls for{" "}
            <span className="text-zinc-300">Record</span>,{" "}
            <span className="text-zinc-300">Pause / Resume</span>,{" "}
            <span className="text-zinc-300">Stop &amp; Insert</span>, and{" "}
            <span className="text-zinc-300">Discard</span>.
          </p>
        </BentoCard>

        {/* Card 3: Direct Dictation vs Smart Assistant */}
        <BentoCard
          icon={Target}
          badge="Dual Architecture"
          title="Direct Dictation vs. Smart Assistant"
          spotlightColor="rgba(168, 85, 247, 0.25)"
        >
          <div className="space-y-3">
            <div className="rounded-lg border border-border/60 bg-background/50 p-3">
              <span className="font-mono text-[11px] font-semibold text-emerald">
                DIRECT MODE (VERBATIM)
              </span>
              <p className="mt-1 text-xs text-zinc-400">
                Pure verbatim transcription with strict capitalization, punctuation, and code
                snippet formatting. Zero hallucinations.
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/50 p-3">
              <span className="font-mono text-[11px] font-semibold text-cyan">
                SMART COPILOT MODE
              </span>
              <p className="mt-1 text-xs text-zinc-400">
                Contextual prompt engineering designed specifically for Claude 3.7, ChatGPT, and
                Cursor Composer workflows.
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Card 4: Groq Cloud Whisper-large-v3 */}
        <BentoCard
          icon={Cloud}
          badge="Sub-180ms STT"
          title="Groq Cloud Whisper-large-v3"
          spotlightColor="rgba(56, 189, 248, 0.25)"
        >
          <p>
            Inference powered by Groq LPU™ systems running Whisper-large-v3 at{" "}
            <span className="text-foreground font-semibold">sub-180ms</span> speed.
          </p>
          <p>
            Uses greedy zero-temperature decoding to eliminate hallucinations on background noise,
            with optional secondary Llama 3.3 filler-word suppression (strips{" "}
            <span className="font-mono text-xs text-zinc-400">&ldquo;um&rdquo;</span>,{" "}
            <span className="font-mono text-xs text-zinc-400">&ldquo;uh&rdquo;</span>).
          </p>
        </BentoCard>

        {/* Card 5: Autonomous Screen Copilot & HITL Safety */}
        <BentoCard
          icon={ScanEye}
          badge="Strict HITL Gate"
          title="Autonomous Screen Copilot & Safety"
          spotlightColor="rgba(245, 158, 11, 0.25)"
        >
          <p>
            Multimodal visual inspection of active windows via low-latency native screen capture.
          </p>
          <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldAlert className="h-4 w-4" />
              <span className="font-mono text-[11px] font-semibold">
                HUMAN-IN-THE-LOOP SAFETY GATE
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-400">
              Actions with side effects require explicit approval: press{" "}
              <span className="kbd font-mono text-xs">Enter</span> to execute or{" "}
              <span className="kbd font-mono text-xs">Esc</span> to reject.
            </p>
          </div>
        </BentoCard>

        {/* Card 6: Global Hotkey Architecture */}
        <BentoCard
          icon={Keyboard}
          badge="Win32 Hooking"
          title="Global Windows Hotkey Architecture"
          className="lg:col-span-2"
          spotlightColor="rgba(56, 189, 248, 0.25)"
        >
          <p>
            Low-level native C++ hook (
            <span className="font-mono text-xs text-zinc-300">WinKeyServer.exe</span>) captures
            hardware key presses without invoking PowerShell or triggering Windows UAC freezes.
          </p>
          <p>
            Customizable bindings with support for <span className="kbd font-mono">Right Alt</span>,{" "}
            <span className="kbd font-mono">F8</span>, <span className="kbd font-mono">Fn</span>,{" "}
            <span className="kbd font-mono">Right Ctrl</span>, and{" "}
            <span className="kbd font-mono">Ctrl + Shift + Space</span> overlay toggles.
          </p>
        </BentoCard>
      </div>
    </section>
  );
}

export default Capabilities;
