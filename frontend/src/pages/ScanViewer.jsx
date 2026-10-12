import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import MedicalImageViewer from "../components/viewer/MedicalImageViewer";
import DetectionSidebar from "../components/viewer/DetectionSidebar";
import useViewerStore from "../stores/viewerStore";

function ScanViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { scan, isLoading, error, fetchScan } = useViewerStore();

  useEffect(() => {
    if (id) {
      fetchScan(id);
    }
  }, [id, fetchScan]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#0b0908] text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-700 border-t-orange-500 shadow-lg shadow-orange-500/20" />
          Loading medical image...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-400">
        {error}
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6 text-neutral-400">
        Scan not found.
      </div>
    );
  }

  const regions = scan.analysis?.detectedRegions || [];

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(`/scans/${scan._id}`)}
        className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-orange-400"
      >
        <ArrowLeft size={17} />
        Back to Scan Details
      </button>

      <div>
        <h1 className="text-2xl font-bold text-white">Medical Image Viewer</h1>

        <p className="mt-1 text-sm text-neutral-500">
          {scan.scanType} · {scan.bodyPart || "General"}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <MedicalImageViewer imageUrl={scan.imageUrl} regions={regions} />

        <DetectionSidebar regions={regions} />
      </div>
    </div>
  );
}

export default ScanViewer;
