import { FileText, Download, ArrowLeft } from "lucide-react";

function ReportHeader({ report, onBack, onDownload }) {
  const scan = report?.scanId;
  const patient = scan?.patientId;

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-neutral-800 p-2 text-neutral-300 transition hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <FileText size={22} className="text-orange-400" />

            <h1 className="text-2xl font-bold text-white">Diagnostic Report</h1>
          </div>

          <p className="mt-1 text-sm text-neutral-400">
            {patient?.name || "Unknown Patient"} ·{" "}
            {scan?.scanType || "Medical Scan"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onDownload}
        className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-medium text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400"
      >
        <Download size={18} />
        Download PDF
      </button>
    </div>
  );
}

export default ReportHeader;
