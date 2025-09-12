import { Link } from "react-router-dom";
import background from "../assets/background.png";
import coin from "../assets/coin.png";

export default function NotFoundPage() {
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-sm bg-[#FFF4D6] rounded-3xl shadow-xl p-6 border-4 border-marron-100 text-center">
        <img src={coin} alt="Coin" className="h-16 w-16 mx-auto mb-4" />
        <h1 className="text-4xl font-title text-marron-100 mb-2">404</h1>
        <p className="text-lg font-semibold text-marron-100 mb-6">
          Oops! Página não encontrada.
        </p>

        <Link
          to="/login"
          className="inline-block bg-marron-40 text-white font-title text-lg px-6 py-3 rounded-full shadow-md hover:bg-marron-60 transition"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
