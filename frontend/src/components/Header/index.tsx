"use client";

import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/icons";
import { useState, useEffect, useRef } from "react";
import HeaderModal from "../Modal/HeaderModal";
import { usePathname, useRouter } from "next/navigation";
import IOSSwitch from "../IOSSwitch";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

type HeaderProps = {
  white?: boolean;
  round?: boolean;
};

// Role constants for both string and ID formats
const CLIENT_ROLE = "68173667a4b06ae2a1bf6aa9";
const FREELANCER_ROLE = "68173694a4b06ae2a1bf6aad";
const CLIENT_STRING = "client";
const FREELANCER_STRING = "freelancer";

const Header = ({ white = true, round = true }: HeaderProps) => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("freelancingPlatformAuthToken");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(userStr);
      if (!parsedUser || typeof parsedUser !== "object") {
        router.push("/");
        throw new Error("no user in storage");
      }
      setCurrentUser(parsedUser);
      setIsLoggedIn(true);
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      setIsLoggedIn(false);
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("freelancingPlatformAuthToken");
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Use the imported auth instance instead of getAuth()
      await signOut(auth);
      localStorage.removeItem("freelancingPlatformAuthToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const LoggedOutMenu = [
    { title: "Why Choose Us", href: "#why-choose-us" },
    { title: "Core Features", href: "#core-features" },
    { title: "Explore Plans", href: "#explore-plan" },
  ];

  // Helper function to get user role type for display
  const getUserRoleType = () => {
    if (!currentUser?.role) return "No role";

    // Handle string role format
    if (typeof currentUser.role === "string") {
      // Check if it's a role name
      if (
        currentUser.role.toLowerCase() === CLIENT_STRING ||
        currentUser.role.toLowerCase() === FREELANCER_STRING
      ) {
        return (
          currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
        );
      }
      // Check if it's a role ID
      if (currentUser.role === CLIENT_ROLE) return "Client";
      if (currentUser.role === FREELANCER_ROLE) return "Freelancer";
      return "Unknown Role";
    }

    // Handle object role format with name
    if (typeof currentUser.role === "object" && currentUser.role.name) {
      return (
        currentUser.role.name.charAt(0).toUpperCase() +
        currentUser.role.name.slice(1)
      );
    }

    // Handle object role format with ID
    if (typeof currentUser.role === "object") {
      const roleId = currentUser.role._id || currentUser.role.id;
      if (roleId === CLIENT_ROLE) return "Client";
      if (roleId === FREELANCER_ROLE) return "Freelancer";
      return "Unknown Role";
    }

    return "Unknown Role";
  };

  // Helper function to check if user is client
  const isClient = () => {
    if (!currentUser?.role) return false;

    // Handle string role format
    if (typeof currentUser.role === "string") {
      // Check by role name
      if (currentUser.role.toLowerCase() === CLIENT_STRING) return true;
      // Check by role ID
      if (currentUser.role === CLIENT_ROLE) return true;
      return false;
    }

    // Handle object role format
    if (typeof currentUser.role === "object") {
      // Check by name first
      if (
        currentUser.role.name &&
        currentUser.role.name.toLowerCase() === CLIENT_STRING
      ) {
        return true;
      }
      // Check by ID
      const roleId = currentUser.role._id || currentUser.role.id;
      return roleId === CLIENT_ROLE;
    }

    return false;
  };

  // Helper function to check if user is freelancer
  const isFreelancer = () => {
    if (!currentUser?.role) return false;

    // Handle string role format
    if (typeof currentUser.role === "string") {
      // Check by role name
      if (currentUser.role.toLowerCase() === FREELANCER_STRING) return true;
      // Check by role ID
      if (currentUser.role === FREELANCER_ROLE) return true;
      return false;
    }

    // Handle object role format
    if (typeof currentUser.role === "object") {
      // Check by name first
      if (
        currentUser.role.name &&
        currentUser.role.name.toLowerCase() === FREELANCER_STRING
      ) {
        return true;
      }
      // Check by ID
      const roleId = currentUser.role._id || currentUser.role.id;
      return roleId === FREELANCER_ROLE;
    }

    return false;
  };

  // Dynamic menu based on user role
  const LoggedInMenu = [
    ...(isClient() ? [{ title: "Find Talent", href: "/find-talent" }] : []),
    ...(isFreelancer() ? [{ title: "Find a Job", href: "/find-job" }] : []),
    { title: "Messages", href: "/chat" },
    { title: "My Plan", href: "/subscription" },
    { title: "Project Overview", href: "/project-overview" },
    ...(isClient() ? [{ title: "Post a new Job", href: "/post-new-job" }] : []),
    { title: "Create Your Profile", href: "/set-profile" },
  ];

  return (
    <div
      className={`px-4 sm:px-6 md:px-8 lg:px-10 py-5 h-auto flex flex-wrap md:flex-nowrap items-center justify-between ${
        white ? "bg-white" : ""
      } ${round ? "rounded-b-[20px]" : ""}`}
    >
      {/* Logo and Branding */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/image/logo.svg" alt="logo" width={40} height={40} />
          <span className="font-semibold text-black text-lg sm:text-xl">
            The Freelance Website
          </span>
        </Link>
      </div>

      {/* Menu Button - now hides at lg (1024px) and up */}
      <div className="flex lg:hidden w-full justify-end mt-4 md:mt-0">
        <button
          className="px-4 py-2 border rounded text-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-8 xl:gap-12 font-jost text-base capitalize list-none">
        {(isLoggedIn ? LoggedInMenu : LoggedOutMenu).map((item, index) => (
          <li key={index} className="group relative cursor-pointer">
            <Link href={item.href} className="leading-none">
              {item.title}
            </Link>
            <div
              className={`absolute -bottom-1 h-px w-16 bg-gradient-to-r from-gradientStart to-gradientEnd transition-all ${
                pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 origin-left"
              }`}
            />
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden w-full transition-all duration-500 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="w-full flex flex-col items-start gap-4 font-jost text-sm capitalize py-4">
          {(isLoggedIn ? LoggedInMenu : LoggedOutMenu).map((item, index) => (
            <li key={index} className="group relative cursor-pointer px-4 w-full">
              <Link href={item.href} className="leading-none block w-full py-2">
                {item.title}
              </Link>
              <div
                className={`absolute left-4 -bottom-1 h-px w-16 bg-gradient-to-r from-gradientStart to-gradientEnd transition-all ${
                  pathname === item.href
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100 origin-left"
                }`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Right Actions (Login/Register or Profile & Notifications) */}
      <div className="flex items-center gap-4 mt-4 lg:mt-0">
        {!isLoggedIn ? (
          <div className="flex items-center gap-2">
            <Link href="/sign-up">
              <button className="bg-gradient-to-r from-gradientStart to-gradientEnd px-5 py-2 rounded-lg font-jost text-sm sm:text-base text-white">
                Register
              </button>
            </Link>
            <Link href="/sign-in">
              <button className="px-5 py-2 text-black font-jost text-sm sm:text-base">Login</button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Notification */}
            <div className="relative" ref={notificationRef}>
              <button
                className="relative"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                aria-label="Toggle notifications"
              >
                <Icons.notification className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2" />
              </button>
              {isNotificationOpen && <HeaderModal />}
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <Image
                  src={
                    currentUser?.avatar ||
                    currentUser?.photoURL ||
                    "/image/default.png"
                  }
                  alt="User Profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="text-sm">{currentUser?.displayName || currentUser?.fullName}</span>
              </div>
              {dropdownOpen && (
                <div className="absolute top-full right-0 z-10 pt-2">
                  <div className="bg-white drop-shadow-lg rounded-xl w-60">
                    <div className="flex items-center gap-2.5 px-5 py-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={
                            currentUser?.avatar ||
                            currentUser?.photoURL ||
                            "/image/default.png"
                          }
                          alt="User Profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h6 className="font-semibold text-base leading-4">
                          {currentUser?.displayName || currentUser?.fullName}
                        </h6>
                        <p className="text-sm text-[#6D7280]">{currentUser?.email}</p>
                      </div>
                    </div>

                    <div className="font-light text-[10px] text-gray-400 px-5 pb-2">
                      {getUserRoleType()}
                    </div>

                    <div className="flex gap-2.5 px-5 py-2.5">
                      <p className="text-sm">Online for messages</p>
                      <IOSSwitch sx={{ m: 1 }} defaultChecked />
                    </div>

                    <div className="bg-gray-100 w-full h-px" />

                    <div className="bg-gray-100 w-full h-px" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 hover:bg-gray-100 px-5 py-2.5 w-full text-left"
                    >
                      <Icons.logout className="w-4 h-4" />
                      <p className="text-sm">Logout</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
