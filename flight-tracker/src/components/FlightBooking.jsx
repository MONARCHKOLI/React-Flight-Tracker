import { useState } from "react";
import axios from "axios";
import "./FlightBooking.css";

const FlightBooking = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [fare, setFare] = useState(0);

  const searchFlights = async () => {
    try {
      const response = await axios.get(
        `https://api.aviationstack.com/v1/flights?access_key=YOUR_API_KEY&dep_iata=${departure}&arr_iata=${arrival}&flight_date=${date}`
      );
      setFlights(response.data.data);
    } catch (error) {
      console.error("Error fetching flights", error);
    }
  };

  const calculateFare = (flight) => {
    const today = new Date();
    const bookingDate = new Date(date);
    const diffDays = Math.ceil((bookingDate - today) / (1000 * 60 * 60 * 24));
    const distance = 500; // Assuming 500km for demo, replace with actual API data

    let pricePerPerson = distance * 5;
    if (diffDays > 5) {
      pricePerPerson = distance * 3;
    }

    setFare(pricePerPerson * passengers);
    setSelectedFlight(flight);
  };

  return (
    <div className="booking-container">
      <h2>Book a Flight</h2>
      <div className="booking-form">
        <input type="text" placeholder="Departure (IATA)" onChange={(e) => setDeparture(e.target.value.toUpperCase())} />
        <input type="text" placeholder="Arrival (IATA)" onChange={(e) => setArrival(e.target.value.toUpperCase())} />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button onClick={searchFlights}>Search</button>
      </div>

      {flights.length > 0 && (
        <div className="flight-results">
          <h3>Available Flights</h3>
          {flights.map((flight, index) => (
            <div key={index} className="flight-card">
              <p><strong>{flight.airline.name}</strong></p>
              <p>Flight: {flight.flight.number}</p>
              <button onClick={() => calculateFare(flight)}>Select Flight</button>
            </div>
          ))}
        </div>
      )}

      {selectedFlight && (
        <div className="ticket-summary">
          <h3>Booking Summary</h3>
          <p>Flight: {selectedFlight.flight.number}</p>
          <p>Passengers: {passengers}</p>
          <p>Total Fare: ${fare}</p>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
