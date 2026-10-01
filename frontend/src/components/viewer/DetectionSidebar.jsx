import { useState } from "react";
import DetectionItem from "./DetectionItem";
import useViewerStore from "../../stores/viewerStore";

const DetectionSidebar = ({ regions = [] }) => {
  const { selectedRegion, selectRegion, verifySelectedRegion } =
    useViewerStore();

  const [feedback, setFeedback] = useState("");

  const handleVerify = async () => {
    if (!selectedRegion?._id) {
      return;
    }

    await verifySelectedRegion(selectedRegion._id, {
      isDoctorVerified: true,
      doctorFeedback: feedback,
    });

    setFeedback("");
  };

  return (
    <aside className="rounded-2xl border border-neutral-800 bg-[#100d0b]">
      <div className="border-b border-neutral-800 p-5">
        <h2 className="font-semibold text-white">AI Detections</h2>

        <p className="mt-1 text-sm text-neutral-500">
          {regions.length} detected region
          {regions.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="max-h-[500px] space-y-3 overflow-y-auto p-4">
        {regions.length === 0 ? (
          <div className="rounded-xl border border-neutral-800 bg-[#0b0908] p-5 text-center text-sm text-neutral-500">
            No detected regions.
          </div>
        ) : (
          regions.map((region, index) => (
            <DetectionItem
              key={region._id || index}
              region={region}
              isSelected={selectedRegion?._id === region._id}
              onClick={selectRegion}
            />
          ))
        )}
      </div>

      {selectedRegion && (
        <div className="border-t border-neutral-800 p-4">
          <label className="mb-2 block text-sm text-neutral-300">
            Doctor Feedback
          </label>

          <textarea
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            rows={4}
            placeholder="Add clinical feedback..."
            className="w-full resize-none rounded-xl border border-neutral-800 bg-[#0b0908] p-3 text-sm text-white outline-none placeholder:text-neutral-600 transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
          />

          <button
            type="button"
            onClick={handleVerify}
            disabled={selectedRegion.isDoctorVerified}
            className="mt-3 w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-medium text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {selectedRegion.isDoctorVerified
              ? "Doctor Verified"
              : "Verify Region"}
          </button>
        </div>
      )}
    </aside>
  );
};

export default DetectionSidebar;
