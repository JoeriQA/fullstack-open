const CapitalWeather = ({ capital }) => {
  if (!capital) return null;

  return <h2>Weather in {capital}</h2>;
};

export default CapitalWeather;
