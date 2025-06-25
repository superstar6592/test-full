import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";
import Dropdown from "../board/taskcard-dropdown";
import { TmProjectType, TmTaskWithFullDataType } from "@/utils/constant";
import axios from "axios";
import { apiUrl } from "@/utils/constant";

interface BacklogBoardProps {
  tmTasks?: TmTaskWithFullDataType[];
  setTmTasks?: React.Dispatch<React.SetStateAction<TmTaskWithFullDataType[]>>;
  tmProjects?: TmProjectType[];
  tmProject?: TmProjectType;
}

const BacklogBoard: React.FC<BacklogBoardProps> = ({
  tmTasks = [],
  setTmTasks,
  tmProjects,
  tmProject,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Filter only tasks with "Backlog" status
  const backlogTasks = tmTasks.filter(
    (task) => task.status.toLowerCase() === "backlog"
  );

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination || !setTmTasks) return;

    const reorderedTasks = Array.from(tmTasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    // Update the local state
    setTmTasks(reorderedTasks);

    // If you need to update task order in the backend
    try {
      const token = localStorage.getItem("freelancingPlatformAuthToken");
      await axios.put(
        `${apiUrl}/api/tmProjects/tasks/reorder`,
        {
          projectId: tmProject?._id,
          taskId: movedTask._id,
          newPosition: result.destination.index,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating task order:", error);
      // Revert to original order in case of error
      setTmTasks(tmTasks);
    }
  };

  const toggleDropdown = (taskId: string) => {
    setActiveDropdown(activeDropdown === taskId ? null : taskId);
  };

  // Function to get priority color and icon based on priority level
  const getPriorityDisplay = (priority: string) => {
    let color = "";
    let stroke = "";

    switch (priority.toLowerCase()) {
      case "high":
        color = "text-red500";
        stroke = "#EF4444";
        break;
      case "medium":
        color = "text-yellow500";
        stroke = "#F59E0B";
        break;
      case "low":
      default:
        color = "text-gray500";
        stroke = "#9CA3AF";
        break;
    }

    return {
      color,
      stroke,
      element: (
        <div className="flex items-center gap-1">
          <div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9089 2.25H7.71202C5.49074 2.25 4.38011 2.25 3.69005 2.90901C3 3.56802 3 4.62868 3 6.75L3.07964 11.25H11.9089C13.5762 11.25 14.4098 11.25 14.7635 10.8191C14.8614 10.6999 14.9331 10.5631 14.9742 10.4167C15.1229 9.888 14.6227 9.2511 13.6223 7.9773C13.2062 7.44739 12.9982 7.18244 12.961 6.88133C12.9503 6.79408 12.9503 6.70592 12.961 6.61867C12.9982 6.31756 13.2062 6.05261 13.6223 5.52273C14.6227 4.24891 15.1229 3.612 14.9742 3.08324C14.9331 2.93693 14.8614 2.80007 14.7635 2.68085C14.4098 2.25 13.5762 2.25 11.9089 2.25Z"
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 15.75V6"
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className={`${color} text-xs font-medium`}>{priority}</div>
        </div>
      ),
    };
  };

  // Function to get status color and icon based on status
  const getStatusDisplay = (status: string) => {
    let bgColor = "";
    let dotColor = "";
    let textColor = "";

    switch (status.toLowerCase()) {
      case "on going":
      case "ongoing":
      case "on_going":
        bgColor = "bg-blue100";
        dotColor = "bg-blue500";
        textColor = "text-blue500";
        break;
      case "upcoming":
        bgColor = "bg-yellow100";
        dotColor = "bg-yellow500";
        textColor = "text-yellow500";
        break;
      case "completed":
        bgColor = "bg-green100";
        dotColor = "bg-green500";
        textColor = "text-green500";
        break;
      case "backlog":
      default:
        bgColor = "bg-gray100";
        dotColor = "bg-gray500";
        textColor = "text-gray500";
        break;
    }

    return {
      bgColor,
      dotColor,
      textColor,
      element: (
        <div
          className={`flex h-5 px-2 py-1 items-center ${bgColor} rounded-xl gap-2`}
        >
          <div className={`w-2 h-2 rounded-full ${dotColor}`} />
          <div className={`leading-none ${textColor}`}>{status}</div>
        </div>
      ),
    };
  };

  // Format date to YYYY-MM-DD (or your preferred format)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (error) {
      return dateString; // Return as is if there's a parsing error
    }
  };

  // Handle dropdown actions
  const handleCopyTaskId = (taskId: string) => {
    navigator.clipboard.writeText(taskId);
    setActiveDropdown(null);
  };

  const handleCopyTaskUrl = (taskId: string) => {
    navigator.clipboard.writeText(`${window.location.href}/${taskId}`);
    setActiveDropdown(null);
  };

  const handleViewDetails = (taskId: string) => {
    console.log("View task details:", taskId);
    setActiveDropdown(null);
    // Implement your view details logic here
  };

  const handleArchiveTask = async (taskId: string) => {
    if (!setTmTasks) return;

    try {
      const token = localStorage.getItem("freelancingPlatformAuthToken");
      await axios.put(
        `${apiUrl}/api/tmProjects/tasks/archive`,
        {
          taskId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state to remove the archived task
      setTmTasks(tmTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error archiving task:", error);
    }

    setActiveDropdown(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!setTmTasks) return;

    try {
      const token = localStorage.getItem("freelancingPlatformAuthToken");
      await axios.delete(`${apiUrl}/api/tmProjects/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state to remove the deleted task
      setTmTasks(tmTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }

    setActiveDropdown(null);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="taskTable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-w-full bg-white border rounded-lg"
          >
            <div>
              <div className="flex bg-gray200 h-11 rounded-t-lg">
                <div className="py-2 px-4 border-b text-start basis-1/12">
                  #
                </div>
                <div className="py-2 px-4 border-b text-start basis-4/12">
                  Name
                </div>
                <div className="py-2 px-4 border-b text-start basis-3/12">
                  Assignee
                </div>
                <div className="py-2 px-4 border-b text-start basis-1/12">
                  Status
                </div>
                <div className="py-2 px-4 border-b text-start basis-1/12">
                  Due Date
                </div>
                <div className="py-2 px-4 border-b text-start basis-1/12">
                  Priority
                </div>
                <div className="py-2 px-4 border-b text-start basis-1/12"></div>
              </div>
            </div>
            <div>
              {backlogTasks.length === 0 ? (
                <div className="py-4 text-center text-gray500">
                  No tasks in backlog
                </div>
              ) : (
                backlogTasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center border-b bg-white h-[72px]"
                      >
                        <div className="py-2 px-4 text-sm text-gray500 basis-1/12">
                          {index + 1}
                        </div>
                        <div className="py-2 px-4 font-medium text-sm basis-4/12">
                          {task.name || "Untitled Task"}
                        </div>
                        <div className="py-2 px-4 basis-3/12">
                          <div className="flex items-center gap-2.5">
                            {task.assignee && task.assignee.avatar ? (
                              <Image
                                src={task.assignee.avatar}
                                alt={task?.assignee?.fullName || "User"}
                                className="w-10 h-10 rounded-full"
                                width={40}
                                height={40}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray300 flex items-center justify-center">
                                <span className="text-gray600">
                                  {task.assignee || "U"}
                                </span>
                              </div>
                            )}
                            <div className="font-medium text-sm">
                              {task.assignee || "Unassigned"}
                            </div>
                          </div>
                        </div>
                        <div className="flex h-[72px] items-center py-2 px-4 text-xs basis-1/12">
                          {getStatusDisplay(task.status).element}
                        </div>
                        <div className="py-2 px-4 text-gray500 text-sm basis-1/12">
                          {task.dueDate ? formatDate(task?.dueDate) : "No date"}
                        </div>
                        <div className="py-2 px-4 basis-1/12">
                          {getPriorityDisplay(task.priority || "Low").element}
                        </div>
                        <div className="relative py-2 px-4 basis-1/12">
                          <button
                            className="flex justify-center items-center w-8 h-8 text-blue-500 hover:text-blue-700 hover:bg-gray100 rounded-lg transition-all"
                            onClick={() => toggleDropdown(task._id)}
                          >
                            <svg
                              width="44"
                              height="44"
                              viewBox="0 0 44 44"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 23C22.5523 23 23 22.5523 23 22C23 21.4477 22.5523 21 22 21C21.4477 21 21 21.4477 21 22C21 22.5523 21.4477 23 22 23Z"
                                stroke="#6B7280"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M29 23C29.5523 23 30 22.5523 30 22C30 21.4477 29.5523 21 29 21C28.4477 21 28 21.4477 28 22C28 22.5523 28.4477 23 29 23Z"
                                stroke="#6B7280"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15 23C15.5523 23 16 22.5523 16 22C16 21.4477 15.5523 21 15 21C14.4477 21 14 21.4477 14 22C14 22.5523 14.4477 23 15 23Z"
                                stroke="#6B7280"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          {activeDropdown === task._id && (
                            <Dropdown
                              onClose={() => setActiveDropdown(null)}
                              onRename={() => console.log("Rename", task._id)}
                              onCopyId={() => handleCopyTaskId(task._id)}
                              onCopyUrl={() => handleCopyTaskUrl(task._id)}
                              onViewDetails={() => handleViewDetails(task._id)}
                              onArchive={() => handleArchiveTask(task._id)}
                              onDelete={() => handleDeleteTask(task._id)}
                              onRemindMe={() => console.log("Remind", task._id)}
                              onDuplicate={() =>
                                console.log("Duplicate", task._id)
                              }
                              selectedDate={null}
                              setSelectedDate={() => {}}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BacklogBoard;
