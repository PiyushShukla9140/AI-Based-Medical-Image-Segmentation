import { create } from "zustand";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth.service";
import { setAccessToken } from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  register: async (formData) => {
    const data = await registerUser(formData);

    if (data?.user) {
      const token = data?.accessToken ?? null;

      setAccessToken(token);

      set({
        user: data.user,
        accessToken: token,
        isAuthenticated: true,
        isLoading: false,
      });
    }

    return data;
  },

  login: async (credentials) => {
    const data = await loginUser(credentials);

    if (data?.user) {
      const token = data?.accessToken ?? null;

      setAccessToken(token);

      set({
        user: data.user,
        accessToken: token,
        isAuthenticated: true,
        isLoading: false,
      });
    }

    return data;
  },

  checkAuth: async () => {
    try {
      const data = await getCurrentUser();
      const user = data?.user ?? data;

      if (user) {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return user;
      }

      setAccessToken(null);

      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });

      return null;
    } catch {
      setAccessToken(null);

      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });

      return null;
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } finally {
      setAccessToken(null);

      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

export default useAuthStore;
