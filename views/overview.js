// Data for Age Distribution
const xValuesAge = ["0-18", "19-35", "36-50", "51-65", "65+"];
const yValuesAge = calculateAvgAgeDistribution(demographicData);
const pieColorsAge = [
  "#a74c65",
  "#2f72a3",
  "#a58c4d",
  "#3c8489",
  "#684eaf"
];

new Chart("ageChart", {
  type: "pie",
  data: {
    labels: xValuesAge,
    datasets: [{
      backgroundColor: pieColorsAge,
      data: yValuesAge
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,  
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Age Distribution"
      }
    }
  }
});







const xValuesGender = ["Male", "Female"];
const yValuesGender = calculateAvgGenderRatio(demographicData);
const pieColorsGender = [
  "#a74c65",
  "#2f72a3",
];


new Chart("genderChart", {
  type: "pie",
  data: {
    labels: xValuesGender,
    datasets: [{
      backgroundColor: pieColorsGender,
      data: yValuesGender
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,  
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Gender Ratio"
      }
    }
  }
});


const citiesM = getVillageNames(demographicData);
const population = getPopulationSizes(demographicData);


new Chart("populationChart", {
  type: "bar",
  data: {
    labels: citiesM,
    datasets: [{
      label: "Population",
      data: population,
      backgroundColor: "#3C5A66",
      borderColor: "#4AB9BA",
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,  
        title: {
          display: true,
          text: 'Population'
        },
        ticks: {
          callback: function(value) {
            return value / 1000 + "k"; 
          },
          stepSize: 50000, 
        },
      },
      x: {
        title: {
          display: true,
          text: 'Cities'
        },
        ticks: {
          maxRotation: 0,
          autoSkip: false,
          maxTicksLimit: 10, 
        },
        barPercentage: 0.9,
        categoryPercentage: 0.9,
      }
    },
    plugins: {
      legend: {
        display: false, 
      }
    }
  }
});

var map = L.map('map').setView([31.5, 34.47], 10); // Centered on Gaza (latitude: 31.5, longitude: 34.47)

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addLocationsToMap(defaultCities);
updateStatistics();