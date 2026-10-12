import { useEffect } from "react";
import { FileText, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReportCard from "../components/reports/ReportCard";
import useReportStore from "../stores/reportStore";

function Reports() {
  const navigate = useNavigate();

  const reports = useReportStore((state) => state.reports);
  const isLoading = useReportStore((state) => state.isLoading);
  const error = useReportStore((state) => state.error);
  const fetchReports = useReportStore((state) => state.fetchReports);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="min-h-full space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Diagnostic Reports</h1>

          <p className="mt-1 text-sm text-neutral-500">
            Manage AI-assisted diagnostic reports.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/scans")}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400"
        >
          <Plus size={17} />
          Create From Scan
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-neutral-800 bg-[#100d0b]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-orange-500 shadow-lg shadow-orange-500/20" />
        </div>
      ) : reports.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-10 text-center shadow-lg shadow-black/20">
          <FileText size={40} className="mx-auto text-neutral-700" />

          <h2 className="mt-4 font-semibold text-white">No reports yet</h2>

          <p className="mt-2 text-sm text-neutral-500">
            Open a completed scan and generate your first diagnostic report.
          </p>

          <button
            type="button"
            onClick={() => navigate("/scans")}
            className="mt-5 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400"
          >
            View Scans
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {reports.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reports;
