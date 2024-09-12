import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaPalette,
  FaImages,
  FaThumbtack,
  FaHeart,
  FaChartLine,
  FaFire,
  FaMagic,
  FaGem,
  FaBars,
} from "react-icons/fa";
import { TbHexagonLetterOFilled } from "react-icons/tb";
import { GrCommand } from "react-icons/gr";
import { FiSidebar } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { GiSandsOfTime } from "react-icons/gi";
import { SiTicktick } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip"; // Import MUI Tooltip

const Sidebar = ({user}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`flex flex-col items-center ${
        isCollapsed ? "w-20" : "w-60"
      } h-[100vh] bg-white text-gray-700 transition-width overflow-hidden duration-300 ease-in-out`}
    >
      {/* Sidebar Toggle Button */}

      {/* Sidebar Header */}
      <a className="flex justify-around items-center w-full px-3 mt-3" href="#">
        <TbHexagonLetterOFilled
          onClick={toggleSidebar}
          style={{ color: "#2b3674", fontSize: "30px" }}
        />

        {!isCollapsed && <span className="ml-2 text-lg font-bold">Event</span>}

        {!isCollapsed && (
          <button
            className="flex items-center justify-center h-12 focus:outline-none"
            onClick={toggleSidebar}
          >
            <IoIosArrowBack style={{ color: "#2b3674", fontSize: "20px" }} />
          </button>
        )}
      </a>
<br />
<br />
      {/* Sidebar Menu */}
      <div className="w-full px-2 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center w-[80%] border-t mt-3 border-gray-300">

{
  user === "user" &&
          <NavButton
          to="/" // Add your route path here
          icon={<GrCommand style={{ fontSize: "20px" }} />}
          label="Create Event"
          collapsed={isCollapsed}
          active={location.pathname === "/create-event"} // Pass active state
          />

        }
{
  user !== "user" && <>
          <NavButton
          to="/pending" // Add your route path here
          icon={<GiSandsOfTime />}
          label="Pending"
          collapsed={isCollapsed}
          active={location.pathname === "/pending"} // Pass active state
          />
          <NavButton
          to="/approved" // Add your route path here
          icon={<SiTicktick />}
          label="Approved"
          collapsed={isCollapsed}
          active={location.pathname === "/approved"} // Pass active state
          />
          </>
        }
        </div>
      </div>

      {/* Sidebar Footer with Tooltip */}
      <Tooltip
        title={
          <p style={{ margin: 0 }}>
            girishgaikwad.it23@gmail.com
            <br />
            7376232IT143
          </p>
        }
        arrow
        placement="top"
      >
        <a
          className="flex items-center justify-around w-full h-16 mt-auto border-t bg-white hover:bg-[#e7f1ff]"
          href="#"
        >
          <div className="w-8 h-8 bg-black rounded-3xl"></div>

          {!isCollapsed && (
            <span className="ml-2 text-sm font-medium">Account</span>
          )}
          {!isCollapsed && (
            <MdLogout style={{ color: "#2b3674", fontSize: "20px" }} />
          )}
        </a>
      </Tooltip>
    </div>
  );
};

const NavButton = ({ to, icon, label, collapsed, active }) => (
  <Link
    to={to}
    className={`flex items-center rounded-lg mt-2  justify-${collapsed ? "center" : "start"} p-4 text-gray-700 w-full ${
      active
        ? "bg-gray-200 text-[#2b3674] font-semibold" // Background and text color for active state
        : "hover:bg-gray-300"
    } transition-colors`}
  >
    <span className={`text-2xl ${active ? "text-[#2b3674]" : ""}`}>
      {icon}
    </span>
    {!collapsed && (
      <span className={`ml-2 text-lg font-normal ${active ? "text-[#2b3674]" : ""}`}>
        {label}
      </span>
    )}
  </Link>
);




export default Sidebar;
