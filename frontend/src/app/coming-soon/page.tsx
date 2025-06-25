"use client";
import React from "react";
import GradientButton from "@/components/Buttons/gradientBtn";
import { useRouter } from "next/navigation";

const ComingSoon = ({
  title = "Coming Soon",
  message = "We're working hard to launch this feature.",
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-gray-100 to-white">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-gray-600 text-lg mb-8">{message}</p>
      <GradientButton
        handleBtn={() => router.push("/")}
        className="rounded-full px-6 py-2 bg-black text-white hover:bg-gray-800"
      >
        Go Back
      </GradientButton>
    </div>
  );
};

export default ComingSoon;
