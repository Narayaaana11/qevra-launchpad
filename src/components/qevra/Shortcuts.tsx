import { SpotlightCard, DecryptedText } from "@/components/reactbits";

interface ShortcutRow {
  keys: string[];
  timing?: string;
  action: string;
  context: string;
}

const SHORTCUT_ROWS: ShortcutRow[] = [
  {
    keys: ["Hold", "Right Alt"],
    timing: "≥180ms",
    action: "Push-to-Talk Voice Dictation",
    context:
      "Transcribes audio on release and pastes directly at active cursor without losing focus.",
  },
  {
    keys: ["Double-tap", "Right Alt"],
    timing: "≤380ms",
    action: "Toggle Persistent HUD Capsule",
    context:
      "Locks the floating capsule open with manual Record, Pause, Stop, and Discard controls.",
  },
  {
    keys: ["Ctrl", "Shift", "Space"],
    action: "Open / Hide QEVRA Flow Dashboard",
    context: "Summons the full workspace overlay, intent history, memory hub, and settings panel.",
  },
  {
    keys: ["Esc"],
    action: "Discard Active Recording / Dismiss Prompt",
    context: "Instantly aborts in-progress recording without pasting, or closes active modals.",
  },
  {
    keys: ["1", "2", "3"],
    action: "Instant Option Disambiguation",
    context: "Selects numbered clarification pills when the AI detects ambiguous instructions.",
  },
];

export function Shortcuts() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center sm:text-left">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          KEYBOARD ARCHITECTURE
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl">
          Global Shortcuts Reference Table
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Zero-delay low-level Win32 hardware hooks. Works across any active window without stealing
          caret position.
        </p>
      </div>

      <SpotlightCard
        spotlightColor="rgba(56, 189, 248, 0.15)"
        className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e14]/90 shadow-xl backdrop-blur-md p-0"
      >
        <div className="divide-y divide-border">
          {SHORTCUT_ROWS.map((r) => (
            <div
              key={r.action}
              className="group flex flex-col gap-4 p-5 transition-colors hover:bg-canvas/60 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                {r.keys.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-background/90 px-3 py-1.5 font-mono text-xs font-semibold text-foreground shadow-sm transition-transform group-hover:scale-105 group-hover:border-cyan/40"
                  >
                    {k}
                  </span>
                ))}
                {r.timing && (
                  <span className="rounded-md border border-cyan/20 bg-cyan/10 px-2 py-0.5 font-mono text-[11px] font-medium text-cyan">
                    {r.timing}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:items-end sm:text-right">
                <span className="text-sm font-semibold text-foreground">
                  <DecryptedText
                    text={r.action}
                    speed={35}
                    maxIterations={8}
                    animateOn="hover"
                    className="text-foreground font-semibold"
                    encryptedClassName="text-cyan font-mono"
                  />
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">{r.context}</span>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </section>
  );
}

export default Shortcuts;
