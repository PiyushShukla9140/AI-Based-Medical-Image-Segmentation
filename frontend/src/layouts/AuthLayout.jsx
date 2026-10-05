import { Activity } from "lucide-react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-[#0b0908]">
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden border-r border-neutral-800 bg-[#100d0b] lg:flex">
        <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-orange-600/5 blur-3xl" />

        <div className="relative z-10 max-w-md px-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-black shadow-lg shadow-orange-500/20">
              <Activity size={24} />
            </div>

            <div>
              <h1 className="text-lg font-semibold text-white">MedSegment</h1>

              <p className="text-xs text-neutral-500">AI Medical Imaging</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white">
            AI-powered medical image segmentation and analysis.
          </h2>

          <p className="mt-5 leading-7 text-neutral-400">
            Manage patients, analyze medical scans, visualize detected regions,
            and generate diagnostic reports from one platform.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-1.5 w-12 rounded-full bg-orange-500" />
            <div className="h-1.5 w-6 rounded-full bg-orange-500/30" />
            <div className="h-1.5 w-3 rounded-full bg-orange-500/10" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#0b0908] px-4 py-10">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
