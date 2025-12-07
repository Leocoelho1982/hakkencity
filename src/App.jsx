import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { setUser, logoutUser } from "./features/userSlice";
import { useLazyGetSessionQuery } from "./features/authApi";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MapPage from "./pages/MapPage";
import PrivateRoute from "./pages/PrivateRoute";

export default function App() {
  const dispatch = useDispatch();
  const [checkSession, { isLoading }] = useLazyGetSessionQuery();

  const [booting, setBooting] = useState(true); 
  // controla o estado inicial enquanto a sessão carrega

  useEffect(() => {
    async function loadSession() {
      try {
        const res = await checkSession().unwrap();  // GET /users/me
        dispatch(setUser(res.user));                // user completo
      } catch {
        dispatch(logoutUser());                     // sessão inválida
      } finally {
        setBooting(false);                          // terminou o boot
      }
    }

    loadSession();
  }, [dispatch, checkSession]);

  // Enquanto o App está a validar a sessão, aparece um loading simples
  if (booting || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-marron-100 font-title">
        A carregar...
      </div>
    );
  }

  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* REGISTO */}
      <Route path="/register" element={<RegisterPage />} />

      {/* ROTA PRIVADA */}
      <Route
        path="/map"
        element={
          <PrivateRoute>
            <MapPage />
          </PrivateRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/map" />} />
    </Routes>
  );
}
