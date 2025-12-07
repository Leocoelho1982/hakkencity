/* eslint-disable */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";             // ✅ CORRIGIDO!
import { useLogoutUserMutation } from "../features/authApi";
import { FiLogOut } from "react-icons/fi";

export default function LogoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutRequest] = useLogoutUserMutation();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logoutRequest().unwrap();   // apaga cookie no backend
      } catch (err) {
        console.warn("Erro ao terminar sessão:", err);
      }

      dispatch(logout());                 // limpa Redux
      setTimeout(() => navigate("/login"), 1500);
    };

    doLogout();
  }, [dispatch, navigate, logoutRequest]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FFF4D4] px-4">
      <FiLogOut className="text-marron-100" size={64} />

      <h1 className="font-title text-3xl text-marron-100 mt-4">
        A terminar sessão…
      </h1>

      <p className="text-marron-80 text-lg mt-2">
        Serás redirecionado em instantes.
      </p>

      <div className="mt-6 animate-pulse">
        <div className="w-14 h-14 border-4 border-marron-100 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
