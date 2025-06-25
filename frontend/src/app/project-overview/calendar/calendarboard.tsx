"use client";

import defaultEvents from "./events";
import {
  Calendar,
  EventProps,
  momentLocalizer,
  View,
  Views,
} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useState, Dispatch, SetStateAction } from "react";
import { EventStatus, EventType } from "@/types";
import TaskDetailModal from "../task-detail-modal";
import {
  BadgeType,
  TmProjectType,
  TmTaskWithFullDataType,
} from "@/utils/constant";

export interface CalendarBoardProps {
  tmTasks?: TmTaskWithFullDataType[];
  setTmTasks: Dispatch<SetStateAction<TmTaskWithFullDataType[]>>;
  tmProjects: TmProjectType[];
  tmProject?: TmProjectType;
}

const DragAndDropCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);

const CalendarBoard: React.FC<CalendarBoardProps> = ({
  tmTasks,
  setTmTasks,
  tmProjects,
  tmProject,
}) => {
  const [events, setEvents] = useState<EventType[]>(defaultEvents);
  const [tasks, setTasks] = useState<TmTaskWithFullDataType[]>(tmTasks || []);
  const [date, setDate] = useState(new Date());
  const [viewOption, setViewOption] = useState<View>(Views.MONTH);
  const [selectedTask, setSelectedTask] =
    useState<TmTaskWithFullDataType | null>(null);

  const moveEvent = ({
    event: e,
    start,
    end,
    isAllDay: droppedOnAllDaySlot,
  }: EventInteractionArgs<object>) => {
    const idx = events.indexOf(e as EventType);
    const event = events[idx] as EventType;
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, allDay };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setEvents(nextEvents);
  };

  const resizeEvent = ({
    event: e,
    start,
    end,
  }: EventInteractionArgs<object>) => {
    const event = e as EventType;
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.title === event.title
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
  };

  const newEvent = (event: any) => {};

  const getStatusColor = (event: EventProps) => {
    switch ((event.event as EventType).status) {
      case EventStatus.backlog:
        return "bg-gray500";
      case EventStatus.completed:
        return "bg-green500";
      case EventStatus.on_going:
        return "bg-blue500";
      case EventStatus.upcoming:
        return "bg-yellow500 ";
      default:
        return "";
    }
  };

  return (
    <div style={{ minHeight: 740 }}>
      <DragAndDropCalendar
        style={{ height: 700 }}
        selectable
        popup
        localizer={localizer}
        events={events}
        onNavigate={(newDate) => {
          setDate(newDate);
        }}
        onView={(option) => {
          setViewOption(option);
        }}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        onDoubleClickEvent={(event: any) => {
          setSelectedTask({
            _id: "1", // ✅ correct key
            name: "3 Demo concepts for Home page", // 'title' → 'name' to match type
            priority: "Medium",
            dueDate: new Date("2023-09-25"),
            project: {
              _id: "1",
              title: "3 Demo concepts for Home page",
              company: "Freelance Inc.",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              minHourlyRate: "50",
              maxHourlyRate: "120",
              status: "active",
              description: "Demo project for mock display",
              type: "client",
              owner: {
                workHistory: undefined,
                jotTitle: "",
                description: "",
                portfolios: false,
                hourlyRate: 0,
                avatar: "",
                fullName: "",
                email: "",
                userName: "",
                location: "",
                skills: undefined,
                uid: "",
                job_success: 0,
                earning: 0,
                available: false,
                online: false,
                badge: BadgeType.TopRatedPlus,
                position: "",
              },
              estimatedPrice: "",
              scope: "",
              location: "",
              level: "",
              skills: [],
              index: 0,
            },
            assignee: undefined,
            lead: undefined,
            attachments: [],
            status: "upcoming",
            isActive: true,
          });
        }}
        view={viewOption}
        date={date}
        components={{
          event: (event: EventProps) => (
            <div className={`text-xs py-1 px-1.5 ${getStatusColor(event)}`}>
              {event.title}
            </div>
          ),
        }}
      />
      <TaskDetailModal
        task={selectedTask}
        setTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
        tmProjects={tmProjects}
        tmProject={tmProject}
      />
    </div>
  );
};

export default CalendarBoard;
