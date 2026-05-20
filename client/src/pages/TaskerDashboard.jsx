import React, { useEffect, useState } from "react";
import {
  Play,
  Clock3,
  FolderKanban,
  CheckCircle2,
  LogOut,
  Activity,
  Target,
  CalendarDays,
  Send,
  RefreshCcw
} from "lucide-react";

export default function TaskerDashboard() {

  // ================= USER =================
  const user =
    JSON.parse(localStorage.getItem("user"));

  // ================= STATES =================
  const [seconds, setSeconds] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [isPunchedIn, setIsPunchedIn] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState("");

  const [taskType, setTaskType] =
    useState("");

  const [taskId, setTaskId] =
    useState("");

  const [prompt, setPrompt] =
    useState("");

  const [justificationType, setJustificationType] =
    useState("Without Justification");

  const [justification, setJustification] =
    useState("");

  const [completedTasks, setCompletedTasks] =
    useState(18);

  const [todayHours, setTodayHours] =
    useState(0);

  // ================= PROJECTS =================
  const projects = [
    "260126-text-to-image-compare",
    "260126-text-to-image-h2h",
    "250929-Omni-Elo",
    "250909-text-to-video-h2h",
    "260317-Omni-t2v"
  ];

  // ================= TASK TYPES =================
  const tasks = [
    "Image Validation",
    "Prompt Comparison",
    "Quality Check",
    "AI Response Review",
    "Text Annotation"
  ];

  // ================= TIMER =================
  useEffect(() => {

    let interval;

    if (isRunning) {

      interval = setInterval(() => {

        setSeconds((prev) => {

          const updatedSeconds =
            prev + 1;

          // LIVE HOURS
          setTodayHours(
            (
              updatedSeconds / 3600
            ).toFixed(2)
          );

          return updatedSeconds;

        });

      }, 1000);

    }

    return () => clearInterval(interval);

  }, [isRunning]);

  // ================= FORMAT TIME =================
  const formatTime = (secs) => {

    const hrs =
      String(Math.floor(secs / 3600))
        .padStart(2, "0");

    const mins =
      String(
        Math.floor((secs % 3600) / 60)
      ).padStart(2, "0");

    const sec =
      String(secs % 60)
        .padStart(2, "0");

    return `${hrs}:${mins}:${sec}`;
  };

  // ================= START TASK =================
  const startTask = () => {

    if (
      !selectedProject ||
      !taskType
    ) {

      alert(
        "Please select project and task"
      );

      return;
    }

    setIsRunning(true);
    setIsPunchedIn(true);
  };

  // ================= SUBMIT TASK =================
  const submitTask = () => {

    if (
      !taskId ||
      !prompt
    ) {

      alert(
        "Please fill all required fields"
      );

      return;
    }

    if (
      justificationType ===
        "With Justification" &&
      !justification
    ) {

      alert(
        "Please enter justification"
      );

      return;
    }

    // TASK COUNT UPDATE
    setCompletedTasks(
      (prev) => prev + 1
    );

    // RESET INPUTS ONLY
    setTaskId("");
    setPrompt("");
    setJustification("");

    alert(
      "Task Submitted Successfully ✅"
    );
  };

  // ================= CHANGE PROJECT =================
  const changeProject = () => {

    setSelectedProject("");
    setTaskType("");
    setTaskId("");
    setPrompt("");
    setJustification("");

    setIsRunning(false);
    setIsPunchedIn(false);
  };

  // ================= PUNCH OUT =================
  const handlePunchOut = () => {

    setIsRunning(false);

    alert(`
Punch Out Successful ✅

Working Time:
${formatTime(seconds)}

Completed Tasks:
${completedTasks}
    `);

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      {/* ================= LAYOUT ================= */}
      <div className="flex">

        {/* ================= SIDEBAR ================= */}
        <div className="w-[260px] min-h-screen bg-black text-white p-6 flex flex-col justify-start">

          <h1 className="text-3xl font-bold mb-12">
            TaskFlow
          </h1>

          <div className="space-y-4">

            <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3">
              <FolderKanban size={20} />
              Tasker Dashboard
            </div>

            <div className="p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition cursor-pointer">
              <Activity size={20} />
              Live Tracking
            </div>

            <div className="p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition cursor-pointer">
              <Target size={20} />
              Productivity
            </div>

            <div className="p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition cursor-pointer">
              <CalendarDays size={20} />
              Attendance
            </div>

            {/* LOGOUT - below Attendance in red */}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="flex items-center gap-3 p-4 rounded-xl cursor-pointer bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition w-full"
            >
              <LogOut size={20} />
              Logout
            </button>

          </div>

        </div>

        {/* ================= MAIN ================= */}
        <div className="flex-1 p-8 overflow-y-auto">

          {/* ================= TOP BAR ================= */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6 flex justify-between items-center border border-white/20 mb-8">

            <div>

              <h1 className="text-4xl font-bold text-gray-800">
                Tasker Dashboard 🚀
              </h1>

              <p className="text-gray-500 mt-1">
                Start your tasks and track productivity live
              </p>

            </div>

            <div className="flex items-center gap-5">

              <div className="text-right">

                <h2 className="font-bold text-lg">
                  {user?.name || "Tasker"}
                </h2>

                <p className="text-gray-500 text-sm">
                  {user?.role || "Tasker"}
                </p>

              </div>

              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold">
                {user?.name?.charAt(0) || "T"}
              </div>

            </div>

          </div>

          {/* ================= STATS ================= */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">

            {/* COMPLETED TASKS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Completed Tasks
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-green-600">
                    {completedTasks}
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white">
                  <CheckCircle2 size={30} />
                </div>

              </div>

            </div>

            {/* TIMER */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Live Timer
                  </p>

                  <h2 className="text-3xl font-bold mt-2 text-indigo-600">
                    {formatTime(seconds)}
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                  <Clock3 size={30} />
                </div>

              </div>

            </div>

            {/* PROJECT */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Current Project
                  </p>

                  <h2 className="text-lg font-bold mt-2 text-pink-600 break-all">
                    {selectedProject || "No Project"}
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white">
                  <FolderKanban size={30} />
                </div>

              </div>

            </div>

            {/* HOURS */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Today's Hours
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-yellow-600">
                    {todayHours}h
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Live tracking running
                  </p>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white">
                  <Activity size={30} />
                </div>

              </div>

            </div>

          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* ================= LEFT PANEL ================= */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg">

              {!isPunchedIn ? (

                <>
                  <h2 className="text-2xl font-bold mb-6">
                    Start Task
                  </h2>

                  {/* PROJECT */}
                  <div className="mb-5">

                    <label className="block mb-2 font-medium text-gray-700">
                      Select Project
                    </label>

                    <select
                      value={selectedProject}
                      onChange={(e) =>
                        setSelectedProject(
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">
                        Choose Project
                      </option>

                      {projects.map(
                        (project, index) => (
                          <option
                            key={index}
                            value={project}
                          >
                            {project}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* TASK */}
                  <div className="mb-6">

                    <label className="block mb-2 font-medium text-gray-700">
                      Select Task
                    </label>

                    <select
                      value={taskType}
                      onChange={(e) =>
                        setTaskType(
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">
                        Choose Task
                      </option>

                      {tasks.map(
                        (task, index) => (
                          <option
                            key={index}
                            value={task}
                          >
                            {task}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* START BUTTON */}
                  <button
                    onClick={startTask}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition"
                  >
                    <Play size={20} />
                    Start Tasking
                  </button>

                </>

              ) : (

                <>
                  <h2 className="text-2xl font-bold mb-6">
                    Active Task Session
                  </h2>

                  {/* PROJECT */}
                  <div className="bg-indigo-50 p-5 rounded-2xl mb-5">

                    <p className="text-sm text-gray-500">
                      Project Name
                    </p>

                    <h2 className="text-xl font-bold text-indigo-700 mt-1 break-all">
                      {selectedProject}
                    </h2>

                  </div>

                  {/* JUSTIFICATION */}
                  <div className="mb-5">

                    <label className="block mb-2 font-medium">
                      Justification
                    </label>

                    <select
                      value={justificationType}
                      onChange={(e) =>
                        setJustificationType(
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-3 rounded-2xl"
                    >
                      <option>
                        Without Justification
                      </option>

                      <option>
                        With Justification
                      </option>

                    </select>

                  </div>

                  {/* TASK ID */}
                  <div className="mb-5">

                    <label className="block mb-2 font-medium">
                      Task ID
                    </label>

                    <input
                      type="text"
                      placeholder="Enter Task ID"
                      value={taskId}
                      onChange={(e) =>
                        setTaskId(
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-3 rounded-2xl"
                    />

                  </div>

                  {/* PROMPT */}
                  <div className="mb-5">

                    <label className="block mb-2 font-medium">
                      Write Prompt
                    </label>

                    <textarea
                      rows="5"
                      placeholder="Write your prompt..."
                      value={prompt}
                      onChange={(e) =>
                        setPrompt(
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-3 rounded-2xl resize-none"
                    />

                  </div>

                  {/* JUSTIFICATION TEXT */}
                  {justificationType ===
                    "With Justification" && (

                    <div className="mb-5">

                      <label className="block mb-2 font-medium">
                        Enter Justification
                      </label>

                      <textarea
                        rows="4"
                        placeholder="Write justification..."
                        value={justification}
                        onChange={(e) =>
                          setJustification(
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 px-4 py-3 rounded-2xl resize-none"
                      />

                    </div>

                  )}

                  {/* BUTTONS */}
                  <div className="grid md:grid-cols-3 gap-4">

                    {/* SUBMIT */}
                    <button
                      onClick={submitTask}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition"
                    >
                      <Send size={18} />
                      Submit
                    </button>

                    {/* CHANGE PROJECT */}
                    <button
                      onClick={changeProject}
                      className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition"
                    >
                      <RefreshCcw size={18} />
                      Change
                    </button>

                    {/* PUNCH OUT */}
                    <button
                      onClick={handlePunchOut}
                      className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition"
                    >
                      <LogOut size={18} />
                      Punch Out
                    </button>

                  </div>

                </>

              )}

            </div>

            {/* ================= RIGHT PANEL ================= */}
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg">

              <h2 className="text-2xl font-bold mb-6">
                Current Session
              </h2>

              <div className="space-y-6">

                {/* PROJECT */}
                <div className="bg-indigo-50 rounded-2xl p-5">

                  <p className="text-gray-500 text-sm">
                    Project Name
                  </p>

                  <h2 className="text-xl font-bold mt-1 text-indigo-700 break-all">
                    {selectedProject ||
                      "No Project Selected"}
                  </h2>

                </div>

                {/* TASK */}
                <div className="bg-purple-50 rounded-2xl p-5">

                  <p className="text-gray-500 text-sm">
                    Task Name
                  </p>

                  <h2 className="text-xl font-bold mt-1 text-purple-700">
                    {taskType ||
                      "No Task Selected"}
                  </h2>

                </div>

                {/* TIMER */}
                <div className="bg-pink-50 rounded-2xl p-5">

                  <p className="text-gray-500 text-sm">
                    Working Time
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-pink-600">
                    {formatTime(seconds)}
                  </h2>

                </div>

                {/* STATUS */}
                <div className="bg-green-50 rounded-2xl p-5">

                  <p className="text-gray-500 text-sm">
                    Task Status
                  </p>

                  <h2 className="text-xl font-bold mt-2 text-green-600">
                    {isRunning
                      ? "Task Running 🟢"
                      : "Stopped 🔴"}
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}