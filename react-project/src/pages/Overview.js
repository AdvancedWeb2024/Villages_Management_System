import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Leaflet imports
import L from 'leaflet'; // Leaflet main package for advanced functionalities
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles
import '../styles/overview.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const OverviewPage = () => {
  // States for the statistics
  const [numVillage, setNumVillage] = useState(0);
  const [numUrban, setNumUrban] = useState(0);
  const [populationSize, setPopulationSize] = useState(0);
  const [avgLandArea, setAvgLandArea] = useState(0);

  // States for the chart data
  const [ageData, setAgeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [populationData, setPopulationData] = useState([]);
  const [villageNames, setVillageNames] = useState([]); // To store the village names
  const [villageCoordinates, setVillageCoordinates] = useState([]); // To store village lat/long data

  useEffect(() => {
    // Fetch data from the GraphQL server
    async function fetchData(query) {
      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      return data.data;
    }

    const GET_VILLAGES = `
      query {
        villages {
          id
          name
          latitude
          longitude
          category
          landArea
        }
      }
    `;

    const GET_DEMOGRAPHICS = `
      query {
        demographics {
          villageName
          populationSize
          ageDistribution
          genderRatios
        }
      }
    `;

    async function loadData() {
      const villageData = await fetchData(GET_VILLAGES);
      const demographicData = await fetchData(GET_DEMOGRAPHICS);

      setNumVillage(villageData.villages.length);
      setNumUrban(villageData.villages.filter(village => village.category === "Urban").length);
      setPopulationSize(demographicData.demographics.reduce((total, village) => total + parseInt(village.populationSize), 0));

      const totalLandArea = villageData.villages.reduce((total, village) => total + village.landArea, 0);
      setAvgLandArea(totalLandArea / villageData.villages.length);

      // Prepare data for charts
      const ageDistribution = demographicData.demographics.map(village => JSON.parse(village.ageDistribution));
      const ageValues = ageDistribution.reduce((acc, dist) => {
        Object.keys(dist).forEach(key => acc[key] = (acc[key] || 0) + parseFloat(dist[key]));
        return acc;
      }, {});

      const avgAgeValues = Object.keys(ageValues).reduce((acc, key) => {
        acc[key] = (ageValues[key] / demographicData.demographics.length).toFixed(2);
        return acc;
      }, {});

      setAgeData(avgAgeValues);

      const genderRatios = demographicData.demographics.map(village => {
        const match = village.genderRatios.match(/Male: (\d+)%\, Female: (\d+)%/);
        if (match) {
          return {
            male: parseFloat(match[1]),
            female: parseFloat(match[2])
          };
        }
        return { male: 0, female: 0 };
      });

      const totalGenderRatio = genderRatios.reduce((acc, ratio) => {
        acc.male += ratio.male;
        acc.female += ratio.female;
        return acc;
      }, { male: 0, female: 0 });

      setGenderData([totalGenderRatio.male / demographicData.demographics.length, totalGenderRatio.female / demographicData.demographics.length]);

      setPopulationData(demographicData.demographics.map(village => village.populationSize));

      // Get village names and coordinates
      const villageNamesList = villageData.villages.map(village => village.name);
      setVillageNames(villageNamesList);
      
      const coordinatesList = villageData.villages.map(village => ({
        name: village.name,
        lat: parseFloat(village.latitude),
        lon: parseFloat(village.longitude),
      }));
      setVillageCoordinates(coordinatesList);
    }

    loadData();
  }, []);

  // Data for the charts
  const ageChartData = {
    labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
    datasets: [{
      backgroundColor: ['#a74c65', '#2f72a3', '#a58c4d', '#3c8489', '#684eaf'],
      data: Object.values(ageData),
    }],
  };

  const genderChartData = {
    labels: ['Male', 'Female'],
    datasets: [{
      backgroundColor: ['#a74c65', '#2f72a3'],
      data: genderData,
    }],
  };

  const populationChartData = {
    labels: villageNames,
    datasets: [{
      label: 'Population',
      data: populationData,
      backgroundColor: '#3C5A66',
      borderColor: '#4AB9BA',
      borderWidth: 1,
    }],
  };

  // Custom icon for Leaflet markers
  const customMarkerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div>
      <h2 className="top-head">Overview</h2>

      {/* Map Section */}
      <div className="map-container">
        <MapContainer center={[0, 0]} zoom={2} id="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {villageCoordinates.map(village => (
            <Marker
              key={village.name}
              position={[village.lat, village.lon]}
              icon={customMarkerIcon}
            >
              <Popup>
                <strong>{village.name}</strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Statistic section */}
      <div className="statistic">
        <div className="st-item">
          <p>Total Number of Villages</p>
          <p>{numVillage}</p>
        </div>
        <div className="st-item">
          <p>Total Number of Urban Areas</p>
          <p>{numUrban}</p>
        </div>
        <div className="st-item">
          <p>Total Population Size</p>
          <p>{populationSize}</p>
        </div>
        <div className="st-item">
          <p>Average Land Area</p>
          <p>{avgLandArea}</p>
          <p style={{ color: '#9ca3af' }}>sq km</p>
        </div>
      </div>

      {/* Pie charts */}
      <div className="statistic">
        <div className="chart-canva" id="ageChartContainer">
          <h2>Age Distribution</h2>
          <Pie data={ageChartData} />
        </div>
        <div className="chart-canva" id="genderChartContainer">
          <h2>Gender Ratio</h2>
          <Pie data={genderChartData} />
        </div>
      </div>

      {/* Bar Chart for Population Distribution */}
      <div className="chart-canva" id="populationChartContainer">
        <Bar data={populationChartData} />
      </div>
    </div>
  );
};

export default OverviewPage;
