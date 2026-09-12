import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import appStore from "./store/appStore";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Toast from "./components/Toast";
import axiosInstance from "./utils/axiosClient";
import { addUser, removeUser } from "./store/userSlice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicAuthRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  if (user) {
    return <Navigate to="/feed" replace />;
  }
  return children;
};

const MainLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [toast, setToast] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axiosInstance.get("/profile/view");
        const userData = res.data?.data || res.data;
        if (userData && userData.emailId) {
          dispatch(addUser(userData));
        } else {
          dispatch(removeUser());
        }
      } catch (err) {
        console.log("Session check notice:", err.message);
        dispatch(removeUser());
      } finally {
        setInitializing(false);
      }
    };
    fetchSession();
  }, [dispatch]);

  if (initializing) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-spark-gradient p-2.5 animate-pulse flex items-center justify-center">
            <span className="text-white font-mono font-black text-xl">S</span>
          </div>
          <span className="text-xs font-semibold text-slate-400">Launching Spark...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar setToast={setToast} />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/feed" replace /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={
              <PublicAuthRoute>
                <Login setToast={setToast} />
              </PublicAuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicAuthRoute>
                <Signup setToast={setToast} />
              </PublicAuthRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed setToast={setToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests setToast={setToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connections"
            element={
              <ProtectedRoute>
                <Connections setToast={setToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile setToast={setToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/password"
            element={
              <ProtectedRoute>
                <Profile setToast={setToast} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 glass-nav">
        <p>Spark Dating & Tech Connections © 2026. Powered by ScaleWithAbhi.</p>
      </footer>

      {/* Global Toast Alerts */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
