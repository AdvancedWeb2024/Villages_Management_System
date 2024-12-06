// Data for Age Distribution
const xValuesAge = ["0-18", "19-35", "36-50", "51-65", "65+"];
const yValuesAge = [55, 49, 44, 24, 15];
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
    title: {
      display: true,
      text: "Age Distribution",
      borderWidth: 0
    }
  }
});

// Data for Gender Ratio
const xValuesGender = ["Male", "Female"];
const yValuesGender = [55, 49];
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
    title: {
      display: true,
      text: "Gender Ratio",
      borderWidth: 0
    }
  }
});

const cities = ["City 1", "City 2", "City 3", "City 4", "City 5", "City 6", "City 4", "City 5", "City 6"];
const population = [120000, 200000, 150000, 220000, 250000, 250000, 220000, 250000, 250000];

new Chart("populationChart", {
  type: "bar",
  data: {
    labels: cities,
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
          }
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
          maxTicksLimit: 10   
        },
        barPercentage: 0.9,  
        categoryPercentage: 0.9, 
      }
    },
    plugins: {
      legend: {
        display: false  
      }
    }
  }
});
