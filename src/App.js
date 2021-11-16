import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import './app.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import { sortData } from './utlitity';
import Graph from './components/Graph';
import "leaflet/dist/leaflet.css";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  // for fetching worldwide data 
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, [])

  // for api call to fetch country name, value and id to loop in menu-items 
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

          const sortedData = sortData(data)
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    }
    getCountriesData();

  }, [])

  // for fetching the data for automatic case numbers country wise and worldwide
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  // console.log(countryInfo)

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1 className="app_title">Covid-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value="something"
              key={countries.id}
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox
            title="Coronavirus Cases"
            onClick={(e) => setCasesType("cases")}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            onClick={(e) => setCasesType("recovered")}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            onClick={(e) => setCasesType("deaths")}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app_right">
        <CardContent>
          <div className="app_information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3 className="graph_header">Worldwide New Cases</h3>
            <Graph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
