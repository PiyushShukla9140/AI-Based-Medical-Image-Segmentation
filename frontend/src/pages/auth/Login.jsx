import { Activity, Lock, Mail, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to login. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center lg:text-left">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-black shadow-lg shadow-orange-500/20 lg:hidden">
          <Activity size={24} />
        </div>

        <h1 className="text-3xl font-bold text-white">Welcome back</h1>

        <p className="mt-2 text-sm text-neutral-400">
          Sign in to your medical imaging workspace.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-orange-500/10 bg-[#100d0b] p-6 shadow-xl shadow-black/30"
      >
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm text-neutral-300">Email</label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="doctor@example.com"
              required
              className="w-full rounded-lg border border-neutral-800 bg-[#0b0908] py-3 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-neutral-800 bg-[#0b0908] py-3 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition hover:from-orange-400 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogIn size={18} />
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-center text-sm text-neutral-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-orange-400 transition hover:text-orange-300"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
