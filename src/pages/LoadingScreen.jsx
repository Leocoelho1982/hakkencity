import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo_smartcodi from "../assets/logo_smartcodi.svg"
import papagaio from "../assets/papagaio.png"

export default function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/map"); 
    }, 5500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E8F6FF] via-[#F5F0FF] to-[#FFF8E6]">
      <div className="flex flex-col items-center text-center">
        
        <img src={logo_smartcodi} className="mb-16"  />
        <img src={papagaio} className="mb-10 h-30 w-30" />
        <h1 className="mt-4 text-4xl font-title text-marron-100">Prepare-se para a aventura!</h1>
        <p className="text-marron-100 mt-2 animate-pulse">A carregar...</p>

      </div>
    </div>
  );
}
