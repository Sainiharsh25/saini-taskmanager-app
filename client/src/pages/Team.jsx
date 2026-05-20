import React, { useMemo, useState } from "react";
import {
  Users,
  Search,
  Circle,
  UserCircle2
} from "lucide-react";

export default function Team() {

  // 👥 Team Members
  const members = [
    { id: "EMP001", name: "Rahul Sharma", role: "Frontend Developer" },
    { id: "EMP002", name: "Priya Singh", role: "Backend Developer" },
    { id: "EMP003", name: "Aman Verma", role: "UI/UX Designer" },
    { id: "EMP004", name: "Neha Gupta", role: "QA Engineer" },
    { id: "EMP005", name: "Manoj Kumar", role: "QA Engineer" },
    { id: "EMP006", name: "Sneha Mishra", role: "Team Lead" },
    { id: "EMP007", name: "Rajesh Kumar", role: "Manager" },
    { id: "EMP008", name: "Priya Sharma", role: "QA Engineer" },
    { id: "EMP009", name: "Neha Patel", role: "QR Specialist" },
    { id: "EMP010", name: "Vikram Singh", role: "DevOps Engineer" },
    { id: "EMP011", name: "Rohit Yadav", role: "Backend Developer" },
    { id: "EMP012", name: "Karan Mehta", role: "Frontend Developer" },
    { id: "EMP013", name: "Pooja Verma", role: "HR Manager" },
    { id: "EMP014", name: "Anjali Singh", role: "Project Manager" },
    { id: "EMP015", name: "Arjun Patel", role: "Software Engineer" },
    { id: "EMP016", name: "Ritika Sharma", role: "Business Analyst" },
    { id: "EMP017", name: "Yash Thakur", role: "Cloud Engineer" },
    { id: "EMP018", name: "Deepak Kumar", role: "Security Engineer" },
    { id: "EMP019", name: "Sanya Kapoor", role: "UI Designer" },
    { id: "EMP020", name: "Mohit Verma", role: "Mobile Developer" },
    { id: "EMP021", name: "Aditya Singh", role: "React Developer" },
    { id: "EMP022", name: "Riya Sharma", role: "QA Tester" },
    { id: "EMP023", name: "Kunal Mehra", role: "DevOps Engineer" },
    { id: "EMP024", name: "Aditi Jain", role: "Product Designer" },
    { id: "EMP025", name: "Nitin Sharma", role: "Support Engineer" },
    { id: "EMP026", name: "Harsh Gupta", role: "Full Stack Developer" },
    { id: "EMP027", name: "Komal Verma", role: "Technical Writer" },
    { id: "EMP028", name: "Tarun Singh", role: "Database Engineer" },
    { id: "EMP029", name: "Akash Yadav", role: "Python Developer" },
    { id: "EMP030", name: "Simran Kaur", role: "Team Coordinator" }
  ];

  // 🎯 Randomly Make 24 Members Active
  const membersWithStatus = useMemo(() => {
    return members.map((member, index) => ({
      ...member,
      active: index < 24
    }));
  }, []);

  // 🔍 Search + Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // 🎯 Filtered Members
  const filteredMembers = membersWithStatus.filter((member) => {

    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()) ||
      member.id.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Active"
        ? member.active
        : !member.active;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8">

      {/* Heading */}
      <div className="mb-10">

        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-3xl shadow-lg">
            <Users size={32} />
          </div>

          <div>
            <h1 className="text-5xl font-bold text-gray-800">
              Core Team Members
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Manage and monitor employee activity status
            </p>
          </div>
        </div>

      </div>

      {/* Top Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {/* Total */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl">

          <h2 className="text-gray-500 text-lg">
            Total Members
          </h2>

          <h1 className="text-5xl font-bold text-gray-800 mt-3">
            {members.length}
          </h1>
        </div>

        {/* Active */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-3xl p-6 shadow-xl">

          <h2 className="text-lg text-white/80">
            Active Members
          </h2>

          <h1 className="text-5xl font-bold mt-3">
            24
          </h1>
        </div>

        {/* Offline */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-3xl p-6 shadow-xl">

          <h2 className="text-lg text-white/80">
            Offline Members
          </h2>

          <h1 className="text-5xl font-bold mt-3">
            {members.length - 24}
          </h1>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-6 mb-8">

        <div className="flex flex-col md:flex-row gap-5">

          {/* Search */}
          <div className="flex-1 relative">

            <Search
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by name, role or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/80 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/80 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">
              Total Members
            </option>

            <option value="Active">
              Active Members
            </option>

            <option value="Inactive">
              Offline Members
            </option>

          </select>

        </div>

      </div>

      {/* Members List */}
      <div className="space-y-5">

        {filteredMembers.map((member) => (

          <div
            key={member.id}
            className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:scale-[1.01] transition duration-300"
          >

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

              {/* Left */}
              <div className="flex items-center gap-5">

                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-2xl">
                  <UserCircle2 size={30} />
                </div>

                <div>

                  <div className="flex items-center gap-3">

                    <h2 className="text-2xl font-bold text-gray-800">
                      {member.name}
                    </h2>

                    {/* Status Dot */}
                    <Circle
                      size={14}
                      fill={member.active ? "#22c55e" : "#ef4444"}
                      className={
                        member.active
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    />

                    <span
                      className={`text-sm font-medium ${
                        member.active
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {member.active
                        ? "Active"
                        : "Offline"}
                    </span>

                  </div>

                  <p className="text-gray-500 mt-1">
                    {member.role}
                  </p>

                </div>
              </div>

              {/* Right */}
              <div className="flex flex-wrap gap-4">

                <div className="bg-indigo-100 text-indigo-700 px-5 py-3 rounded-2xl font-semibold">
                  {member.id}
                </div>

                <div
                  className={`px-5 py-3 rounded-2xl font-semibold ${
                    member.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {member.active
                    ? "Currently Working"
                    : "Not Active"}
                </div>

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}