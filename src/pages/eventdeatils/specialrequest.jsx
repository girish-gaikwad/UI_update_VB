import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slider,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import FoodIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import CalendarIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";

import AssignButton from "./assignbutton";
import { TbEditCircle } from "react-icons/tb";

const SpecialRequest = ({ event_id, SpecialRequestData, user, ShowPencil }) => {
  const [open, setOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [barColors, setBarColors] = useState({
    car: "#ff6f61",
    soup: "#ff6f61",
    fastfood: "#ff6f61",
    add: "#ff6f61",
  });

  const handleClickOpen = (box) => {
    setSelectedBox(box);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setSelectedBox(null);
  };

  const [disabledItems, setDisabledItems] = useState(new Set()); // Track disabled items

  const getDialogContent = () => {
    switch (selectedBox) {
      case "soup":
        return (
          <>
            <div className="mb-2">
              <p className="text-lg mb-2">Preferred food</p>

              <TextField
                disabled={!ShowPencil}
                value={SpecialRequestData.preferred_food || "Null"}
                fullWidth
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#e1eaf1",
                    borderRadius: "8px",
                    ".MuiSelect-select": {
                      padding: "8px 14px", // Adjust padding for the inner select text
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    height: 40, // Set the desired height here
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <FoodIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mb-2">
              <p className="text-lg mb-2">Time</p>

              <input
                disabled={!ShowPencil}
                className="p-2 w-full rounded-lg   focus:outline-none"
                style={{
                  borderColor: "#dfeaf3", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                id="end_at"
                name="end_at"
                value={
                  SpecialRequestData.food_time
                    ? `${new Date(
                        SpecialRequestData.food_time
                      ).toLocaleDateString("en-GB")} (${new Date(
                        SpecialRequestData.food_time
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })})`
                    : " - "
                }
              />
            </div>

            <div>
              <p className="text-lg mb-2">Venue to give</p>

              <TextField
                disabled={!ShowPencil}
                value={SpecialRequestData.food_to_venue || "Null"}
                fullWidth
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#dfeaf3",
                    borderRadius: "8px",

                    ".MuiSelect-select": {
                      padding: "8px 14px", // Adjust padding for the inner select text
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    height: 40, // Set the desired height here
                    padding: "0px 14px", // Adjust padding to fit the height
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <p className="text-lg mb-2">Quantity</p>

              <div className="flex gap-2">
                <Slider
                  disabled={!ShowPencil}
                  value={SpecialRequestData.food_quantity || 0}
                  step={1}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  sx={{
                    "& .MuiSlider-thumb": {
                      width: 12, // Reduced thumb width
                      height: 12, // Reduced thumb height
                    },
                    "& .MuiSlider-track": {
                      height: 6, // Adjust track thickness if needed
                    },
                    "& .MuiSlider-rail": {
                      height: 6, // Adjust rail thickness if needed
                    },
                  }}
                />

                <div className="flex items-center justify-center border rounded-full px-4 py-1">
                  <button
                    // onClick={handleRemove}
                    disabled={!ShowPencil}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    -
                  </button>
                  <span className="text-black text-lg font-semibold mx-3">
                    {SpecialRequestData.food_quantity || " - "}
                  </span>
                  <button
                    disabled={!ShowPencil}
                    // onClick={handleAdd}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2 justify-end mt-3">
                {user === "eventmanager" &&
                  SpecialRequestData.food_request_status === 1 && (
                    <AssignButton
                      event_id={event_id}
                      key={"Food_Request"} // Ensure this is a unique value
                      item={"Food_Request"} // Ensure Food_Request is a valid value
                      isDisabled={disabledItems.has("Food_Request")} // Check if disabledItems supports .has() or use .includes() for arrays
                    />
                  )}

                <button
                  className="bg-gray-400 text-white py-1 px-4 rounded-lg"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        );
      case "car":
        return (
          <>
            <div>
              {" "}
              <p className="text-lg mb-2">Quantity</p>
              <div className="flex gap-2">
                <Slider
                  disabled={!ShowPencil}
                  value={SpecialRequestData.car_count || 0}
                  valueLabelDisplay="auto"
                  sx={{
                    "& .MuiSlider-thumb": {
                      width: 12, // Reduced thumb width
                      height: 12, // Reduced thumb height
                    },
                    "& .MuiSlider-track": {
                      height: 6, // Adjust track thickness if needed
                    },
                    "& .MuiSlider-rail": {
                      height: 6, // Adjust rail thickness if needed
                    },
                  }}
                />

                <div className="flex items-center justify-center border rounded-full px-4 py-1">
                  <button
                    disabled={!ShowPencil}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    -
                  </button>
                  <span className="text-black text-lg font-semibold mx-3">
                    {SpecialRequestData.car_count || " - "}
                  </span>
                  <button
                    disabled={!ShowPencil}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <p className="text-lg mb-2">Arrival</p>

              <input
                disabled={!ShowPencil}
                className="p-2 px-5 w-full  rounded-lg text-[#5c6493]  focus:outline-none"
                style={{
                  borderColor: "#e1eaf1", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                id="end_at"
                name="end_at"
                value={
                  SpecialRequestData.car_arrival_at
                    ? `${new Date(
                        SpecialRequestData.car_arrival_at
                      ).toLocaleDateString("en-GB")} (${new Date(
                        SpecialRequestData.car_arrival_at
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })})`
                    : " - "
                }
              />
            </div>

            <div className="mb-2">
              <p className="text-lg mb-2">Departure</p>

              <input
                disabled={!ShowPencil}
                className="p-2 px-5 w-full text-[#5c6493] rounded-lg   focus:outline-none"
                style={{
                  borderColor: "#e1eaf1", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                id="end_at"
                name="end_at"
                value={
                  SpecialRequestData.car_departure_at
                    ? `${new Date(
                        SpecialRequestData.car_departure_at
                      ).toLocaleDateString("en-GB")} (${new Date(
                        SpecialRequestData.car_departure_at
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })})`
                    : " - "
                }
              />
            </div>

            {!ShowPencil && (
              <div>
                <p className="text-lg mb-2">Vehicle Type</p>

                <FormControl fullWidth>
                  <input
                    disabled={!ShowPencil}
                    className="p-2 px-5 w-full text-[#5c6493] rounded-lg   focus:outline-none"
                    style={{
                      borderColor: "#e1eaf1", // Red border when error occurs
                      borderWidth: "2px",
                      borderStyle: "solid",
                    }}
                    type="text"
                    id="end_at"
                    name="end_at"
                    value={SpecialRequestData.car_type || "Null"}
                  />
                </FormControl>
              </div>
            )}
            <div style={{ marginTop: "25px" }}></div>
            <div className="flex gap-3 justify-end">
              {user === "eventmanager" &&
                SpecialRequestData.car_request_status === 1 && (
                  <AssignButton
                    event_id={event_id}
                    key={"Car_Request"} // Ensure this is a unique value
                    item={"Car_Request"} // Ensure Food_Request is a valid value
                    isDisabled={disabledItems.has("Car_Request")} // Check if disabledItems supports .has() or use .includes() for arrays
                  />
                )}
              <div
                onClick={handleClose}
                className="bg-gray-400 text-white py-1 px-4 rounded-lg"
              >
                Close
              </div>
            </div>
          </>
        );
      case "fastfood":
        return (
          <>
            <div className="mb-2">
              <p className="text-lg mb-2">Preferred Refreshment</p>

              <TextField
                disabled={!ShowPencil}
                value={SpecialRequestData.refreshment_dish || "Null"}
                fullWidth
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#dfeaf3",
                    borderRadius: "8px",

                    ".MuiSelect-select": {
                      padding: "8px 14px", // Adjust padding for the inner select text
                    },
                  },
                }}
                placeholder="Eg: Chappathi"
                InputProps={{
                  sx: {
                    height: 40, // Set the desired height here
                    padding: "0px 14px", // Adjust padding to fit the height
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <FoodIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="mb-2">
              <p className="text-lg mb-2">Time</p>
              <input
                disabled={!ShowPencil}
                className="p-2 w-full rounded-lg text-[#5c6493]  focus:outline-none"
                style={{
                  borderColor: "#e1eaf1", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                id="end_at"
                name="end_at"
                value={
                  SpecialRequestData.refreshment_time
                    ? `${new Date(
                        SpecialRequestData.refreshment_time
                      ).toLocaleDateString("en-GB")} (${new Date(
                        SpecialRequestData.refreshment_time
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })})`
                    : " - "
                }
              />
            </div>

            <div className="mb-2">
              <p className="text-lg mb-2">Venue to give</p>

              <TextField
                disabled={!ShowPencil}
                value={SpecialRequestData.refreshment_to_venue || "Null"}
                fullWidth
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: "#e1eaf1", // Red border when error occurs
                    borderRadius: "8px",

                    ".MuiSelect-select": {
                      padding: "8px 14px", // Adjust padding for the inner select text
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    height: 40, // Set the desired height here
                    padding: "0px 14px", // Adjust padding to fit the height
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <p className="text-lg mb-2">Quantity</p>

              <div className="flex items-center gap-2 mb-2">
                <Slider
                  value={SpecialRequestData.refreshment_quantity || 0}
                  disabled={!ShowPencil}
                  step={1}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  sx={{
                    "& .MuiSlider-thumb": {
                      width: 12, // Reduced thumb width
                      height: 12, // Reduced thumb height
                    },
                    "& .MuiSlider-track": {
                      height: 6, // Adjust track thickness if needed
                    },
                    "& .MuiSlider-rail": {
                      height: 6, // Adjust rail thickness if needed
                    },
                  }}
                />

                <div className="flex items-center justify-center border rounded-full px-4 py-1">
                  <button
                    disabled={!ShowPencil}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    -
                  </button>
                  <span className="text-black text-lg font-semibold mx-3">
                    {SpecialRequestData.refreshment_quantity || " - "}{" "}
                  </span>
                  <button
                    disabled={!ShowPencil}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              {user === "eventmanager" &&
                SpecialRequestData.refreshment_request_status === 1 && (
                  <AssignButton
                    event_id={event_id}
                    key={"Refreshment_Request"} // Ensure this is a unique value
                    item={"Refreshment_Request"} // Ensure Food_Request is a valid value
                    isDisabled={disabledItems.has("Refreshment_Request")} // Check if disabledItems supports .has() or use .includes() for arrays
                  />
                )}

              <button
                onClick={handleClose}
                className="bg-gray-400 text-white py-1 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </>
        );
      case "add":
        return (
          <div>

<p className="text-lg mb-4">Other requirments</p>

<textarea
disabled={! ShowPencil}
  class="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="Write your content here..."
></textarea>

            <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              className="bg-gray-400 text-white py-1 px-4 rounded-lg"
              >
              Close
            </button>
              </div>
              </div>
        );
      default:
        return <p>Select a box to see the content.</p>;
    }
  };

  const boxes = [
    { id: "car", image: "/images/car.png" },
    { id: "soup", image: "/images/soup.png" },
    { id: "fastfood", image: "/images/fastfood.png" },
    { id: "add", icon: <AddIcon sx={{ fontSize: 40, color: "#03a9f4" }} /> },
  ];

  return (
    <div className="specialrequest">
      {boxes.map((box) => (
        <Box
          className="border relative"
          key={box.id}
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => handleClickOpen(box.id)}
          sx={{
            cursor: "pointer",
            "&:hover .hover-bar": { opacity: 1 },
          }}
        >
          <div className="sr">
            {box.image ? (
              <img src={box.image} className="relative w-8 top-0 " alt="" />
            ) : (
              box.icon
            )}
          </div>

          {ShowPencil && (
            <TbEditCircle
              className="border bg-blue-500 rounded-full hover:bg-blue-600 text-white p-1"
              style={{
                fontSize: "25px",
                position: "absolute",
                top: -15,
                right: -10,
                zIndex: 2,
              }}
            />
          )}

          <Box
            className="hover-bar"
            sx={{
              height: "4px",
              width: "60%",
              backgroundColor: barColors[box.id],
              marginTop: "5px",
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          />
        </Box>
      ))}

      {/* Dialog */}
      <Dialog
        open={open}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
          },
        }}
      >
        <DialogContent>{getDialogContent()}</DialogContent>
      </Dialog>
    </div>
  );
};

export default SpecialRequest;
