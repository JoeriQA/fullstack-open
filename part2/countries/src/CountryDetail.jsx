const CountryDetail = ({ country }) => {
  if (!country) return null;
  console.log(country);

  const languages = Object.values(country.languages);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => {
          return <li>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt="" />
    </div>
  );
};

export default CountryDetail;
