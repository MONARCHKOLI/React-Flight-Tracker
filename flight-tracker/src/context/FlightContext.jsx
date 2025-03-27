import { createContext, useState, useEffect } from "react";
import { fetchFlights } from "../api";

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const loadFlights = async () => {
      const data = await fetchFlights();
      setFlights(data);
    };
    loadFlights();
  }, []);

  const updateFlight = (id, updatedFlight) => {
    setFlights(flights.map((flight) => (flight.id === id ? updatedFlight : flight)));
  };

  return (
    <FlightContext.Provider value={{ flights, updateFlight }}>
      {children}
    </FlightContext.Provider>
  );
};
