import { useState } from "react";
import { FileText } from "lucide-react";

const verdictOptions = [
  "Pending Review",
  "Approved",
  "Requires Further Scan",
  "Discharged",
];

function ReportForm({ scan, onSubmit, isLoading }) {
  const [doctorNotes, setDoctorNotes] = useState("");
  const [finalVerdict, setFinalVerdict] = useState("Pending Review");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      scanId: scan._id,
      doctorNotes,
      finalVerdict,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-500/10 p-3">
            <FileText size={20} className="text-orange-400" />
          </div>

          <div>
            <h2 className="font-semibold text-white">Report Information</h2>

            <p className="text-sm text-neutral-500">
              Review the AI analysis before generating the diagnostic report.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-neutral-500">Scan Type</p>

            <p className="mt-1 text-white">{scan.scanType}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-neutral-500">Body Part</p>

            <p className="mt-1 text-white">{scan.bodyPart || "General"}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-neutral-500">Patient</p>

            <p className="mt-1 text-white">
              {scan.patientId?.name || "No patient"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-neutral-500">AI Severity</p>

            <p className="mt-1 text-orange-400">
              {scan.analysis?.severityLevel || "Not available"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
        <h2 className="font-semibold text-white">AI Findings</h2>

        <p className="mt-4 text-sm leading-6 text-neutral-400">
          {scan.analysis?.overallFindings || "No AI findings available."}
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
        <label className="block text-sm font-medium text-neutral-300">
          Doctor Notes
        </label>

        <textarea
          value={doctorNotes}
          onChange={(event) => setDoctorNotes(event.target.value)}
          rows={6}
          placeholder="Enter your clinical observations and notes..."
          className="mt-3 w-full resize-none rounded-xl border border-neutral-800 bg-[#0b0908] p-4 text-sm text-white outline-none placeholder:text-neutral-600 transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
        />

        <label className="mt-5 block text-sm font-medium text-neutral-300">
          Final Verdict
        </label>

        <select
          value={finalVerdict}
          onChange={(event) => setFinalVerdict(event.target.value)}
          className="mt-3 w-full rounded-xl border border-neutral-800 bg-[#0b0908] p-3 text-sm text-white outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
        >
          {verdictOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full rounded-xl bg-orange-500 px-4 py-3 font-medium text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Generating Report..." : "Generate Report"}
        </button>
      </div>
    </form>
  );
}

export default ReportForm;
