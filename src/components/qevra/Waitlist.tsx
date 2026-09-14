import { Ticket } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const platforms = ["Windows Power User", "macOS", "Linux"];

export function Waitlist() {
  const [position, setPosition] = useState<number | null>(null);
  const [picked, setPicked] = useState<string[]>(["Windows Power User"]);
  const [name, setName] = useState("");

  const toggle = (p: string) =>
    setPicked((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pos = 148 + Math.floor(Math.random() * 6);
    setPosition(pos);
    toast.success("You're on the list!", { description: `Priority access secured — position #${pos}.` });
  };

  return (
    <section id="waitlist" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
      <div className="rounded-2xl surface-raised p-8 glow-ring">
        <p className="font-mono text-[11px] tracking-[0.2em] text-subtle">EARLY ACCESS</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
          Join the QEVRA Pro &amp; Mac beta waitlist
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Offline on-device models, team dictionaries and macOS builds roll out to the list first.
        </p>

        {position === null ? (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs text-subtle">Name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="mt-1.5 w-full rounded-lg border border-input bg-canvas px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-subtle/70 focus:border-[color-mix(in_oklab,var(--cyan)_50%,transparent)]"
                />
              </label>
              <label className="block">
                <span className="text-xs text-subtle">Email</span>
                <input
                  required
                  type="email"
                  placeholder="you@company.com"
                  className="mt-1.5 w-full rounded-lg border border-input bg-canvas px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-subtle/70 focus:border-[color-mix(in_oklab,var(--cyan)_50%,transparent)]"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs text-subtle">Primary use case</span>
              <select
                className="mt-1.5 w-full rounded-lg border border-input bg-canvas px-3 py-2.5 text-sm outline-none focus:border-[color-mix(in_oklab,var(--cyan)_50%,transparent)]"
                defaultValue="Developer / Engineer"
              >
                {["Developer / Engineer", "Writer / Creator", "Founder / Exec", "Customer Support", "Other"].map(
                  (o) => (
                    <option key={o} value={o} className="bg-canvas">
                      {o}
                    </option>
                  ),
                )}
              </select>
            </label>

            <div>
              <span className="text-xs text-subtle">Platform interest</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => toggle(p)}
                    className={`rounded-lg border px-3 py-2 text-xs transition-colors ${
                      picked.includes(p)
                        ? "border-[color-mix(in_oklab,var(--emerald)_45%,transparent)] text-emerald"
                        : "border-border text-subtle hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Priority Access
            </button>
          </form>
        ) : (
          <div className="rise mt-8 rounded-xl border border-[color-mix(in_oklab,var(--emerald)_30%,transparent)] bg-canvas p-6">
            <div className="flex items-center gap-3">
              <Ticket className="h-5 w-5 text-emerald" />
              <div>
                <p className="text-sm font-medium">You&apos;re on the list{name ? `, ${name.split(" ")[0]}` : ""}!</p>
                <p className="font-mono text-[11px] text-subtle">QEVRA PRO · EARLY ACCESS TICKET</p>
              </div>
            </div>
            <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
              <span className="text-xs text-subtle">Current waitlist position</span>
              <span className="font-mono text-3xl font-semibold text-emerald">#{position}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
