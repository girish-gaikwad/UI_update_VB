import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./popUps.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Input } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Slider,
  Button,
  Checkbox,
  Typography,
  Tooltip,
  TextField,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  ToggleButtonGroup,
  ToggleButton,
  InputLabel,
  Select,
  Chip,
  FormHelperText,
} from "@mui/material";

import {
  Card,
  Box,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  MenuItem,
  DialogActions,
  styled,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import { BsFillPeopleFill } from "react-icons/bs";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { IoPerson, IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  ArrowBack,
  ArrowForward,
  CalendarToday,
  GroupAdd,
  GroupRemove,
  LocationOn,
  PersonAdd,
  PersonOutline,
  Undo,
} from "@mui/icons-material";
import { ImCross } from "react-icons/im";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { CiLogin } from "react-icons/ci";
import { LuArrowLeftRight } from "react-icons/lu";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const CardStack = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: "100%",
  "& > div": {
    position: "absolute",
    transition: "transform 0.3s ease",
  },
});

const ListItem = React.memo(
  ({
    cards,
    item,
    onPrev,
    onNext,
    onAdd,
    onDelete,
    onInputChange,
    handleChangeColor,
    handleClose,
    errors,
  }) => {
    return (
      <Card className="p-5 rounded-2xl">
        <div className="mb-3 flex justify-end items-center gap-4 ">
          <p className="text-[#5c6493]">Guest Count</p>
          <div className="flex border items-center justify-center  rounded-full ">
            <p className="px-4"> {item.id}</p>
          </div>
          <div onClick={onAdd}>
            <img
              src="/images/personadd.png"
              className="w-5 h-5 cursor-pointer" // Added cursor-pointer
              alt=""
            />
          </div>

          <ImCross
            onClick={onDelete}
            style={{
              width: "20px",
              height: "20px",
              cursor: "pointer",
              color: "red",
            }} // Added color: red
          />
        </div>
        <div className="flex flex-col mb-2  ">
          <div className="flex gap-2 mb-2">
            <div>
              <FormControl fullWidth>
                <p className="text-[#5c6493] mb-1 ">Salutation</p>
                <TextField
                  select
                  // variant="outlined" | "filled" | "standard"
                  variant="outlined"
                  value={item.salutation}
                  sx={{
                    ".MuiOutlinedInput-notchedOutline": {
                      borderRadius: "8px",

                      borderWidth: "2px",
                      borderColor: "#dfeaf3",
                      ".MuiSelect-select": {
                        padding: "8px 14px", // Adjust padding for the inner select text
                      },
                    },
                  }}
                  onChange={(e) => onInputChange("salutation", e.target.value)}
                  error={!!errors.salutation} // Shows error state if there's an error
                  helperText={errors.salutation} // Displays error message
                  InputProps={{
                    sx: {
                      height: 40, // Set the desired height here
                      width: 80,
                    },
                  }}
                >
                  <MenuItem value="Mr">Mr</MenuItem>
                  <MenuItem value="Miss">Miss</MenuItem>
                  <MenuItem value="Mrs">Mrs</MenuItem>
                  <MenuItem value="Dr">Dr</MenuItem>
                </TextField>
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth>
                <p className="text-[#5c6493] mb-1 ">First Name</p>
                <TextField
                  InputProps={{
                    sx: {
                      height: 40, // Set the desired height here
                    },
                  }}
                  sx={{
                    ".MuiOutlinedInput-notchedOutline": {
                      borderWidth: "2px",
                      borderRadius: "8px",

                      borderColor: "#dfeaf3",
                      ".MuiSelect-select": {
                        padding: "8px 14px", // Adjust padding for the inner select text
                      },
                    },
                  }}
                  placeholder="Eg: RIYA"
                  variant="outlined"
                  value={item.first_name}
                  onChange={(e) => onInputChange("first_name", e.target.value)}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                />
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth>
                <p className="text-[#5c6493] mb-1">Last Name</p>
                <TextField
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
                    },
                  }}
                  placeholder="Eg: K"
                  variant="outlined"
                  value={item.last_name}
                  onChange={(e) => onInputChange("last_name", e.target.value)}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
                />
              </FormControl>
            </div>
          </div>
          {/* gender start */}
          <div>
            <FormControl
              component="fieldset"
              fullWidth
              error={!!errors.gender} // Highlight the field in red if there's an error
            >
              <p className="text-[#5c6493] "> Gender</p>
              <RadioGroup
                row
                value={item.gender}
                onChange={(e) => onInputChange("gender", e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="others"
                  control={<Radio />}
                  label="Others"
                />
              </RadioGroup>

              {/* Display the error message below the RadioGroup */}
              <FormHelperText>{errors.gender}</FormHelperText>
            </FormControl>
          </div>
          <div className="flex justify-between mb-2">
            <div>
              <FormControl fullWidth>
                <p className="text-[#5c6493] mb-1">Designation</p>

                <TextField
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
                      height: 40,
                      width: 250,
                    },
                  }}
                  select
                  variant="outlined"
                  value={item.designation}
                  onChange={(e) => onInputChange("designation", e.target.value)}
                  error={!!errors.designation}
                  helperText={errors.designation}
                >
                  <MenuItem value="software-developer">
                    Software Developer
                  </MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="designer">Designer</MenuItem>
                </TextField>
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth>
                <p className="text-[#5c6493] mb-1">Organization</p>
                <TextField
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
                      width: 300,
                    },
                  }}
                  placeholder="Eg: KTC Private Limited"
                  variant="outlined"
                  value={item.organization}
                  onChange={(e) =>
                    onInputChange("organization", e.target.value)
                  }
                  error={!!errors.organization}
                  helperText={errors.organization}
                />
              </FormControl>
            </div>
          </div>
          <div className="mb-2">
            <FormControl fullWidth>
              <p className="text-[#5c6493] mb-1">Email</p>
              <TextField
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
                    width: "70%",
                  },
                }}
                placeholder="Eg: John@gmail.com"
                variant="outlined"
                value={item.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormControl>
          </div>
          <div className="flex gap-14">
            <div>
              <FormControl>
                <p className="text-[#5c6493] mb-1"> Country Code</p>
                <TextField
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
                      padding: "0px 20px", // Adjust padding to fit the height

                      width: 100,
                    },
                  }}
                  placeholder="+91"
                  variant="outlined"
                  value={item.country_code}
                  onChange={(e) =>
                    onInputChange("country_code", e.target.value)
                  }
                  error={!!errors.country_code}
                  helperText={errors.country_code}
                />
              </FormControl>
            </div>

            <div>
              <FormControl>
                <p className="text-[#5c6493] mb-1">Phone Number</p>
                <TextField
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
                    },
                  }}
                  placeholder="Eg: 9866587745"
                  variant="outlined"
                  value={item.phone_number}
                  onChange={(e) =>
                    onInputChange("phone_number", e.target.value)
                  }
                  error={!!errors.phone_number}
                  helperText={errors.phone_number}
                />
              </FormControl>
            </div>
          </div>
        </div>

        <DialogActions>
          {cards.length > 1 && (
            <DialogActions>
              <Tooltip title="Previous Card" arrow>
                <div className="cardsarrow" onClick={onPrev}>
                  <div className="bg-gray-400 text-white py-2 px-2 rounded-lg">
                    <IoIosArrowBack />
                  </div>
                </div>
              </Tooltip>
            </DialogActions>
          )}

          <button
            onClick={handleChangeColor}
            className="bg-blue-500 text-white py-1 px-4 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-400 text-white py-1 px-4 rounded-lg"
          >
            Close
          </button>

          {cards.length > 1 && (
            <DialogActions>
              <Tooltip title="Next Card" arrow>
                <div className="cardsarrow" onClick={onNext}>
                  <div className="bg-gray-400 text-white py-2 px-2 rounded-lg">
                    <IoIosArrowForward />
                  </div>
                </div>
              </Tooltip>
            </DialogActions>
          )}
        </DialogActions>
      </Card>
    );
  }
);

const findPair = (number, pairs) => {
  for (const pair of pairs) {
    if (pair.includes(number)) {
      const index = pair.indexOf(number);
      const pairedNumber = pair[1 - index];
      if (number == pair[1]) {
        return pair[0];
      } else {
        return pair[1];
      }
    }
  }
  // console.log(`Number ${number} is not in any pair.`);
};

const findGroupMembers = (number, pairs) => {
  for (const group of pairs) {
    if (group.includes(number)) {
      // Return the group excluding the specified number
      return group.filter((id) => id !== number);
    }
  }
  return []; // Return an empty array if the number is not found in any group
};

const ListItemA = React.memo(
  ({
    cards,
    cardno,
    item,
    onPrev,
    onNext,
    onInputChange,
    handleClose,
    groups,
    initialGuests,
    minDate,
    errors,
  }) => {
    const pairedman = findPair(cardno + 1, groups);
    // console.log(groups)
    return (
      <Card className="rounded-xl px-4">
        <div className=" flex justify-end items-center  ">
          <div
            className="border px-2 rounded-lg bg-green-200  "
            style={{ marginRight: "5px", marginTop: "5px" }}
          >
            {cardno + 1}
          </div>

          {pairedman && (
            <div
              className="border px-2 rounded-lg bg-wgite  "
              style={{ marginRight: "5px", marginTop: "5px" }}
            >
              {pairedman}
            </div>
          )}
        </div>

        <div>
          <div className="mb-2">
            <p className="text-[#5c6493] mb-1">Arrival Time</p>

            <input
              className="p-2 w-72 rounded-lg   focus:outline-none"
              style={{
                borderColor: "#e1eaf1",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
              placeholder="Select Date and Time"
              type="datetime-local"
              id="start_at"
              name="start_at"
              value={item.arrival_at}
              onChange={(e) => onInputChange("arrival_at", e.target.value)}
              error={!!errors.arrival_at}
              helperText={errors.arrival_at}
              min={minDate}
            />

            {!!errors.arrival_at && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.arrival_at}
              </div>
            )}
          </div>

          <img
            src="/images/up.png"
            className="absolute w-12 top-24 right-16"
            alt=""
          />

          <div className="mb-2">
            <p className="text-[#5c6493] mb-1">Departure Time</p>

            <input
              className="p-2 w-72 rounded-lg   focus:outline-none"
              style={{
                borderColor: "#e1eaf1",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
              placeholder="Select Date and Time"
              type="datetime-local"
              id="start_at"
              name="start_at"
              value={item.departure_at}
              onChange={(e) => onInputChange("departure_at", e.target.value)}
              min={minDate}
            />
            {!!errors.departure_at && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.departure_at}
              </div>
            )}
          </div>

          <div className=" w-full mb-2">
            <FormControl fullWidth>
              <p className="text-[#5c6493] mb-1 ">Accommodation Venue</p>
              <TextField
                fullWidth
                select
                variant="outlined"
                value={item.accommodation_venue}
                onChange={(e) =>
                  onInputChange("accommodation_venue", e.target.value)
                }
                error={!!errors.accommodation_venue} // Conditionally set the error state
                helperText={errors.accommodation_venue} // Display the error message
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 40, // Set the height of the TextField
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "2px", // Border width
                      borderColor: "#dfeaf3", // Border color
                      borderRadius: "8px", // Border radius
                    },
                    "& .MuiSelect-select": {
                      padding: "8px 14px", // Padding for the inner select text
                    },
                  },
                }}
              >
                <MenuItem value="Guest House">Guest House</MenuItem>
                <MenuItem value="hostel">Hostel</MenuItem>
                <MenuItem value="room">Room</MenuItem>
              </TextField>
            </FormControl>
          </div>
        </div>

        <Box className="flex justify-end">
          {cards.length > 1 && (
            <DialogActions>
              <Tooltip title="Previous Card" arrow>
                <div className="cardsarrow" onClick={onPrev}>
                  <div className="bg-gray-400 text-white py-1 px-1 rounded-lg">
                    <IoIosArrowBack />
                  </div>
                </div>
              </Tooltip>
              <Tooltip title="Next Card" arrow>
                <div className="cardsarrow" onClick={onNext}>
                  <div className="bg-gray-400 text-white py-1 px-1 rounded-lg">
                    <IoIosArrowForward />
                  </div>
                </div>
              </Tooltip>
            </DialogActions>
          )}
        </Box>
      </Card>
    );
  }
);
const ListItemT = React.memo(
  ({
    cards,
    cardno,
    item,
    onPrev,
    onNext,
    onInputChange,
    tripType,
    handleClose,
    groups,
    initialGuests,
    minDate,
    errors,
  }) => {
    const [tripTypeState, setTripType] = useState(tripType?.toLowerCase()); // Default to "both" if tripType is undefined

    // const handleTripTypeChange = (event, newTripType) => {
    //   if (newTripType !== null) {
    //     const normalizedTripType = newTripType.toLowerCase();
    //     setTripType(normalizedTripType);
    //     onInputChange(item.id, "travel_type", normalizedTripType); // Update the travel_type in the cards state
    //   }
    // };

    const handleClick1 = () => {
      setTripType("both");
      onInputChange(item.id, "travel_type", "both"); // Update the travel_type in the cards state
    };
    const handleClick2 = () => {
      setTripType("onward");
      onInputChange(item.id, "travel_type", "onward"); // Update the travel_type in the cards state
    };
    const handleClick3 = () => {
      setTripType("return");
      onInputChange(item.id, "travel_type", "return"); // Update the travel_type in the cards state
    };

    // Both fields are enabled when tripTypeState is 'both'
    const isLeftEnabled =
      tripTypeState === "both" || tripTypeState === "onward";
    const isRightEnabled =
      tripTypeState === "both" || tripTypeState === "return";

    const handleClick = (tripType) => {
      setTripType(tripType);
      K;
    };

    const pairedman = findGroupMembers(cardno + 1, groups);

    return (
      <Card className="rounded-xl p-4">
        <div className="flex justify-end items-center  gap-2 py-2">
          <div className="flex items-center space-x-2">
            <div className="border px-2 rounded-lg bg-green-200">
              {cardno + 1}
            </div>

            {pairedman.map((memberId, index) => (
              <div
                key={index}
                className="border px-2 rounded-lg"
                style={{ marginRight: "5px" }}
              >
                {memberId}
              </div>
            ))}
          </div>
        </div>

        <div className=" flex gap-3 mb-3">
          <div className="h-10   flex">
            <div
              onClick={() => handleClick1("both")}
              className={`bg-[#f5f6f8] rounded-tl-lg rounded-bl-lg  flex items-center p-2 gap-2 cursor-pointer ${
                tripTypeState === "both" ? "bg-[#c7c7c7] text-white" : ""
              }`}
            >
              <div
                className={`p-1 w-6 h-6 rounded-lg ${
                  tripTypeState === "Both" ? "bg-white" : "bg-[#567f9a]"
                } text-white`}
              >
                <LuArrowLeftRight />
              </div>
              Both
            </div>

            <div
              onClick={() => handleClick2("onward")}
              className={`bg-[#f5f6f8]   flex items-center p-2 gap-2 cursor-pointer ${
                tripTypeState === "onward" ? "bg-[#c7c7c7] text-white" : ""
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  tripTypeState === "Onward" ? "bg-white" : "bg-[#ff5b13]"
                } text-white`}
              >
                <GoArrowRight />
              </div>
              Onward
            </div>

            <div
              onClick={() => handleClick3("return")}
              className={`bg-[#f5f6f8]  rounded-tr-lg rounded-br-lg  flex items-center p-2 gap-2 cursor-pointer ${
                tripTypeState === "return" ? "bg-[#c7c7c7] text-white" : ""
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  tripTypeState === "Return" ? "bg-white" : "bg-[#7983ff]"
                } text-white`}
              >
                <GoArrowLeft />
              </div>
              Return
            </div>
          </div>

          <FormControl>
            <TextField
              select
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px",
                  borderColor: "#dfeaf3",
                  borderRadius: "8px",
                },
              }}
              InputProps={{
                sx: {
                  width: "110px",
                  height: 40, // Set the desired height here
                  // padding: "0px 25px", // Adjust padding to fit the height
                },
              }}
              variant="outlined"
              value={item.vehicle_type} // Set the current value
              onChange={(e) =>
                onInputChange(item.id, "vehicle_type", e.target.value)
              }
              error={!!errors.vehicle_type} // Conditionally set the error state
              helperText={errors.vehicle_type} // Display the error message
            >
              <MenuItem value="Bolero">Bolero</MenuItem>
              <MenuItem value="Innova">Innova</MenuItem>
              <MenuItem value="Swift">Swift</MenuItem>
              <MenuItem value="Scorpio">Scorpio</MenuItem>
            </TextField>
          </FormControl>
        </div>

        <div className="flex gap-10">
          {/* Left Side Input Fields */}
          <div className="flex flex-col">
            <input
              className="p-2  rounded-lg   focus:outline-none"
              style={{
                borderColor: "#e1eaf1",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
              placeholder="Select Date and Time"
              type="datetime-local"
              id="start_at"
              name="start_at"
              disabled={!isLeftEnabled}
              value={item.t_arrival_at}
              onChange={(e) =>
                onInputChange(item.id, "t_arrival_at", e.target.value)
              }
              min={minDate}
            />
            {!!errors.t_arrival_at && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.t_arrival_at}
              </div>
            )}

            <TextField
              placeholder="Location"
              fullWidth
              disabled={!isLeftEnabled}
              value={item.from_place}
              onChange={(e) =>
                onInputChange(item.id, "from_place", e.target.value)
              }
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px",
                  borderColor: "#dfeaf3",
                  borderRadius: "8px",
                },
                // Additional styles for the input container
                "& .MuiInputBase-root": {
                  height: 40,
                  width: 225, // Set the desired height for the input field
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px", // Adjust padding for the input text
                },
                "& .MuiFormHelperText-root": {
                  marginTop: "4px", // Adjust margin for the helper text
                },
                // Adjust the margin for the TextField
                marginTop: "10px",
              }}
              InputProps={{
                endAdornment: (
                  <div>
                    <LocationOn />
                  </div>
                ),
              }}
              error={!!errors.from_place}
              helperText={errors.from_place}
            />
            <TextField
              placeholder="Location"
              fullWidth
              disabled={!isLeftEnabled}
              value={item.to_place}
              onChange={(e) =>
                onInputChange(item.id, "to_place", e.target.value)
              }
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px",
                  borderColor: "#dfeaf3",
                  borderRadius: "8px",
                },
                "& .MuiInputBase-root": {
                  height: 40,
                  width: 225, // Set the desired height for the input field
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px", // Adjust padding for the input text
                },
                "& .MuiFormHelperText-root": {
                  marginTop: "4px", // Adjust margin for the helper text
                },
                marginTop: "10px",
              }}
              InputProps={{
                endAdornment: (
                  <div>
                    <LocationOn />
                  </div>
                ),
              }}
              error={!!errors.to_place}
              helperText={errors.to_place}
            />
          </div>

          <img
            src="/images/up.png"
            className="absolute w-9 top-36 "
            alt=""
            style={{ left: "46.5%" }}
          />

          {/* Right Side Input Fields */}
          <div className="border flex flex-col justify-end">
            <input
              className="p-2  rounded-lg   focus:outline-none"
              style={{
                borderColor: "#e1eaf1",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
              placeholder="Select Date and Time"
              type="datetime-local"
              id="start_at"
              name="start_at"
              disabled={!isRightEnabled}
              value={item.t_depature_at}
              onChange={(e) =>
                onInputChange(item.id, "t_depature_at", e.target.value)
              }
              min={minDate}
            />

            {!!errors.t_depature_at && (
              <div style={{ color: "red", fontSize: "10px" }}>
                {errors.t_depature_at}
              </div>
            )}

            <TextField
              placeholder="Location"
              fullWidth
              disabled={!isRightEnabled}
              value={item.r_from_plcae} // Fixed typo in `item.r_from_place`
              onChange={(e) =>
                onInputChange(item.id, "r_from_plcae", e.target.value)
              } // Fixed typo in `r_from_place`
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px",
                  borderColor: "#dfeaf3",
                  borderRadius: "8px",
                },
                "& .MuiInputBase-root": {
                  height: 40,
                  width: 225, // Set the desired height for the input field
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px", // Adjust padding for the input text
                },
                "& .MuiFormHelperText-root": {
                  marginTop: "4px", // Adjust margin for the helper text
                },
                marginTop: "10px",
              }}
              InputProps={{
                endAdornment: (
                  <div>
                    <LocationOn />
                  </div>
                ),
              }}
              error={!!errors.r_from_plcae} // Fixed typo in `errors.r_from_place`
              helperText={errors.r_from_plcae} // Fixed typo in `errors.r_from_place`
            />

            <TextField
              placeholder="Location"
              fullWidth
              disabled={!isRightEnabled}
              value={item.r_to_plcae} // Fixed typo in `item.r_to_place`
              onChange={(e) =>
                onInputChange(item.id, "r_to_plcae", e.target.value)
              } // Fixed typo in `r_to_place`
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px",
                  borderColor: "#dfeaf3",
                  borderRadius: "8px",
                },
                "& .MuiInputBase-root": {
                  height: 40,
                  width: 225, // Set the desired height for the input field
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px", // Adjust padding for the input text
                },
                "& .MuiFormHelperText-root": {
                  marginTop: "4px", // Adjust margin for the helper text
                },
                marginTop: "10px",
              }}
              InputProps={{
                endAdornment: (
                  <div>
                    <LocationOn />
                  </div>
                ),
              }}
              error={!!errors.r_to_plcae} // Fixed typo in `errors.r_to_place`
              helperText={errors.r_to_plcae} // Fixed typo in `errors.r_to_place`
            />
          </div>
        </div>

        <Box className="flex justify-end">
          {cards.length > 1 && (
            <DialogActions>
              <Tooltip title="Previous Card" arrow>
                <div className="cardsarrow" onClick={onPrev}>
                  <div className="bg-gray-400 text-white py-1 px-1 rounded-lg">
                    <IoIosArrowBack />
                  </div>
                </div>
              </Tooltip>
              <Tooltip title="Next Card" arrow>
                <div className="cardsarrow" onClick={onNext}>
                  <div className="bg-gray-400 text-white py-1 px-1 rounded-lg">
                    <IoIosArrowForward />
                  </div>
                </div>
              </Tooltip>
            </DialogActions>
          )}
        </Box>
      </Card>
    );
  }
);
const maxVisibleSteps = 3;

const EventPopup = ({ onClose, onSave, formData, setFormData }) => {
  const [minDate, setMinDate] = useState("");
  const [errors, setErrors] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  useEffect(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const formattedDate = now.toISOString().slice(0, 16);
    setMinDate(formattedDate);
  }, []);

  useEffect(() => {
    // Store the initial form data when the popup is opened
    setInitialFormData(formData);
  }, []);

  const handleCancel = () => {
    // Reset form data to the initial state when cancel is clicked
    setFormData(initialFormData);
    onClose();
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.event_name) newErrors.event_name = "Event name is required";
    if (!formData.start_at) newErrors.start_at = "Start time is required";
    if (!formData.end_at) newErrors.end_at = "End time is required";
    if (!formData.assigned_to) newErrors.assigned_to = " required";
    if (!formData.event_type) newErrors.event_type = "Event type is required";

    if (formData.start_at && formData.end_at) {
      const start = new Date(formData.start_at);
      const end = new Date(formData.end_at);

      if (start >= end) {
        newErrors.start_at = "Start time and end time must not be same!";
      } else if ((end - start) / (1000 * 60 * 60) < 10) {
        newErrors.start_at =
          "difference between start and end time must be at least 10 hrs!";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave();
      onClose();
    }
  };

  const eventTypes = [
    { id: 1, label: "Seminar" },
    { id: 2, label: "Webinar" },
    { id: 3, label: "Conference" },
    { id: 4, label: "College visit" },
    { id: 5, label: "Symposium" },
    { id: 6, label: "Meetings" },
    { id: 7, label: "Guest Lectures" },
    { id: 8, label: "Others" },
  ];

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center"
      style={{ backgroundColor: "rgba(211, 211, 211, 0.7)" }}
      onClick={handleCancel}
    >
      <div
        className="bg-white p-8 rounded-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "40%", height: "auto" }}
      >
        <h2 className="text-2xl text-[#263671] mb-2">Register an Event</h2>

        <form className="event-form">
          <div className="flex flex-col gap-2">
            <label htmlFor="event_name" className="text-[#555f90]">
              Name of the event
            </label>
            <input
              id="event_name"
              name="event_name"
              type="text"
              className="p-2 w-72 rounded-lg   focus:outline-none"
              style={{
                borderColor: !!errors.event_name ? "red" : "#e1eaf1", // Red border when error occurs
                borderWidth: "2px",
                borderStyle: "solid",
              }}
              value={formData.event_name}
              onChange={handleChange}
              placeholder="Event Name"
            />

            {errors.event_name && (
              <span className="text-red-500  text-sm">{errors.event_name}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="start_at" className="text-[#555f90]">
                Start
              </label>

              <input
                className="p-2 w-60 rounded-lg   focus:outline-none text-[#555f90]"
                style={{
                  borderColor: !!errors.start_at ? "red" : "#e1eaf1", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                placeholder="Select Date and Time"
                type="datetime-local"
                id="start_at"
                name="start_at"
                value={formData.start_at}
                onChange={handleChange}
                min={minDate}
              />
              {errors.start_at && (
                <span className="text-red-500  text-sm">{errors.start_at}</span>
              )}
            </div>

            <div className=" hidden flex items-center w-20 top-5 left-0 m-2 justify-center gap-1 relative">
              <span className="w-4 h-4 bg-[#e3e3e3] rounded-3xl"></span>
              <span className="w-3 h-3 bg-[#e3e3e3] rounded-3xl"></span>
              <span className="w-2 h-2 bg-[#e3e3e3] rounded-3xl"></span>

              <span className="w-2 h-2 bg-[#e3e3e3] rounded-3xl"></span>
              <span className="w-3 h-3 bg-[#e3e3e3] rounded-3xl"></span>
              <span className="w-4 h-4 bg-[#e3e3e3] rounded-3xl"></span>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="end_at" className="text-[#555f90]">
                End
              </label>

              <input
                placeholder="Select Date and Time"
                className="p-2 w-60 rounded-lg text-[#555f90]  focus:outline-none"
                style={{
                  borderColor: !!errors.end_at ? "red" : "#e1eaf1", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                type="datetime-local"
                id="end_at"
                name="end_at"
                value={formData.end_at}
                onChange={handleChange}
                min={minDate}
              />

              {errors.end_at && (
                <span className="text-red-500  text-sm">{errors.end_at}</span>
              )}
            </div>
          </div>

          <div className="mt-2">
            <label className="text-[#555f90] ">Type of Event</label>
            <div className=" w-full flex flex-wrap ">
              {eventTypes.map((event) => (
                <React.Fragment key={event.id}>
                  <input
                    type="radio"
                    id={event.id}
                    name="event_type"
                    value={event.label}
                    checked={formData.event_type === event.label}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={event.id}
                    style={{
                      borderColor: !!errors.event_type ? "red" : "#e1eaf1", // Red border when error occurs
                      borderWidth: "2px",
                      borderStyle: "solid",
                    }}
                    className={`border border-gray-300 text-sm rounded-md cursor-pointer text-gray-700 font-semibold mx-1 my-1 p-2 transition-colors duration-300 ease-in-out
        ${
          formData.event_type === event.label
            ? "bg-gradient-to-b from-blue-400 to-blue-500 text-white"
            : "bg-white"
        }`}
                  >
                    {event.label}
                  </label>
                </React.Fragment>
              ))}
            </div>

            {errors.event_type && (
              <span className="text-red-500  text-sm">{errors.event_type}</span>
            )}
          </div>

          <div className="flex gap-3 w-full    items-center">
            <label htmlFor="assigned_to" className="text-[#555f90] ">
              Assigned To
            </label>
            <input
              id="assigned_to"
              name="assigned_to"
              className="p-2 w-96 rounded-lg   focus:outline-none"
              style={{
                borderColor: !!errors.assigned_to ? "red" : "#e1eaf1", // Red border when error occurs
                borderWidth: "2px",
                borderStyle: "solid",
              }}
              type="text"
              value={formData.assigned_to}
              onChange={handleChange}
              placeholder="Team Involved"
            />
            {errors.assigned_to && (
              <span className="text-red-500  text-sm">
                {errors.assigned_to}
              </span>
            )}
          </div>
        </form>
        <div className="flex gap-3 w-full justify-end mt-3   items-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const GuestPopup = ({ onClose, onSave, cards, setCards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [initialFormData, setInitialFormData] = useState({});

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const handleAdd = () => {
    const newCard = {
      id: cards.length + 1, // Temporary id assignment
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
      travel_type: "",
      t_arrival_at: "",
      t_depature_at: "",
      from_place: "",
      to_place: "",
      r_from_plcae: "",
      r_to_plcae: "",
      guest_status: 0,
      combine_accommodation_status: 0,
      combine_transport_status: 0,
    };
    const newCards = [...cards];
    newCards.splice(currentIndex + 1, 0, newCard);
    // Reassign ids to be sequential
    const updatedCards = newCards.map((card, index) => ({
      ...card,
      id: index + 1,
    }));
    setCards(updatedCards);
  };

  const handleDelete = () => {
    if (cards.length === 1) return; // Prevent deleting the last card
    const newCards = cards.filter((_, index) => index !== currentIndex);
    // Reassign ids to be sequential
    const updatedCards = newCards.map((card, index) => ({
      ...card,
      id: index + 1,
    }));
    setCards(updatedCards);
    setCurrentIndex((prevIndex) =>
      prevIndex >= updatedCards.length ? 0 : prevIndex
    );
  };

  const handleInputChange = (id, field, value) => {
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    );
    setCards(newCards);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Clear the error for the current field
  };

  const validateFields = () => {
    let validationErrors = {};
    let isValid = true;

    cards.forEach((card, index) => {
      let cardErrors = {};

      if (!card.salutation) cardErrors.salutation = "Salutation is required";
      if (!card.first_name) cardErrors.first_name = "First Name is required";
      if (!card.gender) cardErrors.gender = "Gender is required";
      if (!card.designation) cardErrors.designation = "Designation is required";
      if (!card.organization)
        cardErrors.organization = "Organization is required";
      if (!card.email) cardErrors.email = "Email is required";
      if (!card.phone_number)
        cardErrors.phone_number = "Phone Number is required";

      const validSalutations = ["Mr", "Miss", "Dr", "Mrs"];
      if (card.salutation && !validSalutations.includes(card.salutation)) {
        cardErrors.salutation = "It is not a Salutation";
      }

      // Additional validation: Email format
      if (card.email && !/\S+@\S+\.\S+/.test(card.email)) {
        cardErrors.email = "Invalid email format";
      }

      const countryCodeRegex = /^\+\d+$/;

      if (!card.country_code) {
        cardErrors.country_code = "Country code is required";
      }
      if (!countryCodeRegex.test(card.country_code)) {
        cardErrors.country_code = "It is not a Country Code";
      }

      // Additional validation: Phone number format
      if (card.phone_number && !/^\d{10}$/.test(card.phone_number)) {
        cardErrors.phone_number = "Phone Number must be 10 digits";
      }

      if (Object.keys(cardErrors).length > 0) {
        isValid = false;
      }

      validationErrors[index + 1] = cardErrors;
    });

    setErrors(validationErrors);
    return isValid;
  };

  useEffect(() => {
    setInitialFormData([...cards]); // Store initial data
  }, [cards]);

  const handleSubmit = () => {
    if (validateFields()) {
      const updatedCards = cards.map((card) => ({
        ...card,
        guest_status: 1, // Set guest_status to 1
      }));
      setCards(updatedCards);
      onSave();
      onClose();
    } else {
      toast.error("Validation failed. Please fill out all required fields.");
    }
  };

  const handleClose = () => {
    setCards([...initialFormData]); // Reset data to initial state
    onClose(); // Close the popup
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center"
      style={{ backgroundColor: "rgba(211, 211, 211, 0.7)" }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "700px",
            height: "500px",
          }}
        >
          <ToastContainer />

          <CardStack>
            {cards.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  transform: `translateX(${
                    (currentIndex - index) * -40
                  }px) scale(${index === currentIndex ? 1 : 0.95})`,
                  zIndex: cards.length - Math.abs(currentIndex - index),
                  opacity: currentIndex === index ? 1 : 0.5,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              >
                <ListItem
                  cards={cards}
                  item={item}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  handleChangeColor={handleSubmit}
                  handleClose={handleClose}
                  onInputChange={(field, value) =>
                    handleInputChange(item.id, field, value)
                  } // Corrected
                  errors={errors[item.id] || {}} // Pass the errors for this specific item
                />
              </Box>
            ))}
          </CardStack>
        </Box>
      </div>
    </div>
  );
};

const ParticipantsPopup = ({
  onClose,
  onSave,
  participantsData,
  setParticipantsData,
}) => {
  const [errors, setErrors] = useState({});
  const [initialFormData, setInitialFormData] = useState({});

  useEffect(() => {
    // Store the initial form data when the popup is opened
    setInitialFormData(participantsData);
  }, []);

  const handleCancel = () => {
    setParticipantsData(initialFormData);
    onClose();
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    // Validate participant counts
    const fieldsToValidate = [
      "internal_count",
      "ex_boys_count",
      "ex_girls_count",
    ];

    fieldsToValidate.forEach((field) => {
      if (participantsData[field] < 10) {
        newErrors[field] = "Participants not less than 10";
        isValid = false;
      } else {
        newErrors[field] = "";
      }
    });

    // Validate accommodation fields if checkbox is checked
    if (participantsData.accommodation_status) {
      ["acc_boys_count", "acc_girls_count"].forEach((field) => {
        if (participantsData[field] < 10) {
          newErrors[field] = "Participants not less than 10";
          isValid = false;
        } else {
          newErrors[field] = "";
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSliderChange = (field) => (event, newValue) => {
    setParticipantsData((prevData) => ({
      ...prevData,
      [field]: Math.max(0, newValue), // Ensure non-negative values
    }));
  };

  const handleInputChange = (field) => (event) => {
    const value = Number(event.target.value);
    setParticipantsData((prevData) => ({
      ...prevData,
      [field]: value < 0 ? 0 : value, // Ensure non-negative values
    }));
  };

  const handleBlur = (field) => () => {
    if (participantsData[field] < 0) {
      setParticipantsData((prevData) => ({
        ...prevData,
        [field]: 0,
      }));
    }
  };

  const handleAccommodationChange = () => {
    setParticipantsData((prevData) => {
      const newAccommodationStatus = !prevData.accommodation_status;
      return {
        ...prevData,
        accommodation_status: newAccommodationStatus,
        acc_boys_count: newAccommodationStatus ? 0 : 0, // Set initial value or reset to 0
        acc_girls_count: newAccommodationStatus ? 0 : 0,
        acc_male_faculty_count: newAccommodationStatus ? 0 : 0,
        acc_female_faculty_count: newAccommodationStatus ? 0 : 0,
      };
    });
  };

  const handleSubmit = () => {
    if (validateFields()) {
      setParticipantsData((prevData) => ({
        ...prevData,
        participants_status: 1, // Update participants_status to 1 on save
      }));
      onSave();
      onClose();
    }
  };

  const renderSlider = (label, field) => (
    <div className="mb-3 borde text-[#555f90]">
      <label className="block text-sm mb-2 ">{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Slider
          className="w-full"
          value={participantsData[field]}
          onChange={handleSliderChange(field)}
          aria-labelledby={`${label.toLowerCase().replace(/\s/g, "-")}-slider`}
          min={0}
          max={500}
          step={1}
          style={{ flexGrow: 1 }}
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
            onClick={() =>
              setParticipantsData((prevData) => ({
                ...prevData,
                [field]: Math.max(0, prevData[field] - 1),
              }))
            }
            className="text-blue-500 text-lg font-semibold px-2"
          >
            -
          </button>
          <span className="text-black text-lg font-semibold mx-3">
            {participantsData[field]}
          </span>
          <button
            onClick={() =>
              setParticipantsData((prevData) => ({
                ...prevData,
                [field]: prevData[field] + 1,
              }))
            }
            className="text-blue-500 text-lg font-semibold px-2"
          >
            +
          </button>
        </div>
      </div>
      {errors[field] && (
        <div style={{ color: "red", fontSize: "12px" }}>{errors[field]}</div>
      )}
    </div>
  );

  const renderCounter = (label, field) => (
    <div className="flex flex-col items-center">
      <label className="text-sm text-[#555f90]">{label}</label>
      <div className="flex justify-center items-center mt-2">
        <div className="flex items-center justify-center border rounded-full px-4 py-1">
          <button
            onClick={() =>
              setParticipantsData((prevData) => ({
                ...prevData,
                [field]: Math.max(0, prevData[field] - 1), // Ensure non-negative values
              }))
            }
            className="text-blue-500 text-lg font-semibold px-2"
          >
            -
          </button>
          <span className="text-black text-lg font-semibold mx-3">
            {participantsData[field]}
          </span>
          <button
            onClick={() =>
              setParticipantsData((prevData) => ({
                ...prevData,
                [field]: prevData[field] + 1,
              }))
            }
            className="text-blue-500 text-lg font-semibold px-2"
          >
            +
          </button>
        </div>
      </div>
      {errors[field] && (
        <div style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
          {errors[field]}
        </div>
      )}
    </div>
  );

  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center Card box ${
        flipped ? "flipped" : ""
      }`}
      style={{ backgroundColor: "rgba(211, 211, 211, 0.7)" }}
      onClick={handleCancel}
    >
      <div
        className="bg-white p-8 rounded-xl card-front "
        onClick={(e) => e.stopPropagation()}
      >
        <>
          <p className=" text-lg text-[#263671] mb-2 " gutterBottom>
            Participants Count
          </p>
          {renderSlider("Count of Internal Participants", "internal_count")}

          <p className="text-[#263671] mb-3">
            Count of External participations
          </p>
          {renderSlider("Count of External Boys", "ex_boys_count")}
          {renderSlider("Count of External Girls", "ex_girls_count")}
          <div className=" flex justify-between">
            {renderCounter("Count of Male Faculty", "male_faculty_count")}
            {renderCounter("Count of Female Faculty", "female_faculty_count")}
          </div>
          <FormControlLabel
            className="text-[#263671] mb-3 text-xs "
            control={
              <Checkbox
                checked={participantsData.accommodation_status}
                onChange={handleAccommodationChange}
                color="primary"
              />
            }
            label={
              <span className="text-[#263671] text-sm">
                Accommodation for external participants
              </span>
            }
          />

          {participantsData.accommodation_status ? (
            <div className="flex gap-3 w-full justify-end  items-center">
              <button
                onClick={handleFlip}
                className="turn-button-front bg-blue-500 text-white py-1 px-4 rounded-lg"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="flex gap-3 w-full justify-end  items-center">
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white py-1 px-4 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      </div>

      <div
        className="bg-white p-8 rounded-xl card-back"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base text-[#263671] mb-2">
          Participants - Accommodation Count
        </h2>
        <>
          {participantsData.accommodation_status && (
            <>
              {renderSlider("Count of Boys Accommodation", "acc_boys_count")}
              {renderSlider("Count of Girls Accommodation", "acc_girls_count")}

              <div className=" flex justify-between gap-3">
                {renderCounter(
                  "Count of Male Faculty ",
                  "acc_male_faculty_count"
                )}

                {renderCounter(
                  "Count of Female Faculty ",
                  "acc_female_faculty_count"
                )}
              </div>
            </>
          )}

          <div className="flex  w-full justify-between mt-3   items-center">
            <button
              onClick={handleFlip}
              className="turn-button-back bg-blue-500 text-white py-1 px-4 rounded-lg"
            >
              Back
            </button>
            <div className="flex gap-3">
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white py-1 px-4 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

const AccomodationPopup = ({
  onClose,
  onSave,
  cards,
  setCards,
  groups,
  setGroups,
  aloneGuests,
  setAloneGuests,
  setLastAction,
  selectedGuest,
  setSelectedGuest,
  startStep,
  setStartStep,
}) => {
  const initialGuests = [...cards];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };
  const handleInputChange = (id, field, value) => {
    const initialGuests = cards.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    );
    setCards(initialGuests);
  };

  const [guestData, setGuestData] = useState(initialGuests);

  const handlePairing = (guestId, pairedGuestId) => {
    const newGroup = [guestId, pairedGuestId];
    setGroups([...groups, newGroup]);
    setGuestData((prevGuestData) =>
      prevGuestData.filter((g) => !newGroup.includes(g.id))
    );
    setLastAction({ type: "pair", group: newGroup });
    setSelectedGuest(null);
  };

  const handleUndoAlone = (guestId) => {
    setAloneGuests(aloneGuests.filter((id) => id !== guestId));
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      {
        id: guestId,
        name: initialGuests.find((g) => g.id === guestId).first_name,
      },
    ]);
    setLastAction(null);
  };

  const handleStayAlone = (guestId) => {
    setAloneGuests([...aloneGuests, guestId]);
    setGuestData((prevGuestData) =>
      prevGuestData.filter((g) => g.id !== guestId)
    );
    setLastAction({ type: "alone", guestId });
    setSelectedGuest(null);
  };

  const handleSelectGuestForPairing = (guestId) => {
    setSelectedGuest(guestId === selectedGuest ? null : guestId);
  };

  const unpairGroup = (group) => {
    setGroups(groups.filter((g) => g !== group));
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      {
        id: group[0],
        name: initialGuests.find((g) => g.id === group[0]).first_name,
      },
      {
        id: group[1],
        name: initialGuests.find((g) => g.id === group[1]).first_name,
      },
    ]);
    setAloneGuests(
      aloneGuests.filter((id) => id !== group[0] && id !== group[1])
    );
  };

  const getUnpairableGroup = (guestId) => {
    console.log(groups.find((group) => group.includes(guestId)));
    return groups.find((group) => group.includes(guestId)) || [];
  };

  const handleNextx = () => {
    setStartStep((prev) =>
      prev + 1 >= initialGuests.length - (maxVisibleSteps - 1) ? prev : prev + 1
    );
  };

  const handleBack = () => {
    setStartStep((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const formattedDate = now.toISOString().slice(0, 16);
    setMinDate(formattedDate);
  }, []);

  const validateFields = () => {
    let validationErrors = [];
    let isValid = true;

    cards.forEach((card, index) => {
      let cardErrors = {};

      if (!card.arrival_at) cardErrors.arrival_at = "required";
      if (!card.departure_at) cardErrors.departure_at = "required";
      if (!card.accommodation_venue)
        cardErrors.accommodation_venue = "required";

      if (Object.keys(cardErrors).length > 0) {
        isValid = false;
      }

      validationErrors[index + 1] = cardErrors;
    });

    setErrors(validationErrors);
    return isValid;
  };

  const areAllGuestsAssigned = () => {
    const allGuests = cards.map((card) => card.id); // Assuming each card has a unique 'id'

    // Flatten the groups array to get a single list of guest IDs in groups
    const groupGuestIds = groups.flat();

    // Combine group guest IDs with alone guest IDs
    const assignedGuestIds = [...groupGuestIds, ...aloneGuests];

    // Check if every guest ID from cards is in the assignedGuestIds array
    return allGuests.every((guestId) => assignedGuestIds.includes(guestId));
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      toast.error("Validation failed. Please fill out all required fields.");
      return;
    }

    if (!areAllGuestsAssigned()) {
      toast.error(
        "All guests must be assigned to either a group or be marked as alone."
      );
      return;
    }
    const updatedCards = cards.map((card) => ({
      ...card,
      combine_accommodation_status: 1, // Set guest_status to 1
    }));
    setCards(updatedCards);
    onSave();
    onClose();
  };

  // postioning the img in the center
  let positionClass = "";
  if (cards.length === 1) {
    positionClass = "left-36";
  } else if (cards.length === 2) {
    positionClass = "left-12";
  } else if (cards.length === 3) {
    positionClass = "left-3";
  }
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center"
      style={{ backgroundColor: "rgba(211, 211, 211, 0.7)" }}
    >
      <div
        className="bg-white p-5 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          className="border h-36"
          style={{ width: "100%", marginTop: "45px" }}
        >
          <ToastContainer />

          <Box className="flex   justify-between">
            <Tooltip title="Previous guest" placement="top" arrow>
              <IconButton onClick={handleBack} disabled={startStep === 0}>
                <TfiArrowCircleLeft className="text-2xl text-[#c7c7c7]" />
              </IconButton>
            </Tooltip>

            <Stepper
              alternativeLabel
              nonLinear
              activeStep={-1}
              sx={{ flex: 1 }}
            >
              {cards
                .slice(startStep, startStep + maxVisibleSteps)
                .map((guest, index) => (
                  <Step key={guest.id}>
                    <StepLabel
                      StepIconComponent={() => (
                        <div className="border px-3 py-1 rounded-xl bg-[#fbfbfb] shadow-md">
                          {startStep + index + 1}
                        </div>
                      )}
                    >
                      <div className={`absolute w-24 -top-12 ${positionClass}`}>
                        <img
                          className="absolute"
                          src="images/bordername.png"
                          alt=""
                        />

                        <p className="absolute top-2 left-2 ">
                          {guest.salutation || "Mr"} .{" "}
                          {guest.first_name || `Guest ${guest.id}`}
                        </p>
                      </div>

                      {getUnpairableGroup(guest.id).length > 0 && (
                        <div
                          className="undoalone"
                          onClick={() =>
                            unpairGroup(getUnpairableGroup(guest.id))
                          }
                        >
                          <div className="border justify-center  items-center flex  flex-col ">
                            <Tooltip
                              title="Click to unpair"
                              placement="right"
                              arrow
                            >
                              <div className="border p-1 rounded-lg bg-[#5b00a9] ">
                                <BsFillPeopleFill className="text-white" />
                              </div>
                            </Tooltip>
                          </div>

                          <p className=" font-bold flex mt-1 border gap-1 justify-center items-center">
                            <p style={{ fontSize: "10px" }}>Paired</p>
                            <div className="border w-5 h-5 rounded-md text-white bg-[#7d7d7d]">
                              {getUnpairableGroup(guest.id)
                                .filter((id) => id !== guest.id) // Exclude the current guest's ID
                                .join(", ")}
                            </div>
                          </p>
                        </div>
                      )}

                      {aloneGuests.includes(guest.id) && (
                        <div
                          className="border flex justify-center items-center flex-col"
                          onClick={() => handleUndoAlone(guest.id)}
                        >
                          {" "}
                          <Tooltip
                            title="click to undo"
                            placement="right"
                            arrow
                          >
                            <div className="border-[#004b93] border-2  w-6 h-6 rounded-lg  justify-center items-center flex ">
                              <IoPerson className="text-[#004b93]" />
                            </div>
                          </Tooltip>
                          <p style={{ fontSize: "8px" }}>seperate</p>
                        </div>
                      )}
                    </StepLabel>

                    <Box
                      sx={{
                        border: "solid pink",
                      }}
                    >
                      {!groups.flat().includes(guest.id) &&
                        !aloneGuests.includes(guest.id) && (
                          <>
                            <div className="flex gap-2 justify-center">
                              <div className="flex flex-col items-center">
                                <Tooltip
                                  title="Stay alone"
                                  placement="left"
                                  arrow
                                >
                                  <div
                                    className="border-[#004b93] border-2 w-6 h-6 rounded-lg flex justify-center items-center"
                                    onClick={() => handleStayAlone(guest.id)}
                                  >
                                    <IoPerson className="text-[#004b93]" />
                                  </div>
                                </Tooltip>
                                <p style={{ fontSize: "8px" }}>seperate</p>
                              </div>

                              <div className="flex flex-col items-center">
                                <Tooltip
                                  title="Combine with other guests"
                                  placement="right"
                                  arrow
                                >
                                  <div
                                    className=" border p-1 w-6 h-6 rounded-lg bg-[#5b00a9]"
                                    onClick={() =>
                                      handleSelectGuestForPairing(guest.id)
                                    }
                                  >
                                    <BsFillPeopleFill className="text-white" />
                                  </div>
                                </Tooltip>
                                <p style={{ fontSize: "8px" }}>combine</p>
                              </div>
                            </div>

                            {selectedGuest === guest.id && (
                              <Box sx={{ marginTop: "10px" }}>
                                <Grid
                                  container
                                  spacing={1}
                                  justifyContent="center"
                                >
                                  {guestData
                                    .filter(
                                      (otherGuest) =>
                                        otherGuest.id !== guest.id &&
                                        !groups
                                          .flat()
                                          .includes(otherGuest.id) &&
                                        !aloneGuests.includes(otherGuest.id)
                                    )
                                    .map((otherGuest) => (
                                      <Grid item key={otherGuest.id}>
                                        <div
                                          className="border px-2 rounded-lg font-medium text-white bg-[#7d7d7d]"
                                          variant="outlined"
                                          size="small"
                                          onClick={() =>
                                            handlePairing(
                                              guest.id,
                                              otherGuest.id
                                            )
                                          }
                                        >
                                          {otherGuest.id}
                                        </div>
                                      </Grid>
                                    ))}
                                </Grid>
                              </Box>
                            )}
                          </>
                        )}
                    </Box>
                  </Step>
                ))}
            </Stepper>

            <Tooltip title="next guest" placement="top" arrow>
              <IconButton
                onClick={handleNextx}
                disabled={startStep + maxVisibleSteps >= initialGuests.length}
              >
                <TfiArrowCircleRight className="text-2xl text-[#c7c7c7]" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <div className="boss border ">
          <Box
            sx={{
              display: "flex",

              position: "relative",
              width: "480px",
              height: "350px",
            }}
          >
            <CardStack>
              {cards.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    transform: `translateX(${
                      (currentIndex - index) * -40
                    }px) scale(${index === currentIndex ? 1 : 0.95})`,
                    zIndex: cards.length - Math.abs(currentIndex - index),
                    opacity: currentIndex === index ? 1 : 0.5,
                    transition: "transform 0.3s linear, opacity 0.3s ease",
                  }}
                >
                  <ListItemA
                    cards={cards}
                    item={item}
                    cardno={index}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    groups={groups}
                    initialGuests={initialGuests}
                    handleChangeColor={handleSubmit}
                    minDate={minDate}
                    handleClose={onClose}
                    onInputChange={(field, value) =>
                      handleInputChange(item.id, field, value)
                    }
                    errors={errors[item.id] || {}} // Pass the errors for this specific item
                  />
                </Box>
              ))}
            </CardStack>
          </Box>
        </div>
        <div className="flex gap-3 w-full justify-end mt-3   items-center">
          <button
            className="bg-blue-500 text-white py-1 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            Confirm
          </button>
          <button
            className="bg-gray-400 text-white py-1 px-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

const TransportPopup = ({
  onClose,
  onSave,
  cards,
  setCards,
  TaloneGuests,
  TsetAloneGuests,
  Tgroups,
  TsetGroups,
}) => {
  const initialGuests = [...cards];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextx = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevx = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const onInputChange = (id, field, value) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  ////////////

  const [guestData, setGuestData] = useState(initialGuests);

  const [visibleStart, setVisibleStart] = useState(0); // Start of visible range
  const [activeStep, setActiveStep] = useState(0); // Active step index
  const [pairingOptionsVisible, setPairingOptionsVisible] = useState(null); // ID of the guest whose pairing options are visible

  const visibleCount = 3; // Number of visible steps at a time

  // Function to find the group containing a guest
  const findGroupContainingGuest = (guestId) => {
    return Tgroups.find((group) => group.includes(guestId));
  };

  // Function to handle pairing guests
  const handlePairing = (guestId, pairedGuestId) => {
    setGuestData((prevGuestData) => {
      const guestGroup = findGroupContainingGuest(guestId);
      const pairedGuestGroup = findGroupContainingGuest(pairedGuestId);

      let newGroups = [...Tgroups];

      if (guestGroup && pairedGuestGroup && guestGroup !== pairedGuestGroup) {
        // Merge two groups
        const mergedGroup = Array.from(
          new Set([...guestGroup, ...pairedGuestGroup])
        );
        newGroups = newGroups.filter(
          (group) => group !== guestGroup && group !== pairedGuestGroup
        );
        newGroups.push(mergedGroup);
      } else if (guestGroup) {
        // Add pairedGuestId to guestGroup
        newGroups = newGroups.map((group) =>
          group === guestGroup
            ? Array.from(new Set([...group, pairedGuestId]))
            : group
        );
      } else if (pairedGuestGroup) {
        // Add guestId to pairedGuestGroup
        newGroups = newGroups.map((group) =>
          group === pairedGuestGroup
            ? Array.from(new Set([...group, guestId]))
            : group
        );
      } else {
        // Create a new group
        newGroups.push([guestId, pairedGuestId]);
      }

      TsetGroups(newGroups);

      return prevGuestData.filter((g) => !newGroups.flat().includes(g.id));
    });

    // Remove guests from aloneGuests list if they are paired
    TsetAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId && id !== pairedGuestId)
    );
  };
  // Function to handle joining a group
  const handleJoinGroup = (guestId, group) => {
    setGuestData((prevGuestData) => {
      const newGroup = [...group, guestId];

      TsetGroups((prevGroups) => [
        ...prevGroups.filter((g) => !g.some((id) => newGroup.includes(id))),
        newGroup,
      ]);

      return prevGuestData.filter((g) => g.id !== guestId);
    });

    // Remove guests from aloneGuests list if they join a group
    TsetAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId)
    );
  };
  // Function to handle staying alone
  const handleStayAlone = (guestId) => {
    TsetAloneGuests((prevAloneGuests) => [...prevAloneGuests, guestId]);
    setGuestData((prevGuestData) =>
      prevGuestData.filter((g) => g.id !== guestId)
    );

    // If guest is in a group, remove them from the group
    TsetGroups((prevGroups) =>
      prevGroups.map((group) => group.filter((id) => id !== guestId))
    );
  };
  // Function to handle leaving alone
  const handleLeaveAlone = (guestId) => {
    TsetAloneGuests((prevAloneGuests) =>
      prevAloneGuests.filter((id) => id !== guestId)
    );
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      initialGuests.find((g) => g.id === guestId),
    ]);
  };
  // Function to handle leaving a group
  const handleLeaveGroup = (guestId) => {
    // Find the group that the guest is leaving
    let groupLeft = null;

    TsetGroups((prevGroups) => {
      return prevGroups
        .map((group) => {
          if (group.includes(guestId)) {
            // If the group contains the guest, remove them from the group
            groupLeft = group.filter((id) => id !== guestId);

            // If the group has one or fewer members, dismantle the group
            return groupLeft.length <= 1 ? [] : groupLeft;
          }
          return group;
        })
        .filter((group) => group.length > 0); // Remove any empty groups
    });

    if (groupLeft && groupLeft.length > 0) {
      // Add the remaining members of the group back to the available guests
      setGuestData(
        (prevGuestData) =>
          prevGuestData
            .filter((g) => !groupLeft.includes(g.id)) // Remove remaining group members from guestData
            .concat(
              groupLeft.map((id) => initialGuests.find((g) => g.id === id))
            ) // Add remaining members back to guestData
      );
    }

    // Finally, add the guest who left the group back to the available guests
    setGuestData((prevGuestData) => [
      ...prevGuestData,
      initialGuests.find((g) => g.id === guestId),
    ]);
  };

  // Function to handle the previous button click
  const handlePrev = () => {
    setVisibleStart((prev) => Math.max(prev - 1, 0));
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };
  // Function to handle the next button click
  const handleNext = () => {
    const nextStep = activeStep + 1;
    setVisibleStart((prev) =>
      Math.min(prev + 1, initialGuests.length - visibleCount)
    );
    setActiveStep(nextStep);
  };
  // Function to toggle pairing options visibility
  const togglePairingOptions = (guestId) => {
    setPairingOptionsVisible((prevId) => (prevId === guestId ? null : guestId));
  };
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let validationErrors = [];
    let isValid = true;

    cards.forEach((card, index) => {
      let cardErrors = {};

      // Always validate vehicle_type
      if (!card.vehicle_type) cardErrors.vehicle_type = "required";

      // Validate based on travel_type
      if (card.travel_type === "both") {
        console.log("lol");
        if (!card.t_arrival_at) cardErrors.t_arrival_at = "required";
        if (!card.t_depature_at) cardErrors.t_depature_at = "required";
        if (!card.from_place) cardErrors.from_place = "required";
        if (!card.to_place) cardErrors.to_place = "required";
        if (!card.r_from_plcae) cardErrors.r_from_plcae = "required";
        if (!card.r_to_plcae) cardErrors.r_to_plcae = "required";
      } else if (card.travel_type === "onward") {
        if (!card.t_arrival_at) cardErrors.t_arrival_at = "required";
        if (!card.from_place) cardErrors.from_place = "required";
        if (!card.to_place) cardErrors.to_place = "required";
      } else if (card.travel_type === "return") {
        if (!card.t_depature_at) cardErrors.t_depature_at = "required";
        if (!card.r_from_plcae) cardErrors.r_from_plcae = "required";
        if (!card.r_to_plcae) cardErrors.r_to_plcae = "required";
      }

      if (Object.keys(cardErrors).length > 0) {
        isValid = false;
      }

      console.log("no problem", cardErrors);
      validationErrors[index + 1] = cardErrors;
    });

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = () => {
    // Check if all guests are present in either Tgroups or TaloneGuests
    const allGuests = [...Tgroups.flat(), ...TaloneGuests];
    const allGuestIds = cards.map((card) => card.id);
    const allGuestsPresent = allGuestIds.every((guestId) =>
      allGuests.includes(guestId)
    );

    if (!allGuestsPresent) {
      toast.error(
        "Not all guests are accounted for. Please ensure all guests are in a group or alone."
      );
      return; // Prevent closing the popup
    }

    if (validateFields()) {
      const updatedCards = cards.map((card) => ({
        ...card,
        combine_transport_status: 1, // Set guest_status to 1
      }));
      setCards(updatedCards);
      onSave();
      onClose();
    } else {
      toast.error("Validation failed. Please fill out all required fields.");
    }
  };

  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const formattedDate = now.toISOString().slice(0, 16);
    setMinDate(formattedDate);
  }, []);

  // postioning the img in the center
  let positionClass = "";
  if (cards.length === 1) {
    positionClass = "left-48";
  } else if (cards.length === 2) {
    positionClass = "left-24";
  } else if (cards.length === 3) {
    positionClass = "left-16  ";
  }

  console.log("cards", cards);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center"
      style={{ backgroundColor: "rgba(211, 211, 211, 0.7)" }}
    >
      <div
        className="bg-white p-5 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          className="border  flex items-center"
          style={{ width: "100%", marginTop: "45px" }}
        >
          <ToastContainer />

          <Tooltip title="Previous guest" placement="top" arrow>
            <IconButton onClick={handlePrev} disabled={visibleStart === 0}>
              <TfiArrowCircleLeft className="text-2xl text-[#c7c7c7]" />
            </IconButton>
          </Tooltip>

          <Stepper alternativeLabel nonLinear sx={{ flexGrow: 1 }}>
            {initialGuests
              .slice(visibleStart, visibleStart + visibleCount)
              .map((guest, index) => {
                const inGroup = findGroupContainingGuest(guest.id);
                const isAlone = TaloneGuests.includes(guest.id);
                const groupMembers = inGroup
                  ? findGroupContainingGuest(guest.id)
                  : [];

                return (
                  <Step key={guest.id}>
                    <StepLabel
                      StepIconComponent={(props) => (
                        <div className="border px-3 py-1 rounded-xl bg-[#fbfbfb] shadow-md">
                          {guest.id}
                        </div>
                      )}
                    >
                      <div className={`absolute w-24 -top-12 ${positionClass}`}>
                        <img
                          className="absolute"
                          src="images/bordername.png"
                          alt=""
                        />

                        <p className="absolute top-2 left-2 ">
                          {guest.salutation || "Mr"} .{" "}
                          {guest.first_name || `Guest ${guest.id}`}
                        </p>
                      </div>

                      <div className="border rounded- justify-center flex gap-2 ">
                        {!isAlone ? (
                          <div>
                            <Tooltip title="Stay Alone" placement="left" arrow>
                              <div
                                className="border-[#004b93] border-2  w-6 h-6 rounded-lg  justify-center items-center flex "
                                onClick={() => handleStayAlone(guest.id)}
                              >
                                <IoPerson className="text-[#004b93]" />
                              </div>
                            </Tooltip>
                            <p style={{ fontSize: "8px" }}>Alone</p>
                          </div>
                        ) : (
                          <div>
                            <Tooltip
                              title="click to undo"
                              placement="right"
                              arrow
                            >
                              <div
                                className="border-[#004b93] border-2  w-6 h-6 rounded-lg  justify-center items-center flex "
                                onClick={() => handleLeaveAlone(guest.id)}
                              >
                                <IoPerson className="text-[#004b93]" />
                              </div>
                            </Tooltip>
                            <p style={{ fontSize: "8px" }}>Alone</p>
                          </div>
                        )}

                        {!isAlone && (
                          <div className="flex-col items-center flex">
                            <Tooltip title="Combine" placement="right" arrow>
                              <div
                                className=" border p-1 w-6 h-6 rounded-lg bg-[#5b00a9]"
                                onClick={() => togglePairingOptions(guest.id)}
                              >
                                <BsFillPeopleFill />
                              </div>
                            </Tooltip>

                            <p style={{ fontSize: "8px" }}>Combine</p>
                          </div>
                        )}
                      </div>

                      <div className="border h-10">
                        {pairingOptionsVisible === guest.id && !isAlone && (
                          <Box className="mt-2">
                            {!inGroup && (
                              <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent="center"
                                flexWrap="wrap"
                              >
                                {guestData
                                  .filter(
                                    (otherGuest) => otherGuest.id !== guest.id
                                  )
                                  .map((otherGuest) => (
                                    <Box
                                      key={otherGuest.id}
                                      className="border px-2 rounded-md font-medium text-white bg-[#7d7d7d]"
                                      onClick={() =>
                                        handlePairing(guest.id, otherGuest.id)
                                      }
                                      style={{ margin: "4px" }}
                                    >
                                      <p>{otherGuest.id}</p>
                                    </Box>
                                  ))}
                                {Tgroups.filter(
                                  (group) => !group.includes(guest.id)
                                ).map((group, index) => (
                                  <Box
                                    key={index}
                                    className="optionsjoin"
                                    style={{ margin: "4px" }}
                                  >
                                    <p
                                      style={{ fontSize: "10px" }}
                                      className="border p-1 rounded-md  text-white bg-green-400"
                                      onClick={() =>
                                        handleJoinGroup(guest.id, group)
                                      }
                                    >
                                      Join -{" "}
                                      {group
                                        .map((id) => {
                                          const member = initialGuests.find(
                                            (g) => g.id === id
                                          );
                                          return member ? ` ${id}` : "";
                                        })
                                        .join(" , ")}
                                    </p>
                                  </Box>
                                ))}
                              </Box>
                            )}

                            {inGroup && (
                              <div className="flex items-center gap-1 justify-center ">
                                {groupMembers.map((memberId) => {
                                  const member = initialGuests.find(
                                    (g) => g.id === memberId
                                  );
                                  return (
                                    <div
                                      key={member.id}
                                      className="flex items-center border gap-2"
                                    >
                                      <div className="border px-2 rounded-md font-medium text-white bg-[#5b00a9]">
                                        {member.id}
                                      </div>
                                    </div>
                                  );
                                })}

                                <Tooltip
                                  title="leave-group"
                                  placement="right"
                                  arrow
                                >
                                  <Box
                                    onClick={() => handleLeaveGroup(guest.id)}
                                  >
                                    <CiLogin className="text-xl text-red-600" />
                                  </Box>
                                </Tooltip>
                              </div>
                            )}
                          </Box>
                        )}
                      </div>
                    </StepLabel>
                  </Step>
                );
              })}
          </Stepper>

          <Tooltip title="next guest" placement="top" arrow>
            <IconButton
              onClick={handleNext}
              disabled={visibleStart + visibleCount >= initialGuests.length}
            >
              <TfiArrowCircleRight className="text-2xl text-[#c7c7c7]" />
            </IconButton>
          </Tooltip>
        </Box>
        {/* </Box> */}

        <div className="boss">
          <Box
            sx={{
              display: "flex",

              position: "relative",

              width: "600px",
              height: "350px",
            }}
          >
            <CardStack>
              {cards.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    transform: `translateX(${
                      (currentIndex - index) * -30
                    }px) scale(${index === currentIndex ? 1 : 0.95})`,
                    zIndex: cards.length - Math.abs(currentIndex - index),
                    opacity: currentIndex === index ? 1 : 0.5,
                    transition: "transform 0.3s linear, opacity 0.3s ease",
                  }}
                >
                  <ListItemT
                    cards={cards}
                    item={item}
                    cardno={index}
                    onPrev={handlePrevx}
                    onNext={handleNextx}
                    groups={Tgroups}
                    tripType={cards.travel_type}
                    initialGuests={initialGuests}
                    minDate={minDate}
                    handleChangeColor={handleSubmit}
                    handleClose={onClose}
                    onInputChange={onInputChange}
                    errors={errors[item.id] || {}} // Pass the errors for this specific item
                  />
                </Box>
              ))}
            </CardStack>
          </Box>
        </div>

        <div className="flex gap-3 w-full justify-end mt-3   items-center">
          <button
            className="bg-blue-500 text-white py-1 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white py-1 px-4 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const VenuePopup = ({ onClose, onSave, VenueData, setVenueData }) => {
  const [errors, setErrors] = useState({});
  const [initialFormData, setInitialFormData] = useState({});

  useEffect(() => {
    // Store the initial form data when the popup is opened
    setInitialFormData(VenueData);
  }, []);

  const handleSliderChange = (key) => (event, newValue) => {
    setVenueData((prevState) => ({ ...prevState, [key]: newValue }));
  };

  const handleInputChange = (key) => (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    setVenueData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleBlur = (key, value) => () => {
    if (value < 0) {
      setVenueData((prevState) => ({ ...prevState, [key]: 0 }));
    }
  };

  const handleIncrement = (key, value, max) => () => {
    if (value < max) {
      setVenueData((prevState) => ({ ...prevState, [key]: value + 1 }));
    }
  };

  const handleDecrement = (key, value) => () => {
    if (value > 0) {
      setVenueData((prevState) => ({ ...prevState, [key]: value - 1 }));
    }
  };

  const handleVenueTypeChange = (venue_type) => {
    setVenueData((prevState) => ({ ...prevState, venue_type }));
  };

  const renderSliderWithCounter = (label, key, max = 10) => (
    <div style={{ marginBottom: "20px" }}>
      <Typography variant="subtitle1" className="text-[#555f90]">
        {label}
      </Typography>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Slider
          className="w-full"
          value={VenueData[key]}
          onChange={handleSliderChange(key)}
          aria-labelledby={`${label.toLowerCase().replace(/\s/g, "-")}-slider`}
          min={0}
          max={max}
          step={1}
          style={{ flexGrow: 1 }}
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
            onClick={handleDecrement(key, VenueData[key])}
            className="text-blue-500 text-lg font-semibold px-2"
          >
            -
          </button>
          <span className="text-black text-lg font-semibold mx-3">
            {VenueData[key]}
          </span>
          <button
            onClick={handleIncrement(key, VenueData[key], max)}
            className="text-blue-500 text-lg font-semibold px-2"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );

  const renderVenueTypeButton = (type, label) => (
    <Tooltip title={label} key={type}>
      <div
        onClick={() => handleVenueTypeChange(type)}
        className="px-2 py-1.5"
        style={{
          cursor: "pointer",
          borderRadius: "4px",
          backgroundColor:
            VenueData.venue_type === type ? "#1976d2" : "#f0f0f0",
          color: VenueData.venue_type === type ? "white" : "black",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </Tooltip>
  );

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Validate venue count
    if (VenueData["venue_count"] < 1) {
      newErrors["venue_count"] = "Venue count must be at least 1";
      isValid = false;
    }

    // Validate venue type
    const venueTypes = ["Classrooms", "Seminar Hall", "Auditorium", "Labs"];
    if (!venueTypes.includes(VenueData.venue_type)) {
      newErrors.venueTypes = "You must select a valid venue type.";
      isValid = false;
    }

    // Validate capacity
    if (VenueData["capacity"] < 60) {
      newErrors["capacity"] = "Venue capacity must be at least 60";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave();
      onClose();
    }
  };

  const handleCancel = () => {
    // Reset form data to the initial state when cancel is clicked
    setVenueData(initialFormData);
    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center"
      style={{ backgroundColor: "rgba(211, 211, 211, 0.7)" }}
      onClick={handleCancel}
    >
      <div
        className="bg-white p-8 rounded-xl"
        style={{ width: "30%", height: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl text-[#263671] mb-2">Venue Details</h2>

        {renderSliderWithCounter("Venue Count", "venue_count", 10)}

        {errors["venue_count"] && (
          <div style={{ color: "red", fontSize: "12px" }}>
            {errors["venue_count"]}
          </div>
        )}

        <Typography variant="subtitle1" className="text-[#555f90]">
          Venue Type
        </Typography>
        <div className="flex flex-wrap gap-4 mb-5">
          {renderVenueTypeButton("Classrooms", "Classrooms")}
          {renderVenueTypeButton("Seminar Hall", "Seminar Hall")}
          {renderVenueTypeButton("Auditorium", "Auditorium")}
          {renderVenueTypeButton("Labs", "Labs")}
        </div>

        {errors.venueTypes && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.venueTypes}
          </span>
        )}
        {renderSliderWithCounter(
          "Total Count of Participants",
          "capacity",
          1000
        )}

        {errors["capacity"] && (
          <div style={{ color: "red", fontSize: "12px" }}>
            {errors["capacity"]}
          </div>
        )}
        <div className="flex gap-3 w-full justify-end mt-3   items-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const VenueRequirementPopup = ({
  onClose,
  onSave,
  quantities,
  setQuantities,
  selectedContent,
  setSelectedContent,
  selected,
  setSelected,
}) => {
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);
  const [errors, setErrors] = useState({}); // Define errors using useState

  const TickIcon = () => (
    <svg
      width="35"
      height="35"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75 37.5C75 55.1775 75 64.0166 69.5081 69.5081C64.0166 75 55.1775 75 37.5 75C19.8223 75 10.9835 75 5.49176 69.5081C-1.54171e-06 64.0166 -9.4353e-07 55.1775 -6.41247e-07 37.5C-3.3896e-07 19.8223 -6.34851e-07 10.9835 5.49176 5.49176C10.9835 -2.59218e-07 19.8223 3.3896e-07 37.5 6.41247e-07C55.1775 9.4353e-07 64.0166 6.47644e-07 69.5081 5.49176C75 10.9835 75 19.8223 75 37.5ZM57.9544 18.3879C59.19 19.3292 59.4285 21.0939 58.4872 22.3295L32.7727 56.0794C32.2609 56.7514 31.4737 57.1579 30.6292 57.186C29.785 57.2141 28.9726 56.8613 28.417 56.2245L16.6313 42.7245C15.6097 41.5545 15.7302 39.7778 16.9003 38.7562C18.0705 37.7347 19.8472 37.8551 20.8687 39.0255L30.3874 49.9286L54.0128 18.9205C54.9544 17.685 56.7191 17.4465 57.9544 18.3879Z"
        fill="url(#paint0_linear_1687_8254)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1687_8254"
          x1="37.5"
          y1="6.41247e-07"
          x2="37.5"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.00666656" stopColor="#639365" />
          <stop offset="1" stopColor="#25C03E" stopOpacity="0.92" />
        </linearGradient>
      </defs>
    </svg>
  );

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#2B3674",
      },
    },
  });

  const handleClick = (item) => {
    setSelectedContent((prevSelectedContent) => {
      if (prevSelectedContent.includes(item.dbname)) {
        const updatedSelectedContent = prevSelectedContent.filter(
          (content) => content !== item.dbname
        );
        const updatedQuantities = { ...quantities };
        delete updatedQuantities[item.dbname];
        setQuantities(updatedQuantities);
        return updatedSelectedContent;
      } else {
        // Set initial quantity to 1 when an item is selected
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [item.dbname]: 1,
        }));
        return [...prevSelectedContent, item.dbname];
      }
    });
    setSelected((prevSelectedContent) => {
      if (prevSelectedContent.includes(item.name)) {
        const updatedSelectedContent = prevSelectedContent.filter(
          (content) => content !== item.name
        );
        return updatedSelectedContent;
      } else {
        // Set initial quantity to 1 when an item is selected

        return [...prevSelectedContent, item.name];
      }
    });
  };

  const handleQuantityChange = (itemDbname, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemDbname]: quantity,
    }));
  };

  const handleSubmit = () => {
    let newErrors = {};
    let allValid = true; // Flag to track if all quantities are valid

    // Validate quantities: should not be less than 1 or greater than 10
    selectedContent.forEach((itemDbname) => {
      const quantity = quantities[itemDbname];
      if (quantity < 1) {
        newErrors[itemDbname] = "Quantity cannot be less than 1!";
        allValid = false; // Mark as invalid if any quantity is less than 1
      } else if (quantity > 10) {
        newErrors[itemDbname] = "Quantity cannot be greater than 10!";
        allValid = false; // Mark as invalid if any quantity is greater than 10
      }
    });

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set the error messages if validation fails
      return; // Prevent submission if validation fails
    }

    // If all quantities are valid, update the status
    if (allValid) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        venue_requirement_status: 1, // Update venue_requirement_status to 1 if all quantities are valid
      }));
    }

    onSave(); // Trigger the save action
    onClose(); // Close the popup
  };

  const openQuantityDialog = () => {
    if (selectedContent.length === 0) {
      toast.error("Please Select atleast one to Save the Requirement!");
      return;
    }
    setQuantityDialogOpen(true);
  };

  const closeQuantityDialog = () => {
    setQuantityDialogOpen(false);
  };
  const items = [
    { dbname: "chair_count", name: "Guest chair", image: "/images/chair.png" },
    {
      dbname: "dais_table_count",
      name: "Dais Table",
      image: "/images/Table.png",
    },
    {
      dbname: "white_board_count",
      name: "White Board",
      image: "/images/board.png",
    },
    { dbname: "hand_mic_count", name: "Help Desk", image: "/images/desk.png" },
    {
      dbname: "help_desk_count",
      name: "Hand Mic",
      image: "/images/handmic.png",
    },
    {
      dbname: "collar_mic_count",
      name: "Collar Mic",
      image: "/images/collarmic.png",
    },
    {
      dbname: "internet_count",
      name: "Internet",
      image: "/images/internet.png",
    },
    {
      dbname: "live_stream_count",
      name: "Live Streaming",
      image: "/images/live.png",
    },
    {
      dbname: "biometric_count",
      name: "Biometric Device",
      image: "/images/biometric.png",
    },
    {
      dbname: "photography_count",
      name: "Photography",
      image: "/images/photography.png",
    },
    {
      dbname: "videography_count",
      name: "Videography",
      image: "/images/videography.png",
    },
    {
      dbname: "large_momento_count",
      name: "Large Momento",
      image: "/images/largemomento.png",
    },
    {
      dbname: "small_momento_count",
      name: "Small Momento",
      image: "/images/smallmomento.png",
    },
    { dbname: "shawl_count", name: "Shawl", image: "/images/Shawl.png" },
    {
      dbname: "pen_pencil_count",
      name: "Pen/Pencil",
      image: "/images/pen.png",
    },
    {
      dbname: "scribbling_pad_count",
      name: "Scribbling Pad",
      image: "/images/pad.png",
    },
    {
      dbname: "water_bottle_count",
      name: "Water Bottle",
      image: "/images/waterbottle.png",
    },
    { dbname: "others", name: "Others", image: "/images/others.png" },
  ];
  const handleCancel = () => {
    // Reset quantities to initial values
    setQuantities({
      event_id: "", // Assuming you want to keep this as an empty string
      venue_id: "", // Assuming this stays an empty string too
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
    // Reset other states
    setSelectedContent([]);
    setSelected([]);
    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center"
      style={{ backgroundColor: "rgba(211, 211, 211, 0.7)" }}
      onClick={handleCancel}
    >
      <div
        className="bg-white p-5 rounded-xl"
        style={{ width: "55%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <ThemeProvider theme={theme}>
          <div className="itemschoosing">
            <h3 className="text-2xl text-[#263671] mb-2">Venue Requirements</h3>
            <h3 className="mb-4 text-[#555f90]">
              Select the items you need for your venue
            </h3>
            <div className="">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 ml-3">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className={`grid-item flex flex-col items-center ${
                      selectedContent.includes(item.name) ? "selected" : ""
                    }`}
                    onClick={() => handleClick(item)}
                  >
                    <div
                      className="w-24 h-24 rounded-full"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {selectedContent.includes(item.dbname) && (
                        <div className="flex justify-end">
                          <TickIcon />
                        </div>
                      )}
                    </div>
                    <div className="  text-sm">{item.name}</div>
                  </div>
                ))}
              </div>

              <Dialog open={quantityDialogOpen} onClose={closeQuantityDialog}>
                <p className="text-xl p-5 text-[#263671]">
                  Selected Items and Quantities
                </p>
                <DialogContent className="max-h-[600px] overflow-auto scrollbar-hide">
                  <div className="mb-2">
                    {selected.map((itemName, index) => {
                      const itemDbname = items.find(
                        (item) => item.name === itemName
                      )?.dbname;

                      if (itemDbname && selectedContent.includes(itemDbname)) {
                        return (
                          <div
                            key={itemName}
                            style={{
                              marginBottom: "10px",
                              display: "flex",
                              flexDirection: "column", // Adjust layout to stack label, input, and error
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <Typography
                                variant="body1"
                                className="text-[#555f90]"
                              >
                                {itemName}
                              </Typography>

                              <div className="flex items-center justify-center border rounded-full px-4 py-1">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      itemDbname,
                                      Math.max(quantities[itemDbname] - 1, 1)
                                    )
                                  } // Decrease quantity, but not below 1
                                  className="text-blue-500 text-lg font-semibold px-2"
                                >
                                  -
                                </button>
                                <span className="text-black text-lg font-semibold mx-3">
                                  {quantities[itemDbname]}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      itemDbname,
                                      Math.min(quantities[itemDbname] + 1, 10)
                                    )
                                  } // Increase quantity, but not above 10
                                  className="text-blue-500 text-lg font-semibold px-2"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            {/* Display error message below the input */}
                            {errors[itemDbname] && (
                              <span
                                style={{
                                  color: "red",
                                  marginTop: "5px",
                                  width: "100%",
                                }}
                              >
                                {errors[itemDbname]}
                              </span>
                            )}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </DialogContent>
                <DialogActions>
                  <button
                    onClick={closeQuantityDialog}
                    className="bg-gray-400 text-white py-1 px-4 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                  >
                    Confirm
                  </button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="flex gap-3 w-full justify-end mt-3   items-center">
              <ToastContainer />
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={openQuantityDialog}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export {
  EventPopup,
  GuestPopup,
  ParticipantsPopup,
  AccomodationPopup,
  TransportPopup,
  VenuePopup,
  VenueRequirementPopup,
};
