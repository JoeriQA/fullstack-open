// import CountryDetail from "./CountryDetail";

const CountryList = ({ countries }) => {
  if (!countries) return null;

  if (countries.length > 10)
    return <div>Too many countries, specifiy another filter.</div>;
  //   if (countries.length === 1) return <CountryDetail country={countries[0]} />;

  return (
    <ul>
      {countries.map((country) => {
        <li>{country.name.common}</li>;
      })}
    </ul>
  );
};

export default CountryList;
