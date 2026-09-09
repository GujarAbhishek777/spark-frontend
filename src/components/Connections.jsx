import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Users, Search, MessageSquare, Sparkles, Send, X, ExternalLink } from "lucide-react";
import axiosInstance from "../utils/axiosClient";
import { addConnections } from "../store/connectionSlice";
import { MOCK_CONNECTIONS } from "../utils/constants";

const Connections = ({ setToast }) => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/user/connections");
      const connData = res.data?.data || res.data;
      if (Array.isArray(connData)) {
        dispatch(addConnections(connData));
      } else {
        dispatch(addConnections(MOCK_CONNECTIONS));
      }
    } catch (err) {
      console.log("Connections fetch notice:", err.message);
      dispatch(addConnections(MOCK_CONNECTIONS));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!connections) {
      fetchConnections();
    }
  }, []);

  const filteredConnections = connections?.filter((u) => {
    const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
    const skillsStr = (u.skills || []).join(" ").toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || skillsStr.includes(query);
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatUser) return;

    const userId = activeChatUser._id;
    const currentMsgs = messages[userId] || [
      { text: `Hey ${activeChatUser.firstName}! Glad we matched on Spark! 🔥`, sender: "them", time: "Just now" }
    ];

    const updated = [
      ...currentMsgs,
      { text: inputMessage, sender: "me", time: "Just now" }
    ];

    setMessages({ ...messages, [userId]: updated });
    setInputMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            Spark Connections
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Your Matches ({connections?.length || 0})
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            People you've successfully connected and matched with.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search match or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>
      </div>

      {/* Grid of Connections */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredConnections && filteredConnections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((user) => (
            <div
              key={user._id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between shadow-xl"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={user.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                    alt={user.firstName}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-500/40 shrink-0"
                    onError={(e) => {
                      e.target.src = "https://geographyandyou.com/images/user-profile.png";
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-xs text-rose-400 font-semibold">
                      {user.age ? `${user.age} yrs` : "Matched User"} {user.gender ? `• ${user.gender}` : ""}
                    </p>
                  </div>
                </div>

                {user.about && (
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {user.about}
                  </p>
                )}

                {user.skills && user.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {user.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-orange-300 border border-orange-500/20"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-950/60 border-t border-slate-800/80">
                <button
                  onClick={() => setActiveChatUser(user)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-spark-gradient text-white shadow-md shadow-rose-500/20 hover:opacity-95 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat with {user.firstName}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-10 text-center space-y-4 my-8">
          <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Matches Found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            {searchQuery ? "No matches fit your search criteria." : "Start liking profiles on the feed to get matches!"}
          </p>
          <button
            onClick={() => dispatch(addConnections(MOCK_CONNECTIONS))}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
          >
            Load Demo Connections
          </button>
        </div>
      )}

      {/* Chat Drawer / Modal */}
      {activeChatUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full h-[520px] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeChatUser.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                  alt={activeChatUser.firstName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {activeChatUser.firstName} {activeChatUser.lastName}
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online on Spark
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveChatUser(null)}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900/50">
              {(messages[activeChatUser._id] || [
                { text: `Hi! Great to connect with you on Spark! 🔥`, sender: "them", time: "10:30 AM" }
              ]).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "me"
                        ? "bg-spark-gradient text-white rounded-br-none shadow-md"
                        : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder={`Message ${activeChatUser.firstName}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-spark-gradient text-white hover:opacity-95 cursor-pointer shadow-md shadow-rose-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Connections;
