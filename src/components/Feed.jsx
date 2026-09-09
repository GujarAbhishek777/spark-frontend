import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flame, RefreshCw, Sparkles, AlertCircle } from "lucide-react";
import axiosInstance from "../utils/axiosClient";
import { addFeed, removeUserFromFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = ({ setToast }) => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [swipeAnimation, setSwipeAnimation] = useState("");

  const getFeed = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/feed");
      const feedData = res.data?.data || res.data;
      if (Array.isArray(feedData)) {
        dispatch(addFeed(feedData));
      } else {
        dispatch(addFeed([]));
      }
    } catch (err) {
      console.log("Feed fetch error:", err.message);
      dispatch(addFeed([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  const handleAction = async (status, userId) => {
    // Trigger animation state
    setSwipeAnimation(status === "interested" ? "card-swipe-like" : "card-swipe-pass");

    try {
      const res = await axiosInstance.post(`/request/send/${status}/${userId}`);
      if (setToast) {
        setToast({
          message: status === "interested" ? "Sent Interested request! 💖" : "Ignored profile ✖️",
          type: status === "interested" ? "success" : "info",
        });
      }
    } catch (err) {
      console.log("Send request notice:", err.message);
      if (setToast) {
        setToast({
          message: status === "interested" ? "Marked as Interested! 💖" : "Passed profile ✖️",
          type: status === "interested" ? "success" : "info",
        });
      }
    }

    // Remove current user from top of stack after animation
    setTimeout(() => {
      dispatch(removeUserFromFeed(userId));
      setSwipeAnimation("");
    }, 300);
  };

  if (loading && !feed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="w-14 h-14 rounded-full bg-spark-gradient p-3 animate-spin flex items-center justify-center">
          <Flame className="w-8 h-8 text-white fill-white" />
        </div>
        <p className="text-slate-400 font-medium animate-pulse">Finding incredible profiles for you...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      
      {/* Header Banner */}
      <div className="text-center mb-6 space-y-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Spark Discovery Feed
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Swipe & Connect
        </h1>
      </div>

      {/* Main Card Stack or Empty Feed */}
      {feed && feed.length > 0 ? (
        <div className="w-full flex justify-center relative min-h-[560px]">
          <UserCard
            key={feed[0]._id}
            user={feed[0]}
            onAction={handleAction}
            animationClass={swipeAnimation}
          />
        </div>
      ) : (
        <div className="max-w-md w-full glass-card rounded-3xl p-8 text-center space-y-5 border border-slate-800 shadow-2xl my-10">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 mx-auto flex items-center justify-center text-rose-500">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">No More Profiles</h3>
            <p className="text-sm text-slate-400 mt-2">
              You've reviewed all available profiles for now. Check back later or refresh your feed!
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={getFeed}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold bg-spark-gradient text-white shadow-lg shadow-rose-500/25 hover:opacity-95 transition-all cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Feed
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Feed;
