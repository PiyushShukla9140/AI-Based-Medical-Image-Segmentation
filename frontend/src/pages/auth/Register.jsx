import { Activity, Lock, Mail, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "doctor",
    specialization: "radiology",
    profileImage: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setForm({
      ...form,
      profileImage: event.target.files?.[0] || null,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("username", form.username);
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("role", form.role);
      formData.append("specialization", form.specialization);

      if (form.profileImage) {
        formData.append("profileImage", form.profileImage);
      }

      await register(formData);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to create your account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-black shadow-lg shadow-orange-500/20 lg:hidden">
          <Activity size={24} />
        </div>

        <h1 className="text-3xl font-bold text-white">Create your account</h1>

        <p className="mt-2 text-sm text-neutral-400">
          Set up your medical imaging workspace.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-orange-500/10 bg-[#100d0b] p-6 shadow-xl shadow-black/30"
      >
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Full name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full rounded-lg border border-neutral-800 bg-[#0b0908] py-3 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Username
            </label>

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="username"
              required
              className="w-full rounded-lg border border-neutral-800 bg-[#0b0908] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            />
          </div>
        </div>

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
              minLength={6}
              required
              className="w-full rounded-lg border border-neutral-800 bg-[#0b0908] py-3 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-neutral-300">Role</label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-neutral-800 bg-[#0b0908] px-3 py-3 text-sm text-white outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            >
              <option value="doctor">Doctor</option>
              <option value="radiologist">Radiologist</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Specialization
            </label>

            <input
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              placeholder="Radiology"
              className="w-full rounded-lg border border-neutral-800 bg-[#0b0908] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-neutral-300">
            Profile image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full rounded-lg border border-neutral-800 bg-[#0b0908] p-3 text-sm text-neutral-400 file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-black file:transition hover:file:bg-orange-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition hover:from-orange-400 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UserPlus size={18} />
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-orange-400 transition hover:text-orange-300"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
