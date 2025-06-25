'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ComingSoon(): JSX.Element {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-full max-w-sm">
        <img
          src="/image/logo.svg"
          alt="Logo"
          className="w-20 mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🚀 Coming Soon</h1>
        <p className="text-lg text-gray-600 mb-1">We’re launching something amazing.</p>
        <p className="text-sm text-gray-500 mb-6">Hang tight — it’s worth the wait!</p>

        <button
          className="mt-2 inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition"
          onClick={() => router.push('/')}
        >
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}
