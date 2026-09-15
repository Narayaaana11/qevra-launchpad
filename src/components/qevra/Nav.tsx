import { BookOpen, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Magnet, ShinyText } from "@/components/reactbits";

const links = [
  { label: "Features", href: "#features" },
  { label: "Live Demo", href: "#demo" },
  { label: "Prerequisites", href: "#download" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

function WindowsIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 88 88" fill="currentColor">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.248L0 12.402zm35.67 33.529l.028 34.453L.028 75.48.003 46.179l35.667-.248zM40.97 6.479L87.977 0v41.526l-47.008.377V6.479zm47.037 39.467l-.03 41.602-46.99-6.613-.013-34.612 47.033-.377z" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="group flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong bg-canvas transition-colors group-hover:border-[color-mix(in_oklab,var(--emerald)_45%,transparent)]">
            <span className="h-2 w-2 rounded-full bg-emerald shadow-[0_0_12px_var(--emerald)]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold tracking-[0.2em] text-foreground">
              QEVRA
            </span>
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              <ShinyText text="v0.1.0 MVP" speed={2.5} color="#a1a1aa" shineColor="#38bdf8" />
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Magnet key={l.href} padding={30} magnetStrength={4}>
              <a
                href={l.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground inline-block"
              >
                {l.label}
              </a>
            </Magnet>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <Magnet padding={30} magnetStrength={4}>
            <a
              href="#faq"
              className="flex items-center gap-1.5 rounded-lg border border-border bg-canvas/60 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
            >
              <BookOpen className="h-4 w-4 text-emerald" />
              <span>Docs & Security</span>
            </a>
          </Magnet>

          <Magnet padding={40} magnetStrength={3}>
            <a
              href="#download"
              className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-8px_rgba(255,255,255,0.3)] transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <WindowsIcon className="h-3.5 w-3.5 opacity-90" />
              <span>Download for Windows</span>
            </a>
          </Magnet>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-b border-border bg-background/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-canvas hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <a
              href="#faq"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <BookOpen className="h-4 w-4 text-emerald" /> Docs & Security
            </a>
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <WindowsIcon className="h-3.5 w-3.5" /> Download for Windows
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;
