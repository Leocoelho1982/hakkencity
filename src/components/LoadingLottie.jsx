/* eslint-disable */
import Lottie from "lottie-react";
import loadingAnim from "../assets/animations/loading.json";

export default function LoadingLottie() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#FFF4D6]">
      <div className="w-40">
        <Lottie animationData={loadingAnim} loop={true} />
      </div>
    </div>
  );
}
