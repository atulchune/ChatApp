import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2,Eye,EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signup(formData);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-1 bg-[#5B6670]/10 text-black">
            {/* left side */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8 p-8 rounded-sm bg-white shadow-2xl">
                    {/* LOGO */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="size-12 rounded-xl  flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                            >
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl text-black font-bold mt-2">Create Account</h1>
                            <p className="text-black/30">Get started with your free account</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 " />
                                </div>
                                <input
                                    type="text"
                                    className={` input-field w-full pl-10 p-2 `}
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 " />
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
                        <button type="submit" className="btn-login w-full rounded-sm cursor-pointer" disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <div className="flex justify-center items-center gap-2">
                                        <Loader2 className="size-5 animate-spin" />
                                        Loading...
                                    </div>
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-black">
                            Already have an account?{" "}
                            <Link to="/login" className="hover-a font-semibold text-gray-800 hover:font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default SignUpPage;
