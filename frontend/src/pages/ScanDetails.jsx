import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScanDetailsView from "../components/scans/ScanDetails";
import useScanStore from "../stores/scanStore";

function ScanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const scan = useScanStore((state) => state.selectedScan);
  const isLoading = useScanStore((state) => state.isLoading);
  const error = useScanStore((state) => state.error);
  const fetchScan = useScanStore((state) => state.fetchScan);
  const removeScan = useScanStore((state) => state.removeScan);

  useEffect(() => {
    fetchScan(id);
  }, [id, fetchScan]);

  const handleDelete = async (scanId) => {
    const confirmed = window.confirm(
      "Delete this scan and its associated AI analysis?",
    );

    if (!confirmed) {
      return;
    }

    await removeScan(scanId);
    navigate("/scans");
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
    <ScanDetailsView
      scan={scan}
      onBack={() => navigate("/scans")}
      onDelete={handleDelete}
    />
  );
}

export default ScanDetails;
