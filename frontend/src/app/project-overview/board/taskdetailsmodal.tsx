import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { Icons } from "@/icons";
import Image from "next/image";
import { ProjectType, UserType, formatDate } from "@/utils/constant";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    _id?: string;
    name?: string;
    description?: string;
    priority?: string;
    dueDate?: Date;
    project?: ProjectType;
    assignee?: UserType;
    lead?: UserType;
    attachments?: any[];
    createdAt?: Date;
  };
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return "bg-[#FF0000] text-white";
    case "High":
      return "bg-[#FF5733] text-white";
    case "Medium":
      return "bg-[#FFD700] text-white";
    case "Low":
      return "bg-[#90EE90] text-white";
    default:
      return "bg-[#90EE90] text-white";
  }
};

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#17171819] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-bold">Task Details</h2>
          <button
            className="text-gray500 hover:rotate-90 transition-all"
            onClick={onClose}
          >
            <RiCloseCircleLine className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
              <div
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                  task.priority ?? ""
                )}`}
              >
                {task.priority}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Description
              </h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                {task.description || "No description available"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Due Date
              </h4>
              <div className="flex items-center gap-2 text-gray500">
                <FiCalendar className="w-4 h-4" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            </div>

            {task.createdAt && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Created On
                </h4>
                <div className="flex items-center gap-2 text-gray500">
                  <FiCalendar className="w-4 h-4" />
                  <span>{formatDate(task.createdAt)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Project
              </h4>
              <div className="flex items-center gap-2 text-gray500">
                <Icons.project className="w-4 h-4" />
                <span>
                  {task.project ? task.project.title : "Not assigned"}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                Assignee
              </h4>
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <Image
                    className="w-8 h-8 rounded-full border border-gray200"
                    src={task.assignee.avatar || "/image/default.png"}
                    alt="Assignee"
                    width={32}
                    height={32}
                  />
                  <span>{task.assignee.fullName}</span>
                </div>
              ) : (
                <span className="text-gray500">No assignee</span>
              )}
            </div>

            {task.lead && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Lead</h4>
                <div className="flex items-center gap-2">
                  <Image
                    className="w-8 h-8 rounded-full border border-gray200"
                    src={task.lead.avatar || "/image/default.png"}
                    alt="Lead"
                    width={32}
                    height={32}
                  />
                  <span>{task.lead.fullName}</span>
                </div>
              </div>
            )}

            {task.attachments && task.attachments.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Attachments ({task.attachments.length})
                </h4>
                <div className="flex flex-col gap-2">
                  {task.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 border px-3 py-2 rounded-md"
                    >
                      <Icons.attatchment className="h-4 w-4 text-gray500" />
                      <span className="text-sm truncate flex-1">
                        {attachment.name || `File ${index + 1}`}
                      </span>
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray100 text-gray700 rounded-lg hover:bg-gray200 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
