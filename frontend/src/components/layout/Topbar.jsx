import { useState } from "react";
import { Bell, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../stores/authStore";

function Topbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const profileImage =
    user?.profileImage ||
    user?.avatar ||
    user?.profileImageUrl ||
    user?.avatarUrl;

  const userName = user?.fullName || user?.name || "Account";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-neutral-800 bg-[#0b0908]/95 px-4 backdrop-blur md:px-6">
      <div>
        <p className="text-xs text-neutral-500">Medical Imaging</p>

        <h2 className="font-semibold text-white">AI Segmentation Platform</h2>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowAccount(false);
            }}
            className="rounded-lg p-2 text-neutral-400 transition hover:bg-orange-500/10 hover:text-orange-400"
          >
            <Bell size={19} />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 rounded-xl border border-neutral-800 bg-[#100d0b] p-4 shadow-xl">
              <h3 className="font-semibold text-white">Notifications</h3>

              <p className="mt-2 text-sm text-neutral-500">
                No new notifications.
              </p>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowAccount(!showAccount);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-lg p-1.5 text-neutral-300 transition hover:bg-orange-500/10 hover:text-orange-400"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt={userName}
                className="h-9 w-9 rounded-full border border-orange-500/30 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-sm font-semibold text-orange-400">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}

            <span className="hidden text-sm sm:block">{userName}</span>
          </button>

          {showAccount && (
            <div className="absolute right-0 mt-3 w-72 rounded-xl border border-neutral-800 bg-[#100d0b] p-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={userName}
                    className="h-12 w-12 rounded-full border border-orange-500/30 object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-lg font-semibold text-orange-400">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{userName}</p>

                  <p className="truncate text-sm text-neutral-500">
                    {user?.email || "No email available"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
