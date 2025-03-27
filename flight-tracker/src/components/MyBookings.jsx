import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleEdit = (index) => {
    const updatedName = prompt("Enter new name:");
    const updatedSeats = parseInt(prompt("Enter new seat count:"), 10);

    if (updatedName && updatedSeats) {
      const updatedBookings = [...bookings];
      updatedBookings[index].name = updatedName;
      updatedBookings[index].seats = updatedSeats;
      setBookings(updatedBookings);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    }
  };

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <strong>{booking.airline}</strong> ({booking.flightIata})<br />
              {booking.departure} → {booking.arrival}<br />
              <strong>Passenger:</strong> {booking.name} <br />
              <strong>Seats:</strong> {booking.seats} <br />
              <button onClick={() => handleEdit(index)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/")}>🔙 Back to Flights</button>
    </div>
  );
};

export default MyBookings;
