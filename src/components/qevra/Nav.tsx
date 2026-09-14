import { Download, Github, Menu } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Live Demo", href: "#demo" },
  { label: "Prerequisites", href: "#download" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md surface-raised">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald shadow-[0_0_14px_var(--emerald)]" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.18em]">QEVRA</span>
          <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-subtle">
            v0.1.0 MVP
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" /> GitHub / Docs
          </a>
          <a
            href="#download"
            className="flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Download for Windows
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-md p-2 text-muted-foreground md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 py-3 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
          <a href="#download" onClick={() => setOpen(false)} className="block py-2 text-sm">
            Download for Windows
          </a>
        </div>
      )}
    </header>
  );
}
