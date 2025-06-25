import { useState } from "react";
import { PiBookmark, PiBookmarkFill } from "react-icons/pi";
import { locations } from "@/utils/constant";

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

type JobCardProps = {
  _id: string;
  title: string;
  owner: UserType;
  createdAt: string;
  minHourlyRate: string | number;
  maxHourlyRate: string | number;
  estimatedPrice?: string;
  location: string;
  skills: string[];
  index: number;
  type: string;
  setProjectId: (id: string) => void;
  openModal: () => void;
};

const JobCard = ({
  _id,
  title,
  owner,
  createdAt,
  minHourlyRate,
  maxHourlyRate,
  estimatedPrice,
  location,
  skills,
  index,
  type,
  setProjectId,
  openModal,
}: JobCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const colors = [
    "bg-[#FFE1CC]",
    "bg-[#D5F6ED]",
    "bg-[#E4DBFA]",
    "bg-[#DFF3FE]",
    "bg-[#FBE2F4]",
    "bg-[#EDEFF5]",
  ];

  const color = colors[index % colors.length];

  const getCountryName = (shortCode: string) => {
    const location = locations.find((loc) => loc.slug === shortCode);
    return location ? location.label : shortCode;
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handleDetails = () => {
    // Set the project ID first, then open the modal
    setProjectId(_id);
    openModal();
  };

  // Calculate company name from the owner's data
  const companyName = owner?.jotTitle || owner?.fullName || "Company";

  return (
    <div
      className="p-4 bg-white shadow-md rounded-xl border border-gray200 max-h-fit hover:shadow-lg transition-all cursor-pointer"
      onClick={handleDetails}
    >
      <div className={`p-4 ${color} rounded-lg relative`}>
        <div
          onClick={toggleBookmark}
          className="absolute bg-white p-2 rounded-full top-4 right-4 transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
        >
          {isBookmarked ? (
            <PiBookmarkFill className="text-black" size={20} />
          ) : (
            <PiBookmark className="text-gray400" size={20} />
          )}
        </div>

        <p className="text-xs text-black bg-white px-2 py-1 rounded inline-block mb-2">
          {formatDate(createdAt)}
        </p>

        <h3 className="text-sm font-medium text-black">{owner.fullName}</h3>
        <p className="text-lg font-bold text-context mb-4">{title}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs text-gray-700 border border-gray-700 rounded px-2 py-1"
            >
              {skill}
            </span>
          ))}
          {skills?.length > 3 && (
            <span className="text-xs text-gray-700 border border-gray-700 rounded px-2 py-1">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col">
          <p className="text-lg font-bold text-context">
            {type === "hourly" && minHourlyRate && maxHourlyRate
              ? `$${minHourlyRate}~$${maxHourlyRate}/hr`
              : estimatedPrice
              ? `$${estimatedPrice}`
              : "Not specified"}
          </p>

          <p className="text-sm text-gray500">
            {location === "local" ? getCountryName(owner?.location) : "Remote"}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDetails();
          }}
          className="py-2 px-4 text-sm font-medium text-white bg-black rounded-md ease-in-out transform hover:bg-gray500 transition-all"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
