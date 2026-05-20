import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import TeamDashboard from "./pages/TeamDashboard";
import TaskerDashboard from "./pages/TaskerDashboard";

import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Analytics from "./pages/Analytics";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= LOGIN ================= */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* ================= SIGNUP ================= */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= TEAM DASHBOARD ================= */}
        <Route
          path="/team-dashboard"
          element={
            <ProtectedRoute>
              <TeamDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= TASKER DASHBOARD ================= */}
        <Route
          path="/tasker-dashboard"
          element={
            <ProtectedRoute>
              <TaskerDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= TASKS ================= */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* ================= PROJECTS ================= */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        {/* ================= TEAM ================= */}
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />

        {/* ================= ANALYTICS ================= */}
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}