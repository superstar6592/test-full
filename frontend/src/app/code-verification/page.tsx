"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const page = () => {
  const router = useRouter();

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return; // Only allow a single digit (0–9)

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    // const fullCode = code.join("");
    // if (fullCode.length !== 6 || fullCode.includes("")) {
    //   alert("Please enter a valid 6-digit code.");
    //   return;
    // }

    // // Optionally validate code here
    // console.log("Verification Code:", fullCode);
    router.push("/reset-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-xl rounded-lg overflow-hidden">
        {/* Left panel */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <Link href="/" className="flex items-center gap-2 mb-6 md:mb-8">
            <Image src="/image/logo.svg" alt="logo" width={30} height={30} />
            <span className="font-bold text-lg">TheFreelanceWebsite</span>
          </Link>

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Recover your account</h1>
          <p className="text-gray-600 mb-1">Check the verification code we sent you via email to</p>
          <p className="text-blue-600 font-medium mb-6 break-all">omarnarazi@example.com</p>

          {/* Verification Code Inputs */}
          <div className="flex justify-between gap-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                pattern="\d*"
                className="w-10 h-12 text-center border-2 border-green-300 rounded-md text-lg focus:outline-none focus:border-blue-500"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
              />
            ))}
          </div>

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2 rounded-md font-medium w-full"
          >
            Confirm
          </button>

          <button className="text-gray-400 mt-4 cursor-not-allowed" disabled>
            Resend Code
          </button>

          <p className="text-sm mt-6 text-center text-gray-500">
            Need any help?{" "}
            <Link href="#" className="text-blue-600 underline">
              Contact Support
            </Link>
          </p>
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 relative hidden md:flex items-center justify-center">
          <div className="absolute w-[150px] h-[150px] md:w-[360px] md:h-[360px] bg-pink-200 rounded-full z- top-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <Image
            src="/image/auth-logo.svg"
            alt="recover"
            width={350}
            height={350}
            className="z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
