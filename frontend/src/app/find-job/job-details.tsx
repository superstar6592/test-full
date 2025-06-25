import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiBookmark, PiBookmarkFill } from "react-icons/pi";
import { locations } from "@/utils/constant";
import ClientProfile from "./client-profile";

// Define icons component since we're using it in the original code
const Icons = {
  dollarbag: ({ width = "24" }) => (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17V20M12 17C9.23858 17 7 14.7614 7 12M12 17C14.7614 17 17 14.7614 17 12M12 20C7.58172 20 4 16.4183 4 12M12 20C16.4183 20 20 16.4183 20 12M7 12C7 9.23858 9.23858 7 12 7M7 12H4M17 12C17 9.23858 14.7614 7 12 7M17 12H20M12 7V4M12 7C14.7614 7 17 9.23858 17 12M12 4C16.4183 4 20 7.58172 20 12M12 4C7.58172 4 4 7.58172 4 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  calender: ({ width = "24" }) => (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  envelope: ({ width = "24" }) => (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 8L14.6569 14.3431C13.7202 15.2798 12.2798 15.2798 11.3431 14.3431L5 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  send: ({ width = "24" }) => (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 14L21 3M10 14L14 21L21 3M10 14L3 10L21 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// Properly type the project prop based on API response
type UserType = {
  fullName: string;
  email: string;
  userName: string;
  location: string;
  uid: string;
  avatar?: string;
  description?: string;
  jotTitle?: string;
};

type ProjectType = {
  _id: string;
  title: string;
  skills: string[];
  owner: UserType;
  location: string;
  description: string;
  minHourlyRate: number | string;
  maxHourlyRate: number | string;
  estimatedPrice?: string;
  type: string;
  status: string;
  scope: string;
  level: string;
  createdAt: string;
  updatedAt: string;
};

type JobDetailsProps = {
  project: ProjectType;
  onClose: () => void;
};

const JobDetails = ({ project, onClose }: JobDetailsProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showClientProfile, setShowClientProfile] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getCountryName = (shortCode: string) => {
    const location = locations.find((loc) => loc.slug === shortCode);
    return location ? location.label : shortCode;
  };

  // Split project description into bullet points
  const descriptionPoints = project?.description
    ? project.description.split("\n").filter((point) => point.trim().length > 0)
    : [];

  // Split owner description into bullet points if available
  const ownerDescriptionPoints = project?.owner?.description
    ? project.owner.description
        .split("\n")
        .filter((point) => point.trim().length > 0)
    : [];

  // Default requirement points in case owner description is not available or too short
  const defaultRequirementPoints = [
    "Previous experience as a UI/UX designer or a similar role, with a strong portfolio showcasing your design work.",
    "Proficiency in design tools such as Adobe XD, Sketch, Figma, or similar.",
    "Solid understanding of user-centered design principles and methodologies.",
    "Experience with user research techniques, including usability testing and persona development.",
    "Strong visual design skills, with attention to typography, color, and layout.",
    "Ability to translate complex requirements into intuitive and elegant user interfaces.",
    "Excellent communication and collaboration skills, with the ability to present and justify design decisions.",
    "Familiarity with front-end development technologies (HTML, CSS, JavaScript) is a plus but not required.",
  ];

  // Use owner description points if available, otherwise use default
  const requirementPoints =
    ownerDescriptionPoints.length > 0
      ? ownerDescriptionPoints
      : defaultRequirementPoints;

  // Role type mapping based on project properties
  const roleTypes = [
    project?.type === "hourly" ? "Part time" : "Full time",
    project?.level === "expert" ? "Senior level" : "Mid level",
    project?.location === "local" ? "Local" : "Remote",
    project?.scope === "small" ? "Project work" : "Long-term",
  ];

  if (showClientProfile) {
    return (
      <div className="p-4 overflow-y-auto max-h-screen">
        <button
          onClick={() => setShowClientProfile(false)}
          className="relative text-sm font-medium bg-gradient-to-r from-blue500 to-purple-500 bg-clip-text text-transparent hover:text-blue500"
        >
          Back to job
        </button>
        <ClientProfile
          user={project.owner}
          onBack={() => setShowClientProfile(false)}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 pb-4 px-4 overflow-x-visible overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-start gap-4">
          <Image
            width={50}
            height={50}
            src={project?.owner?.avatar || "/image/default.png"}
            alt="Company Logo"
            className="rounded-full"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm text-context font-normal leading-none">
                {project?.owner?.jotTitle || "Company"}
              </h2>
              <p className="text-black text-lg font-medium leading-none">
                {project?.owner?.fullName || ""}
              </p>
              <p className="text-gray500 text-sm font-normal leading-none">
                {project?.owner?.location
                  ? getCountryName(project?.owner?.location)
                  : ""}
              </p>
            </div>
            <div className="flex items-center gap-4 text-gray500">
              <p className="flex items-center gap-1 text-lg font-medium">
                <Icons.dollarbag width="15" />
                <span className="text-context text-md">
                  {project?.type === "hourly"
                    ? `$${project.minHourlyRate}-${project.maxHourlyRate}/hr`
                    : `$${project.estimatedPrice || "N/A"}`}
                </span>
              </p>
              <p className="flex items-center gap-1 text-lg font-medium">
                <Icons.calender width="15" />
                <span className="text-context text-md">
                  {project?.scope === "small" ? "1 Month" : "Long-term"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-end items-center gap-4">
            <button
              onClick={() => setShowClientProfile(true)}
              className="relative text-sm font-medium bg-gradient-to-r from-blue500 to-purple-500 bg-clip-text text-transparent hover:text-blue500"
            >
              View profile
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-blue500 to-purple-500"></span>
            </button>

            <button
              onClick={toggleBookmark}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray300 hover:bg-gray100 transition-all"
            >
              {isBookmarked ? (
                <PiBookmarkFill className="text-black" size={18} />
              ) : (
                <PiBookmark className="text-gray400" size={18} />
              )}
            </button>
          </div>
          <div className="flex gap-2 justify-end flex-wrap">
            {roleTypes.map((tag) => (
              <span
                key={tag}
                className="border border-gray400 rounded-md px-2 py-1 text-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-end">
            <div className="group p-[1px] rounded-md bg-gradient-to-r from-purple-500 to-blue500">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-md w-full h-full stroke-context group-hover:bg-transparent group-hover:text-white group-hover:stroke-white transition-all">
                <Icons.envelope width="15" />
                <span>Message Client</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">Job Description</h3>
        <div className="flex flex-col text-context text-sm leading-normal">
          {descriptionPoints.map((point, index) => (
            <div key={index} className="flex">
              <div className="flex items-center h-[21px] px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-context" />
              </div>
              {point}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">About the Client</h3>
        <div className="flex flex-col text-context text-sm leading-normal">
          {requirementPoints.map((point, index) => (
            <div key={index} className="flex">
              <div className="flex items-center h-[21px] px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-context" />
              </div>
              {point}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-medium">Skills Required</h3>
        <div className="flex flex-wrap gap-2">
          {project?.skills &&
            project.skills.length > 0 &&
            project.skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray100 text-black py-1 px-3 rounded text-sm font-medium"
              >
                {skill}
              </span>
            ))}
        </div>
      </div>

      <Link
        href="/submit-proposal"
        className="w-full bg-gradient-to-r from-gradientStart to-gradientEnd flex items-center space-x-2 justify-center text-white py-3 rounded-md font-semibold hover:drop-shadow-lg transition-all"
      >
        <Icons.send width="20" />
        <span>Apply Now</span>
      </Link>
    </div>
  );
};

export default JobDetails;
