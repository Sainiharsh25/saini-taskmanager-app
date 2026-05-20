import React, { useState } from "react";
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  Save,
  Search,
  CalendarDays,
  Users
} from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "260126-text-to-image-compare",
      members: 5,
      status: "Active",
      date: "12 May 2026"
    },
    {
      id: 2,
      name: "260126-text-to-image-h2h",
      members: 8,
      status: "Completed",
      date: "18 May 2026"
    },
    {
      id: 3,
      name: "250929-Omni-Elo",
      members: 4,
      status: "In Progress",
      date: "22 May 2026"
    },
    {
      id: 4,
      name: "250909-text-to-video-h2h",
      members: 7,
      status: "Pending",
      date: "25 May 2026"
    },
    {
      id: 5,
      name: "260317-Omni-t2v",
      members: 10,
      status: "Active",
      date: "30 May 2026"
    }
  ]);

  const [newProject, setNewProject] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add Project
  const addProject = () => {
    if (!newProject.trim()) return;

    const newItem = {
      id: Date.now(),
      name: newProject,
      members: Math.floor(Math.random() * 10) + 1,
      status: "Active",
      date: new Date().toLocaleDateString()
    };

    setProjects([newItem, ...projects]);
    setNewProject("");
  };

  // Delete Project
  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Start Edit
  const startEdit = (project) => {
    setEditId(project.id);
    setEditText(project.name);
  };

  // Save Edit
  const saveEdit = () => {
    setProjects(
      projects.map((p) =>
        p.id === editId
          ? { ...p, name: editText }
          : p
      )
    );

    setEditId(null);
    setEditText("");
  };

  // Search Filter
  const filteredProjects = projects.filter((project) =>
    project.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <FolderKanban className="text-indigo-600" />
            Projects
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your team projects easily
          </p>
        </div>

        <div className="bg-white px-5 py-3 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500">
            Total Projects
          </p>

          <h2 className="text-2xl font-bold text-indigo-600">
            {projects.length}
          </h2>
        </div>
      </div>

      {/* Top Controls */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">

        {/* Add Project */}
        <div className="bg-white p-5 rounded-2xl shadow-md">

          <h2 className="font-semibold text-lg mb-4">
            Create New Project
          </h2>

          <div className="flex gap-3">

            <input
              value={newProject}
              onChange={(e) =>
                setNewProject(e.target.value)
              }
              placeholder="Enter project name..."
              className="border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition p-3 rounded-xl w-full outline-none"
            />

            <button
              onClick={addProject}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-xl flex items-center gap-2 transition"
            >
              <Plus size={18} />
              Add
            </button>

          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-5 rounded-2xl shadow-md">

          <h2 className="font-semibold text-lg mb-4">
            Search Projects
          </h2>

          <div className="relative">

            <Search
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search project..."
              className="border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition p-3 pl-10 rounded-xl w-full outline-none"
            />

          </div>
        </div>

      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100"
          >

            {/* Top */}
            <div className="flex justify-between items-start mb-5">

              <div className="flex items-center gap-3">

                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl">
                  <FolderKanban size={24} />
                </div>

                <div>

                  {editId === project.id ? (
                    <input
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                      className="border rounded-lg px-3 py-1 outline-none"
                    />
                  ) : (
                    <h2 className="font-bold text-lg text-gray-800">
                      {project.name}
                    </h2>
                  )}

                  <p className="text-sm text-gray-500">
                    Project Management
                  </p>

                </div>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  project.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : project.status === "Pending"
                    ? "bg-red-100 text-red-600"
                    : project.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-3 mb-6">

              <div className="flex items-center gap-2 text-gray-600">
                <Users size={16} />
                <span>{project.members} Team Members</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <CalendarDays size={16} />
                <span>{project.date}</span>
              </div>

            </div>

            {/* Actions */}
            <div className="flex gap-3">

              {editId === project.id ? (
                <button
                  onClick={saveEdit}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Save size={16} />
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(project)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              )}

              <button
                onClick={() =>
                  deleteProject(project.id)
                }
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white mt-10 p-10 rounded-3xl shadow text-center">
          <FolderKanban
            size={60}
            className="mx-auto text-gray-300 mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-700">
            No Projects Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching another project name.
          </p>
        </div>
      )}
    </div>
  );
}