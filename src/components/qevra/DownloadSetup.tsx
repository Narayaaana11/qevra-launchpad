import { ArrowUpRight, Copy, Download, Eye, EyeOff, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SHA = "9f2c41d8e07b5a63c1ba8d4f7e9026a15c3b8d72fa41e6095c7bd3e28f10a4bd";

export function DownloadSetup() {
  const [showSha, setShowSha] = useState(false);

  return (
    <section id="download" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <p className="font-mono text-[11px] tracking-[0.2em] text-subtle">DOWNLOAD & SETUP</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
        Running in under four minutes.
      </h2>

      <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Download box */}
        <div className="h-fit rounded-2xl surface-raised p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg surface">
              <Package className="h-4.5 w-4.5 text-cyan" />
            </span>
            <div>
              <p className="text-sm font-medium">QEVRA for Windows</p>
              <p className="font-mono text-[11px] text-subtle">v0.1.0-alpha · ~85 MB · 64-bit</p>
            </div>
          </div>

          <button
            onClick={() => toast.info("Installer build is being finalized — join the waitlist for the drop.")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Download QEVRA Installer (.exe)
          </button>

          <button
            onClick={() => toast.info("Portable .zip ships alongside the installer.")}
            className="mt-2 w-full rounded-xl surface px-4 py-2.5 text-xs text-muted-foreground hairline-hover"
          >
            Prefer no install? Get the portable .zip
          </button>

          <div className="mt-5 border-t border-border pt-4">
            <button
              onClick={() => setShowSha((v) => !v)}
              className="flex items-center gap-1.5 font-mono text-[11px] text-subtle transition-colors hover:text-foreground"
            >
              {showSha ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              SHA256 checksum
            </button>
            {showSha && (
              <div className="mt-2 flex items-start gap-2">
                <code className="break-all font-mono text-[10px] leading-4 text-muted-foreground">{SHA}</code>
                <button
                  onClick={() => {
                    void navigator.clipboard?.writeText(SHA);
                    toast.success("Checksum copied");
                  }}
                  className="shrink-0 text-subtle transition-colors hover:text-foreground"
                  aria-label="Copy checksum"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="rounded-2xl surface px-6 py-2">
          <Accordion type="single" collapsible defaultValue="s1">
            <AccordionItem value="s1" className="border-border">
              <AccordionTrigger className="text-left text-sm hover:no-underline">
                <span className="font-mono text-[11px] text-emerald">STEP 1</span>
                <span className="ml-3 flex-1">Get a 100% free Groq API key</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                <p>Free tier includes generous RPM/RPD limits — no credit card needed.</p>
                <ol className="list-decimal space-y-1 pl-5">
                  <li>Open the Groq console and sign in.</li>
                  <li>
                    Click <span className="text-foreground">Create API Key</span>.
                  </li>
                  <li>
                    Copy the key — it starts with <span className="font-mono text-xs text-foreground">gsk_</span>.
                  </li>
                </ol>
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg surface-raised px-3 py-2 text-xs hairline-hover"
                >
                  console.groq.com/keys <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="s2" className="border-border">
              <AccordionTrigger className="text-left text-sm hover:no-underline">
                <span className="font-mono text-[11px] text-emerald">STEP 2</span>
                <span className="ml-3 flex-1">Windows audio permissions</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Make sure your microphone is enabled under{" "}
                <span className="text-foreground">Settings → Privacy &amp; Security → Microphone</span>, and that
                desktop apps are allowed access.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="s3" className="border-border">
              <AccordionTrigger className="text-left text-sm hover:no-underline">
                <span className="font-mono text-[11px] text-emerald">STEP 3</span>
                <span className="ml-3 flex-1">Launch QEVRA & configure</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Run the installer, then press <span className="kbd">Ctrl + Shift + Space</span> or click the settings
                  gear on the floating capsule.
                </p>
                <p>
                  Paste your <span className="font-mono text-xs text-foreground">GROQ_API_KEY</span>, select{" "}
                  <span className="text-foreground">Direct Dictation</span>, and click{" "}
                  <span className="text-foreground">Save Settings</span>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="s4" className="border-none">
              <AccordionTrigger className="text-left text-sm hover:no-underline">
                <span className="font-mono text-[11px] text-subtle">STEP 4</span>
                <span className="ml-3 flex-1">Optional — run from source</span>
              </AccordionTrigger>
              <AccordionContent>
                <pre className="overflow-x-auto rounded-lg border border-border bg-canvas p-4 font-mono text-[12px] leading-6 text-muted-foreground">
                  <code>{`git clone https://github.com/YourOrg/QEVRA.git
cd QEVRA
npm install
npm run dev`}</code>
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
