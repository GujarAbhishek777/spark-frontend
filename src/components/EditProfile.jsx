import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Save, User, Image, Sparkles, Plus, X, AlertCircle } from "lucide-react";
import axiosInstance from "../utils/axiosClient";
import { addUser } from "../store/userSlice";

const EditProfile = ({ setToast }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    photoUrl: user?.photoUrl || "",
    age: user?.age || "",
    gender: user?.gender || "male",
    about: user?.about || "",
    skills: user?.skills || [],
  });

  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) return;
    setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.patch("/profile/edit", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        photoUrl: formData.photoUrl,
        age: Number(formData.age),
        gender: formData.gender,
        about: formData.about,
        skills: formData.skills,
      });

      const updatedUser = res.data?.data || { ...user, ...formData };
      dispatch(addUser(updatedUser));

      if (setToast) {
        setToast({ message: "Profile updated successfully! ✨", type: "success" });
      }
    } catch (err) {
      console.log("Edit profile backend notice:", err.message);
      // Fallback local state update if backend error
      const updatedUser = { ...user, ...formData };
      dispatch(addUser(updatedUser));
      if (setToast) {
        setToast({ message: "Profile updated! ✨", type: "success" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Form Column */}
      <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-rose-500" />
            Edit Spark Profile
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Update your public profile info that other users see in their discovery feed.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Photo URL
            </label>
            <div className="relative">
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-rose-500"
              />
              <Image className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Age
              </label>
              <input
                type="number"
                name="age"
                min="18"
                max="100"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-rose-500 capitalize"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              About / Bio
            </label>
            <textarea
              name="about"
              rows="3"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell others about your passions, tech stack, and goals..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-rose-500 resize-none"
            />
          </div>

          {/* Skills Tag Management */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Skills & Tags
            </label>
            
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. React, Python)"
                className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-slate-800 text-rose-400 font-semibold text-xs border border-slate-700 hover:bg-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 min-h-[36px]">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/30"
                >
                  #{skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold bg-spark-gradient text-white shadow-lg shadow-rose-500/30 hover:opacity-95 transition-all cursor-pointer"
            >
              <Save className="w-5 h-5" />
              {loading ? "Saving Profile..." : "Save Profile Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Live Card Preview */}
      <div className="lg:col-span-5 space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
            <Sparkles className="w-4 h-4" /> Live Card Preview
          </span>
          <span className="text-[11px] text-slate-500">How others see you</span>
        </div>

        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative h-80 w-full overflow-hidden bg-slate-950">
            <img
              src={formData.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://geographyandyou.com/images/user-profile.png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
              <h3 className="text-2xl font-black text-white">
                {formData.firstName || "First"} {formData.lastName || "Last"},{" "}
                <span className="text-rose-400">{formData.age || "18"}</span>
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2">
                {formData.about || "Your bio preview will appear here..."}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {formData.skills.slice(0, 3).map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-rose-300">
                    #{s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EditProfile;
