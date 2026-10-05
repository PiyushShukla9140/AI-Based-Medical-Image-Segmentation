import {
  Activity,
  Brain,
  FileText,
  Users,
  Upload,
  UserPlus,
  ClipboardPlus,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const stats = [
  { title: "Total Patients", value: "0", icon: Users },
  { title: "Total Scans", value: "0", icon: Activity },
  { title: "AI Analyses", value: "0", icon: Brain },
  { title: "Reports", value: "0", icon: FileText },
];

function Dashboard() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>

          <p className="mt-1 text-sm text-neutral-400">
            Overview of your medical imaging and AI analysis activity.
          </p>
        </div>

        {/* <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-[#100d0b] px-4 py-2 text-sm font-medium text-neutral-300 transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
        >
          <LogOut size={17} />
          Logout
        </button> */}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-neutral-800 bg-[#100d0b] p-5 shadow-lg shadow-black/20 transition hover:border-orange-500/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-400">{stat.title}</p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg bg-orange-500/10 p-3 text-orange-400">
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-[#100d0b] p-6 shadow-lg shadow-black/20 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">Recent Scans</h2>

              <p className="mt-1 text-sm text-neutral-500">
                Latest medical image scans
              </p>
            </div>

            <Activity size={20} className="text-orange-400" />
          </div>

          <div className="flex min-h-48 items-center justify-center">
            <div className="text-center">
              <Activity size={32} className="mx-auto text-neutral-700" />

              <p className="mt-3 text-sm text-neutral-500">
                No scans available yet
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#100d0b] p-6 shadow-lg shadow-black/20">
          <h2 className="font-semibold text-white">Quick Actions</h2>

          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={() => navigate("/scans")}
              className="flex w-full items-center gap-3 rounded-lg border border-neutral-800 bg-[#0b0908] p-3 text-left transition hover:border-orange-500/50 hover:bg-orange-500/5"
            >
              <Upload size={18} className="text-orange-400" />

              <div>
                <p className="text-sm font-medium text-white">Upload Scan</p>

                <p className="text-xs text-neutral-500">
                  Upload a medical image
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate("/patients")}
              className="flex w-full items-center gap-3 rounded-lg border border-neutral-800 bg-[#0b0908] p-3 text-left transition hover:border-orange-500/50 hover:bg-orange-500/5"
            >
              <UserPlus size={18} className="text-orange-400" />

              <div>
                <p className="text-sm font-medium text-white">Add Patient</p>

                <p className="text-xs text-neutral-500">
                  Create a patient record
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate("/reports")}
              className="flex w-full items-center gap-3 rounded-lg border border-neutral-800 bg-[#0b0908] p-3 text-left transition hover:border-orange-500/50 hover:bg-orange-500/5"
            >
              <ClipboardPlus size={18} className="text-orange-400" />

              <div>
                <p className="text-sm font-medium text-white">View Reports</p>

                <p className="text-xs text-neutral-500">
                  Open diagnostic reports
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
