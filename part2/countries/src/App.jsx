import { useEffect } from "react";
import { useState } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

const CountryRow = ({ country, openCountry }) => (
  <div style={{ padding: 10 }}>
    <label>{country.name.common} </label>
    <input type="button" onClick={openCountry} value="show" />
  </div>
);

const CountryDisplay = ({ country, exit }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>
        <b>Languages</b>
      </p>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} height={100} />
      <h2>Weather in {country.capital}</h2>
      <WeatherDisplay city={country.capital} />
      <button onClick={exit} style={{ display: "block" }}>
        Back to search
      </button>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getCity(city)
      .then((w) => setWeather(w))
      .catch((e) =>
        console.log(`Could not find weather data for ${city}: ${e.message}`),
      );
  }, [city]);
  if (!weather) {
    return <p>No weather data found</p>;
  }
  return (
    <>
      <p>Temperature: {weather.temp} °C</p>
      <p>Wind speed: {weather.wind} m/s</p>
      <img src={weather.img} height={100} />
    </>
  );
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (countries) {
      return;
    }
    countryService
      .getAll()
      .then((countries) => setCountries(countries))
      .catch((err) => {
        alert("Failed fetching countries: " + err.message);
        setCountries([]);
      });
  }, [countries, setCountries]);

  const reset = () => {
    setSelected(null);
    setSearch("");
  };

  const filtered = (countries || []).filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );
  let display;
  switch (true) {
    case selected != null:
      display = <CountryDisplay country={selected} exit={reset} />;
      break;
    case filtered.length === 0:
      display = <p>No countries found</p>;
      break;
    case filtered.length === 1 && !selected:
      setSelected(filtered[0]);
      break;
    case filtered.length <= 10:
      display = filtered.map((c) => (
        <CountryRow
          country={c}
          openCountry={() => setSelected(c)}
          key={c.name.common}
        />
      ));
      break;
    default:
      display = <p>More than 10 countries found, improve search</p>;
      break;
  }

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {display}
    </>
  );
};

export default App;
