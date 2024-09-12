import React from "react";

const Card = ({ event }) => {
  console.log(event);

  const formatDate = (isoString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day, month: months[parseInt(month) - 1], year };
  };

  return (
    <div className="w-full max-w-xs mx-auto  bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-32 object-cover rounded-lg"
        src="/images/thumnail.png"
        // src="https://via.placeholder.com/300"
        alt="Event"
      />
      <div className="p-4">
        <div className="flex">
          <div className="flex flex-col items-center">
            <h2 className="text-[#473ba7]">{formatDate(event.start_at).month}</h2>
            <p className=" font-medium"> 
              {formatDate(event.start_at).day} - {formatDate(event.end_at).day}
            </p>
            <h6
              className={
                "text-sm " +
                (event.status === 1
                  ? "text-red-500"
                  : event.status === 2
                  ? "text-blue-900"
                  : event.status === 3
                  ? "text-green-500"
                  : "")
              }
            >
              {event.status === 1
                ? "CREATED NOW"
                : event.status === 2
                ? "IN-PROGRESS"
                : event.status === 3
                ? "ASSIGNED"
                : ""}
              &nbsp;
            </h6>
          </div>
          <div className="flex justify-center  w-[60%]">
            <h2>{event.event_code}</h2>
            <h5>{event.event_name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
