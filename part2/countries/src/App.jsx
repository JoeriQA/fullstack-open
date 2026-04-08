import countryService from "./services/countries";
import CountryList from "./CountryList";
import { useState } from "react";

function App() {
  const [countries, setCountries] = useState(null);

  const findCountries = (event) => {
    const countryResponse = countryService.get(event.target.value);
    setCountries(countryResponse);
  };

  return (
    <>
      <div>
        find countries <input onChange={findCountries} />
      </div>
      <CountryList countries={countries} />
    </>
  );
}

export default App;
