import axios from "axios";
const apiKey = import.meta.env.API_KEY;

const baseUrl = "http://api.openweathermap.org";

const getGeodata = (capital) => {
  const request = axios.get(
    `${baseUrl}/geo/1.0/direct?q=${capital}&limit=5&appid=${apiKey}`,
  );
  return request.then((response) => response.data);
};

const getWeather = (latitude, longitude) => {
  const request = axios.get(
    `${baseUrl}/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
  );

  return request.then((response) => response.data);
};

export default {
  getGeodata,
  getWeather,
};
