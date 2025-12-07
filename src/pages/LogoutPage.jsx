/* eslint-disable */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Limpa Redux imediatamente
    dispatch(logoutUser());

    // Chama logout no backend para limpar cookie
    fetch("https://api.hakkencity.com/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    // Redireciona com delay
    const timer = setTimeout(() => navigate("/login"), 1500);
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FFF4D6] px-6">

      <div className="bg-white/90 border-4 border-[#5A2C0A] rounded-3xl p-10 shadow-xl text-center max-w-xs">
        
        <FiLogOut className="text-[#8B3A1A] mx-auto mb-4" size={64} />

        <h1 className="text-2xl font-title text-marron-100 mb-2">
          A sair da aventura...
        </h1>

        <p className="text-marron-80 text-sm">
          Até breve, explorador! 👋  
        </p>

        <div className="mt-6 animate-pulse text-3xl">🚪</div>
      </div>

    </div>
  );
}
