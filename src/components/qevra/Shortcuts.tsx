const rows: { keys: string[]; timing?: string; action: string }[] = [
  { keys: ["Hold", "Right Alt"], timing: "180ms", action: "Push-to-talk — transcribe on release" },
  { keys: ["Double-tap", "Right Alt"], timing: "380ms", action: "Toggle persistent capsule controls" },
  { keys: ["Ctrl", "Shift", "Space"], action: "Open / hide Settings & HUD overlay" },
  { keys: ["Esc"], action: "Discard recording / dismiss prompt" },
  { keys: ["1", "2", "3"], action: "Instant keyboard option disambiguation" },
];

export function Shortcuts() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <p className="font-mono text-[11px] tracking-[0.2em] text-subtle">GLOBAL SHORTCUTS</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Keyboard cheat-sheet</h2>

      <div className="mt-10 overflow-hidden rounded-xl surface">
        {rows.map((r, i) => (
          <div
            key={r.action}
            className={`flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <div className="flex flex-wrap items-center gap-1.5">
              {r.keys.map((k) => (
                <span key={k} className="kbd">
                  {k}
                </span>
              ))}
              {r.timing && <span className="font-mono text-[11px] text-subtle">({r.timing})</span>}
            </div>
            <span className="text-sm text-muted-foreground">{r.action}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
