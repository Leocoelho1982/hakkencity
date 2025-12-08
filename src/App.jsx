import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetSessionQuery } from "./features/authApi";
import { setUser } from "./features/userSlice";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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



      <Route element={<PrivateRoute />}>
        <Route path="/map" element={<MapPage />} />
        <Route path="/ar/:poiId" element={<ARCollect onCollected={handleCollect} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/pois" element={<POIProgressPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
