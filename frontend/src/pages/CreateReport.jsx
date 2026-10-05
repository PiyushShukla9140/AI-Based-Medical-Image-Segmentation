import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import ReportForm from "../components/reports/ReportForm";
import useScanStore from "../stores/scanStore";
import useReportStore from "../stores/reportStore";

function CreateReport() {
  const { scanId } = useParams();
  const navigate = useNavigate();

  const scan = useScanStore((state) => state.selectedScan);
  const fetchScan = useScanStore((state) => state.fetchScan);
  const isScanLoading = useScanStore((state) => state.isLoading);
  const scanError = useScanStore((state) => state.error);

  const createNewReport = useReportStore((state) => state.createNewReport);

  const isReportLoading = useReportStore((state) => state.isLoading);

  const reportError = useReportStore((state) => state.error);

  useEffect(() => {
    if (scanId) {
      fetchScan(scanId);
    }
  }, [scanId, fetchScan]);

  const handleSubmit = async (data) => {
    try {
      const report = await createNewReport(data);

      navigate(`/reports/${report._id}`);
    } catch {
      return;
    }
  };

  if (isScanLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#0b0908]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-orange-500 shadow-lg shadow-orange-500/20" />
      </div>
    );
  }

  if (scanError) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
        {scanError}
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-[#100d0b] p-5 text-neutral-400">
        Scan not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        type="button"
        onClick={() => navigate(`/scans/${scanId}`)}
        className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-orange-400"
      >
        <ArrowLeft size={17} />
        Back to Scan
      </button>

      <div>
        <h1 className="text-2xl font-bold text-white">
          Generate Diagnostic Report
        </h1>

        <p className="mt-1 text-sm text-neutral-500">
          Review the AI findings and create the diagnostic report.
        </p>
      </div>

      {reportError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {reportError}
        </div>
      )}

      <ReportForm
        scan={scan}
        onSubmit={handleSubmit}
        isLoading={isReportLoading}
      />
    </div>
  );
}

export default CreateReport;
