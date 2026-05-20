import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  CheckCircle2,
  UserCog,
  Users,
  ClipboardList,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Admin"
  });

  const [loading, setLoading] =
    useState(false);

  const [selectedRole, setSelectedRole] =
    useState("Admin");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);

    setForm({
      ...form,
      role
    });
  };

  const handleLogin = async () => {

    if (
      !form.email ||
      !form.password ||
      !form.role
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      // Role Based Dashboard Redirect
      if (
  res.data.user.role ===
  "Admin"
) {

  window.location.href =
    "/dashboard";

}

else if (
  res.data.user.role ===
  "Team Member"
) {

  window.location.href =
    "/member-dashboard";

}

else if (
  res.data.user.role ===
  "Tasker"
) {

  window.location.href =
    "/tasker-dashboard";

}

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 overflow-hidden">

      {/* Animated Blur Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 text-white flex-col justify-center px-20 relative z-10">

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-6">

            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-lg">
              <Sparkles size={30} />
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight">
              TaskFlow
            </h1>

          </div>

          <h2 className="text-6xl font-black leading-tight mb-6">
            Smart Team
            <br />
            Management 🚀
          </h2>

          <p className="text-lg text-gray-200 leading-8 max-w-2xl">
            Manage projects, employees,
            taskers, analytics and live
            productivity tracking from one
            powerful modern dashboard.
          </p>

        </div>

        {/* Features */}
        <div className="space-y-6">

          <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-lg border border-white/10">

            <div className="bg-white/20 p-3 rounded-xl">
              <CheckCircle2 size={24} />
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Smart Task Management
              </h3>

              <p className="text-gray-200 text-sm mt-1">
                Assign, manage and track
                tasks in real-time.
              </p>
            </div>

          </div>

          <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-lg border border-white/10">

            <div className="bg-white/20 p-3 rounded-xl">
              <Users size={24} />
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Team Collaboration
              </h3>

              <p className="text-gray-200 text-sm mt-1">
                Connect admins, members,
                and taskers together.
              </p>
            </div>

          </div>

          <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-lg border border-white/10">

            <div className="bg-white/20 p-3 rounded-xl">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Secure Role Access
              </h3>

              <p className="text-gray-200 text-sm mt-1">
                Separate login access for
                Admin, Team Member &
                Tasker.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 relative z-10">

        <div className="bg-white/95 backdrop-blur-2xl shadow-2xl rounded-[35px] p-10 w-full max-w-md border border-white/30">

          {/* Heading */}
          <div className="text-center mb-8">

            <h2 className="text-4xl font-black text-gray-800 mb-3">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500">
              Login to continue your work
            </p>

          </div>

          {/* ROLE CARDS */}
          <div className="grid grid-cols-3 gap-3 mb-6">

            {/* ADMIN */}
            <button
              onClick={() =>
                handleRoleSelect("Admin")
              }
              className={`rounded-2xl p-4 transition duration-300 border-2 ${
                selectedRole === "Admin"
                  ? "bg-indigo-600 text-white border-indigo-600 scale-105 shadow-xl"
                  : "bg-indigo-50 text-gray-700 border-transparent hover:scale-105"
              }`}
            >
              <UserCog
                className="mx-auto mb-2"
                size={28}
              />

              <p className="text-sm font-semibold">
                Admin
              </p>
            </button>

            {/* TEAM */}
            <button
              onClick={() =>
                handleRoleSelect(
                  "Team Member"
                )
              }
              className={`rounded-2xl p-4 transition duration-300 border-2 ${
                selectedRole ===
                "Team Member"
                  ? "bg-purple-600 text-white border-purple-600 scale-105 shadow-xl"
                  : "bg-purple-50 text-gray-700 border-transparent hover:scale-105"
              }`}
            >
              <Users
                className="mx-auto mb-2"
                size={28}
              />

              <p className="text-sm font-semibold">
                Team
              </p>
            </button>

            {/* TASKER */}
            <button
              onClick={() =>
                handleRoleSelect("Tasker")
              }
              className={`rounded-2xl p-4 transition duration-300 border-2 ${
                selectedRole === "Tasker"
                  ? "bg-pink-600 text-white border-pink-600 scale-105 shadow-xl"
                  : "bg-pink-50 text-gray-700 border-transparent hover:scale-105"
              }`}
            >
              <ClipboardList
                className="mx-auto mb-2"
                size={28}
              />

              <p className="text-sm font-semibold">
                Tasker
              </p>
            </button>

          </div>

          {/* EMAIL */}
          <div className="relative mb-5">

            <Mail
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          {/* PASSWORD */}
          <div className="relative mb-6">

            <Lock
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition duration-300 shadow-xl disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : `Login as ${selectedRole}`}
          </button>

          {/* SIGNUP */}
          <p className="text-center mt-7 text-gray-600">

            Don’t have an account?{" "}

            <Link
              to="/signup"
              className="text-indigo-600 font-bold hover:underline"
            >
              Create Account
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}