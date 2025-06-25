"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { SignInUserType } from "@/types";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "@/firebaseConfig";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "@/utils/axios";
import { Icons } from "@/icons";
import { FiCheck } from "react-icons/fi";
import { useAuth } from "@/components/contexts/AuthContexts";
import { apiUrl } from "@/utils/constant";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const router = useRouter();
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserType>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [pendingGoogleData, setPendingGoogleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: SignInUserType) => {
    try {
      setIsLoading(true);
      const response = await signIn(data);

      if (response && response.data?.token) {
        const { token, user } = response.data;

        // Use AuthContext login function instead of direct localStorage
        login(token, user);

        toast.success("Sign in successful!");
        router.push("/");
      } else {
        toast.error("Invalid login response");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.error || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const firebaseIdToken = await user.getIdToken();

      // Check if user already exists
      const checkUserResponse = await fetch(
        `${apiUrl}/api/auth/check-user/${user.uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (checkUserResponse.ok) {
        // User exists, proceed with login
        const response = await fetch(`${apiUrl}/api/auth/google-auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: firebaseIdToken,
          }),
        });

        const data = await response.json();

        if (response.ok && data.token && data.user) {
          // Use AuthContext login function instead of direct localStorage
          login(data.token, data.user);

          toast.success("Google sign-in successful!");
          router.push("/");
        } else {
          toast.error(data.error || "Google sign-in failed");
        }
      } else {
        // New user, show role selection inline
        setPendingGoogleData({ idToken: firebaseIdToken, user });
        setShowRoleSelection(true);
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      toast.error("Google sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;
      const firebaseIdToken = await user.getIdToken();

      // Check if user already exists
      const checkUserResponse = await fetch(
        `${apiUrl}/api/auth/check-user/${user.uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (checkUserResponse.ok) {
        // User exists, proceed with login
        const response = await fetch(`${apiUrl}/api/auth/google-auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: firebaseIdToken,
          }),
        });

        const data = await response.json();

        if (response.ok && data.token && data.user) {
          // Use AuthContext login function instead of direct localStorage
          login(data.token, data.user);

          toast.success("Apple sign-in successful!");
          router.push("/");
        } else {
          toast.error(data.error || "Apple sign-in failed");
        }
      } else {
        // New user, show role selection inline
        setPendingGoogleData({ idToken: firebaseIdToken, user });
        setShowRoleSelection(true);
      }
    } catch (error) {
      console.error("Error during Apple Sign-In:", error);
      toast.error("Apple sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const changeRole = (val: string) => {
    setSelectedRole(val);
    handleRoleSelection(val); // pass the value directly
  };

  const handleRoleSelection = async (role: string) => {
    if (!role || !pendingGoogleData) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/api/auth/google-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: pendingGoogleData.idToken,
          role: role,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token && data.user) {
        // Use AuthContext login function instead of direct localStorage
        login(data.token, data.user);

        toast.success("Account created successfully!");
        router.push("/");
      } else {
        toast.error(data.error || "Account creation failed");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Account creation failed");
    } finally {
      setIsLoading(false);
      setShowRoleSelection(false);
      setPendingGoogleData(null);
      setSelectedRole("");
    }
  };

  const cancelRoleSelection = () => {
    setShowRoleSelection(false);
    setPendingGoogleData(null);
    setSelectedRole("");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9]">
      <div className="w-[1080px] bg-white rounded-lg flex">
        {!showRoleSelection ? (
          <>
            <div className="p-10 pr-20 flex flex-col gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/image/logo.svg"
                  alt="logo"
                  width={50}
                  height={50}
                />
                <span className="text-base font-medium text-black">
                  TheFreelanceWebsite
                </span>
              </Link>
              <h1 className="font-semibold text-4xl leading-none">Sign In</h1>

              <div className="flex flex-col gap-4">
                <div className="w-full flex flex-col gap-2">
                  <button
                    className="text-base border border-gray200 rounded-lg text-nowrap py-3 min-w-[370px] flex items-center justify-center gap-2 hover:bg-gray100 focus:ring-2 focus:ring-offset-2 focus:ring-blue500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <FcGoogle size={18} />
                    {isLoading ? "Processing..." : "Continue with Google"}
                  </button>
                  <button
                    className="w-full text-base border border-gray200 rounded-lg text-nowrap py-3 flex items-center justify-center gap-2 hover:bg-gray100 focus:ring-2 focus:ring-offset-2 focus:ring-blue500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleAppleSignIn}
                    disabled={isLoading}
                  >
                    <FaApple size={20} color="#000000" />
                    {isLoading ? "Processing..." : "Continue with Apple"}
                  </button>
                </div>
                <div className="w-full gap-2.5 flex items-center">
                  <div className="w-full h-[1px] bg-gray200"></div>
                  <div className="text-base text-nowrap leading-none">
                    Or Sign in with
                  </div>
                  <div className="w-full h-[1px] bg-gray200"></div>
                </div>
                <form
                  className="w-full flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-full flex flex-col">
                      <div className="text-base leading-none">
                        Email Address
                      </div>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            placeholder="Email Address"
                            className="w-full rounded-lg border-gray100 bg-gray100 px-4 py-2.5 mt-2 outline-none border focus:border-blue500 hover:border-gray400"
                            {...field}
                          />
                        )}
                      />
                      {errors.email && (
                        <span className="text-red-600 text-sm">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className="w-full flex flex-col relative">
                      <div className="text-base leading-none">Password</div>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <div className="relative mt-2">
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="w-full rounded-lg border-gray100 bg-gray100 px-4 py-2.5 outline-none border focus:border-blue500 hover:border-gray400"
                              {...field}
                            />
                            <div
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <IoEye /> : <IoEyeOff />}
                            </div>
                          </div>
                        )}
                      />
                      {errors.password && (
                        <span className="text-red-600 text-sm">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-base text-end hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-gradient-to-r from-gradientStart to-gradientEnd rounded-lg font-medium text-base text-white hover:animate-pulseQuick focus:ring-2 focus:ring-offset-2 focus:ring-blue500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                    <div className="flex justify-center gap-1">
                      <div className="leading-none">
                        Don&apos;t have an account?
                      </div>
                      <div className="group relative leading-none">
                        <Link href="/sign-up">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gradientStart to-gradientEnd cursor-pointer group-hover:text-blue500 transition-all">
                            Sign up
                          </span>
                        </Link>
                        <span className="absolute left-0 bottom-0 h-[1px] w-full bg-gradient-to-r from-gradientStart to-gradientEnd group-hover:!bg-blue500 transition-all"></span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full flex items-center justify-center bg-gradient-to-r from-[#198cd81c] to-[#f03dcf1c] rounded-e-lg">
              <Image
                src="/image/auth-logo.svg"
                alt="auth logo"
                width={495}
                height={461}
              />
            </div>
          </>
        ) : (
          // Role Selection View (same design as SignUp)
          <div className="flex flex-col w-full gap-10 p-10">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
              <span className="text-base font-medium text-black">
                TheFreelanceWebsite
              </span>
            </Link>
            <h2 className="text-5xl font-semibold text-center">
              What brings you to
              <br />
              TheFreelancerWebsite?
            </h2>
            <div className="flex justify-center gap-5">
              <div
                onClick={() => changeRole("freelancer")}
                className={`flex max-w-[430px] rounded-xl basis-1/2 p-px ${
                  selectedRole === "freelancer"
                    ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                    : "bg-gray100"
                } cursor-pointer hover:bg-gradient-to-r hover:from-gradientStart hover:to-gradientEnd`}
              >
                <div className="relative flex flex-col items-center w-full h-full px-5 py-10 rounded-xl bg-white gap-3">
                  <Icons.freelancer />
                  <div className="text-xl font-semibold w-full leading-none">
                    I&apos;m a Freelancer
                  </div>
                  <div className="text-context w-full leading-none">
                    Find work and manage your freelance business
                  </div>
                  <button
                    className={`absolute right-5 top-5 flex justify-center items-center w-8 h-8 ${
                      selectedRole === "freelancer"
                        ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                        : "bg-white"
                    } border border-gray400 rounded-full`}
                  >
                    <FiCheck className="text-white" />
                  </button>
                </div>
              </div>
              <div
                onClick={() => changeRole("client")}
                className={`flex max-w-[430px] rounded-xl basis-1/2 p-px ${
                  selectedRole === "client"
                    ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                    : "bg-gray100"
                } cursor-pointer hover:bg-gradient-to-r hover:from-gradientStart hover:to-gradientEnd`}
              >
                <div className="relative flex flex-col items-center w-full h-full px-5 py-10 rounded-xl bg-white gap-3">
                  <Icons.client />
                  <div className="text-xl font-semibold w-full leading-none">
                    I&apos;m a hiring
                  </div>
                  <div className="text-context w-full leading-none">
                    Find talents and grow your freelance business
                  </div>
                  <button
                    className={`absolute right-5 top-5 flex justify-center items-center w-8 h-8 ${
                      selectedRole === "client"
                        ? "bg-gradient-to-r from-gradientStart to-gradientEnd"
                        : "bg-white"
                    } border border-gray400 rounded-full`}
                  >
                    <FiCheck className="text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <div className="flex justify-center gap-1">
                <div className="leading-none">Already have an account?</div>
                <div className="group relative leading-none">
                  <span
                    onClick={cancelRoleSelection}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-gradientStart to-gradientEnd cursor-pointer group-hover:text-blue500 transition-all"
                  >
                    Back to Sign in
                  </span>
                  <span className="absolute left-0 bottom-0 h-[1px] w-full bg-gradient-to-r from-gradientStart to-gradientEnd group-hover:!bg-blue500 transition-all"></span>
                </div>
              </div>
              <div className="group relative text-xs text-context text-center">
                By continuing, you agree to TheFreelanceWebsite's&nbsp;
                <Link href="/terms-of-use">
                  <span className="bg-clip-text cursor-pointer group-hover:text-blue500 underline transition-all">
                    Terms of Use
                  </span>
                </Link>
                &nbsp;and confirm that you have read
                <br />
                TheFreelanceWebsite's&nbsp;
                <Link href="/privacy-policy">
                  <span className="bg-clip-text cursor-pointer group-hover:text-blue500 underline transition-all">
                    Privacy Policy
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
