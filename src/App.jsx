import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetSessionQuery } from "./features/authApi";
import { setUser, logoutUser } from "./features/userSlice";
import { Routes, Route } from "react-router-dom";

import LoadingScreen from "./pages/LoadingScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./pages/PrivateRoute";
import MapPage from "./pages/MapPage";
import NotFoundPage from "./pages/NotFoundPage";
import ARCollect from "./pages/ARCollect";
import ProfilePage from "./pages/ProfilePage";
import ApiTest from "./pages/ApiTest";
import LogoutPage from "./pages/LogoutPage";
import WalletPage from "./pages/WalletPage";
import POIProgressPage from "./pages/POIProgressPage";
import LeaderboardPage from "./pages/LeaderboardPage";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./pages/admin/AdminRoute";
import UsersPage from "./pages/admin/UsersPage";
import CitiesPage from "./pages/admin/CitiesPage";

export default function App() {
  const dispatch = useDispatch();
  const [getSession] = useLazyGetSessionQuery();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getSession().unwrap();
        console.log("📌 /me RESPONSE:", res);
        dispatch(setUser(res.user));
      } catch (err) {
        console.log("❌ Sessão não encontrada:", err);
        dispatch(logoutUser()); // 👈 ESSENCIAL
      }
    };

    checkAuth();
  }, [dispatch, getSession]);

  function handleCollect(poiId) {
    console.log("Recolheu via AR:", poiId);
  }

  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/test-api" element={<ApiTest />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* ROTAS PROTEGIDAS */}
      <Route element={<PrivateRoute />}>
        <Route path="/map" element={<MapPage />} />
        <Route path="/ar/:poiId" element={<ARCollect onCollected={handleCollect} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/pois" element={<POIProgressPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/cities" element={<CitiesPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
