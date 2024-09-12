import axios from "axios";
import React, { useState } from "react";

const AssignButton = ({ adminasign, item,isDisabled,event_id }) => {
  const [isClicked, setIsClicked] = useState(false);

const handleEventAssign = async () => {
  try {
    const EventAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-event-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (EventAssignResponse.status === 200) {
      alert("Event Assign Status updated successfully");
    }
  } catch (error) {
    console.error("Error in handleEventAssign function:", error.message);
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};
const handleGuestAssign = async () => {
  try {
    const GuestAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-guest-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (GuestAssignResponse.status === 200) {
      alert("Guest Assign Status updated successfully");
    }
  } catch (error) {
    console.error("Error in handleGuestAssign function:", error.message);
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};
const handleGuestAccomodationAssign = async () => {
  try {
    const GuestAccomodationAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-guest-accommodation-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (GuestAccomodationAssignResponse.status === 200) {
      alert("Guest Accomodation Assign Status updated successfully");
    }
  } catch (error) {
    console.error(
      "Error in handleGuestAccomodationAssign function:",
      error.message
    );
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};
const handleGuestTransportAssign = async () => {
  try {
    const GuestTransportAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-guest-transport-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (GuestTransportAssignResponse.status === 200) {
      alert("Guest Transport Assign Status updated successfully");
    }
  } catch (error) {
    console.error(
      "Error in handleGuestTransportAssign function:",
      error.message
    );
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};
const handleParticipantsAssign = async () => {
  try {
    const ParticipantsAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-participants-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (ParticipantsAssignResponse.status === 200) {
      alert("Participants Assign Status updated successfully");
    }
  } catch (error) {
    console.error(
      "Error in handleParticipantsAssign function:",
      error.message
    );
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};
const handleVenueAssign = async () => {
  try {
    const VenueAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-venue-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (VenueAssignResponse.status === 200) {
      alert("Venue Assign Status updated successfully");
    }
  } catch (error) {
    console.error("Error in handleVenueAssign function:", error.message);
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};
const handleVenueRequirementsAssign = async () => {
  try {
    const VenueRequirementsAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-venue-requirement-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (VenueRequirementsAssignResponse.status === 200) {
      alert("Venue Requirements Assign Status updated successfully");
    }
  } catch (error) {
    console.error(
      "Error in handleVenueRequirementsAssign function:",
      error.message
    );
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};
const handleCarRequest = async () => {
  try {
    const CarRequestAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-car-request-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (CarRequestAssignResponse.status === 200) {
      alert("Car Request Assign Status updated successfully");
    }
  } catch (error) {
    console.error(
      "Error in CarRequestAssignResponse function:",
      error.message
    );
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};
const handleFoodRequest = async () => {
  try {
    const FoodRequestAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-food-request-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (FoodRequestAssignResponse.status === 200) {
      alert("Food Request Assign Status updated successfully");
    }
  } catch (error) {
    console.error(
      "Error in FoodRequestAssignResponse function:",
      error.message
    );
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};
const handleRefreshmentRequest = async () => {
  try {
    const RefreshmentRequestAssignResponse = await axios.put(
      "http://localhost:8000/put/admin-refreshment-request-assign",
      {
        status: 2,
        event_id,
      }
    );
    if (RefreshmentRequestAssignResponse.status === 200) {
      alert("Refreshment Request Assign Status updated successfully");
    }
  } catch (error) {
    console.error(
      "Error in RefreshmentRequestAssignResponse function:",
      error.message
    );
    alert(
      "An error occurred while saving data. Please check the console for details."
    );
  }
};



  const handleClick = () => {

    if (item === "Event") {
      handleEventAssign();
    } else if (item === "Guest") {
      handleGuestAssign();
    } else if (item === "Accomodation") {
      handleGuestAccomodationAssign();
    } else if (item === "Transport") {
      handleGuestTransportAssign();
    } else if (item === "Participants") {
      handleParticipantsAssign();
    } else if (item === "Venue") {
      handleVenueAssign();
    } else if (item === "Venue_Requirements") {
      handleVenueRequirementsAssign();
    }
    else if (item === "Car_Request") {
      handleCarRequest();
    }
    else if (item === "Food_Request") {
      handleFoodRequest();
    }
    else if (item === "Refreshment_Request") {
      handleRefreshmentRequest();
    }
    setIsClicked(true);
    adminasign(item); // Call the passed adminasign function with the item
    console.log("Button clicked and disabled");
  };

  return (
    <div
      style={{
        backgroundColor: isClicked ? "#bebebe" : "#1b75d5",
        color:"white",
        borderRadius:"6px",
        padding: "5px",
        textAlign: "center",
        cursor: isDisabled ? "not-allowed" : "pointer",
        width: "80px",
         opacity: isDisabled ? "0.6" : "1",
        pointerEvents: isDisabled ? "none" : "auto"
      }}
      onClick={handleClick}
    >
      Assign
    </div>
  );
};

export default AssignButton;