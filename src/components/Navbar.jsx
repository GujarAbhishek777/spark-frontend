import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Flame, Users, HeartHandshake, User, KeyRound, LogOut, ChevronDown } from "lucide-react";
import axiosInstance from "../utils/axiosClient";
import { removeUser } from "../store/userSlice";

const Navbar = ({ setToast }) => {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
    } catch (err) {
      console.log("Logout backend call notice:", err.message);
    } finally {
      dispatch(removeUser());
      if (setToast) setToast({ message: "Logged out successfully!", type: "info" });
      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 glass-nav border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Branding */}
          <Link to={user ? "/feed" : "/login"} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-spark-gradient p-2 flex items-center justify-center shadow-lg shadow-rose-500/25 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white fill-white animate-pulse" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white font-mono">
              SPARK<span className="text-spark-gradient">.</span>
            </span>
          </Link>

          {/* Center Navigation Links (when logged in) */}
          {user && (
            <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
              <Link
                to="/feed"
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive("/feed")
                    ? "bg-spark-gradient text-white shadow-md shadow-rose-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Flame className="w-4 h-4" />
                Explore Feed
              </Link>

              <Link
                to="/requests"
                className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive("/requests")
                    ? "bg-spark-gradient text-white shadow-md shadow-rose-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                Requests
                {requests && requests.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-rose-500 text-white font-bold rounded-full animate-pulse">
                    {requests.length}
                  </span>
                )}
              </Link>

              <Link
                to="/connections"
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive("/connections")
                    ? "bg-spark-gradient text-white shadow-md shadow-rose-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Users className="w-4 h-4" />
                Matches
              </Link>
            </div>
          )}

          {/* Right Section: Profile & Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 rounded-full bg-slate-900/80 border border-slate-700/60 hover:border-rose-500/40 transition-all cursor-pointer"
                >
                  <span className="text-sm font-medium text-slate-200 hidden sm:inline">
                    {user.firstName}
                  </span>
                  <img
                    src={user.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                    alt={user.firstName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-rose-500/40"
                    onError={(e) => {
                      e.target.src = "https://geographyandyou.com/images/user-profile.png";
                    }}
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400 pr-1" />
                </button>

                {/* Profile Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl z-20 overflow-hidden py-2 divide-y divide-slate-800">
                      <div className="px-4 py-3">
                        <p className="text-sm font-bold text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {user.emailId}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
                        >
                          <User className="w-4 h-4 text-rose-400" />
                          View & Edit Profile
                        </Link>
                        <Link
                          to="/profile/password"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
                        >
                          <KeyRound className="w-4 h-4 text-amber-400" />
                          Security & Password
                        </Link>
                      </div>

                      {/* Mobile nav items in dropdown */}
                      <div className="py-1 md:hidden">
                        <Link
                          to="/feed"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70"
                        >
                          <Flame className="w-4 h-4 text-rose-500" />
                          Explore Feed
                        </Link>
                        <Link
                          to="/requests"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70"
                        >
                          <HeartHandshake className="w-4 h-4 text-rose-400" />
                          Requests ({requests?.length || 0})
                        </Link>
                        <Link
                          to="/connections"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70"
                        >
                          <Users className="w-4 h-4 text-orange-400" />
                          Matches
                        </Link>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-spark-gradient shadow-lg shadow-rose-500/25 hover:opacity-95 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
