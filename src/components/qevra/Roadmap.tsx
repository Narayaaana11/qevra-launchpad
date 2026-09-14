const phases = [
  {
    tag: "PHASE 1 — TODAY",
    status: "Live MVP",
    live: true,
    title: "Local-first Windows hold-to-talk",
    body: "Groq Whisper-v3 integration, zero-focus cursor pasting, verbatim direct dictation.",
  },
  {
    tag: "PHASE 2 — NEXT",
    status: "In build",
    title: "Fully offline on-device Whisper",
    body: "GPU/NPU acceleration via Transformers.js & ONNX — 100% air-gapped transcription.",
  },
  {
    tag: "PHASE 3",
    status: "Planned",
    title: "macOS & Linux companions",
    body: "Cross-platform parity plus multi-window custom presets per application.",
  },
  {
    tag: "PHASE 4",
    status: "Planned",
    title: "Team dictionary & enterprise vocabulary",
    body: "Synchronized custom vocabulary, names and acronyms across an entire workspace.",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <p className="font-mono text-[11px] tracking-[0.2em] text-subtle">ROADMAP</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">How we are moving forward</h2>

      <ol className="mt-12 relative border-l border-border pl-8">
        {phases.map((p) => (
          <li key={p.tag} className="relative pb-10 last:pb-0">
            <span
              className={`absolute -left-[37px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border-strong bg-background`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  p.live ? "bg-emerald shadow-[0_0_10px_var(--emerald)] pulse-dot" : "bg-subtle"
                }`}
              />
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.16em] text-subtle">{p.tag}</span>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                  p.live
                    ? "border-[color-mix(in_oklab,var(--emerald)_35%,transparent)] text-emerald"
                    : "border-border text-subtle"
                }`}
              >
                {p.status}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-medium tracking-tight">{p.title}</h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
