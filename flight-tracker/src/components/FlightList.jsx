import { useContext } from "react";
import { FlightContext } from "../context/FlightContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "./FlightList.css";

const FlightList = () => {
  const { flights } = useContext(FlightContext);

  return (
    <div className="container">
      <h1 className="title">Live Flights</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{ delay: 3000 }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="flight-slider"
      >
        {flights.map((flight, index) => {
          const flightNumber = flight.flight?.number || `unknown-${index}`;
          return (
            <SwiperSlide key={flightNumber}>
              <div className="flight-card">
                <h2>{flight.airline.name}</h2>
                <p><strong>Flight:</strong> {flight.flight.number}</p>
                <p><strong>Route:</strong> {flight.departure.iata} → {flight.arrival.iata}</p>
                <p><strong>Status:</strong> {flight.flight_status}</p>
                <Link to={`/flight/${flight.flight.iata}`} className="details-btn">View Details</Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Link to="/my-bookings" className="my-bookings-btn">📖 My Bookings</Link>
    </div>
  );
};

export default FlightList;
