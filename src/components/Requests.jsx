import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Check, X, HeartHandshake, Sparkles, Inbox } from "lucide-react";
import axiosInstance from "../utils/axiosClient";
import { addRequests, removeRequest } from "../store/requestSlice";
import MatchModal from "./MatchModal";
import { MOCK_REQUESTS } from "../utils/constants";

const Requests = ({ setToast }) => {
  const requests = useSelector((store) => store.requests);
  const loggedInUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [matchUser, setMatchUser] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/user/requests/received");
      const reqData = res.data?.data || res.data;
      if (Array.isArray(reqData)) {
        dispatch(addRequests(reqData));
      } else {
        dispatch(addRequests(MOCK_REQUESTS));
      }
    } catch (err) {
      console.log("Requests fetch notice:", err.message);
      dispatch(addRequests(MOCK_REQUESTS));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!requests) {
      fetchRequests();
    }
  }, []);

  const reviewRequest = async (status, requestId, fromUser) => {
    try {
      await axiosInstance.post(`/request/review/${status}/${requestId}`);
      dispatch(removeRequest(requestId));

      if (status === "accepted") {
        setMatchUser(fromUser);
        if (setToast) {
          setToast({
            message: `You accepted ${fromUser.firstName}'s request!`,
            type: "success",
          });
        }
      } else {
        if (setToast) {
          setToast({
            message: `Declined request from ${fromUser.firstName}`,
            type: "info",
          });
        }
      }
    } catch (err) {
      console.log("Review request notice:", err.message);
      dispatch(removeRequest(requestId));
      if (status === "accepted") {
        setMatchUser(fromUser);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Match Popup Modal */}
      {matchUser && (
        <MatchModal
          matchUser={matchUser}
          loggedInUser={loggedInUser}
          onClose={() => setMatchUser(null)}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            Connection Requests
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Interested in You
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            People who expressed interest in connecting with you on Spark.
          </p>
        </div>

        <button
          onClick={fetchRequests}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
        >
          Refresh Requests
        </button>
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : requests && requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => {
            const user = req.fromUserId;
            if (!user) return null;

            return (
              <div
                key={req._id}
                className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="flex gap-4">
                  <img
                    src={user.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                    alt={user.firstName}
                    className="w-20 h-20 rounded-2xl object-cover ring-2 ring-rose-500/30 shrink-0"
                    onError={(e) => {
                      e.target.src = "https://geographyandyou.com/images/user-profile.png";
                    }}
                  />

                  <div className="space-y-1 min-w-0">
                    <h3 className="text-xl font-bold text-white truncate">
                      {user.firstName} {user.lastName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold">
                      {user.age && <span>{user.age} yrs</span>}
                      {user.gender && <span className="capitalize">• {user.gender}</span>}
                    </div>
                    {user.about && (
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {user.about}
                      </p>
                    )}
                  </div>
                </div>

                {/* Skills tags */}
                {user.skills && user.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {user.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-rose-300 border border-rose-500/20"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => reviewRequest("rejected", req._id, user)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800/80 text-slate-300 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-500/40 border border-slate-700/50 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    Decline
                  </button>
                  <button
                    onClick={() => reviewRequest("accepted", req._id, user)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-spark-gradient text-white shadow-lg shadow-rose-500/20 hover:opacity-95 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    Accept Match
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-10 text-center space-y-4 my-8">
          <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Pending Requests</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            When other Spark users express interest in your profile, their requests will appear here for you to accept.
          </p>
          <button
            onClick={() => dispatch(addRequests(MOCK_REQUESTS))}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
          >
            Load Sample Requests
          </button>
        </div>
      )}

    </div>
  );
};

export default Requests;
