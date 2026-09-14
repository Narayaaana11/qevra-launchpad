import { Mic, Zap, Target, Cloud, ScanEye, Keyboard } from "lucide-react";
import type { ReactNode } from "react";

function Card({
  icon: Icon,
  title,
  children,
  className = "",
}: {
  icon: typeof Mic;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`rounded-xl surface p-6 hairline-hover ${className}`}>
      <Icon className="h-4.5 w-4.5 text-emerald" />
      <h3 className="mt-4 text-[15px] font-medium tracking-tight">{title}</h3>
      <div className="mt-2.5 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </article>
  );
}

export function Capabilities() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <p className="font-mono text-[11px] tracking-[0.2em] text-subtle">CORE CAPABILITIES</p>
      <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
        A native Windows power-tool, not a chat box.
      </h2>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card icon={Mic} title="Hold-to-Talk (Wispr Flow native)" className="lg:col-span-2">
          <p>
            Hold <span className="kbd">Right Alt</span> (or <span className="kbd">F8</span> /{" "}
            <span className="kbd">Fn</span>) for ≥180ms. The floating pill appears without stealing focus; release to
            paste instantly into the active app.
          </p>
          <p className="font-mono text-xs text-subtle">Cursor · VS Code · Chrome · Slack · Discord</p>
        </Card>

        <Card icon={Zap} title="Double-tap persistent mode">
          <p>
            Double-tap <span className="kbd">Right Alt</span> within 380ms to lock the HUD open with Record,
            Pause/Resume, Stop &amp; Insert and Cancel controls.
          </p>
        </Card>

        <Card icon={Target} title="Direct dictation vs. smart assistant">
          <p>
            <span className="text-foreground">Direct mode</span> — pure verbatim dictation with perfect capitalization
            and punctuation. No hallucinated rewrites.
          </p>
          <p>
            <span className="text-foreground">Smart copilot</span> — contextual prompt generation for Claude, ChatGPT
            and Cursor Composer.
          </p>
        </Card>

        <Card icon={Cloud} title="Groq Cloud Whisper-large-v3">
          <p>
            Sub-180ms inference with greedy zero-temperature decoding — no hallucination on whispers or background
            noise. Optional Llama 3.3 filler-word cleaning (<span className="font-mono text-xs">um</span>,{" "}
            <span className="font-mono text-xs">uh</span>).
          </p>
        </Card>

        <Card icon={ScanEye} title="Autonomous screen copilot & HITL safety">
          <p>
            Multimodal visual inspection through desktop capture, gated by a strict human-in-the-loop approval card —{" "}
            <span className="kbd">Enter</span> to approve, <span className="kbd">Esc</span> to reject.
          </p>
        </Card>

        <Card icon={Keyboard} title="Global hotkey architecture" className="lg:col-span-2">
          <p>
            Native low-level Windows keyboard hooking for <span className="kbd">Right Alt</span>,{" "}
            <span className="kbd">F8</span> and <span className="kbd">Ctrl + Shift + Space</span>, with full custom key
            remapping.
          </p>
        </Card>
      </div>
    </section>
  );
}
