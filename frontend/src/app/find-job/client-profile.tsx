import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { Icons } from "@/icons";

interface WorkItem {
  title: string;
  rating: number;
  billed: number;
  date: string;
  description: string;
}

interface UserType {
  fullName: string;
  location: string;
  avatar?: string;
  description?: string;
  workHistory?: WorkItem[];
}

const ClientProfile = ({ user}: { user: UserType; onBack: () => void }) => {

  console.log("User Profile", user)

  return (
    <div className="flex flex-col gap-6 p-4 overflow-x-visible overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="flex items-start gap-3">
        <Image
          width={50}
          height={50}
         src= {user?.avatar ? user.avatar : "/image/default.png"}
          alt="Profile"
          className=" rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <span className="text-context text-2xl font-medium">{user.fullName }</span>
            <span className="text-gray500 text-md font-normal">
              {user.location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className="w-5 h-5 fill-[#F59E0B] text-yellow400"
                />
              ))}
            </div>
            <span className="text-gray500">(314 reviews)</span>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-4 text-context">
        <h2 className="text-2xl font-medium text-black">About</h2>
        <p className="font-normal text-base leading-tighter">{user.description}
        </p>
      </div>


      <div className="flex flex-col gap-4 text-context">
  <h2 className="text-2xl font-medium text-black"> Work history</h2>
  {user.workHistory && user.workHistory.length > 0 ? (
    <div className="flex flex-col gap-4">
      {user.workHistory.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 bg-gray100 p-6 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h3 className="text-md font-medium">{item.title}</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar
                      key={i}
                      className="w-4 h-4 fill-[#F59E0B] text-yellow400"
                    />
                  ))}
                </div>
                <span className="text-gray500">{item.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray500">
              <div className="flex items-center gap-1">
                <Icons.dollarbag width="15" />
                <span className="text-gray400">
                  Billed: ${item.billed}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Icons.calender width="15" />
                <span className="text-gray400">{item.date}</span>
              </div>
            </div>
          </div>
          <p className="text-context font-normal">{item.description}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray500">No work history available.</p>
  )}
</div>

    </div>
  );
};

export default ClientProfile;
