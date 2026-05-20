import React, { useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Users,
  ClipboardList
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Team Member"
  });

  const [loading, setLoading] =
    useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // ================= SIGNUP =================
  const handleSignup = async (e) => {

    e.preventDefault();

    if (
      !form.name ||
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
        `${API_URL}/api/auth/signup`,
        form
      );

      alert(res.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 text-white flex-col justify-center px-20">

        <h1 className="text-6xl font-extrabold leading-tight mb-6">
          Create Your
          <br />
          Account 🚀
        </h1>

        <p className="text-lg text-gray-200 leading-8 max-w-xl">
          Join the Team Task Manager platform
          and manage projects, tasks,
          productivity, and employee workflow
          in one modern dashboard.
        </p>

        {/* FEATURES */}
        <div className="mt-10 space-y-5">

          {/* ADMIN */}
          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-3 rounded-xl">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Admin Access
              </h3>

              <p className="text-gray-200 text-sm">
                Manage projects, analytics,
                and employees.
              </p>
            </div>

          </div>

          {/* TEAM */}
          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-3 rounded-xl">
              <Users size={24} />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Team Collaboration
              </h3>

              <p className="text-gray-200 text-sm">
                Work with teams and monitor
                productivity.
              </p>
            </div>

          </div>

          {/* TASKER */}
          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-3 rounded-xl">
              <ClipboardList size={24} />
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                Tasker Workflow
              </h3>

              <p className="text-gray-200 text-sm">
                Start tasks with live timer
                and track completed work.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md">

          {/* HEADING */}
          <div className="text-center mb-8">

            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Sign Up ✨
            </h2>

            <p className="text-gray-500">
              Create your account to continue
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            {/* NAME */}
            <div className="relative">

              <User
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

            </div>

            {/* EMAIL */}
            <div className="relative">

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
                className="w-full border border-gray-300 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

            </div>

            {/* PASSWORD */}
            <div className="relative">

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
                className="w-full border border-gray-300 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

            </div>

            {/* ROLE */}
            <div>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
              >

                <option value="Admin">
                  👨‍💼 Admin
                </option>

                <option value="Team Member">
                  👥 Team Member
                </option>

                <option value="Tasker">
                  📋 Tasker
                </option>

              </select>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 disabled:opacity-50"
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>

          {/* ROLE CARDS */}
          <div className="grid grid-cols-3 gap-3 mt-8">

            <div className="bg-indigo-50 rounded-2xl p-4 text-center">

              <ShieldCheck
                className="mx-auto text-indigo-600 mb-2"
                size={28}
              />

              <p className="text-sm font-semibold text-gray-700">
                Admin
              </p>

            </div>

            <div className="bg-purple-50 rounded-2xl p-4 text-center">

              <Users
                className="mx-auto text-purple-600 mb-2"
                size={28}
              />

              <p className="text-sm font-semibold text-gray-700">
                Team
              </p>

            </div>

            <div className="bg-pink-50 rounded-2xl p-4 text-center">

              <ClipboardList
                className="mx-auto text-pink-600 mb-2"
                size={28}
              />

              <p className="text-sm font-semibold text-gray-700">
                Tasker
              </p>

            </div>

          </div>

          {/* LOGIN LINK */}
          <p className="text-center mt-6 text-gray-600">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}