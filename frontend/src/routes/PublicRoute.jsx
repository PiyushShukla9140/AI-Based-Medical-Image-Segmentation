import { Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

function PublicRoute() {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0908]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-950 border-t-orange-500 shadow-lg shadow-orange-500/20" />
      </div>
    );
  }

  return <Outlet />;
}

export default PublicRoute;
