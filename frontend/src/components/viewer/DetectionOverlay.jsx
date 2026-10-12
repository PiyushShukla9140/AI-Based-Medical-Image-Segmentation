import { getBoxStyle } from "../../utils/imageCoordinates";

const DetectionOverlay = ({ regions = [], selectedRegion, onSelectRegion }) => {
  if (regions.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {regions.map((region, index) => {
        const style = getBoxStyle(region.box2d);

        if (!style) {
          return null;
        }

        const isSelected = selectedRegion?._id === region._id;

        const confidence =
          typeof region.confidenceScore === "number"
            ? Math.round(region.confidenceScore * 100)
            : null;

        return (
          <button
            key={region._id || index}
            type="button"
            onClick={() => onSelectRegion(region)}
            className={`pointer-events-auto absolute border-2 transition ${
              isSelected
                ? "border-orange-400 bg-orange-400/20 shadow-lg shadow-orange-500/20"
                : "border-orange-500 bg-orange-500/10 hover:bg-orange-500/20"
            }`}
            style={style}
          >
            <span
              className={`absolute -top-8 left-0 z-50 whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold ${
                isSelected
                  ? "bg-orange-400 text-black"
                  : "bg-orange-500 text-black"
              }`}
            >
              {region.label || "Anomaly"}
              {confidence !== null && ` ${confidence}%`}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DetectionOverlay;
