"use client";

import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { Icons } from "@/icons";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModel: React.FC<AddToDoModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      <div className="absolute bg-black opacity-10 h-full" />
      <div className="z-10 flex flex-col gap-5 bg-white shadow-lg p-5 rounded-lg max-w-2xl">
        <div className="flex justify-between gap-4">
          <h2 className="font-semibold text-xl">Privacy Settings-Server</h2>
          <button
            className="group flex justify-center items-center border border-gray500 hover:border-red400 rounded-full w-6 h-6 transition-all"
            onClick={onClose}
          >
            <FaXmark className="group-hover:text-red400 w-4 h-4 text-context transition-all" />
          </button>
        </div>
        {/* <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} />}
            label="Mute Channel"
          />
        </div> */}

        {/* <div className="flex items-center gap-2.5 bg-gray100 p-2.5 rounded-lg h-10">
                  <Icons.lightbulbon />
                  <div className="text-gray500 text-sm">SERVER NOTIFICATION SETTINGS</div>
                </div> */}

        {/* <div className="flex flex-col gap-2.5">
                  <RadioGroup row={false} defaultValue="click">
                    <FormControlLabel
                      value="click"
                      control={<Radio />}
                      label="All Messages"
                      sx={{
                        ".Mui-checked": {
                          color: "var(--green-500) !important",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="server"
                      control={<Radio />}
                      label="Only @mentions"
                      sx={{
                        ".Mui-checked": {
                          color: "var(--green-500) !important",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="always"
                      control={<Radio />}
                      label="Nothing"
                      sx={{
                        ".Mui-checked": {
                          color: "var(--green-500) !important",
                        },
                      }}
                    />
                  </RadioGroup>
                </div> */}

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Allow direct messages from other members in this server."
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Filter messages from server members you may not know."
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Share your activity status in this server."
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Allow users to join your activity in this server."
          />
        </div>

        <div className="flex items-center gap-2.5 bg-gray100 p-2.5 rounded-lg h-10">
          <Icons.lightbulbon />
          <div className="text-gray500 text-sm">
            Learn about enhanced safety measures in Community Servers
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            className="bg-green500 hover:bg-green600 hover:shadow-lg mx-4 px-4 py-2 rounded-lg min-w-24 text-white transition-all duration-200"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModel;
