import { getSeverityClasses } from "../../utils/aiHelpers";

const AISeverityBadge = ({ severity }) => {
  return (
    <span
      className={`inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 ${getSeverityClasses(
        severity,
      )}`}
    >
      {severity || "Unknown"}
    </span>
  );
};

export default AISeverityBadge;
