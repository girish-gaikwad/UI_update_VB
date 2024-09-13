import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const ClassroomDropdown = ({eventid,handleButtonClick}) => {


  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSeatDropdownOpen, setSeatDropdownOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState("Classroom 1");
  const [activeTab, setActiveTab] = useState('ib'); // Default active tab

  // Define content for each tab
  const tabContent = {
    ib: ['101', '102', '105', '33'],
    as: ['103', '104', '106', '108', '1', '2', '3', '4','103', '104', '106', '108', '1', '2', '3', '4','103', '104', '106', '108', '1', '2', '3', '4'],
    me: ['109', '110', '112', '114'],
    sf: ['115', '116', '117', '119'],
    ae: ['120', '121', '123', '124']
  };

  // Toggle main dropdown
  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
    setSeatDropdownOpen(false); // Close seat dropdown when main dropdown is toggled
  };

  // Toggle seat dropdown
  const handleSeatDropdownToggle = () => {
    setSeatDropdownOpen((prev) => !prev);
  };

  // Handle classroom selection
  const handleClassroomSelect = (classroom) => {
    setSelectedClassroom(classroom);
    setDropdownOpen(false); // Close dropdown when an option is selected
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (




    <div>
      {/* Classroom dropdown */}
      <div className="flex items-center bg-white border w-64 rounded-md cursor-pointer">
        <div className="px-3 w-full flex justify-between items-center" onClick={handleDropdownToggle}>
          <span>{selectedClassroom}</span>
          <MdOutlineKeyboardArrowDown />

        </div>
        <div
               onClick={() => handleButtonClick(eventid, 3)}

        className="p-2 bg-blue-400 h-full">
          <IoSendSharp size={20} />
        </div>
      </div>

      {/* Classroom dropdown options */}
      {isDropdownOpen && (
        <div className="relative left-0  bg-white border rounded-md w-64 shadow-lg z-10 mt-2">
          <div className="p-2 flex justify-between items-center hover:bg-gray-200 cursor-pointer">
            <span onClick={() => handleClassroomSelect("Classrooms (60)")}>
              Classrooms (60)
            </span>
            {/* Button to toggle seat dropdown */}
            <a className="text-blue-500 underline ml-2" onClick={handleSeatDropdownToggle}>
              Edit
            </a>

          </div>
        </div>
      )}

      {/* Seat dropdown */}
      {isSeatDropdownOpen && (
  <div className="bg-white mt-1 p-2  rounded-md shadow-md z-10 w-64">
    {/* Tabs for different types of seats */}
    <div className="flex justify-around mb-2">
      {Object.keys(tabContent).map((label) => (
        <button
          key={label}
          className={`border px-1 py-1 rounded-md ${activeTab === label ? 'bg-blue-300' : ''}`}
          onClick={() => handleTabChange(label)}
        >
          {label.toUpperCase()}
        </button>
      ))}
    </div>

    {/* Legend */}
    <div className="flex justify-around mb-2">
      <span className="text-green-500">Available</span>
      <span className="text-blue-500">Selected</span>
      <span className="text-gray-500">Maintenance</span>
    </div>

    {/* Classroom availability display */}
    <div className="border p-2 rounded-md overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-400 max-h-60"> {/* Add max-height and overflow */}
      <h3 className="font-semibold text-xs text-center mb-2">
        Available Classrooms in {selectedClassroom}
      </h3>

      {/* Seat layout based on active tab */}
      <div className="grid grid-cols-4 gap-4  border text-center">
        {tabContent[activeTab].map((seat) => (
          <div
            key={seat}
            className="p-2 rounded-lg bg-green-200" // Assume all seats are available for simplicity
          >
            {seat}
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>





  );
};

export default ClassroomDropdown;
