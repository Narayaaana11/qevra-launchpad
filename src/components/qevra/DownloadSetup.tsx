import {
  Copy,
  Download,
  Eye,
  EyeOff,
  Check,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SpotlightCard,
  StarBorder,
  Magnet,
  ShinyText,
  DecryptedText
} from "@/components/reactbits";

const SHA256_CHECKSUM = "9c2639de9aa7012d3855a2335993c17322258e2bbbc800bbacad16e053f91d7f";

function WindowsIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 88 88" fill="currentColor">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.248L0 12.402zm35.67 33.529l.028 34.453L.028 75.48.003 46.179l35.667-.248zM40.97 6.479L87.977 0v41.526l-47.008.377V6.479zm47.037 39.467l-.03 41.602-46.99-6.613-.013-34.612 47.033-.377z" />
    </svg>
  );
}

export function DownloadSetup() {
  const [showSha, setShowSha] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copyCode = () => {
    const code =
      "# Authorized internal developer access\ncd qevra-desktop\nnpm install\nnpm run dev";
    void navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    toast.success("Command copied to clipboard");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="download" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <div className="text-center sm:text-left">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          DOWNLOAD &amp; ONBOARDING
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
          Zero-friction setup. Running in under two minutes.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Download the pre-compiled native installer, connect your free Groq key, and begin speaking
          anywhere in Windows.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[400px_1fr]">
        {/* Direct Download Box wrapped in SpotlightCard */}
        <SpotlightCard
          spotlightColor="rgba(56, 189, 248, 0.2)"
          className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0e14]/90 p-6 shadow-xl backdrop-blur-md"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-canvas shadow-inner">
                <WindowsIcon className="h-5 w-5 text-cyan" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">QEVRA for Windows</h3>
                  <span className="rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 font-mono text-[10px] text-emerald font-medium">
                    <ShinyText text="MVP" speed={2} color="#10b981" shineColor="#ffffff" />
                  </span>
                </div>
                <p className="font-mono text-[11px] text-muted-foreground">
                  v0.1.0 · ~170 MB · Windows 10 &amp; 11 (x64)
                </p>
              </div>
            </div>

            {/* Direct Download with Magnet & StarBorder */}
            <div className="mt-6">
              <Magnet padding={40} magnetStrength={3} wrapperClassName="w-full">
                <StarBorder
                  as="a"
                  href="https://github.com/Narayaaana11/qevra-launchpad/releases/download/v0.1.0/QEVRA-Flow-Setup.exe"
                  download="QEVRA-Flow-Setup.exe"
                  onClick={() => toast.success("Starting download from QEVRA Release CDN...")}
                  color="#38bdf8"
                  speed="3s"
                  thickness={1.5}
                  backgroundColor="#ffffff"
                  textColor="#000000"
                  className="flex w-full items-center justify-center text-sm font-semibold shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] transition-all hover:opacity-95 active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center gap-2 py-3 px-4 font-semibold text-zinc-950">
                    <Download className="h-4 w-4" />
                    <span>Download QEVRA Installer (.exe)</span>
                  </div>
                </StarBorder>
              </Magnet>
            </div>

            {/* Mirror & Portable build note */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-border/70 bg-canvas/60 px-3 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald shrink-0" />
                <span>Global CDN Mirror (GitHub Releases)</span>
              </div>
              <a
                href="https://github.com/Narayaaana11/qevra-launchpad/releases"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] text-cyan hover:underline"
              >
                All Releases &amp; Mirrors →
              </a>
            </div>

            {/* Windows SmartScreen Note */}
            <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-[11px] leading-relaxed text-zinc-400">
              <span className="font-medium text-zinc-300">Beta Note:</span> Because this is an
              unsigned community MVP build, Windows SmartScreen may show an initial prompt. Simply
              click <span className="text-zinc-200 underline">More info</span> →{" "}
              <span className="text-zinc-200 underline">Run anyway</span>.
            </div>
          </div>

          {/* SHA256 Checksum Toggle */}
          <div className="mt-6 border-t border-border pt-4">
            <button
              onClick={() => setShowSha((v) => !v)}
              className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {showSha ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              <span>Verify SHA256 Checksum</span>
            </button>
            {showSha && (
              <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-border/80 bg-background/90 p-2.5">
                <code className="break-all font-mono text-[10px] leading-4 text-zinc-300">
                  <DecryptedText
                    text={SHA256_CHECKSUM}
                    speed={25}
                    maxIterations={6}
                    animateOn="view"
                    className="text-cyan font-mono"
                    encryptedClassName="text-muted-foreground font-mono"
                  />
                </code>
                <button
                  onClick={() => {
                    void navigator.clipboard?.writeText(SHA256_CHECKSUM);
                    toast.success("SHA256 checksum copied to clipboard");
                  }}
                  className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-canvas hover:text-foreground"
                  aria-label="Copy checksum"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </SpotlightCard>

        {/* 4-Step Prerequisites & Setup Guide wrapped in SpotlightCard */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.15)"
          className="rounded-2xl border border-white/10 bg-[#0c0e14]/90 px-6 py-4 shadow-xl backdrop-blur-md"
        >
          <Accordion type="single" collapsible defaultValue="s1">
            {/* Step 1: Free Groq Key */}
            <AccordionItem value="s1" className="border-border">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald/10 font-mono text-[10px] font-semibold text-emerald">
                    1
                  </span>
                  <span className="text-foreground font-semibold">Get a 100% Free Groq API Key</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3.5 text-sm text-muted-foreground pb-4">
                <p>
                  Groq powers the ultra-low latency Whisper-large-v3 model. The free tier provides
                  generous daily limits with{" "}
                  <strong className="text-foreground">no credit card required</strong>.
                </p>
                <ol className="list-decimal space-y-1.5 pl-5 text-xs text-zinc-300">
                  <li>Visit the Groq Console and sign up with GitHub or Google.</li>
                  <li>
                    Click <span className="font-mono text-zinc-100">API Keys</span> →{" "}
                    <span className="font-mono text-zinc-100">Create API Key</span>.
                  </li>
                  <li>
                    Copy your key (starts with <span className="font-mono text-zinc-100">gsk_</span>
                    ).
                  </li>
                </ol>
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-canvas px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-border-strong hover:bg-card"
                >
                  <span>Open Groq Console Keys</span>
                  <ExternalLink className="h-3.5 w-3.5 text-cyan" />
                </a>
              </AccordionContent>
            </AccordionItem>

            {/* Step 2: Windows Audio Permissions */}
            <AccordionItem value="s2" className="border-border">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan/10 font-mono text-[10px] font-semibold text-cyan">
                    2
                  </span>
                  <span className="text-foreground font-semibold">Enable Windows Microphone Permissions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2.5 text-sm text-muted-foreground pb-4">
                <p>Ensure Windows grants desktop apps permission to access your microphone:</p>
                <div className="rounded-lg border border-border bg-canvas/70 p-3 font-mono text-xs text-zinc-300">
                  Settings → Privacy &amp; security → Microphone → Allow desktop apps to access your
                  microphone (ON)
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Step 3: Launch QEVRA & Configure */}
            <AccordionItem value="s3" className="border-border">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet/10 font-mono text-[10px] font-semibold text-purple-400">
                    3
                  </span>
                  <span className="text-foreground font-semibold">Launch QEVRA &amp; Enter Your API Key</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground pb-4">
                <p>Run the installer or click the desktop shortcut.</p>
                <ul className="list-disc space-y-1 pl-5 text-xs text-zinc-300">
                  <li>
                    Press <span className="kbd font-mono text-[11px]">Ctrl + Shift + Space</span>{" "}
                    (or click the tray icon) to open the QEVRA Flow Dashboard.
                  </li>
                  <li>
                    Navigate to Settings, paste your{" "}
                    <span className="font-mono text-zinc-100">GROQ_API_KEY</span>, and pick your
                    preferred mode (Direct Dictation or Smart Copilot).
                  </li>
                  <li>
                    Click <span className="font-mono text-zinc-100">Save Settings</span> — you are
                    now ready to hold <span className="kbd font-mono text-[11px]">Right Alt</span>{" "}
                    and speak!
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Step 4: Run From Source (Developers) */}
            <AccordionItem value="s4" className="border-none">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 font-mono text-[10px] font-semibold text-zinc-300">
                    4
                  </span>
                  <span className="text-foreground font-semibold">
                    Private Developer Setup (Authorized Contributors)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground pb-4">
                <p className="text-xs">
                  Source code repositories are private. Authorized contributors with organization access can run and test locally:
                </p>
                <div className="relative rounded-lg border border-border bg-background/90 p-3 font-mono text-xs text-zinc-300">
                  <button
                    onClick={copyCode}
                    className="absolute right-2.5 top-2.5 rounded p-1 text-muted-foreground transition-colors hover:bg-canvas hover:text-foreground"
                    title="Copy commands"
                  >
                    {copiedCode ? (
                      <Check className="h-3.5 w-3.5 text-emerald" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <pre className="overflow-x-auto text-[11px] leading-5">
                    {`# Authorized internal developer access\ncd qevra-desktop\nnpm install\nnpm run dev`}
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SpotlightCard>
      </div>
    </section>
  );
}

export default DownloadSetup;
