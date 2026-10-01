import { Calendar, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const verdictStyles = {
  "Pending Review": "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  Approved: "border-green-500/30 bg-green-500/10 text-green-400",
  "Requires Further Scan": "border-red-500/30 bg-red-500/10 text-red-400",
  Discharged: "border-orange-500/30 bg-orange-500/10 text-orange-400",
};

function ReportCard({ report }) {
  const navigate = useNavigate();

  const scan =
    report?.scanId && typeof report.scanId === "object" ? report.scanId : null;

  const patient =
    scan?.patientId && typeof scan.patientId === "object"
      ? scan.patientId
      : null;

  const verdict = report?.finalVerdict || "Pending Review";

  const createdDate = report?.createdAt
    ? new Date(report.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="w-full rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-500/10 p-3">
            <FileText size={22} className="text-orange-400" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {scan?.scanType || "Medical Scan"}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              {scan?.bodyPart || "General"}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            verdictStyles[verdict] || verdictStyles["Pending Review"]
          }`}
        >
          {verdict}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-[#0b0908] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Patient
          </p>

          <p className="mt-2 text-sm font-medium text-white">
            {patient?.name || "No patient"}
          </p>
        </div>

        <div className="rounded-xl bg-[#0b0908] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Created
          </p>

          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-300">
            <Calendar size={15} className="text-orange-400" />
            {createdDate}
          </div>
        </div>
      </div>

      {report?.doctorNotes && (
        <div className="mt-4 rounded-xl bg-[#0b0908] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Doctor Notes
          </p>

          <p className="mt-2 text-sm text-neutral-300">{report.doctorNotes}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate(`/reports/${report._id}`)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400"
      >
        View Report
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

export default ReportCard;
