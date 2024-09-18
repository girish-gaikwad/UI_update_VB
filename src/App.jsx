import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar/sidebar";
import LiveEvent from "./pages/liveevents/liveEvents";
import TreeStructure from "./pages/flowchart/flowCharts";
import INFRAWORK from "./infra/pages/content/infrawork";
import EVENTAPPROVED from "./Event_manager/pages/approvedlist/eventapproved";
import EventDetailsriser from "./pages/eventdeatils/eventdetails";
import EVENTMANAGERWORK from "./Event_manager/pages/content/eventmanagerwork";
import LoginPage from "./pages/components/login";

function App() {
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [selectedEventriser, setSelectedEventriser] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/login/success", {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      if (response.status === 200) {
        setUserdata(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    // <Router>
    <div className="flex h-screen bg-[#f6f6f6]">
      {userdata && window.location.pathname !== "/login" && <Sidebar />}
      <div className="w-full bg-[#f6f6f6] border flex-1 overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={<LiveEvent setSelectedEvent={setSelectedEventriser} />}
          />
          <Route path="/tree" element={<TreeStructure />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/infra"
            element={
              <INFRAWORK
                approvedEvents={approvedEvents}
                setApprovedEvents={setApprovedEvents}
              />
            }
          />
          <Route path="/pending" element={<EVENTMANAGERWORK />} />
          <Route
            path="/approved"
            element={<EVENTAPPROVED approvedEvents={approvedEvents} />}
          />
          <Route
            path="/registered-event/:id"
            element={
              userdata ? (
                <EventDetailsriser user={userdata.role} />
              ) : (
                <p>Loading event details...</p>
              )
            }
          />
        </Routes>
      </div>
    </div>
    // </Router>
  );
}

export default App;
