import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import ChatBot from "./components/ChatBot";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/signup";
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/team-dashboard" element={<ProtectedRoute><TeamDashboard /></ProtectedRoute>} />
        <Route path="/tasker-dashboard" element={<ProtectedRoute><TaskerDashboard /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      </Routes>

      {!isAuthPage && isLoggedIn && <ChatBot />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}