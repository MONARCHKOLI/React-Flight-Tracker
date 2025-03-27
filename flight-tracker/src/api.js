import axios from "axios";

const API_URL = "http://localhost:8080/flights";
const API_KEY = "0fca3069c12c977528ea82d66cbfd3ac"; // Replace with your actual API key

export const fetchFlights = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: { access_key: API_KEY },
    });
    return response.data[0].data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
};
