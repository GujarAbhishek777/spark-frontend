import React, { useState } from "react";
import { Heart, X, Sparkles, MapPin, Briefcase, Info, BadgeCheck } from "lucide-react";

const UserCard = ({ user, onAction, animationClass = "" }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;

  return (
    <>
      <div
        className={`relative w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 ${animationClass}`}
      >
        {/* Photo Container */}
        <div className="relative h-[420px] w-full overflow-hidden bg-slate-950">
          <img
            src={photoUrl || "https://geographyandyou.com/images/user-profile.png"}
            alt={`${firstName} ${lastName || ""}`}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.src = "https://geographyandyou.com/images/user-profile.png";
            }}
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Pill Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/70 text-slate-200 border border-slate-700/60 backdrop-blur-md">
                {gender ? gender.toUpperCase() : "SPARK MATCH"}
              </span>
              {age && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/80 text-white border border-rose-400/40 backdrop-blur-md">
                  {age} yrs
                </span>
              )}
            </div>

            <button
              onClick={() => setShowDetailModal(true)}
              className="p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-md transition-colors"
              title="View full profile info"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Card Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                {firstName} {lastName}
                <BadgeCheck className="w-6 h-6 text-rose-500 inline" />
              </h2>
            </div>

            {about && (
              <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
                {about}
              </p>
            )}

            {/* Skills Badges */}
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skills.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 text-rose-300 border border-rose-500/20"
                  >
                    #{skill}
                  </span>
                ))}
                {skills.length > 4 && (
                  <span className="px-2 py-1 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-400">
                    +{skills.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="p-5 bg-slate-900 border-t border-slate-800/80 flex items-center justify-evenly gap-4">
          
          {/* Pass / Ignore Button */}
          <button
            onClick={() => onAction("ignored", _id)}
            className="group flex items-center justify-center w-14 h-14 rounded-full bg-slate-800 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
            title="Pass / Ignore"
          >
            <X className="w-7 h-7 stroke-[2.5]" />
          </button>

          {/* Super Interested / Like Button */}
          <button
            onClick={() => onAction("interested", _id)}
            className="group flex items-center justify-center w-16 h-16 rounded-full bg-spark-gradient text-white shadow-xl shadow-rose-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            title="Interested / Like"
          >
            <Heart className="w-8 h-8 fill-white stroke-[2.5]" />
          </button>

        </div>
      </div>

      {/* Expanded Profile Info Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <div className="relative h-64 overflow-hidden">
              <img
                src={photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                alt={firstName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {firstName} {lastName}, <span className="text-rose-400">{age}</span>
                </h3>
                <p className="text-xs text-slate-400 capitalize mt-1">{gender || "Not specified"}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">About</h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                  {about || "No bio added yet."}
                </p>
              </div>

              {skills && skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Skills & Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 text-xs rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/30 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    onAction("ignored", _id);
                  }}
                  className="flex-1 py-3 rounded-xl font-bold bg-slate-800 text-rose-400 hover:bg-slate-700 transition-colors"
                >
                  Pass
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    onAction("interested", _id);
                  }}
                  className="flex-1 py-3 rounded-xl font-bold bg-spark-gradient text-white shadow-lg shadow-rose-500/30"
                >
                  Interested
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
