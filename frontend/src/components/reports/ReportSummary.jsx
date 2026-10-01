import { User, ScanLine, Calendar, ShieldCheck } from "lucide-react";

function ReportSummary({ report }) {
  const scan = report?.scanId;
  const patient = scan?.patientId;

  const severity = scan?.analysis?.severityLevel || "Unknown";

  const severityClass = {
    Invalid: "bg-red-500/10 text-red-400 border-red-500/20",
    Normal: "bg-green-500/10 text-green-400 border-green-500/20",
    Low: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Moderate: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    High: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/20">
        <User size={20} className="mb-3 text-orange-400" />

        <p className="text-sm text-neutral-500">Patient</p>

        <p className="mt-1 font-semibold text-white">
          {patient?.name || "Unknown"}
        </p>

        <p className="mt-1 text-sm text-neutral-400">
          {patient?.age ? `${patient.age} years` : ""}
          {patient?.gender ? ` · ${patient.gender}` : ""}
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/20">
        <ScanLine size={20} className="mb-3 text-orange-400" />

        <p className="text-sm text-neutral-500">Scan</p>

        <p className="mt-1 font-semibold text-white">
          {scan?.scanType || "Unknown"}
        </p>

        <p className="mt-1 text-sm text-neutral-400">
          {scan?.bodyPart || "General"}
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/20">
        <Calendar size={20} className="mb-3 text-orange-400" />

        <p className="text-sm text-neutral-500">Generated</p>

        <p className="mt-1 font-semibold text-white">
          {report?.createdAt
            ? new Date(report.createdAt).toLocaleDateString("en-IN")
            : "Unknown"}
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/20">
        <ShieldCheck size={20} className="mb-3 text-orange-400" />

        <p className="text-sm text-neutral-500">AI Severity</p>

        <span
          className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-medium ${
            severityClass[severity] ||
            "border-neutral-700 bg-neutral-800 text-neutral-300"
          }`}
        >
          {severity}
        </span>
      </div>
    </div>
  );
}

export default ReportSummary;
