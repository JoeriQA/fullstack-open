import CountryDetail from "./CountryDetail";

const CountryList = ({ countries }) => {
  if (!countries) return null;

  if (countries.length === 0)
    return <div>No countries found. Try another filter.</div>;

  if (countries.length > 10)
    return <div>Too many countries, specifiy another filter.</div>;

  if (countries.length === 1) return <CountryDetail country={countries[0]} />;

  return (
    <div>
      {countries.map((country) => {
        return <div>{country.name.common}</div>;
      })}
    </div>
  );
};

export default CountryList;
