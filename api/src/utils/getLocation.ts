import axios from "axios";

export const getLatitudeAndLongitude: (city: string) => Promise<{
  latitude: number;
  longitude: number;
}> = async (city: string) => {
  const LOCATION_API_URL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    city
  )},India&format=json`;

  try {
    const response = await axios.get(LOCATION_API_URL);
    if (response.data && response.data.length > 0) {
      const firstLocation = response.data[0];
      const latitude = firstLocation.lat;
      const longitude = firstLocation.lon;
      return { latitude, longitude };
    }

    return { latitude: 0, longitude: 0 };
  } catch (error) {
    console.error("Error fetching data:", (error as Error).message);
    return { latitude: 0, longitude: 0 };
  }
};
