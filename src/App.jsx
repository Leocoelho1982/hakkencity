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


export default function App() {
  const dispatch = useDispatch();
  const [getSession] = useLazyGetSessionQuery();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user } = await getSession().unwrap();
        dispatch(setUser(user));
      } catch {
        console.log("Sessão não encontrada");
      }
    };
    checkAuth();
  }, [dispatch, getSession]);

  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/map" element={<MapPage />} />
        <Route path="/ar/:poiId" element={<ARCollect onCollected={handleCollect} />} />

      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
