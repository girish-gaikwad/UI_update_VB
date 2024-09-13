import React, { useState } from "react";
import "./infrawork.css";
import { CiSquareMore } from "react-icons/ci";
import Divider from "@mui/material/Divider";
import { IoSendSharp } from "react-icons/io5";
import suit from "/images/suit.png";
import money from "/images/money.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NAVX from "../../../pages/components/nav";
import ClassroomDropdown from "./class";

// Precomputed image selection function
const getRandomImage = () => {
  const images = [suit, money];
  return images[Math.floor(Math.random() * images.length)];
};

// Add random images to dummyData
const addRandomImagesToEvents = (data) => {
  return {
    tomorrow: data.tomorrow.map((event) => ({
      ...event,
      image: getRandomImage(),
    })),
    oneDayAgo: data.oneDayAgo.map((event) => ({
      ...event,
      image: getRandomImage(),
    })),
  };
};

function INFRAWORK({ approvedEvents, setApprovedEvents, dummyData }) {
  const [events, setEvents] = useState(() =>
    addRandomImagesToEvents(dummyData)
  );

  const handleButtonClick = (eventId, buttonIndex) => {
    const updatedEvents = { ...events };

    for (const list in updatedEvents) {
      updatedEvents[list] = updatedEvents[list]
        .map((event) => {
          if (event.id === eventId) {
            event[`button${buttonIndex}Clicked`] = true;

            if (buttonIndex === 1) {
              toast(
                `Event Requirements are assigned to event raised by ${event.name}`
              );
            }
            if (buttonIndex === 2) {
              toast(
                `Handler is assigned to event's requirements raised by ${event.name}`
              );
            }
            if (buttonIndex === 3) {
              toast(`Venue is assigned to event raised by ${event.name}`);
            }

            if (
              event.button1Clicked &&
              event.button2Clicked &&
              event.button3Clicked
            ) {
              setApprovedEvents((prev) => [...prev, event]);
              return null;
            }
          }
          return event;
        })
        .filter(Boolean);
    }

    setEvents(updatedEvents);
  };

  return (
    <div className="w-full h-full flex flex-col p-2">
      <NAVX />

      <ToastContainer />

      <div className="w-full h-10 bg-white rounded-tr-lg rounded-tl-lg px-4 py-2 flex justify-between items-center">
        <h2 className="text-lg ">Pending List</h2>
        <CiSquareMore style={{ height: "30px", width: "30px" }} />
      </div>
      <div className="flex justify-end pb-1  border-b  bg-white">
        <div className="flex w-full  text-[#728ebe]  justify-around ">
          <p className=" relative top-0 left-3">faculty</p>
          <p className=" relative top-0 left-10">start</p>
          <p className=" relative top-0 -left-2">Venue Required</p>
          <p className=" relative top-0 -left-12">Handled by</p>
          <p className="relative top-0 -left-8">venue</p>
        </div>
      </div>

      <div className="w-full h-full bg-white overflow-y-auto scrollbar-none">
        <div className="w-full  py-4 px-4  ">
          <div className="w-full flex justify-between items-center">
            {/* <p className="text-[#2d5dd9]">{dateLabel}</p> */}
            <p className="text-[#2d5dd9]">Tommorrow</p>
            <p className="text-gray-600">
              {/* {groupedEvents[dateLabel].length} events */}3 events
            </p>
          </div>

          <div className="border-[#e8e8e8] mb-3 border px-2 rounded-lg ">
            <div className="w-full my-4">
              {events.tomorrow.map((event) => (
                <div
                  key={event.id}
                  className="w-full bg-white border border-[#e8e8e8] flex mb-2  rounded-lg  p-2"
                >
                  <div className="flex items-center w-[30%] ">
                    {/* <div className="infrawork-random-img"> */}
                    <img
                      src={event.image}
                      className="w-12 h-12 mr-4"
                      alt="random"
                    />
                    {/* </div> */}
                    <div>
                      <p className="text-md ">{event.name}</p>
                      <p className="text-[#728ebe]">{event.contact}</p>
                    </div>
                  </div>

                  <div className=" w-full items-center  flex justify-between">
                    <p className="text-gray-600"> {event.dateTime} </p>

                    <div className=" border w-52 border-[#c6c5c9] rounded-md">
                      <div className="flex">
                        <select className="bg-white w-full rounded-md">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                        <div
                          className="infrawork-button-with-icon"
                          onClick={() => handleButtonClick(event.id, 1)}
                        >
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>

                    <div className=" border w-52 border-[#c6c5c9] rounded-md">
                      <div className="flex">
                        <select className="bg-white w-full rounded-md">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                        <div
                          className="infrawork-button-with-icon"
                          onClick={() => handleButtonClick(event.id, 2)}
                        >
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>

                    <div className=" border  border-[#c6c5c9] rounded-md">
                      <ClassroomDropdown
                        handleButtonClick={handleButtonClick}
                        eventid={event.id}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-[#e8e8e8] mb-3 border px-2 rounded-lg ">
            <div className="w-full my-4">
              {events.tomorrow.map((event) => (
                <div
                  key={event.id}
                  className="w-full bg-white border border-[#e8e8e8] flex mb-2  rounded-lg  p-2"
                >
                  <div className="flex items-center w-[30%] ">
                    {/* <div className="infrawork-random-img"> */}
                    <img
                      src={event.image}
                      className="w-12 h-12 mr-4"
                      alt="random"
                    />
                    {/* </div> */}
                    <div>
                      <p className="text-md ">{event.name}</p>
                      <p className="text-[#728ebe]">{event.contact}</p>
                    </div>
                  </div>

                  <div className=" w-full items-center  flex justify-between">
                    <p className="text-gray-600"> {event.dateTime} </p>

                    <div className=" border w-52 border-[#c6c5c9] rounded-md">
                      <div className="flex">
                        <select className="bg-white w-full rounded-md">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                        <div
                          className="infrawork-button-with-icon"
                          onClick={() => handleButtonClick(event.id, 1)}
                        >
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>

                    <div className=" border w-52 border-[#c6c5c9] rounded-md">
                      <div className="flex">
                        <select className="bg-white w-full rounded-md">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                        <div
                          className="infrawork-button-with-icon"
                          onClick={() => handleButtonClick(event.id, 2)}
                        >
                          <i className="icon">
                            <IoSendSharp size={20} />
                          </i>
                        </div>
                      </div>
                    </div>

                    <div className=" border  border-[#c6c5c9] rounded-md">
                      <ClassroomDropdown
                        handleButtonClick={handleButtonClick}
                        eventid={event.id}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>




        </div>

        {/* dummy for show  */}
      </div>
    </div>
  );
}

export default INFRAWORK;
