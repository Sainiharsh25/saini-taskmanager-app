import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  Activity,
  CheckCircle
} from "lucide-react";

export default function Analytics() {

  // Weekly Tasks
  const taskData = [
    { name: "Mon", tasks: 12 },
    { name: "Tue", tasks: 18 },
    { name: "Wed", tasks: 10 },
    { name: "Thu", tasks: 22 },
    { name: "Fri", tasks: 16 },
    { name: "Sat", tasks: 8 },
    { name: "Sun", tasks: 14 }
  ];

  // Productivity
  const productivityData = [
    { name: "Rahul", value: 92 },
    { name: "Priya", value: 88 },
    { name: "Aman", value: 81 },
    { name: "Neha", value: 75 }
  ];

  // Task Status
  const statusData = [
    { name: "Completed", value: 60 },
    { name: "In Progress", value: 25 },
    { name: "Pending", value: 15 }
  ];

  const COLORS = ["#22C55E", "#FACC15", "#EF4444"];

  const cards = [
    {
      title: "Total Tasks",
      value: "248",
      icon: <Activity size={28} />,
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "Completed",
      value: "128",
      icon: <CheckCircle size={28} />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Performance",
      value: "92%",
      icon: <TrendingUp size={28} />,
      color: "from-pink-500 to-orange-500"
    },
    {
      title: "Analytics",
      value: "Live",
      icon: <BarChart3 size={28} />,
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      {/* Header */}
      <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-8 border border-white/20 mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Analytics Dashboard 📊
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Monitor team productivity and project insights
        </p>

      </div>

      {/* Top Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 p-6 hover:scale-105 transition duration-300"
          >

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-2 text-gray-800">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-r ${card.color}`}
              >
                {card.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Weekly Tasks */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-white/20">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Weekly Tasks
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="tasks"
                fill="#6366F1"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Team Productivity */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-white/20">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Team Productivity
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#8B5CF6"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        {/* Pie Chart */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-white/20">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Task Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >

                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* Performance Card */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-xl p-8 text-white flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-4">
            Productivity Insights 🚀
          </h2>

          <p className="text-white/90 text-lg leading-8">
            Your team performance increased by
            <span className="font-bold text-yellow-300">
              {" "}18%{" "}
            </span>
            this month.
          </p>

          <div className="mt-8 space-y-5">

            <div>
              <div className="flex justify-between mb-2">
                <span>Project Completion</span>
                <span>92%</span>
              </div>

              <div className="w-full bg-white/30 h-3 rounded-full overflow-hidden">
                <div className="bg-white h-3 rounded-full w-[92%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Team Efficiency</span>
                <span>88%</span>
              </div>

              <div className="w-full bg-white/30 h-3 rounded-full overflow-hidden">
                <div className="bg-yellow-300 h-3 rounded-full w-[88%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Task Delivery</span>
                <span>81%</span>
              </div>

              <div className="w-full bg-white/30 h-3 rounded-full overflow-hidden">
                <div className="bg-pink-300 h-3 rounded-full w-[81%]"></div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}