import { Ticket, ArrowRight, Check, FileSpreadsheet, Eye, Sparkles } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";
import {
  BorderGlow,
  StarBorder,
  Magnet,
  ShinyText,
  CountUp
} from "@/components/reactbits";
import {
  ExcelWaitlistModal,
  type WaitlistSubmission,
} from "./ExcelWaitlistModal";

const PLATFORMS = ["Windows Power User", "macOS", "Linux"];
const STORAGE_KEY = "qevra_waitlist_entry";
const ALL_SUBMISSIONS_KEY = "qevra_waitlist_all_submissions";

const HARDWARE_OPTIONS = [
  "NVIDIA RTX 30/40 Series (CUDA)",
  "Apple M-Series Silicon (Metal)",
  "Intel Core Ultra / NPU",
  "AMD Ryzen AI",
  "Standard CPU (AVX2)",
];

const INITIAL_SEEDED_LEADS: WaitlistSubmission[] = [
  {
    id: "lead-1",
    name: "Dr. Aris Thorne",
    email: "aris.thorne@deepquantum.io",
    useCase: "Developer / Engineer",
    platforms: ["Windows Power User", "Linux"],
    hardware: "NVIDIA RTX 4090 (24GB VRAM)",
    timestamp: "2026-09-14 18:24:10",
    position: 142,
    status: "Priority Confirmed",
  },
  {
    id: "lead-2",
    name: "Elena Rostova",
    email: "elena@synthesislab.ai",
    useCase: "Writer / Creator",
    platforms: ["macOS", "Windows Power User"],
    hardware: "Apple M3 Max (36GB)",
    timestamp: "2026-09-14 20:11:45",
    position: 143,
    status: "Priority Confirmed",
  },
  {
    id: "lead-3",
    name: "Marcus Vance",
    email: "mvance@hyperion-terminal.com",
    useCase: "Founder / Exec",
    platforms: ["Windows Power User"],
    hardware: "NVIDIA RTX 4080 Mobile",
    timestamp: "2026-09-15 01:05:22",
    position: 144,
    status: "Priority Confirmed",
  },
  {
    id: "lead-4",
    name: "Kavya Nair",
    email: "kavya@kernelcraft.dev",
    useCase: "Developer / Engineer",
    platforms: ["Windows Power User", "Linux"],
    hardware: "AMD Ryzen 9 + RTX 4070 Ti",
    timestamp: "2026-09-15 04:30:18",
    position: 145,
    status: "Priority Confirmed",
  },
  {
    id: "lead-5",
    name: "Devon Park",
    email: "devon@velocitysupport.co",
    useCase: "Customer Support",
    platforms: ["Windows Power User"],
    hardware: "Intel Core Ultra 7 155H",
    timestamp: "2026-09-15 08:14:02",
    position: 146,
    status: "Priority Confirmed",
  },
];

interface WaitlistData {
  name: string;
  email: string;
  useCase: string;
  platforms: string[];
  hardware: string;
  position: number;
}

export function Waitlist() {
  const [data, setData] = useState<WaitlistData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("Developer / Engineer");
  const [hardware, setHardware] = useState(HARDWARE_OPTIONS[0]);
  const [pickedPlatforms, setPickedPlatforms] = useState<string[]>(["Windows Power User"]);
  const [isExcelOpen, setIsExcelOpen] = useState(false);
  const [allSubmissions, setAllSubmissions] = useState<WaitlistSubmission[]>([]);

  // Restore stored submission and all submissions
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setData(JSON.parse(stored));
      }

      const storedAll = localStorage.getItem(ALL_SUBMISSIONS_KEY);
      if (storedAll) {
        const parsed = JSON.parse(storedAll);
        setAllSubmissions(Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SEEDED_LEADS);
      } else {
        setAllSubmissions(INITIAL_SEEDED_LEADS);
        localStorage.setItem(ALL_SUBMISSIONS_KEY, JSON.stringify(INITIAL_SEEDED_LEADS));
      }
    } catch {
      setAllSubmissions(INITIAL_SEEDED_LEADS);
    }
  }, []);

  const togglePlatform = (p: string) => {
    setPickedPlatforms((cur) =>
      cur.includes(p) ? (cur.length > 1 ? cur.filter((x) => x !== p) : cur) : [...cur, p],
    );
  };

  const saveSubmissions = (newSubs: WaitlistSubmission[]) => {
    setAllSubmissions(newSubs);
    try {
      localStorage.setItem(ALL_SUBMISSIONS_KEY, JSON.stringify(newSubs));
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please provide a valid work or personal email.");
      return;
    }

    const calculatedPos = 147 + allSubmissions.length;
    const now = new Date();
    const timestamp = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 8)}`;

    const newSubmission: WaitlistSubmission = {
      id: `lead-${Date.now()}`,
      name: name.trim() || "Builder",
      email: email.trim(),
      useCase,
      platforms: pickedPlatforms,
      hardware,
      timestamp,
      position: calculatedPos,
      status: "Priority Confirmed",
    };

    const updated = [newSubmission, ...allSubmissions.filter((s) => s.email.toLowerCase() !== newSubmission.email.toLowerCase())];
    saveSubmissions(updated);

    const entry: WaitlistData = {
      name: newSubmission.name,
      email: newSubmission.email,
      useCase: newSubmission.useCase,
      platforms: newSubmission.platforms,
      hardware: newSubmission.hardware || hardware,
      position: calculatedPos,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    } catch {
      // ignore
    }

    setData(entry);
    toast.success("You're on the priority list!", {
      description: `Waitlist ticket #${calculatedPos} recorded into Excel Database. Click 'View in Excel' to inspect!`,
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

  const handleAddSampleDemo = () => {
    const sampleNames = ["Liam Vance", "Nadia Sterling", "Rohan Mehta", "Zoe Takahashi", "Alexandre Moreau"];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomDomain = ["nexus.tech", "quantumflow.dev", "synthetix.org", "deepcode.ai"][Math.floor(Math.random() * 4)];
    const randomEmail = `${randomName.toLowerCase().replace(" ", ".")}@${randomDomain}`;
    const nextPos = 147 + allSubmissions.length + 1;
    const now = new Date();

    const demo: WaitlistSubmission = {
      id: `lead-demo-${Date.now()}`,
      name: randomName,
      email: randomEmail,
      useCase: ["Developer / Engineer", "Founder / Exec", "Writer / Creator"][Math.floor(Math.random() * 3)],
      platforms: ["Windows Power User", "macOS"],
      hardware: HARDWARE_OPTIONS[Math.floor(Math.random() * HARDWARE_OPTIONS.length)],
      timestamp: `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 8)}`,
      position: nextPos,
      status: "Priority Confirmed",
    };

    saveSubmissions([demo, ...allSubmissions]);
    toast.success(`Generated sample lead for ${randomName} (#${nextPos})`);
  };

  const handleClearAll = () => {
    saveSubmissions([]);
    toast.success("Excel waitlist database cleared.");
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                  PRIORITY ACCESS
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl">
                  Join the QEVRA Pro &amp; Mac Beta Waitlist
                </h2>
              </div>

              {/* View in Excel Trigger Button */}
              <button
                type="button"
                onClick={() => setIsExcelOpen(true)}
                className="group flex items-center gap-2 rounded-xl border border-[#107c41]/40 bg-[#107c41]/10 px-3.5 py-2 text-xs font-semibold text-[#107c41] transition-all hover:bg-[#107c41]/20 hover:border-[#107c41] active:scale-[0.98] shadow-sm"
                title="Open live spreadsheet view of all submissions"
              >
                <FileSpreadsheet className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>View Database in Excel ({allSubmissions.length})</span>
              </button>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Be the first to access on-device offline Whisper models, team custom dictionaries, and
              cross-platform companion releases. All submissions are indexed into an Excel-ready database.
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium text-zinc-300">Primary Role / Use Case</span>
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

                  <label className="block">
                    <span className="text-xs font-medium text-zinc-300">Target GPU / Architecture</span>
                    <select
                      value={hardware}
                      onChange={(e) => setHardware(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all focus:border-cyan focus:ring-1 focus:ring-cyan"
                    >
                      {HARDWARE_OPTIONS.map((h) => (
                        <option key={h} value={h} className="bg-[#0e1017]">
                          {h}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

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
                        <span>Get Priority Access &amp; Save to Excel</span>
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

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border/80 pt-5">
                  <div>
                    <span className="text-xs text-muted-foreground">Registered Email</span>
                    <p className="mt-0.5 font-mono text-xs text-foreground truncate">{data.email}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Target Platforms</span>
                    <p className="mt-0.5 text-xs text-foreground">{data.platforms.join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Hardware Target</span>
                    <p className="mt-0.5 text-xs text-foreground truncate">{data.hardware || "NVIDIA / Intel"}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-emerald/20 bg-emerald/5 p-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-emerald font-semibold uppercase tracking-wider">
                      Confirmed Waitlist Position
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Stored in live Excel database · invites batch weekly
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setIsExcelOpen(true)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#107c41]/40 bg-[#107c41]/10 px-3 py-1.5 text-xs font-semibold text-[#107c41] transition-all hover:bg-[#107c41]/20"
                    >
                      <FileSpreadsheet className="h-3.5 w-3.5" />
                      <span>View in Excel</span>
                    </button>
                    <div className="flex items-baseline font-mono text-3xl font-bold text-emerald">
                      <span>#</span>
                      <CountUp to={data.position} duration={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </BorderGlow>

      {/* Full-featured Excel spreadsheet viewer modal */}
      <ExcelWaitlistModal
        isOpen={isExcelOpen}
        onClose={() => setIsExcelOpen(false)}
        submissions={allSubmissions}
        onAddDemo={handleAddSampleDemo}
        onClear={handleClearAll}
      />
    </section>
  );
}

export default Waitlist;
