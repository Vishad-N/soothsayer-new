"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LottiePlayer({ src }: { src: string }) {
  return <DotLottieReact src={src} loop autoplay style={{ width: "100%", height: "100%" }} />;
}
