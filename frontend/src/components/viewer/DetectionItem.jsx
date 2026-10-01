import { CheckCircle, CircleAlert } from "lucide-react";

const DetectionItem = ({ region, isSelected, onClick }) => {
  const confidence = region.confidenceScore
    ? Math.round(region.confidenceScore * 100)
    : 0;

  return (
    <button
      type="button"
      onClick={() => onClick(region)}
      className={`w-full rounded-xl border p-4 text-left transition ${
        isSelected
          ? "border-orange-500/50 bg-orange-500/10"
          : "border-neutral-800 bg-[#0b0908] hover:border-orange-500/30"
      }`}
    >
      <div className="flex items-start gap-3">
        {region.isDoctorVerified ? (
          <CheckCircle size={19} className="mt-0.5 text-orange-400" />
        ) : (
          <CircleAlert size={19} className="mt-0.5 text-orange-300" />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-medium text-white">
              {region.label || region.category || "Anomaly"}
            </h3>

            <span className="text-xs text-orange-400">{confidence}%</span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-800">
            <div
              className="h-full rounded-full bg-orange-500"
              style={{
                width: `${confidence}%`,
              }}
            />
          </div>

          <p className="mt-3 line-clamp-3 text-xs leading-5 text-neutral-400">
            {region.clinicalNote ||
              region.clinicalDescription ||
              "No clinical note available."}
          </p>

          {region.isDoctorVerified && (
            <span className="mt-3 inline-block text-xs font-medium text-orange-400">
              Doctor verified
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default DetectionItem;
