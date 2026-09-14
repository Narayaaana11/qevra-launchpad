import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md surface-raised">
            <span className="h-2 w-2 rounded-[2px] bg-emerald" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-[0.18em]">QEVRA</span>
          <span className="text-xs text-subtle">Built for high-velocity builders.</span>
        </div>
        <div className="flex items-center gap-5 text-xs text-subtle">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" /> Repository
          </a>
          <span className="font-mono">MIT · Proprietary Pro modules</span>
          <span>© {new Date().getFullYear()} QEVRA</span>
        </div>
      </div>
    </footer>
  );
}
