import { useEffect, useState } from "react";
import CountryDetail from "./CountryDetail";

const CountryList = ({ countries }) => {
  const [showDetail, setShowDetail] = useState(null);

  useEffect(() => {
    if (countries.length === 1) setShowDetail(countries[0]);
    else setShowDetail(null);
  }, [countries]);

  if (!countries) return null;

  if (countries.length === 0)
    return <div>No countries found. Try another filter.</div>;

  if (countries.length > 10)
    return <div>Too many countries, specifiy another filter.</div>;

  if (showDetail) return <CountryDetail country={showDetail} />;

  return (
    <div>
      {countries.map((country) => {
        return (
          <div key={country.cca2}>
            {country.name.common}
            <button onClick={() => setShowDetail(country)}>Show</button>
          </div>
        );
      })}
    </div>
  );
};

export default CountryList;
