import { Eye, Pencil, Trash2 } from "lucide-react";

function PatientTable({ patients, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#100d0b]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="border-b border-neutral-800 bg-[#0b0908]/80">
            <tr className="text-left text-xs uppercase tracking-wider text-neutral-500">
              <th className="px-5 py-4">Patient</th>
              <th className="px-5 py-4">Age</th>
              <th className="px-5 py-4">Gender</th>
              <th className="px-5 py-4">Contact</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-800">
            {patients.map((patient) => (
              <tr
                key={patient._id}
                className="transition hover:bg-orange-500/5"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-white">{patient.name}</p>

                    <p className="mt-1 max-w-xs truncate text-xs text-neutral-500">
                      {patient.medicalNotes || "No medical notes"}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-neutral-400">
                  {patient.age}
                </td>

                <td className="px-5 py-4 text-sm text-neutral-400">
                  {patient.gender}
                </td>

                <td className="px-5 py-4 text-sm text-neutral-400">
                  {patient.contactNumber || "—"}
                </td>

                <td className="px-5 py-4 text-sm text-neutral-400">
                  {new Date(patient.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(patient._id)}
                      className="rounded-lg p-2 text-neutral-400 transition hover:bg-orange-500/10 hover:text-orange-400"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(patient)}
                      className="rounded-lg p-2 text-neutral-400 transition hover:bg-orange-500/10 hover:text-orange-400"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(patient)}
                      className="rounded-lg p-2 text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientTable;
