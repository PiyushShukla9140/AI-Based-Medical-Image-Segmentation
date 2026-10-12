import { useState } from "react";
import { FileImage, Upload, X } from "lucide-react";

const scanTypes = [
  "Chest X-Ray",
  "Brain MRI",
  "CT Scan",
  "Skin Lesion",
  "Hips X-Ray",
  "Other",
];

function ScanUpload({ patients, onSubmit, onClose, isUploading }) {
  const [patientId, setPatientId] = useState("");
  const [scanType, setScanType] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !scanType) {
      return;
    }

    const formData = new FormData();

    formData.append("scanImage", file);
    formData.append("scanType", scanType);
    formData.append("bodyPart", bodyPart);

    if (patientId) {
      formData.append("patientId", patientId);
    }

    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-[#100d0b] p-6 shadow-2xl shadow-black/40">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Upload Medical Scan
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Upload an image for AI analysis.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-400 transition hover:bg-orange-500/10 hover:text-orange-400"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Patient
            </label>

            <select
              value={patientId}
              onChange={(event) => setPatientId(event.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-[#0b0908] px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            >
              <option value="">No patient selected</option>

              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Scan Type
            </label>

            <select
              value={scanType}
              onChange={(event) => setScanType(event.target.value)}
              required
              className="w-full rounded-xl border border-neutral-800 bg-[#0b0908] px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            >
              <option value="">Select scan type</option>

              {scanTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Body Part
            </label>

            <input
              value={bodyPart}
              onChange={(event) => setBodyPart(event.target.value)}
              placeholder="e.g. Chest, Brain, Hip"
              className="w-full rounded-xl border border-neutral-800 bg-[#0b0908] px-4 py-3 text-white outline-none placeholder:text-neutral-600 transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Scan Image
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-[#0b0908] px-6 py-8 text-center transition hover:border-orange-500/50 hover:bg-orange-500/5">
              {file ? (
                <>
                  <FileImage size={32} className="text-orange-400" />

                  <p className="mt-3 text-sm text-white">{file.name}</p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <Upload size={32} className="text-neutral-700" />

                  <p className="mt-3 text-sm text-neutral-300">
                    Click to upload scan
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    JPG, JPEG, PNG or WebP
                  </p>
                </>
              )}

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(event) => {
                  setFile(event.target.files?.[0] || null);
                }}
              />
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-neutral-800 px-4 py-3 font-medium text-neutral-300 transition hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading || !file || !scanType}
              className="flex-1 rounded-xl bg-orange-500 px-4 py-3 font-medium text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? "Analyzing..." : "Upload & Analyze"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScanUpload;
