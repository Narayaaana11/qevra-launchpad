import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-background/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-canvas shadow-inner">
            <span className="h-2 w-2 rounded-full bg-emerald shadow-[0_0_8px_var(--emerald)]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-foreground">
              QEVRA
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs text-muted-foreground">Built for high-velocity builders.</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
          <a
            href="#faq"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <ShieldCheck className="h-4 w-4 text-emerald" />
            <span>Private Architecture &amp; Security</span>
          </a>
          <span className="font-mono text-[11px] text-zinc-500">
            MIT Engine · Proprietary Pro Modules
          </span>
          <span className="text-zinc-500">© {new Date().getFullYear()} QEVRA Platform</span>
        </div>
      </div>
    </footer>
  );
}
