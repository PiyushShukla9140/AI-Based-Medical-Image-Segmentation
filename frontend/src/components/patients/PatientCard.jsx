import { Calendar, ChevronRight, FileText, Phone, User } from "lucide-react";

function PatientCard({ patient, onView }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#100d0b] p-5 transition hover:border-orange-500/30">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-400">
            <User size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-white">{patient.name}</h3>

            <p className="text-sm text-neutral-500">
              {patient.gender} · {patient.age} years
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onView(patient._id)}
          className="text-neutral-400 transition hover:text-orange-400"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        {patient.contactNumber && (
          <div className="flex items-center gap-2 text-neutral-400">
            <Phone size={15} className="text-orange-400" />
            {patient.contactNumber}
          </div>
        )}

        <div className="flex items-center gap-2 text-neutral-400">
          <FileText size={15} className="text-orange-400" />
          {patient.medicalNotes || "No medical notes"}
        </div>

        <div className="flex items-center gap-2 text-neutral-500">
          <Calendar size={15} />
          {new Date(patient.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
