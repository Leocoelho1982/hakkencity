export default function HomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FFF4D6]">
      <h1 className="text-4xl font-title text-[#5A2C0A]">Hakken City</h1>
      <a
        href="/map"
        className="mt-6 px-6 py-3 rounded-2xl bg-[#F19938] text-white font-bold shadow hover:bg-[#e68d2f]"
      >
        Jogar
      </a>
    </div>
  );
}
