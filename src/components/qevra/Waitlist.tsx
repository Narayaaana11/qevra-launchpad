import { Ticket, ArrowRight, Check } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";
import {
  BorderGlow,
  StarBorder,
  Magnet,
  ShinyText,
  CountUp
} from "@/components/reactbits";

const PLATFORMS = ["Windows Power User", "macOS", "Linux"];
const STORAGE_KEY = "qevra_waitlist_entry";

interface WaitlistData {
  name: string;
  email: string;
  useCase: string;
  platforms: string[];
  position: number;
}

export function Waitlist() {
  const [data, setData] = useState<WaitlistData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("Developer / Engineer");
  const [pickedPlatforms, setPickedPlatforms] = useState<string[]>(["Windows Power User"]);

  // Restore stored submission if user already joined
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const togglePlatform = (p: string) => {
    setPickedPlatforms((cur) =>
      cur.includes(p) ? (cur.length > 1 ? cur.filter((x) => x !== p) : cur) : [...cur, p],
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please provide a valid work or personal email.");
      return;
    }

    const calculatedPos = 148 + Math.floor(Math.random() * 8);
    const entry: WaitlistData = {
      name: name.trim() || "Builder",
      email: email.trim(),
      useCase,
      platforms: pickedPlatforms,
      position: calculatedPos,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    } catch {
      // ignore
    }

    setData(entry);
    toast.success("You're on the priority list!", {
      description: `Waitlist ticket #${calculatedPos} confirmed. Watch your inbox.`,
    });
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setData(null);
    setName("");
    setEmail("");
  };

  return (
    <section id="waitlist" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
      <BorderGlow
        borderRadius={24}
        glowColor="190 85 65"
        glowRadius={35}
        glowIntensity={0.8}
        colors={["#38bdf8", "#10b981", "#a855f7"]}
        className="w-full"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#11131a] to-[#090a0f] p-8 sm:p-10 backdrop-blur-xl">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald/10 blur-3xl" />

          <div className="relative">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
              PRIORITY ACCESS
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl">
              Join the QEVRA Pro &amp; Mac Beta Waitlist
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Be the first to access on-device offline Whisper models, team custom dictionaries, and
              cross-platform companion releases.
            </p>

            {data === null ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium text-zinc-300">Your Name</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ada Lovelace"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-zinc-600 focus:border-cyan focus:ring-1 focus:ring-cyan"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium text-zinc-300">Work or Personal Email</span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ada@company.com"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-zinc-600 focus:border-cyan focus:ring-1 focus:ring-cyan"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-medium text-zinc-300">Primary Use Case</span>
                  <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all focus:border-cyan focus:ring-1 focus:ring-cyan"
                  >
                    {[
                      "Developer / Engineer",
                      "Writer / Creator",
                      "Founder / Exec",
                      "Customer Support",
                      "Other",
                    ].map((o) => (
                      <option key={o} value={o} className="bg-[#0e1017]">
                        {o}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <span className="text-xs font-medium text-zinc-300">Platform Interest</span>
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    {PLATFORMS.map((p) => {
                      const isSelected = pickedPlatforms.includes(p);
                      return (
                        <button
                          type="button"
                          key={p}
                          onClick={() => togglePlatform(p)}
                          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                            isSelected
                              ? "border-emerald/40 bg-emerald/10 text-emerald shadow-sm"
                              : "border-border bg-background/60 text-muted-foreground hover:border-border-strong hover:text-foreground"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                          <span>{p}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <Magnet padding={40} magnetStrength={3} wrapperClassName="w-full">
                    <StarBorder
                      as="button"
                      type="submit"
                      color="#38bdf8"
                      speed="3.5s"
                      thickness={1.5}
                      backgroundColor="#ffffff"
                      textColor="#000000"
                      className="w-full text-sm font-semibold shadow-[0_0_25px_-5px_rgba(255,255,255,0.4)] transition-all hover:opacity-95 active:scale-[0.99]"
                    >
                      <div className="flex items-center justify-center gap-2 py-3 px-5 text-zinc-950 font-semibold">
                        <span>Get Priority Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </StarBorder>
                  </Magnet>
                </div>
              </form>
            ) : (
              <div className="mt-8 rounded-2xl border border-emerald/30 bg-background/90 p-6 shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                      <Ticket className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        You&apos;re on the list, {data.name.split(" ")[0]}!
                      </h3>
                      <ShinyText
                        text="QEVRA PRO PRIORITY PASS"
                        speed={2}
                        color="#10b981"
                        shineColor="#ffffff"
                        className="font-mono text-[11px] font-semibold"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs text-muted-foreground hover:text-foreground underline font-mono"
                  >
                    Edit details
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/80 pt-5">
                  <div>
                    <span className="text-xs text-muted-foreground">Registered Email</span>
                    <p className="mt-0.5 font-mono text-xs text-foreground truncate">{data.email}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Target Platforms</span>
                    <p className="mt-0.5 text-xs text-foreground">{data.platforms.join(", ")}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-emerald/20 bg-emerald/5 p-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-emerald font-semibold uppercase tracking-wider">
                      Confirmed Waitlist Position
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Batched invite invitations starting this week
                    </span>
                  </div>
                  <div className="flex items-baseline font-mono text-3xl font-bold text-emerald">
                    <span>#</span>
                    <CountUp to={data.position} duration={1.5} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </BorderGlow>
    </section>
  );
}

export default Waitlist;
