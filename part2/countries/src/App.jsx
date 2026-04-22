import countryService from "./services/countries";
import CountryList from "./CountryList";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  const filterCountries = (event) => {
    const filterString = String(event.target.value).toLocaleLowerCase();
    setFilteredList(
      countries.filter((country) =>
        country.name.common.toLocaleLowerCase().includes(filterString),
      ),
    );
  };

  return (
    <>
      <div>
        find countries <input onChange={filterCountries} />
      </div>
      <CountryList countries={filteredList} />
    </>
  );
}

export default App;
