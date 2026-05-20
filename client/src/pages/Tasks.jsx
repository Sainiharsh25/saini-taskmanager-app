import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardList,
  CalendarDays,
  User,
  PlusCircle,
  CheckCircle2,
  Clock3,
  AlertTriangle
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    status: "Pending"
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/tasks`
      );

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateTask = async () => {
    try {
      await axios.post(
        `${API_URL}/api/tasks`,
        form
      );

      alert("Task created successfully");

      setForm({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
        status: "Pending"
      });

      fetchTasks();

    } catch (error) {
      alert("Task creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-gray-800">
          Task Management
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Create, manage and track all team tasks
        </p>
      </div>

      {/* Create Task Form */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-8 mb-10">

        <div className="flex items-center gap-3 mb-6">
          <PlusCircle className="text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-800">
            Create New Task
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Title */}
          <div className="relative">
            <ClipboardList
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              name="title"
              placeholder="Task Title"
              className="w-full pl-12 p-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          {/* Assign To */}
          <div className="relative">
            <User
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              name="assignedTo"
              placeholder="Assign To (Team)"
              className="w-full pl-12 p-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={form.assignedTo}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Task Description"
            className="md:col-span-2 p-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
            value={form.description}
            onChange={handleChange}
          />

          {/* Due Date */}
          <div className="relative">
            <CalendarDays
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              type="date"
              name="dueDate"
              className="w-full pl-12 p-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          {/* Status */}
          <select
            name="status"
            className="p-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={form.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

        </div>

        {/* Button */}
        <button
          onClick={handleCreateTask}
          className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition duration-300 font-semibold"
        >
          + Create Task
        </button>

      </div>

      {/* Task List */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              All Tasks
            </h2>

            <p className="text-gray-500 mt-1">
              Track all project activities
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 rounded-2xl shadow-lg">
            {tasks.length} Tasks
          </div>
        </div>

        <div className="space-y-5">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white/80 border border-white/30 rounded-3xl p-6 shadow-md hover:shadow-2xl hover:scale-[1.01] transition duration-300"
            >

              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">

                {/* Left */}
                <div className="flex-1">

                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-2xl">
                      <ClipboardList size={22} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800">
                      {task.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-7">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-5">

                    <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <User size={15} />
                      {task.assignedTo}
                    </div>

                    <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <CalendarDays size={15} />
                      {task.dueDate}
                    </div>

                  </div>
                </div>

                {/* Right */}
                <div>

                  {task.status === "Completed" && (
                    <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
                      <CheckCircle2 size={18} />
                      Completed
                    </div>
                  )}

                  {task.status === "Pending" && (
                    <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
                      <AlertTriangle size={18} />
                      Pending
                    </div>
                  )}

                  {task.status === "In Progress" && (
                    <div className="bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
                      <Clock3 size={18} />
                      In Progress
                    </div>
                  )}

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}