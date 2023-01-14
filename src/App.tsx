import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";
import FinishBooking from "./pages/FinishBooking";
import Success from "./pages/Success";
import Pending from "./pages/Pending";
import Failure from "./pages/Failure";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/book/:location" element={<Booking />} />
        <Route path="/finish-booking" element={<FinishBooking />} />
        <Route path="/success" element={<Success />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
