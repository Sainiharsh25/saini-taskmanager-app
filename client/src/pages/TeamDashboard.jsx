import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  Trophy,
  MessageSquare,
  AlertTriangle,
  BarChart3,
  LogOut,
  ShieldAlert,
  Medal,
  Activity
} from "lucide-react";

export default function TeamDashboard() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  // ================= TASKERS =================
  const taskers = [
    {
      id: "TS001",
      name: "Rahul Sharma",
      project: "260126-text-to-image-h2h",
      tasks: 142,
      status: "Present",
      performance: 98
    },
    {
      id: "TS002",
      name: "Priya Singh",
      project: "260317-Omni-t2v",
      tasks: 126,
      status: "Present",
      performance: 95
    },
    {
      id: "TS003",
      name: "Aman Verma",
      project: "250929-Omni-Elo",
      tasks: 110,
      status: "Absent",
      performance: 90
    },
    {
      id: "TS004",
      name: "Neha Gupta",
      project: "250909-text-to-video-h2h",
      tasks: 102,
      status: "Present",
      performance: 88
    },
    {
      id: "TS005",
      name: "Vikas Kumar",
      project: "260126-text-to-image-compare",
      tasks: 96,
      status: "Present",
      performance: 84
    }
  ];

  // ================= COUNTS =================
  const presentCount =
    taskers.filter(
      (t) => t.status === "Present"
    ).length;

  const absentCount =
    taskers.filter(
      (t) => t.status === "Absent"
    ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      {/* ================= SIDEBAR ================= */}
      <div className="flex">

        <div className="w-[270px] min-h-screen bg-black text-white p-6 flex flex-col justify-between">

          <div>

            <h1 className="text-3xl font-bold mb-12">
              TeamFlow
            </h1>

            <div className="space-y-4">

              <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3">
                <Users size={20} />
                Team Dashboard
              </div>

              <div className="p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition cursor-pointer">
                <BarChart3 size={20} />
                Analytics
              </div>

              <div className="p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition cursor-pointer">
                <Trophy size={20} />
                Performance
              </div>

              <div className="p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition cursor-pointer">
                <Activity size={20} />
                Live Tracking
              </div>

            </div>

          </div>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

        {/* ================= MAIN ================= */}
        <div className="flex-1 p-8">

          {/* ================= HEADER ================= */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6 flex justify-between items-center border border-white/20 mb-8">

            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Team Member Dashboard 👨‍💻
              </h1>

              <p className="text-gray-500 mt-1">
                Manage taskers, monitor productivity,
                and track live project activity
              </p>
            </div>

            <div className="flex items-center gap-4">

              <div className="text-right">
                <h2 className="font-bold text-lg">
                  {user?.name || "Team Member"}
                </h2>

                <p className="text-gray-500 text-sm">
                  {user?.role || "Team Member"}
                </p>
              </div>

              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold">
                {user?.name?.charAt(0) || "T"}
              </div>

            </div>

          </div>

          {/* ================= STATS ================= */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">

            {/* Total */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500">
                    Total Taskers
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-indigo-600">
                    40
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-white">
                  <Users size={30} />
                </div>

              </div>

            </div>

            {/* Present */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500">
                    Present Today
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-green-600">
                    {presentCount}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center text-white">
                  <UserCheck size={30} />
                </div>

              </div>

            </div>

            {/* Absent */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500">
                    Absent Today
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-red-600">
                    {absentCount}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center text-white">
                  <UserX size={30} />
                </div>

              </div>

            </div>

            {/* Team Position */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500">
                    Team Position
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-yellow-500">
                    #3
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center text-white">
                  <Medal size={30} />
                </div>

              </div>

            </div>

          </div>

          {/* ================= MAIN GRID ================= */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* LEFT */}
            <div className="space-y-8">

              {/* Top Performers */}
              <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="text-yellow-500" />
                  <h2 className="text-2xl font-bold">
                    Top 5 Performers
                  </h2>
                </div>

                <div className="space-y-4">

                  {taskers.map((tasker, index) => (

                    <div
                      key={tasker.id}
                      className="flex justify-between items-center bg-gray-50 rounded-2xl p-4"
                    >

                      <div>
                        <h3 className="font-bold text-lg">
                          #{index + 1} {tasker.name}
                        </h3>

                        <p className="text-gray-500 text-sm">
                          {tasker.project}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          {tasker.performance}%
                        </p>

                        <p className="text-sm text-gray-500">
                          {tasker.tasks} Tasks
                        </p>
                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* Feedback */}
              <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

                <div className="flex items-center gap-3 mb-5">
                  <MessageSquare className="text-indigo-600" />
                  <h2 className="text-2xl font-bold">
                    Send Feedback
                  </h2>
                </div>

                <textarea
                  placeholder="Write feedback for taskers..."
                  className="w-full h-32 border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button className="mt-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">
                  Send Feedback
                </button>

              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-8">

              {/* Warning */}
              <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

                <div className="flex items-center gap-3 mb-5">
                  <AlertTriangle className="text-red-500" />
                  <h2 className="text-2xl font-bold">
                    Warning Panel
                  </h2>
                </div>

                <input
                  type="text"
                  placeholder="Enter Tasker Name"
                  className="w-full border border-gray-300 rounded-2xl p-4 mb-4 outline-none focus:ring-2 focus:ring-red-500"
                />

                <textarea
                  placeholder="Warning reason..."
                  className="w-full h-28 border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-red-500"
                />

                <button className="mt-5 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold transition">
                  Send Warning
                </button>

              </div>

              {/* Offboard */}
              <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

                <div className="flex items-center gap-3 mb-5">
                  <ShieldAlert className="text-black" />
                  <h2 className="text-2xl font-bold">
                    Offboard Tasker
                  </h2>
                </div>

                <input
                  type="text"
                  placeholder="Enter Tasker ID"
                  className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-black"
                />

                <button className="mt-5 bg-black text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-900 transition">
                  Offboard
                </button>

              </div>

            </div>

          </div>

          {/* ================= TASKER LIST ================= */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg mt-8">

            <h2 className="text-2xl font-bold mb-6">
              Team Taskers List
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="text-left border-b">

                    <th className="pb-4">Tasker ID</th>
                    <th className="pb-4">Name</th>
                    <th className="pb-4">Project</th>
                    <th className="pb-4">Tasks</th>
                    <th className="pb-4">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {taskers.map((tasker) => (

                    <tr
                      key={tasker.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-4">
                        {tasker.id}
                      </td>

                      <td className="py-4 font-semibold">
                        {tasker.name}
                      </td>

                      <td className="py-4">
                        {tasker.project}
                      </td>

                      <td className="py-4">
                        {tasker.tasks}
                      </td>

                      <td className="py-4">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            tasker.status === "Present"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {tasker.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}