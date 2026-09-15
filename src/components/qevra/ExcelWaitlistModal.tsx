import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Search,
  X,
  Trash2,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Table as TableIcon
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { ShinyText, CountUp } from "@/components/reactbits";

export interface WaitlistSubmission {
  id: string;
  name: string;
  email: string;
  useCase: string;
  platforms: string[];
  hardware?: string;
  timestamp: string;
  position: number;
  status?: string;
}

interface ExcelWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: WaitlistSubmission[];
  onAddDemo: () => void;
  onClear: () => void;
}

export function ExcelWaitlistModal({
  isOpen,
  onClose,
  submissions,
  onAddDemo,
  onClear,
}: ExcelWaitlistModalProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [copied, setCopied] = useState(false);

  // Filtered submissions
  const filtered = useMemo(() => {
    return submissions.filter((sub) => {
      const matchRole = roleFilter === "All" || sub.useCase === roleFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        sub.name.toLowerCase().includes(q) ||
        sub.email.toLowerCase().includes(q) ||
        sub.useCase.toLowerCase().includes(q) ||
        sub.platforms.some((p) => p.toLowerCase().includes(q)) ||
        (sub.hardware && sub.hardware.toLowerCase().includes(q));
      return matchRole && matchSearch;
    });
  }, [submissions, search, roleFilter]);

  // Export to actual Excel CSV
  const handleExportCSV = () => {
    if (submissions.length === 0) {
      toast.error("No waitlist submissions to export.");
      return;
    }

    const headers = [
      "Ticket ID",
      "Timestamp",
      "Full Name",
      "Email Address",
      "Role / Use Case",
      "Target Platforms",
      "Hardware / GPU",
      "Status",
    ];

    const rows = submissions.map((s) => [
      `"#${s.position}"`,
      `"${s.timestamp}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.useCase.replace(/"/g, '""')}"`,
      `"${s.platforms.join("; ").replace(/"/g, '""')}"`,
      `"${(s.hardware || "Unspecified").replace(/"/g, '""')}"`,
      `"${s.status || "Priority Confirmed"}"`,
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `QEVRA_Waitlist_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Excel Spreadsheet exported successfully!", {
      description: `Downloaded ${submissions.length} rows as CSV.`,
    });
  };

  // Copy CSV data to clipboard
  const handleCopyCSV = () => {
    if (submissions.length === 0) return;
    const headers = ["Ticket", "Date", "Name", "Email", "Role", "Platforms", "Hardware", "Status"];
    const rows = submissions.map((s) =>
      [
        `#${s.position}`,
        s.timestamp,
        s.name,
        s.email,
        s.useCase,
        s.platforms.join("; "),
        s.hardware || "Auto",
        s.status || "Confirmed",
      ].join("\t"),
    );

    const tsv = [headers.join("\t"), ...rows].join("\n");
    void navigator.clipboard.writeText(tsv);
    setCopied(true);
    toast.success("Table copied to clipboard (Tab-delimited for Excel paste)");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col rounded-2xl border border-white/15 bg-[#0b0d13] text-foreground shadow-2xl overflow-hidden font-sans">
        {/* Excel Title Bar */}
        <div className="flex items-center justify-between border-b border-border/80 bg-[#0e1017] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#107c41]/20 border border-[#107c41]/40 text-[#107c41]">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  QEVRA_Waitlist_Submissions.xlsx
                </span>
                <span className="rounded-md border border-[#107c41]/30 bg-[#107c41]/10 px-2 py-0.5 font-mono text-[10px] text-[#107c41] font-semibold">
                  EXCEL TABLE
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono">
                Live Submissions Database · {submissions.length} Total Records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 rounded-lg border border-emerald/40 bg-emerald/10 px-3 py-1.5 text-xs font-semibold text-emerald transition-all hover:bg-emerald/20 hover:border-emerald active:scale-[0.98]"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export to Excel (.csv)</span>
              <span className="sm:hidden">Export</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-canvas"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Excel Filter & Search Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-[#0c0e14] px-4 py-2.5 sm:px-6 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads..."
                className="h-8 w-44 sm:w-60 rounded-lg border border-border bg-background/80 pl-8 pr-3 text-xs text-foreground outline-none transition-all placeholder:text-zinc-600 focus:border-cyan focus:ring-1 focus:ring-cyan"
              />
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-8 rounded-lg border border-border bg-background/80 px-2.5 text-xs text-foreground outline-none focus:border-cyan"
              >
                <option value="All">All Roles</option>
                <option value="Developer / Engineer">Developers</option>
                <option value="Writer / Creator">Writers</option>
                <option value="Founder / Exec">Founders</option>
                <option value="Customer Support">Support</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCSV}
              className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-canvas transition-colors"
              title="Copy table data to paste directly into Excel or Sheets"
            >
              {copied ? <Check className="h-3 w-3 text-emerald" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy TSV"}</span>
            </button>

            <button
              onClick={onAddDemo}
              className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-cyan hover:border-cyan/40 transition-colors"
              title="Generate a sample test lead"
            >
              <Plus className="h-3 w-3" />
              <span>Sample Lead</span>
            </button>

            {submissions.length > 0 && (
              <button
                onClick={onClear}
                className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-red-400 hover:border-red-400/40 transition-colors"
                title="Clear all stored waitlist entries"
              >
                <Trash2 className="h-3 w-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Excel Spreadsheet Table Body */}
        <div className="flex-1 overflow-auto bg-[#07080c]">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/40 border border-border">
                <TableIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="mt-3 text-sm font-semibold text-foreground">No submissions found</h4>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                {search || roleFilter !== "All"
                  ? "Try adjusting your search query or role filter."
                  : "Submit the waitlist form on the website to see your entries populate this Excel spreadsheet in real time."}
              </p>
              <button
                onClick={onAddDemo}
                className="mt-4 flex items-center gap-1.5 rounded-lg border border-cyan/30 bg-cyan/10 px-3.5 py-1.5 text-xs font-medium text-cyan hover:bg-cyan/20 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Generate Demo Submission</span>
              </button>
            </div>
          ) : (
            <table className="w-full border-collapse text-left font-mono text-[11px]">
              <thead>
                <tr className="sticky top-0 z-10 border-b border-border bg-[#0d1017] text-muted-foreground">
                  <th className="w-10 border-r border-border/60 px-2.5 py-2 text-center text-[10px] text-zinc-500 font-normal">
                    #
                  </th>
                  <th className="border-r border-border/60 px-3.5 py-2 font-medium text-zinc-400">
                    A · Ticket
                  </th>
                  <th className="border-r border-border/60 px-3.5 py-2 font-medium text-zinc-400">
                    B · Timestamp
                  </th>
                  <th className="border-r border-border/60 px-3.5 py-2 font-medium text-zinc-400">
                    C · Full Name
                  </th>
                  <th className="border-r border-border/60 px-3.5 py-2 font-medium text-zinc-400">
                    D · Email Address
                  </th>
                  <th className="border-r border-border/60 px-3.5 py-2 font-medium text-zinc-400">
                    E · Role / Use Case
                  </th>
                  <th className="border-r border-border/60 px-3.5 py-2 font-medium text-zinc-400">
                    F · Platforms
                  </th>
                  <th className="border-r border-border/60 px-3.5 py-2 font-medium text-zinc-400">
                    G · Hardware Spec
                  </th>
                  <th className="px-3.5 py-2 font-medium text-zinc-400">
                    H · Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="group transition-colors hover:bg-white/[0.03] active:bg-white/[0.05]"
                  >
                    <td className="border-r border-border/40 bg-[#090b10] px-2.5 py-2 text-center text-[10px] text-zinc-600 group-hover:text-zinc-400 select-none">
                      {idx + 1}
                    </td>
                    <td className="border-r border-border/40 px-3.5 py-2 font-semibold text-emerald">
                      #{row.position}
                    </td>
                    <td className="border-r border-border/40 px-3.5 py-2 text-zinc-400 whitespace-nowrap text-[10px]">
                      {row.timestamp}
                    </td>
                    <td className="border-r border-border/40 px-3.5 py-2 font-sans font-medium text-foreground whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="border-r border-border/40 px-3.5 py-2 text-cyan whitespace-nowrap">
                      {row.email}
                    </td>
                    <td className="border-r border-border/40 px-3.5 py-2 font-sans text-zinc-300 whitespace-nowrap">
                      <span className="rounded bg-white/[0.04] px-1.5 py-0.5 border border-white/5">
                        {row.useCase}
                      </span>
                    </td>
                    <td className="border-r border-border/40 px-3.5 py-2 text-zinc-400 whitespace-nowrap">
                      {row.platforms.join(", ")}
                    </td>
                    <td className="border-r border-border/40 px-3.5 py-2 text-zinc-400 whitespace-nowrap">
                      {row.hardware || "NVIDIA / Intel PC"}
                    </td>
                    <td className="px-3.5 py-2 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald/30 bg-emerald/10 px-2 py-0.5 text-[9px] font-semibold text-emerald">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                        {row.status || "Priority Access"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Excel Bottom Sheet Tab Bar */}
        <div className="flex items-center justify-between border-t border-border/80 bg-[#0e1017] px-4 py-2 sm:px-6 text-[11px] text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-t border-t-2 border-t-[#107c41] bg-[#1a1f2c] px-3 py-1 text-foreground font-semibold">
              <FileSpreadsheet className="h-3 w-3 text-[#107c41]" />
              <span>Sheet1 (Waitlist Leads)</span>
            </div>
            <span className="text-[10px] text-zinc-500 hidden sm:inline">| Ready</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            <div>
              <span>Displaying </span>
              <strong className="text-foreground">{filtered.length}</strong> of{" "}
              <strong className="text-foreground">{submissions.length}</strong> rows
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExcelWaitlistModal;
