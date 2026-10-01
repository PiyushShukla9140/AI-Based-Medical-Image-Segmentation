import { FileText } from "lucide-react";

function ReportFindings({ report }) {
  const scan = report?.scanId;
  const analysis = scan?.analysis;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
      <div className="mb-5 flex items-center gap-3">
        <FileText size={20} className="text-orange-400" />

        <div>
          <h2 className="font-semibold text-white">AI Findings</h2>

          <p className="text-sm text-neutral-500">
            Gemini-assisted medical image analysis
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-[#0b0908] p-5">
        <p className="whitespace-pre-wrap leading-7 text-neutral-300">
          {analysis?.overallFindings || "No AI findings available."}
        </p>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-medium text-neutral-400">
          Final Verdict
        </p>

        <div className="rounded-xl border border-neutral-800 bg-[#0b0908] p-4 text-white">
          {report?.finalVerdict || "Pending Review"}
        </div>
      </div>

      {report?.doctorNotes && (
        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-neutral-400">
            Doctor Notes
          </p>

          <div className="whitespace-pre-wrap rounded-xl border border-neutral-800 bg-[#0b0908] p-4 text-neutral-300">
            {report.doctorNotes}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportFindings;
