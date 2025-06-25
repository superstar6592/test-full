"use client";

import React from "react";
import Link from "next/link";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

  const handleBackToLogin = () => {
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9] flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-xl p-10 text-center flex flex-col items-center gap-6">
        <IoCheckmarkCircleOutline className="text-green-500 text-6xl" />

        <h1 className="text-2xl font-semibold text-gray-800">
          Password Reset Successful
        </h1>
        <p className="text-gray-600">
          Your password has been updated. You can now sign in with your new credentials.
        </p>

        <button
          onClick={handleBackToLogin}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-all"
        >
          Back to Sign In
        </button>

        <p className="text-sm text-gray-400 mt-4">
          Didn't reset your password?{" "}
          <Link href="/contact" className="text-blue-500 underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}

export default page