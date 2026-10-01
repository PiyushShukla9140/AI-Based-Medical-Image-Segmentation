import { Activity, FileText, LayoutDashboard, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Patients",
    path: "/patients",
    icon: Users,
  },
  {
    name: "Scans",
    path: "/scans",
    icon: Activity,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-neutral-800 bg-[#0b0908] md:block">
      <div className="flex h-16 items-center gap-3 border-b border-neutral-800 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-black shadow-lg shadow-orange-500/20">
          <Activity size={20} />
        </div>

        <div>
          <h1 className="font-semibold text-white">MedSegment</h1>
          <p className="text-xs text-neutral-500">AI Imaging</p>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-orange-500/10 text-orange-400"
                    : "text-neutral-400 hover:bg-orange-500/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
