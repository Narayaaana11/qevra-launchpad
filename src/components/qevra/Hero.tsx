import { ArrowDown, Globe, Gauge, Shield, Crosshair } from "lucide-react";
import {
  BlurText,
  ShinyText,
  StarBorder,
  Magnet,
  SpotlightCard,
  CountUp,
  DecryptedText,
  Particles
} from "@/components/reactbits";

function WindowsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 88 88" fill="currentColor">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.248L0 12.402zm35.67 33.529l.028 34.453L.028 75.48.003 46.179l35.667-.248zM40.97 6.479L87.977 0v41.526l-47.008.377V6.479zm47.037 39.467l-.03 41.602-46.99-6.613-.013-34.612 47.033-.377z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16">
      {/* React Bits Ambient WebGL Particles in Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        <Particles
          particleCount={90}
          particleSpread={12}
          speed={0.08}
          particleColors={["#38bdf8", "#10b981", "#ffffff", "#818cf8"]}
          alphaParticles={true}
          particleBaseSize={80}
        />
      </div>

      {/* Precision ambient background lighting */}
      <div className="pointer-events-none absolute inset-0 grid-backdrop [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[1020px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1),transparent_70%)] blur-3xl -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07),transparent_70%)] blur-2xl -z-10" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        {/* Launch status pill with ShinyText */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-canvas/80 px-3.5 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          <ShinyText
            text="LIVE MVP LAUNCH • BUILT FOR WINDOWS 10/11"
            speed={2.2}
            color="#a1a1aa"
            shineColor="#38bdf8"
            className="font-mono text-[11px] font-medium tracking-[0.14em]"
          />
        </div>

        {/* Hero headline with BlurText animation */}
        <div className="mt-8 flex flex-col items-center">
          <BlurText
            text="Say what you mean."
            delay={100}
            animateBy="words"
            direction="top"
            className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl justify-center text-center"
          />
          <BlurText
            text="Get it done at the speed of thought."
            delay={120}
            animateBy="words"
            direction="bottom"
            className="mt-2 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] bg-gradient-to-r from-cyan via-emerald to-zinc-100 bg-clip-text text-transparent sm:text-6xl lg:text-7xl justify-center text-center"
          />
        </div>

        {/* Sub-headline */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Local-first ambient voice dictation and context-aware copilot. Hold{" "}
          <span className="kbd font-mono text-foreground shadow-sm">Alt</span> (Left or Right) anywhere on
          your PC — speak naturally, and watch text paste instantly at your cursor without ever
          stealing window focus.
        </p>

        {/* Action CTAs with Magnet and StarBorder */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnet padding={60} magnetStrength={3}>
            <StarBorder
              as="a"
              href="#download"
              color="#38bdf8"
              speed="3.5s"
              thickness={1.5}
              backgroundColor="#0e1017"
              className="group relative flex w-full items-center justify-center text-foreground shadow-[0_0_40px_-10px_rgba(56,189,248,0.4)] transition-all hover:shadow-[0_0_55px_-5px_rgba(56,189,248,0.5)] active:scale-[0.98] sm:w-auto"
            >
              <div className="flex items-center gap-3 px-5 py-3">
                <WindowsIcon className="h-5 w-5 text-cyan transition-transform group-hover:scale-110" />
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold tracking-tight">
                      Download QEVRA for Windows (.exe)
                    </span>
                    <ArrowDown className="h-3.5 w-3.5 text-emerald transition-transform group-hover:translate-y-0.5" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">
                    v0.1.0 · ~170 MB · 64-bit · Free MVP
                  </span>
                </div>
              </div>
            </StarBorder>
          </Magnet>

          <Magnet padding={50} magnetStrength={4}>
            <a
              href="#waitlist"
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-canvas/80 px-6 py-4 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all hover:border-border-strong hover:bg-card hover:text-foreground sm:w-auto shadow-sm active:scale-[0.98]"
            >
              Join Pro Cloud Waitlist
            </a>
          </Magnet>
        </div>

        {/* Sub-metrics row wrapped in SpotlightCards with CountUp & DecryptedText */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Metric 1 */}
          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.25)"
            className="p-5 text-left border-border/80 bg-background/80 backdrop-blur-md transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-canvas">
              <Gauge className="h-4 w-4 text-cyan" />
            </div>
            <dt className="mt-3.5 text-sm font-semibold text-foreground flex items-center gap-1">
              <span>&lt;</span>
              <CountUp to={180} duration={1.6} />
              <span>ms Latency</span>
            </dt>
            <dd className="mt-1 text-xs text-muted-foreground">Groq Whisper-large-v3</dd>
          </SpotlightCard>

          {/* Metric 2 */}
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.25)"
            className="p-5 text-left border-border/80 bg-background/80 backdrop-blur-md transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-canvas">
              <Crosshair className="h-4 w-4 text-emerald" />
            </div>
            <dt className="mt-3.5 text-sm font-semibold text-foreground">
              <DecryptedText
                text="Zero Focus Stealing"
                speed={40}
                maxIterations={12}
                animateOn="hover"
                className="text-foreground"
                encryptedClassName="text-emerald/70 font-mono"
              />
            </dt>
            <dd className="mt-1 text-xs text-muted-foreground">Native cursor injection</dd>
          </SpotlightCard>

          {/* Metric 3 */}
          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.25)"
            className="p-5 text-left border-border/80 bg-background/80 backdrop-blur-md transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-canvas">
              <Globe className="h-4 w-4 text-violet" />
            </div>
            <dt className="mt-3.5 text-sm font-semibold text-foreground flex items-center gap-0.5">
              <CountUp to={99} duration={1.8} />
              <span>+ Languages</span>
            </dt>
            <dd className="mt-1 text-xs text-muted-foreground">Automatic detection</dd>
          </SpotlightCard>

          {/* Metric 4 */}
          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.25)"
            className="p-5 text-left border-border/80 bg-background/80 backdrop-blur-md transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-canvas">
              <Shield className="h-4 w-4 text-cyan" />
            </div>
            <dt className="mt-3.5 text-sm font-semibold text-foreground flex items-center gap-0.5">
              <CountUp to={100} duration={1.4} />
              <span>% Privacy Guarded</span>
            </dt>
            <dd className="mt-1 text-xs text-muted-foreground">Zero audio storage</dd>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default Hero;
