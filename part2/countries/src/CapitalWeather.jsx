import weatherService from "./services/weather";
import { useState, useEffect } from "react";

const CapitalWeather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const geoData = await weatherService.getGeodata(capital);
      if (geoData.length > 0) {
        const data = await weatherService.getWeather(
          geoData[0].lat,
          geoData[0].lon,
        );
        setWeather(data);
      }
    };

    fetchWeather();
  }, [capital]);

  if (!capital) return null;
  if (!weather)
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>No weather found for {capital}</div>
      </div>
    );

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature {weather.main.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
      />
      <div>Wind {weather.wind.speed} m/s</div>
    </div>
  );
};

export default CapitalWeather;
