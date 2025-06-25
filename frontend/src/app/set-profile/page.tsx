"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import GradientButton from "@/components/Buttons/gradientBtn";

import FirstStep from "./frist-step";
import SecondStep from "./second-step";
import ThirdStep from "./thrid-step";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/constant";

export type WorkHistory = {
  position: string;
  company: string;
};

export type Education = {
  school: string;
  degree: string;
  year: string;
};

export interface UserType {
  _id?: string;
  avatar?: string;
  avatarFile?: File;
  fullName?: string;
  location?: string;
  description?: string;
  workHistory?: WorkHistory[];
  education?: Education[];
  email?: string;
  skills?: string[];
  hourlyRate?: number;
  portfolio?: string[];
  portfolios?: string[]; // Added to match API response
  externalPortfolio?: string[];
}

const SetProfile = () => {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState<UserType>({});
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage
        const usertoken = localStorage.getItem("user");
        console.log(usertoken, "usertoken");

        if (!usertoken) {
          throw new Error("No user data found in localStorage");
        }

        const userdata = JSON.parse(usertoken);
        console.log(userdata, "userdata");

        // Extract _id from localStorage data
        const userIdFromStorage = userdata._id;
        setUserId(userIdFromStorage);

        // Get token for API call
        const token = localStorage.getItem("freelancingPlatformAuthToken");
        if (!token) {
          throw new Error("No token found");
        }

        // Fetch user data from API
        const response = await axios.get(
          `${apiUrl}/api/users/user/${userIdFromStorage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data.user;

        // Map the API response to your component state
        setUser({
          _id: userData._id,
          fullName: userData.fullName || "",
          email: userData.email || "",
          location: userData.location || "",
          description: userData.description || "",
          skills: userData.skills || [],
          workHistory: userData.workHistory || [],
          education: userData.education || [],
          portfolios: userData.portfolios || [],
          avatar: userData.avatar || "",
          hourlyRate: userData.hourlyRate || 0,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  const formikFirstStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: user?.avatar || "",
      avatarFile: new File([], "empty-file.png", { type: "image/png" }),
      fullName: user?.fullName || "",
      location: user?.location || "",
      bio: user?.description || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      location: Yup.string().required("Location is required"),
      bio: Yup.string()
        .min(10, "Bio must be at least 10 characters")
        .required("Bio is required"),
    }),
    onSubmit: () => {
      setStep(1);
    },
  });

  const formikSecondStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      workHistory: user?.workHistory || [{ position: "", company: "" }],
      education: user?.education || [{ school: "", degree: "", year: "" }],
      skills: user?.skills || [],
    },
    validationSchema: Yup.object({
      workHistory: Yup.array().of(
        Yup.object().shape({
          position: Yup.string().required("Position is required"),
          company: Yup.string().required("Company is required"),
        })
      ),
      education: Yup.array().of(
        Yup.object().shape({
          school: Yup.string().required("School is required"),
          degree: Yup.string().required("Degree is required"),
          year: Yup.string().required("Year is required"),
        })
      ),
      skills: Yup.array()
        .min(1, "At least one skill is required")
        .of(Yup.string().required("Skill is required")),
    }),
    onSubmit: () => {
      setStep(2);
    },
  });

  const formikThirdStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      hourlyRate: user?.hourlyRate || "",
    },
    validationSchema: Yup.object({
      hourlyRate: Yup.string().required("Hourly rate is required"),
    }),
    onSubmit: async () => {
      try {
        const token = localStorage.getItem("freelancingPlatformAuthToken");
        if (!token) {
          throw new Error("No token found");
        }

        const formData = new FormData();

        // Add all user data to formData
        if (user.fullName) formData.append("fullName", user.fullName);
        if (user.location) formData.append("location", user.location);
        if (user.description) formData.append("description", user.description);
        if (user.hourlyRate)
          formData.append("hourlyRate", user.hourlyRate.toString());

        // Handle arrays
        if (user.workHistory && user.workHistory.length > 0) {
          formData.append("workHistory", JSON.stringify(user.workHistory));
        }
        if (user.education && user.education.length > 0) {
          formData.append("education", JSON.stringify(user.education));
        }
        if (user.skills && user.skills.length > 0) {
          formData.append("skills", JSON.stringify(user.skills));
        }

        // Handle avatar file
        if (user.avatarFile && user.avatarFile.size > 0) {
          formData.append("avatar", user.avatarFile);
        }

        // Handle portfolio files if any
        if (user.portfolio && user.portfolio.length > 0) {
          user.portfolio.forEach(({ portfolio, index }: any) => {
            if (portfolio instanceof File) {
              formData.append("portfolios", portfolio);
            }
          });
        }

        // Use the correct API endpoint with userId parameter
        const response = await axios.put(
          `${apiUrl}/api/users/user/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Profile updated successfully:", response.data);
        toast.success("Profile updated successfully!");
        router.push("/");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    },
  });

  const handleStep = () => {
    if (step === 0) {
      formikFirstStep.handleSubmit();
    } else if (step === 1) {
      formikSecondStep.handleSubmit();
    } else if (step === 2) {
      formikThirdStep.handleSubmit();
    }
  };

  const handleInputChange =
    (field: keyof UserType) => (value: string | File) => {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: value,
      }));
    };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-[#D8E5EE] to-[#EED4E9]">
      <div className="w-[1200px] bg-white rounded-lg flex m-8">
        <div className="w-full p-10 flex flex-col items-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/image/logo.svg" alt="logo" width={50} height={50} />
            <span className="text-base font-medium text-black">
              TheFreelanceWebsite
            </span>
          </Link>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="max-w-[514px] w-full flex flex-col gap-5 pb-[50px]">
              <h1 className="font-semibold text-4xl text-black text-center leading-none">
                Setup your profile
              </h1>
              {step === 0 && (
                <FirstStep
                  user={user}
                  handleInputChange={handleInputChange}
                  formik={formikFirstStep}
                />
              )}
              {step === 1 && (
                <SecondStep
                  user={user}
                  setUser={setUser}
                  formik={formikSecondStep}
                />
              )}
              {step === 2 && (
                <ThirdStep
                  user={user}
                  setUser={setUser}
                  formik={formikThirdStep}
                />
              )}
              <GradientButton
                title={step === 2 ? "Complete" : "Continue"}
                className="w-full mt-5"
                handleBtn={handleStep}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetProfile;
