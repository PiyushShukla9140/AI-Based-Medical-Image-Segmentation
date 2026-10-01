import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialForm = {
  name: "",
  age: "",
  gender: "",
  contactNumber: "",
  medicalNotes: "",
};

function PatientForm({ patient, onSubmit, onClose, isSubmitting }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (patient) {
      setForm({
        name: patient.name || "",
        age: patient.age || "",
        gender: patient.gender || "",
        contactNumber: patient.contactNumber || "",
        medicalNotes: patient.medicalNotes || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [patient]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      name: form.name.trim(),
      age: Number(form.age),
      gender: form.gender,
      contactNumber: form.contactNumber.trim(),
      medicalNotes: form.medicalNotes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-[#100d0b] p-6 shadow-2xl shadow-black/40">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {patient ? "Edit Patient" : "Add Patient"}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {patient
                ? "Update patient information"
                : "Create a new patient profile"}
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
              Patient Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-neutral-800 bg-[#0b0908] px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
              placeholder="Enter patient name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-neutral-300">Age</label>

              <input
                name="age"
                type="number"
                min="0"
                value={form.age}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-neutral-800 bg-[#0b0908] px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                placeholder="Age"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-neutral-300">
                Gender
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-neutral-800 bg-[#0b0908] px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Contact Number
            </label>

            <input
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-800 bg-[#0b0908] px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Medical Notes
            </label>

            <textarea
              name="medicalNotes"
              value={form.medicalNotes}
              onChange={handleChange}
              rows="4"
              className="w-full resize-none rounded-xl border border-neutral-800 bg-[#0b0908] px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
              placeholder="Enter medical notes"
            />
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
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-orange-500 px-4 py-3 font-medium text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : patient
                  ? "Update Patient"
                  : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;
