import { Calendar, Eye, FileImage } from "lucide-react";
import ScanStatus from "./ScanStatus";

function ScanCard({ scan, onView }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#100d0b] transition hover:border-orange-500/20">
      <div className="aspect-video bg-[#0b0908]">
        {scan.imageUrl ? (
          <img
            src={scan.imageUrl}
            alt={scan.scanType}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileImage size={40} className="text-neutral-700" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-white">{scan.scanType}</h3>

            <p className="mt-1 text-sm text-neutral-500">
              {scan.bodyPart || "General"}
            </p>
          </div>

          <ScanStatus status={scan.status} />
        </div>

        {scan.patientId && (
          <p className="mt-4 text-sm text-neutral-400">
            Patient:{" "}
            <span className="text-neutral-300">
              {scan.patientId.name || scan.patientId.patientName || "Unknown"}
            </span>
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Calendar size={14} className="text-orange-400" />

            {new Date(scan.createdAt).toLocaleDateString("en-IN")}
          </div>

          <button
            type="button"
            onClick={() => onView(scan._id)}
            className="flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-2 text-sm text-orange-400 transition hover:bg-orange-500/20 hover:text-orange-300"
          >
            <Eye size={15} />
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScanCard;
