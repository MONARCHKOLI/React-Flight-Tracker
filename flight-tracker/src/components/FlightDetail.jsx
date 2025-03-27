import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FlightDetail.css"; // Import CSS

const FlightDetail = () => {
  const { id: flightIata } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seatsAvailable, setSeatsAvailable] = useState(10); // Default available seats
  const [userDetails, setUserDetails] = useState({ name: "", seats: 1 });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/flights`);
        const flightData = response.data[0].data.find(f => f.flight.iata === flightIata);

        if (flightData) {
          setFlight(flightData);
          // Check if we have stored seat availability in localStorage
          const storedSeats = JSON.parse(localStorage.getItem(`seats_${flightIata}`));
          setSeatsAvailable(storedSeats ?? 10);
        } else {
          setError("Flight not found.");
        }
      } catch (err) {
        setError("Error fetching flight details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [flightIata]);

  const handleBooking = () => {
    const { name, seats } = userDetails;

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (seats > seatsAvailable) {
      alert("Not enough seats available.");
      return;
    }

    if (seats <= 0) {
      alert("No Seats Selected.");
      return;
    }

    const updatedSeats = seatsAvailable - seats;
    setSeatsAvailable(updatedSeats);
    localStorage.setItem(`seats_${flightIata}`, JSON.stringify(updatedSeats));

    // Store the booking in local storage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBooking = {
      flightIata,
      airline: flight.airline.name,
      departure: flight.departure.airport,
      arrival: flight.arrival.airport,
      seats,
      name,
    };

    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  if (loading) return <p>Loading flight details...</p>;
  if (error) return <p>{error}</p>;
  if (!flight) return <p>Flight not found.</p>;

  return (
    <div className="flight-detail-container">
      <h2>Flight Details</h2>
      <p><strong>Airline:</strong> {flight.airline.name}</p>
      <p><strong>Flight Number:</strong> {flight.flight.number}</p>
      <p><strong>Departure:</strong> {flight.departure.airport} ({flight.departure.iata})</p>
      <p><strong>Arrival:</strong> {flight.arrival.airport} ({flight.arrival.iata})</p>
      <p><strong>Flight Status:</strong> {flight.flight_status}</p>
      <p><strong>Seats Available:</strong> {seatsAvailable}</p>
      
      <div className="booking-form">
        <h3>Book Your Seat</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
        />
        <input
          type="number"
          min="1"
          max={seatsAvailable}
          value={userDetails.seats}
          onChange={(e) => setUserDetails({ ...userDetails, seats: Number(e.target.value) })}
        />
      </div>

      <button onClick={() => navigate(-1)} className="back-btn">🔙 Back</button>

      {bookingSuccess && <p className="success-msg">✅ Booking successful!</p>}
      {seatsAvailable > 0 ? (
        <button onClick={handleBooking} className="book-btn">Book Seat</button>
      ) : (
        <p className="error-msg">❌ No seats available</p>
      )}
    </div>
  );
};

export default FlightDetail;
