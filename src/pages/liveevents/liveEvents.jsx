import React, { useEffect, useState } from "react";
import Card from "../components/cards";
import axios from "axios";
import NAVX from "../components/nav";
import { helix } from "ldrs";
import { Link } from "react-router-dom";

const LiveEvent = ({ setSelectedEvent }) => {
  const [card, setCard] = useState(false);
  const [eventx, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  helix.register();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get/eventdata`)
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
        if (response.data.length > 0) {
          setCard(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
      className="w-full h-full flex flex-col justify-center items-center"
      style={{ width: "100%", backgroundColor: "white" }}
      >
        <l-helix size="95" speed="2.5" color="rgb(29, 60, 140)"></l-helix>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full h-full flex flex-col justify-center items-center"
        style={{ width: "100%", backgroundColor: "white" }}
      >
        <l-helix size="95" speed="2.5" color="black"></l-helix>
        <p style={{ color: "red", marginTop: "30px" }}>Error: {error}</p>
      </div>
    );
  }

  const events = [
    {
      status: "CREATED NOW",
      date: "DEC 01 - 02",
      title: "TD1034",
      description: "Symposium - ITRONZ",
      time: "9:30 PM - 3:30 AM",
    },
    {
      status: "CREATED NOW",
      date: "DEC 01 - 02",
      title: "TD1034",
      description: "Symposium - ITRONZ",
      time: "9:30 PM - 3:30 AM",
    },
    {
      status: "CREATED NOW",
      date: "DEC 01 - 02",
      title: "TD1034",
      description: "Symposium - ITRONZ",
      time: "9:30 PM - 3:30 AM",
    },
    {
      status: "CREATED NOW",
      date: "DEC 01 - 02",
      title: "TD1034",
      description: "Symposium - ITRONZ",
      time: "9:30 PM - 3:30 AM",
    },
    {
      status: "CREATED NOW",
      date: "DEC 01 - 02",
      title: "TD1034",
      description: "Symposium - ITRONZ",
      time: "9:30 PM - 3:30 AM",
    },
    {
      status: "CREATED NOW",
      date: "DEC 01 - 02",
      title: "TD1034",
      description: "Symposium - ITRONZ",
      time: "9:30 PM - 3:30 AM",
    },
    {
      status: "IN-PROGRESS",
      date: "DEC 01 - 02",
      title: "TD1034",
      description: "Symposium - ITRONZ",
      time: "9:30 PM - 3:30 AM",
    },
    {
      status: "ASSIGNED",
      date: "DEC 01 - 02",
      title: "TD1034",
      description: "Symposium - ITRONZ",
      time: "9:30 PM - 3:30 AM",
    },
    {
      status: "ASSIGNED",
      date: "DEC 01 - 02",
      title: "TD1034",
      description: "Symposium - ITRONZ",
      time: "9:30 PM - 3:30 AM",
    },
    // Add more events if needed...
  ];

  // console.log(eventx);

  return (
    <div className="flex  flex-col h-full p-3">
      <div className="flex bg-white  w-full flex-col h-full">

      <NAVX/>

        {/* Main Container */}
        <div className=" flex flex-col flex-1  w-full overflow-hidden ">
          {/* Title and Button Section */}
          <div className="flex  pr-6 pt-3 pl-6 justify-between items-center mb-3">
            {card ? (
              <h1 className="text-xl text-[#2b3674]">Live Events</h1>
            ) : (
              <></>
            )}
            <Link to={"/tree"}>
              <button className="px-4 py-2 bg-gradient-to-b from-blue-400 to-blue-500 text-white rounded-lg hover:bg-blue-600">
                Create +
              </button>
            </Link>
          </div>

          {/* Scrollable Cards Section */}
          <div className="flex-1  overflow-y-auto p-3 scrollbar-none">
            <div className="grid pb-3 grid-cols-0  sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventx.map((event, index) => (
                <Link
                  to={`/registered-event/${event.id}`}
                  key={index}
                  onClick={() => setSelectedEvent(event)} // Set the selected event data
                >
                  <Card event={event} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveEvent;
