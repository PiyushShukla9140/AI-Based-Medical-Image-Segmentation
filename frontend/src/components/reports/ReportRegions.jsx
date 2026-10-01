import { AlertTriangle, CheckCircle } from "lucide-react";

function ReportRegions({ report }) {
  const regions = report?.scanId?.analysis?.detectedRegions || [];

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-white">Detected Regions</h2>

        <p className="text-sm text-neutral-500">
          AI-detected regions requiring review.
        </p>
      </div>

      {regions.length === 0 ? (
        <div className="rounded-xl border border-neutral-800 bg-[#0b0908] p-6 text-center">
          <CheckCircle size={28} className="mx-auto text-orange-400" />

          <p className="mt-3 font-medium text-white">
            No detected abnormalities
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            No AI detection regions were returned for this scan.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {regions.map((region, index) => (
            <div
              key={region._id || index}
              className="rounded-xl border border-neutral-800 bg-[#0b0908] p-4 transition hover:border-orange-500/20"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="mt-1 text-orange-400" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-medium text-white">
                      {region.label || "Detected Region"}
                    </h3>

                    {region.confidenceScore !== undefined && (
                      <span className="text-sm text-orange-400">
                        {(region.confidenceScore * 100).toFixed(1)}% confidence
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-neutral-500">
                    {region.category || "Abnormality"}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    {region.clinicalNote ||
                      region.clinicalDescription ||
                      "No clinical description available."}
                  </p>

                  {region.isDoctorVerified && (
                    <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
                      <CheckCircle size={14} />
                      Doctor Verified
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportRegions;
