import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, MessageCircle, X } from "lucide-react";
import confetti from "canvas-confetti";

const MatchModal = ({ matchUser, loggedInUser, onClose }) => {
  useEffect(() => {
    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff4458", "#ff6b4a", "#ff8e53", "#ffffff"],
      });
    } catch (e) {
      console.log("Confetti trigger notice:", e);
    }
  }, []);

  if (!matchUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-center space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex p-3 rounded-2xl bg-spark-gradient text-white shadow-lg shadow-rose-500/40 animate-bounce">
          <Sparkles className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-3xl font-black text-spark-gradient font-mono tracking-wide">
            IT'S A MATCH!
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            You and <span className="font-bold text-white">{matchUser.firstName}</span> liked each other!
          </p>
        </div>

        {/* Overlapping Profile Avatars */}
        <div className="flex items-center justify-center gap-2 py-4">
          <div className="relative">
            <img
              src={loggedInUser?.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
              alt={loggedInUser?.firstName}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-rose-500 shadow-xl"
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center -mx-4 z-10 shadow-lg">
            <Flame className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <div className="relative">
            <img
              src={matchUser.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
              alt={matchUser.firstName}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-500 shadow-xl"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/connections"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold bg-spark-gradient text-white shadow-lg shadow-rose-500/30 hover:opacity-95 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            View Connections & Chat
          </Link>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            Keep Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
