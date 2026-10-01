import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff } from "lucide-react";

const ViewerToolbar = ({
  zoom,
  showOverlay,
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleOverlay,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-neutral-800 bg-[#100d0b] p-2">
      <button
        type="button"
        onClick={onZoomOut}
        className="rounded-lg p-2 text-neutral-300 transition hover:bg-orange-500/10 hover:text-orange-400"
        title="Zoom out"
      >
        <ZoomOut size={18} />
      </button>

      <span className="min-w-16 text-center text-sm text-neutral-300">
        {Math.round(zoom * 100)}%
      </span>

      <button
        type="button"
        onClick={onZoomIn}
        className="rounded-lg p-2 text-neutral-300 transition hover:bg-orange-500/10 hover:text-orange-400"
        title="Zoom in"
      >
        <ZoomIn size={18} />
      </button>

      <button
        type="button"
        onClick={onReset}
        className="rounded-lg p-2 text-neutral-300 transition hover:bg-orange-500/10 hover:text-orange-400"
        title="Reset zoom"
      >
        <RotateCcw size={18} />
      </button>

      <div className="mx-1 h-6 w-px bg-neutral-800" />

      <button
        type="button"
        onClick={onToggleOverlay}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
          showOverlay
            ? "bg-orange-500/10 text-orange-400"
            : "text-neutral-400 hover:bg-orange-500/5 hover:text-white"
        }`}
      >
        {showOverlay ? <Eye size={17} /> : <EyeOff size={17} />}
        AI Overlay
      </button>
    </div>
  );
};

export default ViewerToolbar;
