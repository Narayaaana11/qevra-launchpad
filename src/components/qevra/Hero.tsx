import { ArrowDown, Globe, Gauge, Shield, Crosshair } from "lucide-react";

const metrics = [
  { icon: Gauge, title: "<180ms Latency", note: "Groq Whisper-large-v3" },
  { icon: Crosshair, title: "Zero Focus Stealing", note: "Native cursor injection" },
  { icon: Globe, title: "99+ Languages", note: "Automatic detection" },
  { icon: Shield, title: "100% Privacy Guarded", note: "Nothing stored, ever" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16">
      <div className="pointer-events-none absolute inset-0 grid-backdrop [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--violet)_18%,transparent),transparent_70%)] blur-2xl" />

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <div className="rise inline-flex items-center gap-2 rounded-full surface px-3 py-1.5">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_10px_var(--emerald)]" />
          <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
            LIVE MVP LAUNCH • BUILT FOR WINDOWS 10/11
          </span>
        </div>

        <h1 className="rise mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-grad sm:text-6xl">
          Say what you mean. Get it done at the speed of thought.
        </h1>

        <p className="rise mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          Local-first ambient voice dictation and context-aware copilot. Hold{" "}
          <span className="kbd">Right Alt</span> anywhere on your PC — speak naturally, and watch text paste instantly
          at your cursor without ever stealing window focus.
        </p>

        <div className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#download"
            className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-border-strong bg-canvas px-5 py-3.5 shadow-[0_0_50px_-20px_var(--cyan)] transition-all hover:border-[color-mix(in_oklab,var(--cyan)_45%,transparent)] hover:shadow-[0_0_60px_-16px_var(--cyan)] sm:w-auto"
          >
            <ArrowDown className="h-4 w-4 text-emerald transition-transform group-hover:translate-y-0.5" />
            <span className="text-sm font-medium">Download QEVRA for Windows (.exe)</span>
            <span className="font-mono text-[10px] text-subtle">v0.1.0 · 64-bit · Free MVP</span>
          </a>
          <a
            href="#waitlist"
            className="w-full rounded-xl surface px-5 py-3.5 text-sm font-medium text-muted-foreground hairline-hover hover:text-foreground sm:w-auto"
          >
            Join Pro Cloud Waitlist
          </a>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.title} className="bg-background px-4 py-5 text-left">
              <m.icon className="h-4 w-4 text-cyan" />
              <dt className="mt-3 text-sm font-medium">{m.title}</dt>
              <dd className="mt-1 text-xs text-subtle">{m.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
