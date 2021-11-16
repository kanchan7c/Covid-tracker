import { FormControl, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import './app.css';

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
              id: country.countryInfo.id
            }));
          setCountries(countries);
        });
    }
    getCountriesData();

  }, [])

  return (
    <div className="app">
      <div className="app_header">
        <h1 className="app_title">Covid-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="something" key={countries.id} value={country}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>
      {/* header  */}
      {/* title and dropdowns  */}


      {/* infobox */}
      {/* infobox */}
      {/* infobox */}

      {/* table  */}
      {/* graph  */}

      {/* map  */}
    </div>
  );
}

export default App;
