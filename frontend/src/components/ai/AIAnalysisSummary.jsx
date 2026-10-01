import { Brain, CircleAlert, Activity, ShieldCheck } from "lucide-react";

import AISeverityBadge from "./AISeverityBadge";

const AIAnalysisSummary = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
        <p className="text-sm text-neutral-500">No AI analysis available.</p>
      </div>
    );
  }

  const regions = analysis.detectedRegions || [];

  const verifiedCount = regions.filter(
    (region) => region.isDoctorVerified,
  ).length;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">AI Status</span>

            <Brain size={19} className="text-orange-400" />
          </div>

          <p className="mt-3 text-lg font-semibold text-white">Completed</p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">Severity</span>

            <CircleAlert size={19} className="text-orange-400" />
          </div>

          <div className="mt-3">
            <AISeverityBadge severity={analysis.severityLevel} />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">Detected Regions</span>

            <Activity size={19} className="text-orange-400" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-white">
            {regions.length}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">Verified</span>

            <ShieldCheck size={19} className="text-orange-400" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-white">
            {verifiedCount}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">AI Findings</h2>

            <p className="mt-1 text-sm text-neutral-500">
              Gemini medical image analysis
            </p>
          </div>

          <AISeverityBadge severity={analysis.severityLevel} />
        </div>

        <p className="mt-5 leading-7 text-neutral-300">
          {analysis.overallFindings || "No findings available."}
        </p>
      </div>
    </div>
  );
};

export default AIAnalysisSummary;
