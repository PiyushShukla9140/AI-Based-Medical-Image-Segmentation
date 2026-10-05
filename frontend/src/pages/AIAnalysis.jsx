import { useEffect } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AIAnalysisSummary from "../components/ai/AIAnalysisSummary";
import DetectionReviewPanel from "../components/ai/DetectionReviewPanel";
import useAIStore from "../stores/aiStore";

const AIAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { scan, isLoading, error, fetchAnalysis, reset } = useAIStore();

  useEffect(() => {
    reset();
    fetchAnalysis(id);

    return () => {
      reset();
    };
  }, [id, fetchAnalysis, reset]);

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#0b0908]">
        <div className="flex items-center gap-3 text-neutral-400">
          <LoaderCircle size={20} className="animate-spin text-orange-500" />
          Loading AI analysis...
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
      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-8 text-center text-neutral-400">
        Scan not found.
      </div>
    );
  }

  const analysis = scan.analysis;
  const regions = analysis?.detectedRegions || [];

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
        <h1 className="text-2xl font-semibold text-white">AI Analysis</h1>

        <p className="mt-1 text-sm text-neutral-500">
          {scan.scanType} · {scan.bodyPart}
        </p>
      </div>

      <AIAnalysisSummary analysis={analysis} />

      <DetectionReviewPanel regions={regions} />
    </div>
  );
};

export default AIAnalysis;
