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
import FoodIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import CalendarIcon from "@mui/icons-material/CalendarToday";
import LocationIcon from "@mui/icons-material/LocationOn";
import RemoveIcon from "@mui/icons-material/Remove";
import "./specialrequest.css";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { addDays } from "date-fns"; // Importing addDays to calculate the minimum date

const SpecialRequest = ({
  soupData,
  setSoupData,
  carData,
  setCarData,
  fastfoodData,
  setFastfoodData,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [barColors, setBarColors] = useState({
    car: "#ff6f61",
    soup: "#ff6f61",
    fastfood: "#ff6f61",
    add: "#ff6f61",
  });

  const [minDate, setMinDate] = useState("");

  const [tempSoupData, setTempSoupData] = useState({});
  const [tempCarData, setTempCarData] = useState({});
  const [tempFastfoodData, setTempFastfoodData] = useState({});

  const [soupErrors, setSoupErrors] = useState({});
  const [carErrors, setCarErrors] = useState({});
  const [fastfoodErrors, setFastfoodErrors] = useState({});

  useEffect(() => {
    // Set the minimum date for the datetime-local inputs
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const formattedDate = now.toISOString().slice(0, 16);
    setMinDate(formattedDate);
  }, []);

  // Handle opening the dialog
  const handleClickOpen = (box) => {
    setSelectedBox(box);
    setOpen(true);

    //  Initialize temporary state based on selected box
    switch (box) {
      case "soup":
        setTempSoupData({ ...soupData });
        break;
      case "car":
        setTempCarData({ ...carData });
        break;
      case "fastfood":
        setTempFastfoodData({ ...fastfoodData });
        break;
      default:
        break;
    }
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
    // setSelectedBox(null);
  };

  const validateSoupData = () => {
    const errors = {};

    if (!tempSoupData.preferred_food) {
      errors.preferred_food = "Preferred food is required.";
    }
    if (!tempSoupData.time) {
      errors.time = "Time is required.";
    }
    if (!tempSoupData.to_venue) {
      errors.to_venue = "Venue is required.";
    }
    if (tempSoupData.food_quantity === 0) {
      errors.food_quantity = "required";
    }

    setSoupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCarData = () => {
    const errors = {};

    if (!tempCarData.car_count) {
      errors.car_count = "required";
    }
    if (!tempCarData.arrival_at) {
      errors.arrival_at = "Arrival time is required.";
    }
    if (!tempCarData.depature_at) {
      errors.depature_at = "Departure time is required.";
    }
    if (!tempCarData.car_type) {
      errors.car_type = "Vehicle type is required.";
    }

    setCarErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateFastfoodData = () => {
    const errors = {};

    if (!tempFastfoodData.refreshment_dish) {
      errors.refreshment_dish = "Preferred refreshment is required.";
    }
    if (!tempFastfoodData.time) {
      errors.time = "Time is required.";
    }
    if (!tempFastfoodData.to_venue) {
      errors.to_venue = "Venue is required.";
    }
    if (tempFastfoodData.quantity === 0) {
      errors.quantity = "required";
    }

    setFastfoodErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    let isValid = false;

    switch (selectedBox) {
      case "soup":
        isValid = validateSoupData();
        break;
      case "car":
        isValid = validateCarData();
        break;
      case "fastfood":
        isValid = validateFastfoodData();
        break;
      default:
        isValid = true;
    }

    if (!isValid) {
      return; // Prevent closing the dialog and updating the state if validation fails
    }

    switch (selectedBox) {
      case "soup":
        setSoupData({ ...tempSoupData, food_request_status: 1 });
        break;
      case "car":
        setCarData({ ...tempCarData, car_request_status: 1 });
        break;
      case "fastfood":
        setFastfoodData({ ...tempFastfoodData, refreshment_request_status: 1 });
        break;
      default:
        break;
    }

    console.log([selectedBox]);
    setBarColors((prev) => ({
      ...prev,
      [selectedBox]: "#03a9f4", // Change the color to blue
    }));
    handleClose();
  };

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    switch (selectedBox) {
      case "soup":
        setTempSoupData((prev) => ({ ...prev, food_quantity: newValue }));
        break;
      case "car":
        setTempCarData((prev) => ({ ...prev, car_count: newValue }));
        break;
      case "fastfood":
        setTempFastfoodData((prev) => ({ ...prev, quantity: newValue }));
        break;
      default:
        break;
    }
  };

  // Handle increment and decrement

  const handleAdd = () => {
    switch (selectedBox) {
      case "soup":
        setTempSoupData((prev) => ({
          ...prev,
          food_quantity: Math.min(prev.food_quantity + 1, 100),
        }));
        break;
      case "car":
        setTempCarData((prev) => ({
          ...prev,
          car_count: Math.min(prev.car_count + 1, 100),
        }));
        break;
      case "fastfood":
        setTempFastfoodData((prev) => ({
          ...prev,
          quantity: Math.min(prev.quantity + 1, 100),
        }));
        break;
      default:
        break;
    }
  };

  const handleRemove = () => {
    switch (selectedBox) {
      case "soup":
        setTempSoupData((prev) => ({
          ...prev,
          food_quantity: Math.max(prev.food_quantity - 1, 0),
        }));
        break;
      case "car":
        setTempCarData((prev) => ({
          ...prev,
          car_count: Math.max(prev.car_count - 1, 0),
        }));
        break;
      case "fastfood":
        setTempFastfoodData((prev) => ({
          ...prev,
          quantity: Math.max(prev.quantity - 1, 0),
        }));
        break;
      default:
        break;
    }
  };

  const getDialogContent = () => {
    switch (selectedBox) {
      case "soup":
        return (
          <>
            <div className="mb-2">
              <p className="text-lg mb-2">Preferred food</p>
              <TextField
                value={tempSoupData.preferred_food || ""}
                onChange={(e) =>
                  setTempSoupData((prev) => ({
                    ...prev,
                    preferred_food: e.target.value,
                  }))
                }
                placeholder="Eg: Chappathi"
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
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <FoodIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                error={!!soupErrors.preferred_food}
                helperText={soupErrors.preferred_food}
              />
            </div>

            <div className="mb-2">
              <p className="text-lg mb-2">Time</p>
              <input
                placeholder="Select Date and Time"
                className="p-2 w-full rounded-lg   focus:outline-none"
                style={{
                  borderColor: !!soupErrors.time ? "red" : "#e1eaf1", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                type="datetime-local"
                id="end_at"
                name="end_at"
                value={tempSoupData.time || ""}
                onChange={(e) =>
                  setTempSoupData((prev) => ({ ...prev, time: e.target.value }))
                }
                min={minDate}
              />
              {!!soupErrors.time && (
                <p className="text-red-500 text-sm">{soupErrors.time}</p>
              )}
            </div>

            <div>
              <p className="text-lg mb-2">Venue to give</p>
              <TextField
                value={tempSoupData.to_venue || ""}
                onChange={(e) =>
                  setTempSoupData((prev) => ({
                    ...prev,
                    to_venue: e.target.value,
                  }))
                }
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
                placeholder="Eg: BIT Guest House"
                fullWidth
                error={!!soupErrors.to_venue}
                helperText={soupErrors.to_venue}
              />
            </div>

            <div>
              <p className="text-lg mb-2">Quantity</p>
              <div className="flex gap-2">
                <Slider
                  value={tempSoupData.food_quantity || 0}
                  onChange={handleSliderChange}
                  step={1}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  error={!!soupErrors.food_quantity}
                  helperText={soupErrors.food_quantity}
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
                    onClick={handleRemove}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    -
                  </button>
                  <span className="text-black text-lg font-semibold mx-3">
                    {tempSoupData.food_quantity}
                  </span>
                  <button
                    onClick={handleAdd}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    +
                  </button>
                </div>
              </div>
              {!!soupErrors.food_quantity && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginBottom: 2 }}
                >
                  {soupErrors.food_quantity}
                </Typography>
              )}
            </div>
          </>
        );
      case "car":
        return (
          <>
            <div>
              <p className="text-lg mb-2">Quantity</p>
              <div className="flex gap-2">
                <Slider
                  value={tempCarData.car_count || 0}
                  onChange={handleSliderChange}
                  step={1}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  error={!!carErrors.car_count}
                  helperText={carErrors.car_count}
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
                    onClick={handleRemove}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    -
                  </button>
                  <span className="text-black text-lg font-semibold mx-3">
                    {tempCarData.car_count || 0}
                  </span>
                  <button
                    onClick={handleAdd}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    +
                  </button>
                </div>
              </div>
              {!!carErrors.car_count && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginBottom: 2 }}
                >
                  {carErrors.car_count}
                </Typography>
              )}
            </div>

            <div className="mb-2">
              <p className="text-lg mb-2">Arrival</p>

              <input
                placeholder="Select Date and Time"
                className="p-2 w-full rounded-lg text-[#5c6493]  focus:outline-none"
                style={{
                  borderColor: !!carErrors.arrival_at ? "red" : "#e1eaf1", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                type="datetime-local"
                id="end_at"
                name="end_at"
                value={tempCarData.arrival_at || ""}
                onChange={(e) =>
                  setTempCarData((prev) => ({
                    ...prev,
                    arrival_at: e.target.value,
                  }))
                }
                min={minDate}
              />
              {!!carErrors.arrival_at && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginBottom: 2 }}
                >
                  {carErrors.arrival_at}
                </Typography>
              )}
            </div>

            <div className="mb-2">
              <p className="text-lg mb-2">Departure</p>

              <input
                placeholder="Select Date and Time"
                className="p-2 w-full text-[#5c6493] rounded-lg   focus:outline-none"
                style={{
                  borderColor: !!carErrors.depature_at ? "red" : "#e1eaf1", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                type="datetime-local"
                id="end_at"
                name="end_at"
                value={tempCarData.depature_at || ""}
                onChange={(e) =>
                  setTempCarData((prev) => ({
                    ...prev,
                    depature_at: e.target.value,
                  }))
                }
                min={minDate}
              />
              {!!carErrors.depature_at && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginBottom: 2 }}
                >
                  {carErrors.depature_at}
                </Typography>
              )}
            </div>

            <div>
              <p className="text-lg mb-2">Vehicle Type</p>
              <FormControl fullWidth>
                <TextField
                  placeholder="Select Car"
                  select
                  value={tempCarData.car_type || ""}
                  onChange={(e) =>
                    setTempCarData((prev) => ({
                      ...prev,
                      car_type: e.target.value,
                    }))
                  }
                  sx={{
                    ".MuiOutlinedInput-notchedOutline": {
                      borderRadius: "8px",
                      borderWidth: "2px",
                      borderColor: !!carErrors.car_type ? "red" : "#e1eaf1", // Red border when error occurs
                    },
                    ".MuiSelect-select": {
                      padding: "8px 14px", // Adjust padding for the inner select text
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <DirectionsCarIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="BMW">BMW</MenuItem>
                  <MenuItem value="Audi">Audi</MenuItem>
                  <MenuItem value="Mercedes">Mercedes</MenuItem>
                </TextField>
              </FormControl>

              {!!carErrors.car_type && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ marginBottom: 2 }}
                >
                  {carErrors.car_type}
                </Typography>
              )}
            </div>
          </>
        );
      case "fastfood":
        return (
          <>
            <div className="mb-2">
              <p className="text-lg mb-2">Preferred Refreshment</p>
              <TextField
                value={tempFastfoodData.refreshment_dish || ""}
                onChange={(e) =>
                  setTempFastfoodData((prev) => ({
                    ...prev,
                    refreshment_dish: e.target.value,
                  }))
                }
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
                fullWidth
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
                error={!!fastfoodErrors.refreshment_dish}
                helperText={fastfoodErrors.refreshment_dish}
              />
            </div>

            <div className="mb-2">
              <p className="text-lg mb-2">Time</p>
              <input
                placeholder="Select Date and Time"
                className="p-2 w-full rounded-lg text-[#5c6493]  focus:outline-none"
                style={{
                  borderColor: !!fastfoodErrors.time ? "red" : "#e1eaf1", // Red border when error occurs
                  borderWidth: "2px",
                  borderStyle: "solid",
                }}
                type="datetime-local"
                id="end_at"
                name="end_at"
                value={tempFastfoodData.time || ""}
                onChange={(e) =>
                  setTempFastfoodData((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }))
                }
                min={minDate}
              />
              {!!fastfoodErrors.time && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    fontSize: "12px",
                    marginTop: "6px",
                    marginLeft: "10px",
                  }}
                >
                  {fastfoodErrors.time}
                </Typography>
              )}
            </div>

            <div className="mb-2">
              <p className="text-lg mb-2">Venue to give</p>
              <TextField
                value={tempFastfoodData.to_venue || ""}
                onChange={(e) =>
                  setTempFastfoodData((prev) => ({
                    ...prev,
                    to_venue: e.target.value,
                  }))
                }
                placeholder="Eg: BIT Guest House"
                fullWidth
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderWidth: "2px",
                    borderColor: !!fastfoodErrors.to_venue ? "red" : "#e1eaf1", // Red border when error occurs
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
              {!!fastfoodErrors.to_venue && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    fontSize: "12px",
                    marginTop: "6px",
                    marginLeft: "10px",
                  }}
                >
                  {fastfoodErrors.to_venue}
                </Typography>
              )}
            </div>

            <div>
              <p className="text-lg mb-2">Quantity</p>
              <div className="flex items-center gap-2">
                <Slider
                  value={tempFastfoodData.quantity || 0}
                  onChange={handleSliderChange}
                  step={1}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  error={!!fastfoodErrors.quantity}
                  helperText={fastfoodErrors.quantity}
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
                    onClick={handleRemove}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    -
                  </button>
                  <span className="text-black text-lg font-semibold mx-3">
                    {tempFastfoodData.quantity}{" "}
                  </span>
                  <button
                    onClick={handleAdd}
                    className="text-blue-500 text-lg font-semibold px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case "add":
        return (

          
          <div>
  <p className="text-lg mb-4">Other requirments</p>

  <textarea
    class="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    placeholder="Write your content here..."
  ></textarea>
</div>

      )
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
        maxWidth="xs" // Reduce to smaller size like 'xs' or 'sm'
        fullWidth={false} // Ensure it's not taking full width
        sx={{
          "& .MuiPaper-root": {
            width: "350px", // You can set a custom width
            maxWidth: "350px", // Ensure maxWidth aligns
            borderRadius: "16px", // Apply your border-radius
          },
        }}
      >
        <DialogContent>{getDialogContent()}</DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
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
  );
};

export default SpecialRequest;
