import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Flame, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import axiosInstance from "../utils/axiosClient";
import { addUser } from "../store/userSlice";

const Login = ({ setToast }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/login", {
        emailId,
        password,
      });

      const userData = res.data?.data || res.data;
      dispatch(addUser(userData));

      if (setToast) {
        setToast({ message: `Welcome back to Spark! 🔥`, type: "success" });
      }
      navigate("/feed");
    } catch (err) {
      console.log("Login error:", err);
      const errorMsg = err.response?.data?.message || err.response?.data || err.message || "Invalid credentials";
      setError(typeof errorMsg === "string" ? errorMsg : "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Flame Graphic Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-spark-gradient p-3.5 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/30 animate-pulse">
            <Flame className="w-9 h-9 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white font-mono tracking-tight">
              SPARK<span className="text-spark-gradient">.</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Sign in to start matching & connecting
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="developer@spark.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <Link to="/profile/password" className="text-xs text-rose-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold bg-spark-gradient text-white shadow-xl shadow-rose-500/25 hover:opacity-95 transition-all cursor-pointer"
          >
            <LogIn className="w-5 h-5" />
            {loading ? "Signing in..." : "Sign In to Spark"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            Don't have a Spark account yet?{" "}
            <Link to="/signup" className="text-rose-400 font-bold hover:underline ml-1">
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
