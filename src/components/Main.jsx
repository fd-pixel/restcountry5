import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Main = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  // const [region, setRegion] = useState(null);

  // const regionNames = [ "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const getCountries = async () => {
    if (query !== "") {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${query}`
      );
      setCountries(response.data);
    } else {
      alert("Please enter a country name");
    }
  };

  useEffect(() => {
    getCountries();
  }, []);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getCountries();
    setQuery("");
  };

  return (
    <>
      <div className="searchbar">
        <form onSubmit={handleSubmit} className="searchform">
          <input
            type=""
            placeholder="Enter country name..."
            onChange={handleChange}
            value={query}
            autoFocus
          />

          <button onSubmit={handleSubmit} autoFocus type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="Countrylist">
        {countries.map((country, index) => {
          return (
            <div key={index} className="countrylist-item">
              <div className="flag">
                {" "}
                <img src={country.flags.png} />
              </div>
              <div className="countryinfo">
                <p className="countryname">{country.name.official}</p>
                <p className="countrycapital">Capital :{country.capital}</p>
                <p className="countrpopulation">
                  Population:{country.population}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Main;
