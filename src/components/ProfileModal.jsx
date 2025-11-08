import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import avatarFallback from "../assets/avatar.jpg";
import closeIcon from "../assets/bt_close.png";

export default function ProfileModal({ setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    localStorage.removeItem("hakkenUser");
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-gradient-to-b from-gold-20 to-gold-60 rounded-3xl shadow-xl w-xl m-4 border-4 border-marron-100 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-marron-100"
        >
          <img src={closeIcon} alt="Fechar" className="h-6 w-6" />
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={user?.image || avatarFallback}
            alt="Avatar"
            className="w-24 h-24 rounded-2xl border-4 border-marron-100 object-cover mb-2"
          />
          <h2 className="text-marron-100 font-title text-xl">
            {user?.username || "Jogador"}
          </h2>
          {user?.email && (
            <p className="text-sm text-marron-100/70">{user.email}</p>
          )}
        </div>

        <hr className="border-marron-100/30 my-4" />

        {/* Pontos ou estatísticas */}
        <div className="text-center text-marron-100 font-semibold mb-4">
          <p>🏅 Pontos: {user?.points ?? 0}</p>
        </div>

        {/* Botão Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-marron-40 text-white font-title py-2 rounded-full hover:bg-marron-60 transition"
        >
          Terminar Sessão
        </button>
      </div>
    </div>
  );
}
