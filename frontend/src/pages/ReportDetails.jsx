import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReportDetailsView from "../components/reports/ReportDetailsView";
import generateReportPDF from "../components/reports/ReportPDF";
import useReportStore from "../stores/reportStore";

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const report = useReportStore((state) => state.report);
  const isLoading = useReportStore((state) => state.isLoading);
  const error = useReportStore((state) => state.error);
  const fetchReport = useReportStore((state) => state.fetchReport);
  const removeReport = useReportStore((state) => state.removeReport);

  useEffect(() => {
    if (id) {
      fetchReport(id);
    }
  }, [id, fetchReport]);

  const handleDelete = async (reportId) => {
    const confirmed = window.confirm("Delete this diagnostic report?");

    if (!confirmed) {
      return;
    }

    try {
      await removeReport(reportId);
      navigate("/reports");
    } catch {
      return;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#0b0908]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-orange-500 shadow-lg shadow-orange-500/20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <ReportDetailsView
      report={report}
      onBack={() => navigate("/reports")}
      onDelete={handleDelete}
      onDownload={() => generateReportPDF(report)}
    />
  );
}

export default ReportDetails;
