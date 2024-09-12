import React, { useState, useEffect } from "react";
import axios from "axios";
import "./eventmanagerwork.css";
import { CiSquareMore } from "react-icons/ci";
import Divider from "@mui/material/Divider";
import { IoSendSharp } from "react-icons/io5";
import suit from "/images/suit.png";
import money from "/images/money.png";
import Pending from "/images/pending-img.png";
import InProgress from "/images/InProgress-img.png";
import Assigned from "/images/Assigned-img.png";
import Completed from "/images/Completed-img.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import NAVX from "../../../pages/components/nav";

// Precomputed image selection function
const getRandomImage = () => {
  const images = [suit, money];
  return images[Math.floor(Math.random() * images.length)];
};

// Add random images to dummyData
const addRandomImagesToEvents = (data) => {
  return data.map((event) => ({
    ...event,
    image: getRandomImage(),
  }));
};

const formatDateTime = (dateTime) => {
  const dateObj = new Date(dateTime);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  // Format date as DD-MM-YYYY
  const date = dateObj.toLocaleDateString("en-GB", options).replace(/\//g, "-");

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const time = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return `${date} - ${time}`;
};

function EVENTMANAGERWORK({
  approvedEvents,
  setApprovedEvents,
  dummyData,
  setSelectedEvent,
}) {
  const [events, setEvents] = useState(() =>
    addRandomImagesToEvents(dummyData)
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get/admin`)
      .then((response) => {
        const eventsWithImages = addRandomImagesToEvents(response.data);
        setEvents(eventsWithImages);
        console.log(eventsWithImages);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
      });
  }, []);

  const handleViewClick = (event) => {
    setSelectedEvent(event);
    navigate(`/registered-event/${event.event_id}`); // Navigate to event details page
  };

  const groupEventsByDate = (events) => {
    const groupedEvents = {};
    const today = new Date().setHours(0, 0, 0, 0);
    const tomorrow = new Date(today + 24 * 60 * 60 * 1000);
    const dayAfterTomorrow = new Date(today + 2 * 24 * 60 * 60 * 1000);

    events.forEach((event) => {
      const eventDate = new Date(event.start_at).setHours(0, 0, 0, 0);

      if (eventDate === tomorrow.getTime()) {
        if (!groupedEvents["Tomorrow"]) groupedEvents["Tomorrow"] = [];
        groupedEvents["Tomorrow"].push(event);
      } else if (eventDate === dayAfterTomorrow.getTime()) {
        if (!groupedEvents["After 1 Day"]) groupedEvents["After 1 Day"] = [];
        groupedEvents["After 1 Day"].push(event);
      } else {
        const eventDateLabel = new Date(eventDate)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-");
        if (!groupedEvents[eventDateLabel]) groupedEvents[eventDateLabel] = [];
        groupedEvents[eventDateLabel].push(event);
      }
    });

    return groupedEvents;
  };

  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="w-full h-full flex flex-col p-2">
      <NAVX />

      <div className="w-full h-10 bg-white rounded-tr-lg rounded-tl-lg px-4 py-2 flex justify-between items-center">
        <h2 className="text-lg ">Pending List</h2>
        <CiSquareMore style={{ height: "30px", width: "30px" }} />
      </div>
      <div className="flex justify-end pb-1  border-b  bg-white">
        <div className="flex w-full  text-[#728ebe]  justify-around ">
          <p>faculty</p>
          <p>start</p>
          <p className=" relative top-0 left-10">End</p>
          <p className=" relative top-0 left-24">Status</p>
          <p className="relative top-0 left-16">Action</p>
        </div>
      </div>

      <div className="w-full h-full bg-white overflow-y-auto scrollbar-none">


        {Object.keys(groupedEvents).map((dateLabel) => (



          <div key={dateLabel} className="w-full  py-4 px-4  ">

            <div className="w-full flex justify-between items-center">
              <p className="text-[#2d5dd9]">{dateLabel}</p>
              <p className="text-gray-600">
                {groupedEvents[dateLabel].length} events
              </p>
            </div>

            <div className="border-[#e8e8e8] border px-2 rounded-lg ">
              <div className="w-full my-4">


                {groupedEvents[dateLabel].map((event) => (
                  <div
                    key={event.id}
                    className="w-full bg-white border border-[#e8e8e8] flex mb-2  rounded-lg  p-2"
                  >

                    <div className="flex items-center w-[30%] ">

                      <img
                        src={event.image}
                        className="w-12 h-12 mr-4"
                        alt="random"
                      />
                      <div>
                        <p className="text-md ">{event.faculty_name}</p>
                        <p className="text-[#728ebe]">{event.mobile_number}</p>
                      </div>
                    </div>


                    <div className=" w-full items-center  flex justify-between">
                      {/* <div className="mt-4 flex border w-[50%]"> */}
                      <p className="text-gray-600">
                        {formatDateTime(event.start_at)}
                      </p>
                      <p className="text-gray-600">
                        {formatDateTime(event.end_at)}
                      </p>
                      {/* </div> */}

                      <div>
                        {(() => {
                          const statuses = [
                            event.event_status,
                            event.event_guest_status,
                            event.accommodation_status,
                            event.transport_status,
                            event.event_participants_status,
                            event.venue_booking_status,
                            event.venue_requirement_status,
                            event.car_request_status,
                            event.food_request_status,
                            event.refreshment_request_status,
                          ];

                          if (
                            statuses.every(
                              (status) => status === 1 || status === 0
                            )
                          ) {
                            return (
                              <p className="text-gray-600 flex items-center ml-10 ">
                                <img
                                  src={Pending} // Replace with the appropriate icon for "Pending"
                                  alt="Pending"
                                  className="w-4 h-4 mr-2"
                                />
                                Pending
                              </p>
                            );
                          } else if (
                            statuses.some((status) => status === 3) ||
                            statuses.every((status) => status === 2)
                          ) {
                            return (
                              <p className="text-gray-600 flex items-center ml-10 ">
                                <img
                                  src={Assigned} // Replace with the appropriate icon for "Assigned"
                                  alt="Assigned"
                                  className="w-4 h-4 mr-2"
                                />
                                Assigned
                              </p>
                            );
                          } else if (statuses.some((status) => status === 2)) {
                            return (
                              <p className="text-gray-600 flex items-center  ml-10">
                                <img
                                  src={InProgress} // Replace with the appropriate icon for "In Progress"
                                  alt="In Progress"
                                  className="w-4 h-4 mr-2"
                                />
                                In Progress
                              </p>
                            );
                          } else if (statuses.every((status) => status === 3)) {
                            return (
                              <p className="text-gray-600">
                                <img
                                  src={Completed} // Replace with the appropriate icon for "Completed"
                                  alt="Completed"
                                  className="w-4 h-4 mr-2"
                                />
                                Completed
                              </p>
                            );
                          }
                          return null;
                        })()}
                      </div>

                      <div className="text-right  ">
                        <button
                          onClick={() => handleViewClick(event)}
                          className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-1 px-4 rounded"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}


              </div>
            </div>
          </div>
        ))}



      </div>



    </div>
  );
}

export default EVENTMANAGERWORK;
