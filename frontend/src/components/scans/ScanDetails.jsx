import { ArrowLeft, Brain, Calendar, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ScanStatus from "./ScanStatus";

function ScanDetails({ scan, onBack, onDelete }) {
  const navigate = useNavigate();

  if (!scan) {
    return null;
  }

  const regions = scan.analysis?.detectedRegions || [];

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-orange-400"
      >
        <ArrowLeft size={17} />
        Back to Scans
      </button>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#100d0b]">
          <div className="aspect-square bg-[#0b0908]">
            <img
              src={scan.imageUrl}
              alt={scan.scanType}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {scan.scanType}
                </h1>

                <p className="mt-1 text-neutral-500">
                  {scan.bodyPart || "General"}
                </p>
              </div>

              <ScanStatus status={scan.status} />
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs uppercase text-neutral-500">Patient</p>

                <p className="mt-1 text-white">
                  {scan.patientId?.name ||
                    scan.patientId?.patientName ||
                    "No patient"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-neutral-500">Uploaded</p>

                <div className="mt-1 flex items-center gap-2 text-sm text-neutral-300">
                  <Calendar size={15} className="text-orange-400" />
                  {new Date(scan.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
            <h2 className="text-lg font-semibold text-white">AI Analysis</h2>

            <p className="mt-4 text-sm leading-6 text-neutral-400">
              {scan.analysis?.overallFindings || "No findings available."}
            </p>

            {scan.analysis?.severityLevel && (
              <div className="mt-4">
                <span className="text-xs text-neutral-500">Severity</span>

                <p className="mt-1 font-medium text-orange-400">
                  {scan.analysis.severityLevel}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
            <h2 className="text-lg font-semibold text-white">
              Detected Regions
            </h2>

            {regions.length === 0 ? (
              <p className="mt-4 text-sm text-neutral-500">
                No detected regions.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {regions.map((region, index) => (
                  <div
                    key={region._id || index}
                    className="rounded-xl border border-neutral-800 bg-[#0b0908] p-4 transition hover:border-orange-500/20"
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-medium text-white">
                          {region.label || "Detected Region"}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {region.category || "Abnormality"}
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
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => navigate(`/scans/${scan._id}/viewer`)}
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400"
            >
              <Eye size={17} />
              Open Medical Viewer
            </button>

            <button
              type="button"
              onClick={() => navigate(`/scans/${scan._id}/ai-analysis`)}
              className="flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm font-medium text-orange-400 transition hover:bg-orange-500/20"
            >
              <Brain size={17} />
              AI Analysis
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/reports/create/${scan._id}`)}
            className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400"
          >
            Generate Report
          </button>

          <button
            type="button"
            onClick={() => onDelete(scan._id)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
          >
            <Trash2 size={17} />
            Delete Scan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScanDetails;
