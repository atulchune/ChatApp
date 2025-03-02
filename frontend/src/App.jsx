
import React from 'react'
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from './layout';
// import { Loader } from "lucide-react";

import { LoaderIcon } from 'react-hot-toast';
const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme}>
      {/* <Navbar /> */}
      <Routes>
        {/* public route */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        {/* protected route */}
        <Route path="/settings" element={authUser ? <Layout><SettingsPage /></Layout>:<Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <Layout><ProfilePage /></Layout> : <Navigate to="/login" />} />
        <Route path="/" element={authUser ? <Layout><HomePage /></Layout> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App