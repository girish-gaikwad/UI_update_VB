import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

const Popup = ({ closePopup, selectedItem }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [counter, setCounter] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const toggleInputField = () => {
    setInputVisible(!inputVisible);
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    if (counter > 1) setCounter(counter - 1);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const renderPopupContent = () => {
    switch (selectedItem.id) {
      case "Venue":
        return (
          <div className="w-[400px] min-w-[350px] h-[370px] rounded-xl bg-white ">
            <div className="w-full  text-center mt-3 relative top-1 mb-3">
              <p className="text-center">Venue Requirements</p>
              <button
                onClick={toggleInputField}
                className="absolute -top-1 right-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                {inputVisible ? "-" : "+  "}
              </button>
            </div>

            {/* Scrollable container */}
            <div
              className={`w-full flex flex-col gap-2 items-center bg-pink-300 overflow-y-auto scrollbar-none transition-all duration-300
             
             ${inputVisible ? "h-[300px]" : "h-[350px]"}
              
              
              `}
            >
              <div className="w-full h-full overflow-y-auto">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-center bg-pink-200 my-2 h-14"
                  >
                    <div className="w-[80%] flex justify-around items-center bg-red-200 h-14">
                      <p>{item}</p>
                      <div className="flex items-center justify-center border rounded-full px-4 py-1">
                        <button
                          onClick={decrementCounter}
                          className="text-blue-500 text-lg font-semibold px-2"
                        >
                          -
                        </button>
                        <span className="text-black text-lg font-semibold mx-3">
                          {counter}
                        </span>
                        <button
                          onClick={incrementCounter}
                          className="text-blue-500 text-lg font-semibold px-2"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditionally render input field with adjusted height */}
            {inputVisible && (
              <div className="w-full h-100 flex justify-center mb-3">
                <div className=" px-4  flex justify-between items-center my-2  transition-all duration-300">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter text"
                    className="w-[45%]  border-b-2 border-gray-500 h-9 p-3 focus:outline-none focus:border-blue-700"
                  />
                  <div className="flex items-center justify-center border rounded-full px-4 py-1">
                    <button
                      onClick={decrementCounter}
                      className="text-blue-500 text-lg font-semibold px-2"
                    >
                      -
                    </button>
                    <span className="text-black text-lg font-semibold mx-3">
                      {counter}
                    </span>
                    <button
                      onClick={incrementCounter}
                      className="text-blue-500 text-lg font-semibold px-2"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddItem}
                    className="bg-blue-500 text-white ml-2 px-4 py-1 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case "Accomodation":
        return (
          <div className="w-[400px] min-w-[350px]  rounded-xl bg-white ">
            <p className="text-center mt-4">Edit Accomodation Details</p>

            <div className="flex border my-3 justify-around items-center">
              <p>1.</p>
              <p className="w-[180px] border">
                Mr. Girish ashok gaikwad
<p className="text-xs text-center mt-1">16/06/2006 to 18/06/2006</p>

              </p>


              <div className=" border p-1 w-6 h-6 rounded-lg bg-[#5b00a9]">
                <BsFillPeopleFill className="text-white" />
              </div>

              <button
                // onClick={() => handleDelete(index)}
                className="text-red-500 border border-red-600 py-2 rounded-lg text-lg font-semibold px-2 ml-2"
                aria-label="Delete item"
              >
                <FaTrash />
              </button>
            </div>

            <div className="flex border my-3 justify-around items-center">
              <p>1.</p>
              <p className="w-[180px] border">Mr.Girish gaikwad

              <p className="text-xs text-center mt-1">16/06/2006 to 18/06/2006</p>

              </p>
              <div className="border-[#004b93] border-2  w-6 h-6 rounded-lg  justify-center items-center flex ">
                <IoPerson className="text-[#004b93]" />
              </div>

              <button
                // onClick={() => handleDelete(index)}
                className="text-red-500 border border-red-600 py-2 rounded-lg text-lg font-semibold px-2 ml-2"
                aria-label="Delete item"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );



      case "Transport":
        return (
          <div className="w-[400px] min-w-[350px]  rounded-xl bg-white ">
            <p className="text-center mt-4"> Edit Transport Details</p>

            <div className="flex border my-3 justify-around items-center">
              <p>1.</p>
              <p className="w-[180px] border">Mr. Girish ashok gaikwad</p>

              {/* <div className=" border p-1 w-6 h-6 rounded-lg bg-[#5b00a9]">
                <BsFillPeopleFill className="text-white" />
              </div> */}

              <button
                // onClick={() => handleDelete(index)}
                className="text-red-500 border border-red-600 py-2 rounded-lg text-lg font-semibold px-2 ml-2"
                aria-label="Delete item"
              >
                <FaTrash />
              </button>
            </div>

            <div className="flex border my-3 justify-around items-center">
              <p>1.</p>
              <p className="w-[180px] border">Mr.Girish gaikwad</p>
              {/* <div className="border-[#004b93] border-2  w-6 h-6 rounded-lg  justify-center items-center flex ">
                <IoPerson className="text-[#004b93]" />
              </div> */}

              <button
                // onClick={() => handleDelete(index)}
                className="text-red-500 border border-red-600 py-2 rounded-lg text-lg font-semibold px-2 ml-2"
                aria-label="Delete item"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        )
      case "Guest":
        return (
          <div className="w-[400px] min-w-[350px]  rounded-xl bg-white ">
            <p className="text-center mt-4"> Wan to Remove Guest   ?</p>

            <div className="flex border my-3 justify-around items-center">
              <p>1.</p>
              <p className="w-[200px] border-2 p-2 rounded-lg border-[#2b3770]">Mr. Girish ashok gaikwad</p>

              {/* <div className=" border p-1 w-6 h-6 rounded-lg bg-[#5b00a9]">
                <BsFillPeopleFill className="text-white" />
              </div> */}

              <button
                // onClick={() => handleDelete(index)}
                className="text-red-500 border border-red-600 py-2 rounded-lg text-lg font-semibold px-2 ml-2"
                aria-label="Delete item"
              >
                <FaTrash />
              </button>
            </div>
            <div className="flex border my-3 justify-around items-center">
              <p>2.</p>
              <p className="w-[200px] border-2 p-2 rounded-lg border-[#2b3770]">Mr. Girish   gaikwad</p>

              {/* <div className=" border p-1 w-6 h-6 rounded-lg bg-[#5b00a9]">
                <BsFillPeopleFill className="text-white" />
              </div> */}

              <button
                // onClick={() => handleDelete(index)}
                className="text-red-500 border border-red-600 py-2 rounded-lg text-lg font-semibold px-2 ml-2"
                aria-label="Delete item"
              >
                <FaTrash />
              </button>
            </div>

           
          </div>
        )
      default:
        return <p>General information about the selected item.</p>;
    }
  };

  return (
    <>
      {/* Gray background overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-999"
        onClick={closePopup}
      />

      {/* Popup content */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 rounded-xl -translate-y-1/2 bg-white border border-gray-300 shadow-md z-10">
        {renderPopupContent()}

        <div className="flex justify-end">
          <button
            onClick={closePopup}
            className="bg-gray-500 text-white py-1 px-4 mt-5 mb-2 rounded-lg  mx-4"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
