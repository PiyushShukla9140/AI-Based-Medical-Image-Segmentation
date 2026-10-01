import { CheckCircle2, Clock3 } from "lucide-react";

const RegionStatus = ({ verified }) => {
  if (verified) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-orange-400">
        <CheckCircle2 size={14} />
        Doctor verified
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-orange-300">
      <Clock3 size={14} />
      Pending review
    </span>
  );
};

export default RegionStatus;
