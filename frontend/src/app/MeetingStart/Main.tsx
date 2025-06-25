"use client";
import Image from "next/image";
import { useState } from "react";
import ControlButton from "./ControlButton";

const Main = () => {
  const [controls, setControls] = useState({
    camera: false,
    mic: false,
    record: false,
    caption: false,
    summary: false,
  });
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English US");

  const languages = [
    "English US",
    "English UK",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Chinese",
    "Korean"
  ];

  const toggle = (key: keyof typeof controls) => {
    setControls((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      if (key === 'summary' && !newState.summary) {
        setShowLanguageMenu(false);
      }
      return newState;
    });
  };

  const handleSummaryClick = () => {
    // toggle("summary");
    if (!controls.summary) {
      setShowLanguageMenu(true);
    }
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageMenu(false);
  };

  return (
    <div className="w-full flex flex-col gap-10 bg-[#F3F4F6] text-gray-800 px-4 sm:px-6 lg:px-12 py-4">
      {/* Top Section */}
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-[35%] flex flex-col px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              You're starting a new meeting!
            </h2>
            <p className="text-sm mb-1 px-2 sm:px-5">Invited to this room</p>
            <p className="text-sm mb-2 text-gray-500 px-2 sm:px-5">
              There are 9 participants on this meeting:
            </p>

            <div className="space-y-2 h-32 overflow-y-auto pr-2 scrollbar-thin px-4 sm:px-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Image
                    src="/image/avatar.svg"
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>Ralph Edwards</span>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Link */}
          <div className="mt-4 bg-white px-4 py-3 rounded-[16px]">
            <p className="text-sm font-semibold mb-1">Link to invite</p>
            <div className="flex flex-col items-center mb-1">
              <input
                className="w-full bg-gray-200 rounded-[8px] text-sm outline-none border border-gray-200 px-4 py-2 mb-2"
                value="freelancerlink.com/..."
                readOnly
              />
              <button className="w-full bg-gray-700 text-white px-3 py-2 text-sm rounded">
                Copy Link
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="mt-4 px-1 sm:px-5 relative">
            <p className="text-sm font-semibold mb-2">Settings</p>
            <div className="flex flex-wrap gap-1 mb-4 items-center px-2">
              {Object.entries(controls).map(([key, value]) => (
                <div key={key} className="relative">
                  <ControlButton
                    v=""
                    name={key}
                    isActive={value}
                    onClick={key === 'summary' ? handleSummaryClick : () => toggle(key as keyof typeof controls)}
                  />
                  {key === 'summary' && showLanguageMenu && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1 px-3 max-h-60 overflow-y-auto">
                        <div className="p-2 text-sm border-b border-gray-100 sticky font-bold top-0 bg-white">
                          Select Language
                        </div>
                         <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {languages.map((language) => (
                          <option key={language} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                        <div 
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-center border-t border-gray-100 sticky bottom-0 bg-white"
                          onClick={() => setShowLanguageMenu(false)}
                        >
                          Cancel
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 px-1 sm:px-5">
            <button className="border border-gray-400 w-full sm:w-auto px-12 py-2 rounded-[8px]">
              Cancel
            </button>
            <button className="w-full sm:w-auto text-white bg-gradient-to-r from-gradientStart to-gradientEnd px-12 py-2 rounded-[8px]">
              Join Now
            </button>
          </div>
        </div>

        {/* Right Video Section */}
        <div className="flex-1 bg-gradient-to-br from-gray-500 to-blue-300 flex items-center justify-center relative rounded-[20px] h-64 sm:h-80 lg:h-auto">
          <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-purple-400 flex items-center justify-center text-white text-2xl sm:text-3xl font-semibold border-4 border-white">
            R
          </div>
          <div className="absolute bottom-4 left-4">
            <ControlButton
              v="v"
              name="mic"
              isActive={controls.mic}
              onClick={() => toggle("mic")}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center text-xs sm:text-sm lg:px-32 px-4 pt-4">
        All communications on Freelancer are encrypted and protected to ensure
        your privacy. Any necessary session data is handled with the highest
        security standards and in full compliance with our privacy policy. Learn
        more here.
      </div>
    </div>
  );
};

export default Main;