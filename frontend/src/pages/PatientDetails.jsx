import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PatientDetailsView from "../components/patients/PatientDetails";
import usePatientStore from "../stores/patientStore";

function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = usePatientStore((state) => state.selectedPatient);
  const scans = usePatientStore((state) => state.patientScans);
  const isLoading = usePatientStore((state) => state.isLoading);
  const error = usePatientStore((state) => state.error);
  const fetchPatient = usePatientStore((state) => state.fetchPatient);

  useEffect(() => {
    fetchPatient(id);
  }, [id, fetchPatient]);

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("/patients")}
        className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-orange-400"
      >
        <ArrowLeft size={17} />
        Back to Patients
      </button>

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center bg-[#0b0908]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-orange-500 shadow-lg shadow-orange-500/20" />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
          {error}
        </div>
      ) : (
        <PatientDetailsView patient={patient} scans={scans} />
      )}
    </div>
  );
}

export default PatientDetails;
