import { useEffect, useState } from "react";
import { Plus, Search, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PatientTable from "../components/patients/PatientTable";
import PatientForm from "../components/patients/PatientForm";
import usePatientStore from "../stores/patientStore";

function Patients() {
  const navigate = useNavigate();

  const patients = usePatientStore((state) => state.patients);
  const isLoading = usePatientStore((state) => state.isLoading);
  const isCreating = usePatientStore((state) => state.isCreating);
  const error = usePatientStore((state) => state.error);
  const fetchPatients = usePatientStore((state) => state.fetchPatients);
  const addPatient = usePatientStore((state) => state.addPatient);
  const editPatient = usePatientStore((state) => state.editPatient);
  const removePatient = usePatientStore((state) => state.removePatient);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearch = (event) => {
    const value = event.target.value;

    setSearch(value);
    fetchPatients(value);
  };

  const handleSubmit = async (data) => {
    try {
      if (editingPatient) {
        await editPatient(editingPatient._id, data);
      } else {
        await addPatient(data);
      }

      setShowForm(false);
      setEditingPatient(null);
    } catch {
      return;
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleDelete = async (patient) => {
    const confirmed = window.confirm(
      `Delete ${patient.name}? This will also delete associated medical scans.`,
    );

    if (!confirmed) {
      return;
    }

    await removePatient(patient._id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Patients</h1>

          <p className="mt-1 text-sm text-neutral-500">
            Manage your patient records and medical history.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingPatient(null);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-semibold text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400"
        >
          <Plus size={18} />
          Add Patient
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
          />

          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search patients..."
            className="w-full rounded-xl border border-neutral-800 bg-[#100d0b] py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-[#100d0b] px-4 py-3">
          <Users size={18} className="text-orange-400" />

          <span className="text-sm text-neutral-400">
            {patients.length} patients
          </span>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-orange-500 shadow-lg shadow-orange-500/20" />
        </div>
      ) : patients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-800 bg-[#100d0b] p-12 text-center">
          <Users size={36} className="mx-auto text-neutral-700" />

          <h2 className="mt-4 text-lg font-semibold text-white">
            No patients found
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Add your first patient to get started.
          </p>

          <button
            type="button"
            onClick={() => {
              setEditingPatient(null);
              setShowForm(true);
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/10 transition hover:bg-orange-400"
          >
            <Plus size={17} />
            Add Patient
          </button>
        </div>
      ) : (
        <PatientTable
          patients={patients}
          onView={(id) => navigate(`/patients/${id}`)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <PatientForm
          patient={editingPatient}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingPatient(null);
          }}
          isSubmitting={
            editingPatient ? usePatientStore.getState().isUpdating : isCreating
          }
        />
      )}
    </div>
  );
}

export default Patients;
