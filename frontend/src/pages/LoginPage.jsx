import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Loader2,EyeOff,Eye, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-1 bg-[#5B6670]/10 text-black">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center  sm:p-12">
        <div className="w-full max-w-md space-y-8 rounded-sm p-6 bg-white shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl  flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="w-6 h-6" color="#FF9F43" />
              </div>
              <h1 className="text-2xl font-bold text-black mt-2">Welcome Back</h1>
              <p className="text-black/30">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className=" font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  className={` input-field w-full pl-10 p-2 `}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 " />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field text-black w-full pl-10 p-2"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                {/* Eye icon for toggling visibility */}
                <div
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="w-6 h-6 text-gray-600" />
                  ) : (
                    <Eye className="w-6 h-6 text-gray-600" />
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className="btn-login w-full rounded-sm cursor-pointer" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </div>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-black">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="hover-a font-semibold text-gray-800 hover:font-semibold">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;