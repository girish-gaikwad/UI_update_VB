import React, { useEffect, useState } from "react";
import "./eventdetails.css";
import axios from "axios";
import Event from "/images/Event.png";
import Guest from "/images/Guest.png";
import Participants from "/images/Participants.png";
import Venue from "/images/Venue.png";
import Transport from "/images/Transport.png";
import Accomodation from "/images/Accomodation.png";
// import Food from "../../assets/Food.png";
import VenueRequirements from "/images/Venue Requirements.png";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import SpecialRequest from "./specialrequest";
import { SlCalender } from "react-icons/sl";
import Chip from "@mui/material/Chip";
import { IoMdCall } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AssignButton from "./assignbutton";
import { ContactPageSharp } from "@mui/icons-material";
import { Fa500Px } from "react-icons/fa";
import Popup from "./popup";
import NAVX from "../components/nav";

const treeData = [
  {
    id: "Event",
    image: Event,
    children: [
      {
        id: "Invitees",
        image: Guest,
        children: [
          {
            id: "Guest",
            image: Guest,
            children: [
              {
                id: "Accomodation",
                image: Accomodation,
              },
              {
                id: "Transport",
                image: Transport,
              },
            ],
          },
          {
            id: "Participants",
            image: Participants,
          },
        ],
      },
      {
        id: "Venue",
        image: Venue,
        children: [
          {
            id: "Venue_Requirements",
            image: VenueRequirements,
          },
        ],
      },
    ],
  },
];

const EventDetailsriser = ({ selectedEvent, user }) => {
  const { id: event_id } = useParams(); // Extract the id from the URL using useParams
  const [isEventCompleted, setIsEventCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const [progressMap, setProgressMap] = useState({ Invitees: 0 });
  const [completedItems, setCompletedItems] = useState([]);
  const [changeborder, setborder] = useState({});
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState(null);
  const [ShowPencil, setShowPencil] = useState(false); // Set the initial state to false
  const [disabledItems, setDisabledItems] = useState(new Set()); // Track disabled items

  // 1234
  const [event, setEvent] = useState([]);
  const [GuestData, setGuestData] = useState({});
  const [SpecialRequestData, setSpecialRequestData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/get/eventparticipentsvenuerequirement/${event_id}`
      )
      .then((response) => {
        setEvent(response.data[0]); // Set event state with the response data
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
      });
  }, [event_id]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/get/guestaccommodationtransportDetails/${event_id}`
      )
      .then((response) => {
        // console.log(response.data[0].event_name);

        setGuestData(response.data); // Set event state with the response data
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
      });
  }, [event_id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get/extracarfoodrefreshment/${event_id}`)
      .then((response) => {
        setSpecialRequestData(response.data[0]); // Set event state with the response data
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("503 Failed to Get Data");
      });
  }, [event_id]);

  // if ( event > 0) {
  useEffect(() => {
    console.log("car");
    const getStatusColor = (status) => {
      switch (status) {
        case 0: // Status 0 might indicate a pending or inactive status
          return "#d3d3d3"; // Example: Red-ish color for pending/inactive
        case 1: // Status 0 might indicate a pending or inactive status
          return "#f2bbcb"; // Example: Red-ish color for pending/inactive
        case 2: // Status 1 might indicate an active or confirmed status
          return "#bbcbf2"; // Example: Blue-ish color for active/confirmed
        case 3: // Status 2 might indicate a completed status
          return "#b2f2bb"; // Example: Green-ish color for completed
        // default: // Default color for unknown or null status
        //   return "#d3d3d3"; // Grey color for unknown status
      }
    };

    setTimeout(() => {
      setColorMap({
        Event: getStatusColor(event.event_status), // Conditionally set based on event_status
        Venue: getStatusColor(event.venue_status), // Conditionally set based on venue_status
        Venue_Requirements: getStatusColor(event.requirement_status), // Conditionally set based on requirement_status
        Participants: getStatusColor(event.participants_status), // Conditionally set based on participants_status

        // Guest: getStatusColor(event.event_status),
        // Accomodation: getStatusColor(event.event_status),
        // Transport: getStatusColor(event.event_status) // Conditionally set based on guest_status

        Guest: getStatusColor(GuestData[0].guest_status), // Conditionally set based on guest_status
        Accomodation: getStatusColor(GuestData[0].accommodation_status), // Conditionally set based on guest_status
        Transport: getStatusColor(GuestData[0].transport_status), // Conditionally set based on guest_status
      });
    }, 1500);
  }, [event, GuestData]); // Dependencies: Only re-run if event or GuestData changes

  // console.log(event)
  if (error) {
    return <p>{error}</p>;
  }
  if (!event) {
    return <p>Loading event details...</p>; // Show a loading message if the event data is not yet fetched
  }

  // if (user === "user") {
  //   if (!selectedEvent) {
  //     return (
  //       <>
  //         {" "}
  //         <p>No event selected.</p> <Link to={"/"}>back to main page</Link>{" "}
  //       </>
  //     );
  //   }
  // }

  const [requestclick, setrequestclick] = useState(false);
  const [repopup, setrepopup] = useState(false);
  // const[recontent,setrecontent]=useState(false)

  const handleReRequestClick = () => {
    setrequestclick(true);
    setShowPencil(true); // Toggle the ShowPencil state to true when the button is clicked
  };

  const calculateProgress = (
    treeData,
    colorMap,
    targetColor,
    relevantNodes
  ) => {
    let totalNodes = 0;
    let matchingNodes = 0;

    const traverse = (nodes) => {
      nodes.forEach((node) => {
        if (relevantNodes.includes(node.id)) {
          totalNodes++;
          if (colorMap[node.id] === targetColor) {
            matchingNodes++;
          }
          // console.log(
          //   `Node: ${node.id}, Color: ${
          //     colorMap[node.id]
          //   }, Total: ${totalNodes}, Matching: ${matchingNodes}`
          // );
        }
        if (node.children && node.children.length) {
          traverse(node.children);
        }
      });
    };

    traverse(treeData);

    return totalNodes > 0 ? (matchingNodes / totalNodes) * 100 : 0;
  };

  const eventDetailsArray = [
    { name: "Chair", value: event.chair_count },
    { name: "Dais Table", value: event.dais_table_count },
    { name: "White Board", value: event.white_board_count },
    { name: "Hand Mic", value: event.hand_mic_count },
    { name: "Help Desk", value: event.help_desk_count },
    { name: "Collar Mic", value: event.collar_mic_count },
    { name: "Internet", value: event.internet_count },
    { name: "Live Stream", value: event.live_stream_count },
    { name: "Biometric", value: event.biometric_count },
    { name: "Photography", value: event.photography_count },
    { name: "Videography", value: event.videography_count },
    { name: "Large Momentum", value: event.large_momento_count },
    { name: "Small Momentum", value: event.small_momento_count },
    { name: "Shawl", value: event.shawl_count },
    { name: "Pen/Pencil", value: event.pen_pencil_count },
    { name: "Scribbling Pad", value: event.scribbling_pad_count },
    { name: "Water Bottle", value: event.water_bottle_count },
    { name: "Others", value: event.others },
  ];

  useEffect(() => {
    const relevantNodes = [
      "Accomodation",
      "Transport",
      "Participants",
      "Guest",
    ];
    const progress = calculateProgress(
      treeData,
      colorMap,
      "#bbcbf2",
      relevantNodes
    ); // Assuming blue color is '#bbcbf2'
    setProgressMap((prev) => ({ ...prev, Invitees: progress }));
  }, [treeData, colorMap]);

  useEffect(() => {
    if (selectedItem) {
      setColorMap((prevColorMap) => ({
        ...prevColorMap,
        [selectedItem]: "#bbcbf2",
      }));
    }
  }, [selectedItem]); // Ensures this runs whenever selectedItem changes

  useEffect(() => {
    console.log("Selected item updated:", selectedItem);
  }, [selectedItem]);

  const adminasign = (item) => {
    setSelectedItem(item);
    setDisabledItems((prev) => new Set(prev).add(item)); // Disable the clicked button
  };
  // console.log(disabledItems);

  const closePopup = () => {
    setrepopup(false);
  };

  const handleBoxClick = (item) => {
    if (!requestclick) {
      if (item.id === "Event") {
        setSidePanelContent(
          <div className="flex flex-col justify-center w-[80%]">
            <h3 className="text-center text-[#4b91f1] font-semibold mt-3 ">
              {item.id} Details
            </h3>

            <div>
              <div className="text-[#2b3674] mt-2">
                <p>&#x2022; Event Name :</p>
                <div className="servervalues"> {event.event_name || "-"}</div>
              </div>

              <div className="text-[#2b3674] mt-2">
                <p>&#x2022; Event Type :</p>{" "}
                <div className="servervalues">{event.event_type || "-"}</div>
              </div>
              <div className="text-[#2b3674] mt-2">
                <p>&#x2022; From Date/Time :</p>

                <div className="flex text-sm gap-4 ml-2 mt-1">
                  <SlCalender /> {new Date(event.start_at).toLocaleString()}
                </div>
              </div>
              <div className="text-[#2b3674] mt-2">
                <p>&#x2022; To Date/Time :</p>

                <div className="flex text-sm gap-4 ml-2 mt-1">
                  <SlCalender /> {new Date(event.end_at).toLocaleString()}
                </div>
              </div>
              <div className="text-[#2b3674] mt-2">
                <p>&#x2022; Assigned to :</p>
                <div className="servervalues">{event.assigned_to || "-"}</div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {user === "eventmanager" && event.event_status === 1 && (
                <AssignButton
                  event_id={event_id}
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Guest") {
        // setSelectedItem(item.id);
        setSidePanelContent(
          <div className="flex flex-col border w-full gap-1 px-2">
            <>
              <p className="text-center text-[#4b91f1] font-semibold mt-2 ">
                {item.id} Details
              </p>

              <div>
                <div
                  className="overflow-y-auto h-[200px]"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {GuestData.map((guest, index) => (
                    <div key={index} className="mb-4">
                      <p
                        style={{
                          fontSize: "15px",
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#2b3770",
                        }}
                      >
                        &#x2022; {index + 1}. {guest.salutation}{" "}
                        {guest.first_name}
                        {/* {guest.last_name} */}
                        <div>
                          <Chip
                            className="  "
                            label={guest.designation}
                            style={{
                              backgroundColor: "#B6E9D1",
                              fontSize: "11px",
                              color: "white",
                            }}
                          />
                        </div>
                      </p>

                      <p
                        style={{
                          fontSize: "15px",
                          display: "flex",
                          color: "#2b3770",
                          margin: 0,
                        }}
                      >
                        <IoMdCall />
                        &nbsp;{guest.phone_number}
                      </p>

                      {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[#4b91f1] font-medium mb-1 ">
                    Event Incharge :
                  </p>

                  <p className="text-[#2b3674]">Dr. Gautham</p>
                  <div className="flex items-center gap-2">
                    🕼
                    <p variant="body2">9587643455</p>
                  </div>
                </div>
              </div>
            </>

            <div
              style={{ display: "flex", justifyContent: "end", margin: "10px" }}
            >
              {user === "eventmanager" && GuestData[0].guest_status === 1 && (
                <AssignButton
                  event_id={event_id}
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Accomodation") {
        // setSelectedItem(item.id);
        setSidePanelContent(
          <div className="border w-full px-3 ">
            <p className="text-center text-[#4b91f1] font-semibold my-2 ">
              Guest {item.id} Details
            </p>
            <div className="overflow-y-auto h-[280px]">
              {GuestData.length > 0 ? (
                GuestData.map((accommodation, index) => (
                  <div key={index} style={{ paddingTop: "5px" }}>
                    <p style={{ padding: 0, margin: 0, color: "#2b3770" }}>
                      &#x2022; {index + 1}. {accommodation.salutation}{" "}
                      {/* {accommodation.is_alone === 1 ? "Alone" : "Not Alone"}{" "}  */}
                      {accommodation.first_name} {accommodation.last_name}
                    </p>

                    <div className="text-sm ml-2 my-1 text-[#2b3770]">
                      🔹&nbsp;{accommodation.accommodation_venue}
                    </div>

                    <div className="text-sm ml-1">
                      &nbsp; &nbsp;
                      <span style={{ color: "#2782DD", fontWeight: "600" }}>
                        Date
                      </span>
                    </div>

                    <div className="ml-4 my-1" style={{ fontSize: "14px" }}>
                      &nbsp; &nbsp;{" "}
                      {new Date(
                        accommodation.accommodation_arrival_at
                      ).toLocaleDateString()}{" "}
                      <span className="text-[#2782DD]">to </span>
                      {new Date(
                        accommodation.accommodation_departure_at
                      ).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p>No accommodation data available.</p>
              )}
            </div>

            <div>
              <p className="text-[#4b91f1] font-medium mb-1 mt-1 ">
                Hostel Manager :
              </p>

              <p className="text-[#2b3674]">Dr. Gautham</p>
              <div className="flex items-center gap-2">
                🕼
                <p variant="body2">9587643455</p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {user === "eventmanager" &&
                GuestData[0].accommodation_status === 1 && (
                  <AssignButton
                    event_id={event_id}
                    key={item.id}
                    adminasign={adminasign}
                    item={item.id}
                    isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                  />
                )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Transport") {
        // setSelectedItem(item.id);
        setSidePanelContent(
          <div className="border w-full ">
            <p className="text-center text-[#4b91f1] font-semibold my-2 ">
              Guest {item.id} details
            </p>
            <div className=" overflow-y-auto h-[250px] ">
              {GuestData.map((transport, index) => (
                <div
                className="text-[#2b3674] "
                  key={index}
                  style={{ width: "90%", marginLeft: "10%", marginTop: "5%" }}
                >
                  <div
                  className="flex items-center justify-between"
                  >
                    &#x2022; {index + 1}. {transport.salutation}{" "}
                    {transport.first_name} {transport.last_name} 

                    <img
                    className="w-6 relative top-1 right-3"
                      src={
                        transport.transport_is_alone === 0
                          ? "/images/combine.png"
                          : transport.transport_is_alone === 1
                          ? "/images/separate.png"
                          : "/img/no-alone.png"
                      }
                      alt=""
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {transport.from_place || "- "}
                    <img src="/images/loop.png" className="w-6 mx-1" alt="" />
                    {transport.to_place || "-"}
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    <span style={{ color: "#2782DD", fontWeight: "600" }}>
                      Date :
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    {new Date(
                      transport.transport_arrival_at
                    ).toLocaleDateString()}{" "}
                    <span style={{ color: "#2782DD" }}>to</span>{" "}
                    {new Date(
                      transport.transport_arrival_at
                    ).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5">
              <p className="text-[#4b91f1] font-medium mb-1 mt-1 ">
                Hostel Manager :
              </p>

              <p className="text-[#2b3674]">Dr. Gautham</p>
              <div className="flex items-center gap-2">
                🕼
                <p variant="body2">9587643455</p>
              </div>
            </div>

            <div
              style={{ display: "flex", justifyContent: "end", margin: "10px" }}
            >
              {user === "eventmanager" &&
                GuestData[0].transport_status === 1 && (
                  <AssignButton
                    event_id={event_id}
                    key={item.id}
                    adminasign={adminasign}
                    item={item.id}
                    isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                  />
                )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Venue") {
        // console.log("iam from venue", item.id);
        // setSelectedItem(item.id);
        setSidePanelContent(
          <div
            className="flex flex-col gap-1"
            //
          >
            <p className="text-center text-[#4b91f1] font-semibold my-2 ">
              Venue details
            </p>

            <div className="flex gap-2">
              <p className="text-[#2b3674]">• Venue capacity :</p>

              <input
                type="text"
                value={event.capacity || "-"}
                className="rounded-lg text-center border-2 text-[#2b3674] w-14"
                readOnly // To prevent editing, since it's just displaying the value
              />
            </div>

            <div>
              <p className="text-[#2b3674]">
                • Venue type : {event.venue_type || "-"}
              </p>
            </div>

            <div>
              <p className="text-[#4b91f1] font-medium mb-2 ">Date</p>
              <div className="flex">
                <img
                  src="/images/calender.png"
                  alt="Calendar"
                  className="w-6 mr-2"
                />
                <p className="text-[#2b3674] text-sm">
                  {new Date(event.start_at).toLocaleDateString()} -{" "}
                  {new Date(event.end_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[#4b91f1] font-medium mb-1 ">Venue Team :</p>

              <p className="text-[#2b3674]">Dr. Gautham</p>
              <div className="flex items-center gap-2">
                🕼
                <p variant="body2">9587643455</p>
              </div>
            </div>

            <div className="flex justify-end mb-2 ">
              {user === "eventmanager" && event.venue_status === 1 && (
                <AssignButton
                  event_id={event_id}
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Venue_Requirements") {
        // setSelectedItem(item.id);
        setSidePanelContent(
          <div className="border w-full px-3">
            <p className="text-center text-[#4b91f1] font-semibold my-2 ">
              Requirements
            </p>

            <div className="flex gap-2 mb-2 justify-between">
              <p style={{ margin: 0, color: "#333" }}>• Venue count</p>
              <input
                type="text"
                value={event.venue_count || 1}
                style={{
                  width: "40px",
                  textAlign: "center",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  padding: "2px",
                }}
              />
            </div>

            <p className=" text-[#4b91f1] font-semibold my-1 ">
              Venue Requirements
            </p>

            <div className=" overflow-y-auto h-[200px] ">
              {eventDetailsArray
                .filter((item) => item.value > 0) // Filter items with value > 0
                .map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: 0, color: "#333" }}>• {item.name}</p>
                    <input
                      type="text"
                      value={item.value}
                      style={{
                        width: "40px",
                        textAlign: "center",
                        borderRadius: "4px",
                        border: "1px solid #333",
                        padding: "2px",
                      }}
                      readOnly // To prevent editing, since it's just displaying the value
                    />
                  </div>
                ))}
            </div>

            <div>
              <p className="text-[#4b91f1] font-medium mb-2 ">Date</p>
              <div className="flex">
                <img
                  src="/images/calender.png"
                  alt="Calendar"
                  className="w-6 mr-2"
                />
                <p className="text-[#2b3674] text-sm">
                  {new Date(event.start_at).toLocaleDateString()} -{" "}
                  {new Date(event.end_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[#4b91f1] font-medium mb-1 mt-1 ">
                Venue Team :
              </p>

              <p className="text-[#2b3674]">Dr. Gautham</p>
              <div className="flex items-center gap-2">
                🕼
                <p variant="body2">9587643455</p>
              </div>
            </div>

            <div className="flex justify-end mb-2 pr-2">
              {user === "eventmanager" && event.requirement_status === 1 && (
                <AssignButton
                  event_id={event_id}
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
      if (item.id === "Participants") {
        // setSelectedItem(item.id);
        setSidePanelContent(
          <div className="flex flex-col border w-full gap-1">
            <p className="text-center text-[#4b91f1] font-semibold my-2 ">
              Participants details
            </p>

            <div className="border w-full px-3" style={{ marginBottom: "5px" }}>
              <div className="flex justify-between text-[#4b91f1] mb-1">
                <p>Count</p>
                <div className="flex gap-2">
                  <span className="bg-green-300 text-white flex text-sm px-2 items-center justify-center  rounded-lg">
                    Internal
                  </span>
                  <span className="bg-[#a38cff] text-white flex text-sm px-2 items-center justify-center  rounded-lg">
                    External
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="/images/boys.png"
                    alt="Boy"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#7891be",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    Boys{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        marginLeft: "5px",
                      }}
                    >
                      {event.ex_boys_count || "-"}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="/images/girls.png"
                    alt="Girl"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#7891be",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    Girls{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        marginLeft: "5px",
                      }}
                    >
                      {event.ex_girls_count || "-"}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="/images/male.png"
                    alt="Male Faculty"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div
                    style={{
                      fontSize: "11px", // Set the font size only once
                      color: "#7891be",
                      display: "flex",
                      flexDirection: "column",
                      width: "auto", // Adjust width as necessary
                      whiteSpace: "nowrap", // Prevent text wrapping
                    }}
                  >
                    Male Faculty{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        marginLeft: "5px",
                      }}
                    >
                      {event.male_faculty_count || "-"}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="/images/female.png"
                    alt="Female Faculty"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div
                    style={{
                      fontSize: "11px", // Set the font size only once
                      color: "#7891be",
                      display: "flex",
                      flexDirection: "column",
                      width: "auto", // Adjust width as necessary
                      whiteSpace: "nowrap", // Prevent text wrapping
                    }}
                  >
                    Female Faculty{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        marginLeft: "5px",
                      }}
                    >
                      {event.female_faculty_count || "-"}
                    </span>
                  </div>
                </div>
              </div>
              {/* 63e6be */}
            </div>

            <div className="border w-full px-3" style={{ marginBottom: "5px" }}>
              <div className="flex justify-between text-[#4b91f1] mb-1">
                <h3 style={{ margin: 0 }}>Count</h3>
                <span className="bg-green-300 text-white flex text-sm px-2 items-center justify-center  rounded-lg">
                  Accomodation
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="/images/boys.png"
                    alt="Boy"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    Boys{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      {event.acc_boys_count || "-"}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="/images/girls.png"
                    alt="Girl"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    Girls{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      {event.acc_girls_count || "-"}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="/images/male.png"
                    alt="Male Faculty"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div
                    style={{
                      fontSize: "11px", // Set the font size only once
                      color: "#333",
                      display: "flex",
                      flexDirection: "column",
                      width: "auto", // Adjust width as necessary
                      whiteSpace: "nowrap", // Prevent text wrapping
                    }}
                  >
                    Male Faculty{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      {event.acc_male_faculty_count || "-"}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src="/images/female.png"
                    alt="Female Faculty"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div
                    style={{
                      fontSize: "11px", // Set the font size only once
                      color: "#333",
                      display: "flex",
                      flexDirection: "column",
                      width: "auto", // Adjust width as necessary
                      whiteSpace: "nowrap", // Prevent text wrapping
                    }}
                  >
                    Female Faculty{" "}
                    <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                      {event.acc_female_faculty_count || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-3">
              <p className="text-[#4b91f1] font-medium mb-1 ">
                Hostel Manager :
              </p>

              <p className="text-[#2b3674]">Dr. Gautham</p>
              <div className="flex items-center gap-2">
                🕼
                <p variant="body2">9587643455</p>
              </div>
            </div>

            <div className="flex w-full justify-end my-2 pr-5 items-center gap-2">
              {user === "eventmanager" && event.participants_status === 1 && (
                <AssignButton
                  event_id={event_id}
                  key={item.id}
                  adminasign={adminasign}
                  item={item.id}
                  isDisabled={disabledItems.has(item.id)} // Pass whether the button is disabled
                />
              )}
            </div>
          </div>
        );
        setIsSidePanelOpen(true);
      }
    } else {
      // if (item.id === "Venue") {
      // setrecontent(<>car</>)
      setSelectedItem(item);
      // console.log("car", selectedItem);

      setrepopup(true);
      // }
    }
  };

  return (
    <div className=" w-full h-full ">
      <div className="w-full h-full p-3">
        <NAVX />

        <div
          className=" flex  border bg-white  h-full "
          style={{
            justifyContent:
              ShowPencil || !isSidePanelOpen ? "center" : "flex-start",
          }}
        >
          <div className="tree  bg-white flex flex-col h-full">
            {treeRendering(
              treeData,
              handleBoxClick,
              colorMap,
              changeborder,
              progressMap,
              ShowPencil
            )}
            <div className="absolute top-24 right-4">
              <p style={{ marginBottom: "10px", paddingLeft: "6%" }}>
                special requests
              </p>
              <SpecialRequest
              ShowPencil={ShowPencil}
                event_id={event_id}
                SpecialRequestData={SpecialRequestData}
                user={user}
              />
            </div>

            <div className=" bg-white border flex gap-4 absolute bottom-10 w-60 right-20 pr-6  ">
              {user !== "eventmanager" ? (
                <Link to={"/"}>
                  <button
                    className="bg-gray-400 text-white py-1 px-4 rounded-lg"
                    type="button"
                  >
                    Go Back
                  </button>
                </Link>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white  px-2 rounded-lg"
                  onClick={handleReRequestClick}
                >
                  Re-request
                </button>
              )}

              <Link to={"/"}>
                <button
                  className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                  type="submit"
                  // onClick={confirm}
                >
                  Confirm
                </button>
              </Link>
            </div>
          </div>

          {isSidePanelOpen && !ShowPencil && (
            <div
              style={{
                width: "16%",
                // maxHeight: "55%",
                border: "2px dashed #d3d3d3",
                // height: "100%",
                marginTop: "2.5%",
                borderRadius: "11px",
                overflowY: "scroll", // Keep this to allow scrolling without showing the scrollbar
                position: "absolute",
                top: "23%",
                right: "3%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // Internet Explorer 10+
              }}
            >
              <style>
                {`
             /* Hide scrollbar for Chrome, Safari and Opera */
             div::-webkit-scrollbar {
               display: none;
             }
           `}
              </style>

              {sidePanelContent}
            </div>
          )}

          {repopup && (
            // <div
            //   style={{
            //     width: "16%",
            //     // maxHeight: "55%",
            //     border: "2px dashed #d3d3d3",
            //     // height: "100%",
            //     marginTop: "2.5%",
            //     borderRadius: "11px",
            //     overflowY: "scroll", // Keep this to allow scrolling without showing the scrollbar
            //     position: "absolute",
            //     top: "23%",
            //     right: "3%",
            //     display: "flex",
            //     alignItems: "center",
            //     flexDirection: "column",
            //     scrollbarWidth: "none", // Firefox
            //     msOverflowStyle: "none", // Internet Explorer 10+
            //   }}
            // >
            //   <style>
            //     {`
            //    /* Hide scrollbar for Chrome, Safari and Opera */
            //    div::-webkit-scrollbar {
            //      display: none;
            //    }
            //  `}
            //   </style>

            //   {recontent}
            // </div>
            <Popup closePopup={closePopup} selectedItem={selectedItem} />
          )}
        </div>
      </div>
    </div>
  );
};

const darkenColor = (color, amount) => {
  let usePound = false;

  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  let b = ((num >> 8) & 0x00ff) + amount;
  let g = (num & 0x0000ff) + amount;

  r = r > 255 ? 255 : r < 0 ? 0 : r;
  b = b > 255 ? 255 : b < 0 ? 0 : b;
  g = g > 255 ? 255 : g < 0 ? 0 : g;

  return (
    (usePound ? "#" : "") +
    (g | (b << 8) | (r << 16)).toString(16).padStart(6, "0")
  );
};

const treeRendering = (
  treeData,
  handleBoxClick,
  colorMap,
  changeborder,
  progressMap,
  ShowPencil
) => {
  return (
    <ul>
      {treeData.map((item) => {
        const isClickable = colorMap[item.id] !== "#d3d3d3";

        return (
          <li key={item.id} className={`${item.text} ${item.id}`}>
            <div
              className="logoimage"
              onClick={() => isClickable && handleBoxClick(item)}
              style={{
                cursor: isClickable ? "pointer" : "not-allowed",
              }}
            >
              <div
                className="formbox"
                style={{
                  border:
                    item.id !== "Invitees"
                      ? `2.5px solid ${darkenColor(
                          colorMap[item.id] || "#f77575",
                          -30
                        )}`
                      : "none",

                  backgroundColor:
                    item.id !== "Invitees" ? colorMap[item.id] : "transparent",

                  position: "relative",
                }}
              >
                {item.id === "Invitees" && (
                  <div
                    style={{
                      position: "absolute",
                      top: 1,
                      left: 3,
                      zIndex: 1,
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size="80px"
                      thickness={2}
                      className="grayProgress"
                      style={{
                        position: "absolute",
                        top: 2,
                        left: 8,
                        zIndex: 1,
                      }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={progressMap.Invitees}
                      size="80px"
                      thickness={2}
                      className="redProgress"
                      style={{
                        position: "absolute",
                        top: 2,
                        left: 8,
                        zIndex: 1,
                      }}
                    />
                  </div>
                )}

                {ShowPencil && item.id !== "Invitees" && (
                  <EditIcon
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      zIndex: 2,
                      color: "#333",
                    }}
                  />
                )}

                <img
                  src={item.image}
                  alt={item.id}
                  style={{
                    position: "relative",
                    left: item.id === "Invitees" ? "15px" : "9px",

                    width: item.id === "Invitees" ? "70px" : "", // Reduce size only for Invitees
                    top: item.id === "Invitees" ? "15px" : "", // Reduce size only for Invitees
                    height: item.id === "Invitees" ? "auto" : "",
                  }}
                />
                <h6
                  className="flowname"
                  style={{
                    position: "relative",
                    top: item.id === "Invitees" ? "26px" : "",
                  }}
                >
                  {item.id}
                </h6>
              </div>
            </div>
            {item.children && item.children.length
              ? treeRendering(
                  item.children,
                  handleBoxClick,
                  colorMap,
                  changeborder,
                  progressMap,
                  ShowPencil // Pass ShowPencil down to child nodes
                )
              : null}
          </li>
        );
      })}
    </ul>
  );
};

export default EventDetailsriser;
