import { ArrowLeft, Calendar, Download, Trash2 } from "lucide-react";

const verdictStyles = {
  "Pending Review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Approved: "bg-green-500/10 text-green-400 border-green-500/20",
  "Requires Further Scan": "bg-red-500/10 text-red-400 border-red-500/20",
  Discharged: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

function ReportDetailsView({ report, onBack, onDelete, onDownload }) {
  if (!report) {
    return null;
  }

  const scan = report.scanId;
  const patient = scan?.patientId;
  const analysis = scan?.analysis;

  const verdict = report.finalVerdict || "Pending Review";

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-orange-400"
      >
        <ArrowLeft size={17} />
        Back to Reports
      </button>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Diagnostic Report</h1>

          <p className="mt-1 text-sm text-neutral-500">
            {scan?.scanType || "Medical Scan"} · {scan?.bodyPart || "General"}
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-4 py-2 text-sm ${
            verdictStyles[verdict] || verdictStyles["Pending Review"]
          }`}
        >
          {verdict}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
          <h2 className="text-lg font-semibold text-white">
            Patient Information
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs uppercase text-neutral-500">Name</p>

              <p className="mt-1 text-white">{patient?.name || "No patient"}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-neutral-500">Age</p>

              <p className="mt-1 text-white">{patient?.age ?? "N/A"}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-neutral-500">Gender</p>

              <p className="mt-1 text-white">{patient?.gender || "N/A"}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-neutral-500">Contact</p>

              <p className="mt-1 text-white">
                {patient?.contactNumber || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
          <h2 className="text-lg font-semibold text-white">Scan Information</h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs uppercase text-neutral-500">Scan Type</p>

              <p className="mt-1 text-white">{scan?.scanType || "N/A"}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-neutral-500">Body Part</p>

              <p className="mt-1 text-white">{scan?.bodyPart || "General"}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-neutral-500">
                Report Created
              </p>

              <div className="mt-1 flex items-center gap-2 text-sm text-neutral-300">
                <Calendar size={15} className="text-orange-400" />

                {new Date(report.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
        <h2 className="text-lg font-semibold text-white">AI Analysis</h2>

        <p className="mt-4 text-sm leading-7 text-neutral-400">
          {analysis?.overallFindings || "No findings available."}
        </p>

        <div className="mt-5">
          <p className="text-xs uppercase text-neutral-500">Severity</p>

          <p className="mt-1 font-medium text-orange-400">
            {analysis?.severityLevel || "Not available"}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
        <h2 className="text-lg font-semibold text-white">Detected Regions</h2>

        {!analysis?.detectedRegions?.length ? (
          <p className="mt-4 text-sm text-neutral-500">No detected regions.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {analysis.detectedRegions.map((region) => (
              <div
                key={region._id}
                className="rounded-xl border border-neutral-800 bg-[#0b0908] p-4"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">{region.label}</p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {region.category}
                    </p>
                  </div>

                  <span className="text-sm text-orange-400">
                    {Math.round((region.confidenceScore || 0) * 100)}%
                  </span>
                </div>

                {region.clinicalNote && (
                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                    {region.clinicalNote}
                  </p>
                )}

                {region.isDoctorVerified && (
                  <p className="mt-3 text-xs font-medium text-orange-400">
                    Doctor Verified
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
        <h2 className="text-lg font-semibold text-white">Doctor Notes</h2>

        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-neutral-400">
          {report.doctorNotes || "No doctor notes added."}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400"
        >
          <Download size={17} />
          Download PDF
        </button>

        <button
          type="button"
          onClick={() => onDelete(report._id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
        >
          <Trash2 size={17} />
          Delete Report
        </button>
      </div>
    </div>
  );
}

export default ReportDetailsView;
