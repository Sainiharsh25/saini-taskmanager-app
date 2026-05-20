import React, { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  BarChart3,
  Bell,
  LogOut,
  ArrowUpRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatCard = ({
  title,
  value,
  icon,
  color,
  onClick
}) => (
  <div
    onClick={onClick}
    className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer"
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-2 text-gray-800">
          {value}
        </h2>
      </div>

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${color}`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [showLogout, setShowLogout] =
    useState(false);

  const [showAllTasks, setShowAllTasks] =
    useState(false);

  // Stats
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      icon: <FolderKanban size={30} />,
      color:
        "bg-gradient-to-r from-blue-500 to-cyan-500",
      route: "/projects"
    },
    {
      title: "Completed",
      value: "128",
      icon: <CheckCircle size={30} />,
      color:
        "bg-gradient-to-r from-green-500 to-emerald-500",
      route: "/tasks"
    },
    {
      title: "Pending",
      value: "34",
      icon: <Clock size={30} />,
      color:
        "bg-gradient-to-r from-yellow-400 to-orange-500",
      route: "/tasks"
    },
    {
      title: "Overdue",
      value: "8",
      icon: <AlertTriangle size={30} />,
      color:
        "bg-gradient-to-r from-red-500 to-pink-500",
      route: "/tasks"
    }
  ];

  // Tasks
  const tasks = [
    {
      title: "UI Dashboard Design",
      project: "Task Manager",
      priority: "High",
      status: "In Progress",
      due: "12 May"
    },
    {
      title: "MongoDB Setup",
      project: "Backend",
      priority: "Medium",
      status: "Completed",
      due: "15 May"
    },
    {
      title: "Deploy Railway",
      project: "Deployment",
      priority: "High",
      status: "Pending",
      due: "18 May"
    },
    {
      title: "Authentication System",
      project: "Security",
      priority: "Low",
      status: "Completed",
      due: "20 May"
    },
    {
      title: "Analytics Charts",
      project: "Dashboard",
      priority: "Medium",
      status: "In Progress",
      due: "25 May"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      {/* Sidebar */}
      <div className="w-[260px] bg-black text-white p-6 flex flex-col justify-between shadow-2xl">

        <div>
          <h1 className="text-3xl font-bold mb-12 tracking-wide">
            TaskFlow
          </h1>

          <div className="space-y-4">

            <div
              onClick={() =>
                navigate("/dashboard")
              }
              className="flex items-center gap-3 bg-white/10 p-4 rounded-xl cursor-pointer hover:bg-white/20 transition"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </div>

            <div
              onClick={() =>
                navigate("/projects")
              }
              className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition"
            >
              <FolderKanban size={20} />
              Projects
            </div>

            <div
              onClick={() =>
                navigate("/tasks")
              }
              className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition"
            >
              <CheckCircle size={20} />
              Tasks
            </div>

            <div
              onClick={() =>
                navigate("/team")
              }
              className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition"
            >
              <Users size={20} />
              Team
            </div>

            <div
              onClick={() =>
                navigate("/analytics")
              }
              className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition"
            >
              <BarChart3 size={20} />
              Analytics
            </div>

          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() =>
            setShowLogout(true)
          }
          className="bg-white text-black p-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition hover:scale-105"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Top Navbar */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6 flex justify-between items-center mb-8 border border-white/20 hover:shadow-2xl transition">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your projects and productivity
            </p>
          </div>

          <div className="flex items-center gap-6">

            <Bell className="cursor-pointer text-gray-700 hover:scale-110 transition" />

            <div className="text-right">
              <h3 className="font-bold text-gray-800">
                {user?.name || "User"}
              </h3>

              <p className="text-sm text-gray-500">
                {user?.role || "Member"}
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/tasks")
              }
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              + Create Task
            </button>

          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          {stats.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
              onClick={() =>
                navigate(item.route)
              }
            />
          ))}

        </div>

        {/* Performance + Tasks */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">

          {/* Team Performance */}
          <div className="lg:col-span-1 bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Team Performance
              </h2>

              <ArrowUpRight />
            </div>

            <div className="space-y-5">

              {[
                {
                  name: "Rahul Sharma",
                  score: "92%"
                },
                {
                  name: "Priya Singh",
                  score: "88%"
                },
                {
                  name: "Aman Verma",
                  score: "81%"
                }
              ].map((member, index) => (
                <div key={index}>

                  <div className="flex justify-between mb-2">
                    <span>
                      {member.name}
                    </span>

                    <span className="font-semibold">
                      {member.score}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                      style={{
                        width: member.score
                      }}
                    ></div>

                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* Tasks */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-bold">
                Recent Tasks
              </h2>

              <button
                onClick={() =>
                  setShowAllTasks(
                    !showAllTasks
                  )
                }
                className="text-indigo-600 font-semibold hover:underline"
              >
                {showAllTasks
                  ? "Show Less"
                  : "View All"}
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-4">
                      Task
                    </th>

                    <th className="pb-4">
                      Project
                    </th>

                    <th className="pb-4">
                      Priority
                    </th>

                    <th className="pb-4">
                      Status
                    </th>

                    <th className="pb-4">
                      Due
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {(showAllTasks
                    ? tasks
                    : tasks.slice(0, 3)
                  ).map((task, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-white/40 transition"
                    >
                      <td className="py-4 font-medium">
                        {task.title}
                      </td>

                      <td>
                        {task.project}
                      </td>

                      <td>
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                          {task.priority}
                        </span>
                      </td>

                      <td>
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                          {task.status}
                        </span>
                      </td>

                      <td>{task.due}</td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          <div
            onClick={() =>
              navigate("/team")
            }
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer"
          >
            <h2 className="text-2xl font-bold mb-2">
              Team Members
            </h2>

            <p className="text-white/80">
              24 Active Employees
            </p>
          </div>

          <div
            onClick={() =>
              navigate("/analytics")
            }
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-3xl p-8 shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer"
          >
            <h2 className="text-2xl font-bold mb-2">
              Productivity Analytics
            </h2>

            <p className="text-white/80">
              Live performance insights
            </p>
          </div>

        </div>
      </div>

      {/* Logout Popup */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-8 w-[350px] shadow-2xl text-center animate-fadeIn">

            <h2 className="text-2xl font-bold mb-3">
              Are you sure?
            </h2>

            <p className="text-gray-500 mb-6">
              You will be logged out from your account.
            </p>

            <div className="flex gap-4">

              <button
                onClick={() =>
                  setShowLogout(false)
                }
                className="flex-1 bg-gray-200 py-3 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem(
                    "token"
                  );

                  localStorage.removeItem(
                    "user"
                  );

                  window.location.href =
                    "/";
                }}
                  className="flex items-center gap-3 p-4 rounded-xl cursor-pointer bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition w-full mt-2"
              >
                Logout
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}