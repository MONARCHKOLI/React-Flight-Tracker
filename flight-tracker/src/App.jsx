import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FlightProvider } from "./context/FlightContext";
import FlightList from "./components/FlightList";
import FlightDetail from "./components/FlightDetail";
import FlightBooking from "./components/FlightBooking";
import MyBookings from "./components/MyBookings";

function App() {
  return (
    <FlightProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FlightList />} />
          <Route path="/flight/:id" element={<FlightDetail />} />
          <Route path="/book/:id" element={<FlightBooking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </Router>
    </FlightProvider>
  );
}

export default App;
