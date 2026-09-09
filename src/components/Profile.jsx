import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, KeyRound, Edit, RefreshCw } from "lucide-react";
import axiosInstance from "../utils/axiosClient";
import { addUser } from "../store/userSlice";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

const Profile = ({ setToast }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "password"
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/profile/view");
      const profileData = res.data?.data || res.data;
      if (profileData && profileData.emailId) {
        dispatch(addUser(profileData));
      }
    } catch (err) {
      console.log("Profile view fetch notice:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header & Tabs Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Account Settings
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your personal profile and account security settings.
          </p>
        </div>

        <div className="flex bg-slate-900/80 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "edit"
                ? "bg-spark-gradient text-white shadow-md shadow-rose-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            Edit Profile
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "password"
                ? "bg-spark-gradient text-white shadow-md shadow-rose-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            Change Password
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === "edit" ? (
        <EditProfile setToast={setToast} />
      ) : (
        <ChangePassword setToast={setToast} />
      )}

    </div>
  );
};

export default Profile;
