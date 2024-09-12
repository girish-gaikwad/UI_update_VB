import React, { useState } from "react";
import "./flowChart.css";
import axios from "axios";
import Event from "/images/Event.png";
import Guest from "/images/Guest.png";
import Participants from "/images/Participants.png";
import Venue from "/images/Venue.png";
import Transport from "/images/Transport.png";
import Accomodation from "/images/Accomodation.png";
import VenueRequirements from "/images/Venue Requirements.png";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import myGif from "/bin-file.gif";
import {
  EventPopup,
  GuestPopup,
  ParticipantsPopup,
  AccomodationPopup,
  TransportPopup,
  VenuePopup,
  VenueRequirementPopup,
} from "../popups/popUp";
import SpecialRequest from "../specialrequest/specialrequest";
import { useNavigate } from "react-router-dom";
import NAVX from "../components/nav";

const treeData = [
  {
    id: "Event",
    image: Event,
    popup: "EventPopup",
    children: [
      {
        id: "Invitees",
        image: Guest,
        children: [
          {
            id: "Guest",
            image: Guest,
            popup: "GuestPopup",
            children: [
              {
                id: "Accomodation",
                image: Accomodation,
                popup: "AccomodationPopup",
              },
              {
                id: "Transport",
                image: Transport,
                popup: "TransportPopup",
              },
            ],
          },
          {
            id: "Participants",
            image: Participants,
            popup: "ParticipantsPopup",
          },
        ],
      },
      {
        id: "Venue",
        image: Venue,
        popup: "VenuePopup",
        children: [
          {
            id: "Venue Requirements",
            image: VenueRequirements,
            popup: "VenueRequirementPopup",
          },
        ],
      },
    ],
  },
];

const TreeStructure = () => {
  const [isEventCompleted, setIsEventCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const [progressMap, setProgressMap] = useState({ Invitees: 0 });
  const [completedItems, setCompletedItems] = useState([]);
  const navigate = useNavigate();
  const [changeborder, setborder] = useState({});
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // Loading state for button

  const [formData, setFormData] = useState({
    user_id: 1,
    event_name: "",
    start_at: "",
    end_at: "",
    event_type: "",
    assigned_to: "",
    event_status: 1,
  });
  const [inviteesData, setinviteesData] = useState({});

  const [cards, setCards] = useState([
    {
      id: 1,
      event_id: 3,
      invitees_id: 1,
      salutation: "",
      first_name: "",
      last_name: "",
      gender: "",
      designation: "",
      organization: "",
      email: "",
      country_code: "",
      phone_number: "",
      accommodation_venue: "",
      arrival_at: "",
      departure_at: "",
      vehicle_type: "",
      travel_type: "both",
      t_arrival_at: "",
      t_depature_at: "",
      from_place: "",
      to_place: "",
      r_from_plcae: "",
      r_to_plcae: "",
      guest_status: 0,
      combine_accommodation_status: 0,
      combine_transport_status: 0,
    },
  ]);

  const [participantsData, setParticipantsData] = useState({
    event_id: "",
    invitees_id: "",
    internal_count: 0,
    ex_boys_count: 0,
    ex_girls_count: 0,
    male_faculty_count: 0,
    female_faculty_count: 0,
    accommodation_status: false,
    acc_boys_count: 0,
    acc_girls_count: 0,
    acc_male_faculty_count: 0,
    acc_female_faculty_count: 0,
    participants_status: 0,
  });

  const [groups, setGroups] = useState([]);
  const [aloneGuests, setAloneGuests] = useState([]);

  const [lastAction, setLastAction] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [startStep, setStartStep] = useState(0);

  const mergearray = [...groups, ...aloneGuests];

  const [VenueData, setVenueData] = useState({
    event_id: "",
    venue_type: "",
    venue_name: "",
    venue_count: 0,
    capacity: 0,
    venue_register_status: 1,
  });
  const [selectedContent, setSelectedContent] = useState([]);
  const [selected, setSelected] = useState([]);
  const [quantities, setQuantities] = useState({
    event_id: "",
    venue_id: "",
    chair_count: 0,
    dais_table_count: 0,
    white_board_count: 0,
    hand_mic_count: 0,
    help_desk_count: 0,
    collar_mic_count: 0,
    internet_count: 0,
    live_stream_count: 0,
    biometric_count: 0,
    photography_count: 0,
    videography_count: 0,
    large_momento_count: 0,
    small_momento_count: 0,
    shawl_count: 0,
    pen_pencil_count: 0,
    scribbling_pad_count: 0,
    water_bottle_count: 0,
    others: 0,
    venue_requirement_status: 0,
  });

  const [Tgroups, TsetGroups] = useState([]);
  const [TaloneGuests, TsetAloneGuests] = useState([]);

  const transportmergearray = [...Tgroups, ...TaloneGuests];

  const [soupData, setSoupData] = useState({
    event_id: "",
    preferred_food: "",
    time: "",
    food_quantity: 0,
    to_venue: "",
    food_request_status: 0,
  });
  const [carData, setCarData] = useState({
    event_id: "",
    car_count: 0,
    arrival_at: "",
    depature_at: "",
    car_type: "",
    car_request_status: 0,
  });
  const [fastfoodData, setFastfoodData] = useState({
    event_id: "",
    refreshment_dish: "",
    time: "",
    to_venue: "",
    quantity: 0,
    refreshment_request_status: 0,
  });

  console.log(cards);

  const confirm = async () => {
    setLoading(true);
    try {
      const formattedStartDate = formData.start_at
        ? formData.start_at.replace("T", " ").split(".")[0]
        : null;
      const formattedEndDate = formData.end_at
        ? formData.end_at.replace("T", " ").split(".")[0]
        : null;

      const formattedFormData = {
        ...formData,
        start_at: formattedStartDate,
        end_at: formattedEndDate,
      };

      const eventResponse = await axios.post(
        "http://localhost:8000/post/eventform",
        formattedFormData
      );
      const event_id = eventResponse.data.event_id;
      // console.log("Created Event with ID:", event_id);

      const initialInviteesData = {
        event_id,
        guest_count: 0, // Initialize with 0; will update after guests are added
      };

      const inviteesResponse = await axios.post(
        "http://localhost:8000/post/invitees",
        initialInviteesData
      );
      const invitees_id = inviteesResponse.data.invitees_id;
      // console.log("Created Invitees with ID:", invitees_id);

      const updatedGuests = cards.map((card) => ({
        ...card,
        event_id,
        invitees_id,
      }));

      // console.log("Prepared Guest Data:", updatedGuests);

      const guestResponse = await axios.post(
        "http://localhost:8000/post/eventguest",
        updatedGuests
      );

      // console.log("Guest API Response:", guestResponse.data);

      const unsortedGuestIdsArray = guestResponse.data.guest_id;
      const guestIdsArray = unsortedGuestIdsArray.slice().sort((a, b) => a - b);

      // console.log(guestIdsArray.join(", "));

      const formatDateTime = (isoString) => {
        return isoString
          ? `${isoString.replace("T", " ").split(".")[0]}`
          : null;
      };

      // Create a new array for combineaccommodation data
      const CombineAccommodationData = [];

      mergearray.forEach((preference, index) => {
        if (Array.isArray(preference)) {
          // Pairing logic
          const [firstGuestIndex, secondGuestIndex] = preference.map(
            (p) => p - 1
          );

          CombineAccommodationData.push(
            {
              event_id: "",
              guest_id: guestIdsArray[firstGuestIndex],
              is_alone: false,
              pair_with: guestIdsArray[secondGuestIndex],
              arrival_at: formatDateTime(cards[firstGuestIndex].arrival_at), // Formatting arrival_at
              departure_at: formatDateTime(cards[firstGuestIndex].departure_at), // Formatting departure_at
              accommodation_venue: cards[firstGuestIndex].accommodation_venue, // Adding accommodation_venue
              combine_accommodation_status:
                cards[firstGuestIndex].combine_accommodation_status,
            },
            {
              event_id: "",
              guest_id: guestIdsArray[secondGuestIndex],
              is_alone: false,
              pair_with: guestIdsArray[firstGuestIndex],
              arrival_at: formatDateTime(cards[secondGuestIndex].arrival_at), // Formatting arrival_at
              departure_at: formatDateTime(
                cards[secondGuestIndex].departure_at
              ), // Formatting departure_at
              accommodation_venue: cards[secondGuestIndex].accommodation_venue, // Adding accommodation_venue
              combine_accommodation_status:
                cards[secondGuestIndex].combine_accommodation_status,
            }
          );
        } else {
          // Alone logic
          const guestIndex = preference - 1;
          CombineAccommodationData.push({
            event_id: "",
            guest_id: guestIdsArray[guestIndex],
            is_alone: true,
            pair_with: null,
            arrival_at: formatDateTime(cards[guestIndex].arrival_at), // Formatting arrival_at
            departure_at: formatDateTime(cards[guestIndex].departure_at), // Formatting departure_at
            accommodation_venue: cards[guestIndex].accommodation_venue, // Adding accommodation_venue
            combine_accommodation_status:
              cards[guestIndex].combine_accommodation_status,
          });
        }
      });

      const updatedCombineAccommodation = CombineAccommodationData.map(
        (data) => ({
          ...data,
          event_id: event_id,
        })
      );
      // console.log("Accommodation Data:", updatedCombineAccommodation);

      const CombineAccommodationResponse = await axios.post(
        "http://localhost:8000/post/combineaccommodation",
        updatedCombineAccommodation
      );

      const unsortedCombineAccommodationIdArray =
        CombineAccommodationResponse.data.CombineAccommodation_id;
      const CombineAccommodationIdArray = unsortedCombineAccommodationIdArray
        .slice()
        .sort((a, b) => a - b);

      // console.log(CombineAccommodationIdArray);
      const CombineTransportData = [];

      transportmergearray.forEach((preference, index) => {
        if (Array.isArray(preference)) {
          if (preference.length === 3) {
            // Three-member pairing logic
            const [firstGuestIndex, secondGuestIndex, thirdGuestIndex] =
              preference.map((p) => p - 1);

            CombineTransportData.push(
              {
                event_id: "",
                guest_id: guestIdsArray[firstGuestIndex],
                is_alone: false,
                pair_with1: guestIdsArray[secondGuestIndex],
                pair_with2: guestIdsArray[thirdGuestIndex],
                travel_type: cards[firstGuestIndex].travel_type,
                vehicle_type: cards[firstGuestIndex].vehicle_type,
                t_arrival_at: formatDateTime(
                  cards[firstGuestIndex].t_arrival_at
                ),
                t_departure_at: formatDateTime(
                  cards[firstGuestIndex].t_depature_at
                ),
                from_place: cards[firstGuestIndex].from_place,
                to_place: cards[firstGuestIndex].to_place,
                r_from_place: cards[firstGuestIndex].r_from_plcae,
                r_to_place: cards[firstGuestIndex].r_to_plcae,
                combine_transport_status:
                  cards[firstGuestIndex].combine_transport_status,
              },
              {
                event_id: "",
                guest_id: guestIdsArray[secondGuestIndex],
                is_alone: false,
                pair_with1: guestIdsArray[firstGuestIndex],
                pair_with2: guestIdsArray[thirdGuestIndex],
                travel_type: cards[secondGuestIndex].travel_type,
                vehicle_type: cards[secondGuestIndex].vehicle_type,
                t_arrival_at: formatDateTime(
                  cards[secondGuestIndex].t_arrival_at
                ),
                t_departure_at: formatDateTime(
                  cards[secondGuestIndex].t_depature_at
                ),
                from_place: cards[secondGuestIndex].from_place,
                to_place: cards[secondGuestIndex].to_place,
                r_from_place: cards[secondGuestIndex].r_from_plcae,
                r_to_place: cards[secondGuestIndex].r_to_plcae,
                combine_transport_status:
                  cards[secondGuestIndex].combine_transport_status,
              },
              {
                event_id: "",
                guest_id: guestIdsArray[thirdGuestIndex],
                is_alone: false,
                pair_with1: guestIdsArray[firstGuestIndex],
                pair_with2: guestIdsArray[secondGuestIndex],
                travel_type: cards[thirdGuestIndex].travel_type,
                vehicle_type: cards[thirdGuestIndex].vehicle_type,
                t_arrival_at: formatDateTime(
                  cards[thirdGuestIndex].t_arrival_at
                ),
                t_departure_at: formatDateTime(
                  cards[thirdGuestIndex].t_depature_at
                ),
                from_place: cards[thirdGuestIndex].from_place,
                to_place: cards[thirdGuestIndex].to_place,
                r_from_place: cards[thirdGuestIndex].r_from_plcae,
                r_to_place: cards[thirdGuestIndex].r_to_plcae,
                combine_transport_status:
                  cards[thirdGuestIndex].combine_transport_status,
              }
            );
          } else if (preference.length === 2) {
            // Two-member pairing logic
            const [firstGuestIndex, secondGuestIndex] = preference.map(
              (p) => p - 1
            );

            CombineTransportData.push(
              {
                event_id: "",
                guest_id: guestIdsArray[firstGuestIndex],
                is_alone: false,
                pair_with1: guestIdsArray[secondGuestIndex],
                pair_with2: null,
                travel_type: cards[firstGuestIndex].travel_type,
                vehicle_type: cards[firstGuestIndex].vehicle_type,
                t_arrival_at: formatDateTime(
                  cards[firstGuestIndex].t_arrival_at
                ),
                t_departure_at: formatDateTime(
                  cards[firstGuestIndex].t_depature_at
                ),
                from_place: cards[firstGuestIndex].from_place,
                to_place: cards[firstGuestIndex].to_place,
                r_from_place: cards[firstGuestIndex].r_from_plcae,
                r_to_place: cards[firstGuestIndex].r_to_plcae,
                combine_transport_status:
                  cards[firstGuestIndex].combine_transport_status,
              },
              {
                event_id: "",
                guest_id: guestIdsArray[secondGuestIndex],
                is_alone: false,
                pair_with1: guestIdsArray[firstGuestIndex],
                pair_with2: null,
                travel_type: cards[secondGuestIndex].travel_type,
                vehicle_type: cards[secondGuestIndex].vehicle_type,
                t_arrival_at: formatDateTime(
                  cards[secondGuestIndex].t_arrival_at
                ),
                t_departure_at: formatDateTime(
                  cards[secondGuestIndex].t_depature_at
                ),
                from_place: cards[secondGuestIndex].from_place,
                to_place: cards[secondGuestIndex].to_place,
                r_from_place: cards[secondGuestIndex].r_from_plcae,
                r_to_place: cards[secondGuestIndex].r_to_plcae,
                combine_transport_status:
                  cards[secondGuestIndex].combine_transport_status,
              }
            );
          }
        } else {
          // Alone logic
          const guestIndex = preference - 1;
          CombineTransportData.push({
            event_id: "",
            guest_id: guestIdsArray[guestIndex],
            is_alone: true,
            pair_with1: null,
            pair_with2: null,
            travel_type: cards[guestIndex].travel_type,
            vehicle_type: cards[guestIndex].vehicle_type,
            t_arrival_at: formatDateTime(cards[guestIndex].t_arrival_at),
            t_departure_at: formatDateTime(cards[guestIndex].t_depature_at),
            from_place: cards[guestIndex].from_place,
            to_place: cards[guestIndex].to_place,
            r_from_place: cards[guestIndex].r_from_plcae,
            r_to_place: cards[guestIndex].r_to_plcae,
            combine_transport_status:
              cards[guestIndex].combine_transport_status,
          });
        }
      });

      const updatedCombineTransportData = CombineTransportData.map((data) => ({
        ...data,
        event_id: event_id,
      }));
      // console.log("transport Data:", updatedCombineTransportData);

      const CombineTransportResponse = await axios.post(
        "http://localhost:8000/post/combinetransport",
        updatedCombineTransportData
      );

      const guest_count = guestIdsArray.length;
      // console.log("Total Guests Count:", guest_count);

      const updatedInviteesData = {
        event_id,
        guest_count,
      };

      await axios.put(
        "http://localhost:8000/put/update-guest-count",
        updatedInviteesData
      );

      // console.log("Updated Invitees with Guest Count:", guest_count);

      const updatedParticipants = {
        ...participantsData,
        event_id,
        invitees_id,
      };

      const participantsResponse = await axios.post(
        "http://localhost:8000/post/participants",
        updatedParticipants
      );
      const participants_id = participantsResponse.data.Participant_id;
      // console.log("Created Participants with ID:", participants_id);

      const updatedVenue = {
        ...VenueData,
        event_id,
      };

      const venueResponse = await axios.post(
        "http://localhost:8000/post/venueregister",
        updatedVenue
      );
      const venue_id = venueResponse.data.VenueBooking_id;
      // console.log("Created Venue Booking with ID:", venue_id);

      const updatedVenueRequirement = {
        ...quantities,
        event_id,
        venue_id,
      };

      const venueRequirementResponse = await axios.post(
        "http://localhost:8000/post/venuerequirement",
        updatedVenueRequirement
      );
      const VenueRequirement_id =
        venueRequirementResponse.data.VenueRequirement_id;
      // console.log("Created Venue Booking with ID:", VenueRequirement_id);

      const updatedsoupData = {
        ...soupData,
        time: formatDateTime(soupData.time),
        event_id,
      };

      const soupDataResponse = await axios.post(
        "http://localhost:8000/post/foodrequest",
        updatedsoupData
      );
      const soupData_id = soupDataResponse.data.food_request_id;
      // console.log("Created Food Request with ID:", soupData_id);

      const updatedcarData = {
        ...carData,
        arrival_at: formatDateTime(carData.arrival_at),
        depature_at: formatDateTime(carData.depature_at),
        event_id,
      };

      const carDataResponse = await axios.post(
        "http://localhost:8000/post/car-request",
        updatedcarData
      );
      const carData_id = carDataResponse.data.car_request_id;
      // console.log("Created Car Request with ID:", carData_id);

      const updatedRefreshmentData = {
        ...fastfoodData,
        time: formatDateTime(fastfoodData.time),
        event_id,
      };

      const RefreshmentDataResponse = await axios.post(
        "http://localhost:8000/post/refreshmentrequest",
        updatedRefreshmentData
      );
      const RefreshmentData_id =
        RefreshmentDataResponse.data.refreshment_request_id;
      // console.log("Created Refreshment Request with ID:", RefreshmentData_id);

      /** Final Step: Success Alert **/
      toast.success("Event created successfully!");
      setError("");
      setLoading(false);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        const errorData = err.response.data.error;

        // Handle object-based errors (e.g., for multiple guests)
        if (typeof errorData === "object") {
          Object.values(errorData).forEach((guestErrors) => {
            Object.values(guestErrors).forEach((errorMessage) => {
              toast.error(errorMessage); // Show each individual error message
            });
          });
        } else {
          toast.error(errorData); // Show generic error message if no specific structure
        }
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  const handleBoxClick = (item) => {
    if (item.id === "Event" || isEventCompleted || item.id === "Invitees") {
      setSelectedItem(item);
    }
  };

  const handleSave = () => {
    setColorMap((prev) => ({
      ...prev,
      [selectedItem.id]: "#bbcbf2", // Change color to blue
    }));
    setborder((prev) => ({
      ...prev,
      [selectedItem.id]: "2.5px solid #2d5dd9", // Change border to blue
    }));
    if (selectedItem.id === "Event") {
      setIsEventCompleted(true);
    }

    if (
      ["Guest", "Participants", "Accomodation", "Transport"].includes(
        selectedItem.id
      ) &&
      !completedItems.includes(selectedItem.id)
    ) {
      // Add the selected item to the list of completed items
      setCompletedItems((prev) => [...prev, selectedItem.id]);

      // Increment progress
      setProgressMap((prev) => ({
        ...prev,
        Invitees: Math.min(prev.Invitees + 25, 100), // Increase by 25% per node completion
      }));
    }
  };

  const renderPopup = () => {
    if (!selectedItem) return null;
    const popupProps = {
      onClose: () => setSelectedItem(null),
      onSave: handleSave,
    };
    switch (selectedItem.popup) {
      case "EventPopup":
        return (
          <EventPopup
            {...popupProps}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "GuestPopup":
        return <GuestPopup {...popupProps} cards={cards} setCards={setCards} />;
      case "AccomodationPopup":
        return (
          <AccomodationPopup
            {...popupProps}
            cards={cards}
            setCards={setCards}
            groups={groups}
            setGroups={setGroups}
            aloneGuests={aloneGuests}
            setAloneGuests={setAloneGuests}
            lastAction={lastAction}
            setLastAction={setLastAction}
            selectedGuest={selectedGuest}
            setSelectedGuest={setSelectedGuest}
            startStep={startStep}
            setStartStep={setStartStep}
          />
        );
      case "TransportPopup":
        return (
          <TransportPopup
            {...popupProps}
            cards={cards}
            setCards={setCards}
            Tgroups={Tgroups}
            TsetGroups={TsetGroups}
            TaloneGuests={TaloneGuests}
            TsetAloneGuests={TsetAloneGuests}
          />
        );

      case "ParticipantsPopup":
        return (
          <ParticipantsPopup
            {...popupProps}
            participantsData={participantsData}
            setParticipantsData={setParticipantsData}
          />
        );
      case "VenuePopup":
        return (
          <VenuePopup
            {...popupProps}
            VenueData={VenueData}
            setVenueData={setVenueData}
          />
        );
      case "VenueRequirementPopup":
        return (
          <VenueRequirementPopup
            {...popupProps}
            quantities={quantities}
            setQuantities={setQuantities}
            selectedContent={selectedContent}
            setSelectedContent={setSelectedContent}
            selected={selected}
            setSelected={setSelected}
          />
        );
      default:
        return null;
    }
  };

  const isConfirmEnabled = () => {
    return colorMap.hasOwnProperty("Event") && colorMap.hasOwnProperty("Venue");
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleGoBackClick = () => {
    setShowPopup(true);
  };

  const handleGoBackConfirm = () => {
    // User confirmed, erase data and navigate to home page
    // Perform any data erasure or cleanup here if needed
    navigate("/");
  };

  const handleGoBackCancel = () => {
    // User canceled, just close the popup
    setShowPopup(false);
  };

  return (
    <div className="w-full  h-full">
      <div className="w-full h-full   p-3 ">
        <NAVX />

        <div className="tree bg-white flex flex-col h-full">
          <ToastContainer />
          {treeRendering(
            treeData,
            handleBoxClick,
            colorMap,
            changeborder,
            progressMap
          )}
          {renderPopup()}

          <div
            className="absolute top-24 right-4"
            style={{
              pointerEvents: colorMap.hasOwnProperty("Event") ? "auto" : "none", // Enable pointer events if "Event" exists, otherwise disable
            }}
          >
            <SpecialRequest
            soupData={soupData}
            setSoupData={setSoupData}
            carData={carData}
            setCarData={setCarData}
            fastfoodData={fastfoodData}
            setFastfoodData={setFastfoodData}
            />
          </div>
        
        <div
          className="confirmsubmit pr-6  bg-white"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <div
            onClick={(e) => {
              if (!isConfirmEnabled()) {
                e.preventDefault(); // Prevents any action if not enabled
                return;
              }
              confirm();
            }}
            style={{
              padding: "8px",
              borderRadius: "4px",
              marginRight: "8px",
              backgroundColor: isConfirmEnabled() ? "#4CAF50" : "gray", // Green if enabled, gray if disabled
              color: "white",
              cursor: isConfirmEnabled() ? "pointer" : "not-allowed", // Change cursor to cancel icon if not enabled
              // Removed pointerEvents to ensure cursor style is applied
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Confirm"}
          </div>

          <div
            style={{
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "gray",
              marginRight: "8px",
              color: "white",
            }}
            type="submit"
          >
            Re-Request
          </div>

          <div>
            <div
              type="submit"
              style={{
                padding: "8px",
                borderRadius: "5px",
                backgroundColor: "#2D5DD9",
                marginRight: "8px",
                color: "white",
                cursor: "pointer", // Add cursor pointer for better UX
              }}
              onClick={handleGoBackClick}
            >
              Go Back
            </div>

            {showPopup && (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                }}
              >
                <p>All data will be erased. Are you sure?</p>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={myGif}
                    alt="My GIF"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "5px",
                      backgroundColor: "#2D5DD9",
                      marginRight: "8px",
                      color: "white",
                      cursor: "pointer", // Add cursor pointer for better UX
                    }}
                    onClick={handleGoBackConfirm}
                  >
                    OK
                  </div>

                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "5px",
                      backgroundColor: "gray",
                      marginRight: "8px",
                      color: "white",
                    }}
                    onClick={handleGoBackCancel}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            )}

            {showPopup && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999,
                }}
                onClick={handleGoBackCancel}
              />
            )}
          </div>
        </div>
        
        </div>






      </div>
    </div>
  );
};






const treeRendering = (     
  treeData,
  handleBoxClick,
  colorMap,
  changeborder,
  progressMap
) => {
  return (
    <>
      <ul>
        {treeData.map((item) => (
          <li key={item.id} className={`${item.text} ${item.id}`}>
            <div className="logoimage" onClick={() => handleBoxClick(item)}>
              <div
                className="formbox"
                style={{
                  border:
                    item.id !== "Invitees"
                      ? changeborder[item.id] || "2.5px solid #f77575"
                      : "none",
                  backgroundColor:
                    item.id !== "Invitees"
                      ? colorMap[item.id] || "#fe6f6f45"
                      : "transparent",
                  cursor:
                    item.id !== "Event" &&
                    !colorMap["Event"] &&
                    item.id !== "Invitees"
                      ? "not-allowed"
                      : "pointer" && item.id === "Invitees"
                      ? "context-menu"
                      : "",
                  position: "relative",
                  // For positioning the CircularProgress
                }}
              >
                {item.id === "Invitees" && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 3,
                      zIndex: 1,
                      border: "solif black",
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
                        border: "solif black",
                      }}
                    />
                  </div>
                )}


                
                <img
                  src={item.image}
                  alt={item.id}
                  style={{
                    // zIndex: 2,
                    position: "relative",   
                    left: item.id === "Invitees" ? "15px" : "9px",

                    width: item.id === "Invitees" ? "70px" : "", // Reduce size only for Invitees
                    top: item.id === "Invitees" ? "15px" : "", // Reduce size only for Invitees
                    height: item.id === "Invitees" ? "auto" : "", // Adjust height to maintain aspect ratio
                  }}
                />


                <h6
                  className="flowname"
                  style={{
                    position: "relative",
                    top: item.id === "Invitees" ? "26px" : "", // Reduce
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
                  progressMap
                )
              : null}
          </li>
        ))}
      </ul>
    </>
  );
};


// const treeRendering = (
//   treeData,
//   handleBoxClick,
//   colorMap,
//   changeborder,
//   progressMap,
//   parentNode = null // Keep track of the parent node
// ) => {
//   // Define access rules based on the colorMap and parent node
//   const getAccessRule = (itemId, colorMap, parentNode) => {
//     // Always allow access to the "Event" node
//     if (itemId === "Event") {
//       return true;
//     }
//     // Allow access if parent node is "Event" and Event's color is #bbcbf2
//     if (
//       parentNode === "Event" || parentNode === "Invitees" &&
//       colorMap["Event"] === "#bbcbf2" &&
//       (itemId === "Guest" || itemId === "Participants" || itemId === "Venue")
//     ) {
//       return true;
//     }
//     // Allow access if parent node is "Venue" and Venue's color is #bbcbf2
//     if (parentNode === "Venue" && colorMap["Venue"] === "#bbcbf2" && itemId === "Venue Requirements") {
//       return true;
//     }
//     // Allow access if parent node is "Guest" and Guest's color is #bbcbf2
//     if (parentNode === "Guest" && colorMap["Guest"] === "#bbcbf2" && (itemId === "Accomodation" || itemId === "Transport")) {
//       return true;
//     }
//     return false;
//   };

//   return (
//     <>
//       <ul>
//         {treeData.map((item) => {
//           // Check accessibility of the current node based on its parent
//           const isCurrentAccessible =
//             item.id === "Event" || colorMap[item.id] === "#bbcbf2" || getAccessRule(item.id, colorMap, parentNode);

//           return (
//             <li key={item.id} className={`${item.text} ${item.id}`}>
//               <div
//                 className="logoimage"
//                 onClick={isCurrentAccessible ? () => handleBoxClick(item) : null} // Disable click if not accessible
//                 style={{
//                   pointerEvents: isCurrentAccessible ? "auto" : "none", // Disable interaction if not accessible
//                 }}
//               >
//                 <div
//                   className="formbox"
//                   style={{
//                     border:
//                       item.id !== "Invitees"
//                         ? changeborder[item.id] || "2.5px solid #f77575"
//                         : "none",
//                     backgroundColor:
//                       item.id !== "Invitees"
//                         ? colorMap[item.id] || "#fe6f6f45"
//                         : "transparent",
//                     cursor: isCurrentAccessible
//                       ? "pointer"
//                       : "not-allowed", // Show pointer or not allowed cursor
//                     position: "relative",
//                   }}
//                 >
//                   {item.id === "Invitees" && (
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: 1,
//                         left: 3,
//                         zIndex: 1,
//                       }}
//                     >
//                       <CircularProgress
//                         variant="determinate"
//                         value={100}
//                         size="80px"
//                         thickness={2}
//                         className="grayProgress"
//                         style={{
//                           position: "absolute",
//                           top: 2,
//                           left: 8,
//                           zIndex: 1,
//                         }}
//                       />
//                       <CircularProgress
//                         variant="determinate"
//                         value={progressMap.Invitees}
//                         size="80px"
//                         thickness={2}
//                         className="redProgress"
//                         style={{
//                           position: "absolute",
//                           top: 2,
//                           left: 8,
//                           zIndex: 1,
//                         }}
//                       />
//                     </div>
//                   )}
//                   <img
//                   src={item.image}
//                   alt={item.id}
//                   style={{
//                     // zIndex: 2,
//                     position: "relative",   
//                     left: item.id === "Invitees" ? "15px" : "9px",

//                     width: item.id === "Invitees" ? "70px" : "", // Reduce size only for Invitees
//                     top: item.id === "Invitees" ? "15px" : "", // Reduce size only for Invitees
//                     height: item.id === "Invitees" ? "auto" : "", // Adjust height to maintain aspect ratio
//                   }}
//                 />
//                   <h6
//                     className="flowname"
//                     style={{
//                       position: "relative",
//                       top: item.id === "Invitees" ? "26px" : "",
//                     }}
//                   >
//                     {item.id}
//                   </h6>
//                 </div>
//               </div>
//               {item.children && item.children.length
//                 ? treeRendering(
//                     item.children,
//                     handleBoxClick,
//                     colorMap,
//                     changeborder,
//                     progressMap,
//                     item.id // Pass the current node as the parent node for the next level
//                   )
//                 : null}
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// };


export default TreeStructure;
