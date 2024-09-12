// import React from "react";
// import "./approvedlist.css";
// import { CiSquareMore } from "react-icons/ci";
// import Divider from "@mui/material/Divider";
// import { IoSendSharp } from "react-icons/io5";
// import suit from "/images/suit.png";
// import money from "/images/money.png";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// // Example of how you might structure `approvedEvents` prop
// // const approvedEvents = [
// //   { id: 1, name: "Mr. Ramesh", contact: "984158991", dateTime: "07-7-2020-08.00 am", image: suit },
// //   { id: 2, name: "Ms. Sita", contact: "984158992", dateTime: "08-7-2020-09.00 am", image: money },
// //   // more events...
// // ];

// function APPROVEDLIST({ approvedEvents }) {
//   console.log(approvedEvents);

//   return (
//     <div className="infrawork">
//       <ToastContainer />
//       <div className="graybox">
//         <div className="navbar">
//           <div className="circle">
//             <img src="images/suit.png" style={{ width: "100%", height: "100%" }} alt="" />
//           </div>
//         </div>
//         <div className="primary">
//           <div className="staicdetails">
//             <div className="header">
//               Approved List the UI is not given is still in work for this page only
//               <div> 
//                 <CiSquareMore style={{ height: "30px", width: "30px" }} />
//               </div>
//             </div>

//             <div className="labels">
//               <p>Faculty</p>
//               <p>Start</p>
//               <p>Venue Requirement </p>
//               <p>Handled by</p>
//               <p>Venue</p>
//             </div>
//             <Divider variant="middle" component="p" />
//           </div>
//           <div className="scrollevents">
//             <div className="tomorrow">
//               <div className="lablex"> Tomorrow</div>
//               <div className="tomorrowcontent">
//                 {approvedEvents.filter(event => event.dateTime.includes("07-7-2020")).map((event) => (
//                   <div className="events" key={event.id}>
//                     <div className="a">
//                       <div className="randomimg">
//                         <img src={event.image} style={{ width: "100%", height: "100%" }} alt="random" />
//                       </div>
//                     </div>
//                     <div className="a">
//                       <div>{event.name}</div>
//                       <h4>{event.contact}</h4>
//                     </div>
//                     <div className="a d">
//                       {event.dateTime}
//                     </div>
//                     {[1, 2, 3].map((index) => (
//                       <div className="a" key={index}>
//                         <div className="dropdown-container">
//                           <select className="dropdown">
//                             <option value="option1">Option 1</option>
//                             <option value="option2">Option 2</option>
//                             <option value="option3">Option 3</option>
//                           </select>
//                           <button className="button-with-icon">
//                             <i className="icon">
//                               <IoSendSharp size={20} />
//                             </i>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="onedayago">
//               <div className="lablex"> 1 day ago</div>
//               <div className="tomorrowcontent">
//                 {approvedEvents.filter(event => event.dateTime.includes("06-7-2020")).map((event) => (
//                   <div className="events" key={event.id}>
//                     <div className="a">
//                       <div className="randomimg">
//                         <img src={event.image} style={{ width: "100%", height: "100%" }} alt="random" />
//                       </div>
//                     </div>
//                     <div className="a">
//                       <div>{event.name}</div>
//                       <h4>{event.contact}</h4>
//                     </div>
//                     <div className="a d">
//                       {event.dateTime}
//                     </div>
//                     {[1, 2, 3].map((index) => (
//                       <div className="a" key={index}>
//                         <div className="dropdown-container">
//                           <select className="dropdown">
//                             <option value="option1">Option 1</option>
//                             <option value="option2">Option 2</option>
//                             <option value="option3">Option 3</option>
//                           </select>
//                           <button className="button-with-icon">
//                             <i className="icon">
//                               <IoSendSharp size={20} />
//                             </i>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default APPROVEDLIST;




import React from 'react'

function EVENTAPPROVED() {
  return (
    <div>approvedlist   no UI</div>
  )
}

export default EVENTAPPROVED