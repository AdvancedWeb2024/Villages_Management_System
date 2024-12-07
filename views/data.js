let defaultCities = [
  { name: "Jabalia-Gaza Strip", image: "../images/jabalia.jpg", region: "Gaza Strip", landArea: 15.5, latitude: 31.528, longitude: 34.464, category: "Urban" },
  { name: "Beit Lahia - Gaza Strip", image: "../images/jabalia.jpg", region: "Gaza Strip", landArea: 18.2, latitude: 31.588, longitude: 34.529, category: "Urban" },
  { name: "Shejaiya - Gaza Strip", image: "../images/jabalia.jpg", region: "Gaza Strip", landArea: 10.3, latitude: 31.529, longitude: 34.477, category: "Urban" },
  { name: "Rafah - Gaza Strip", image: "../images/jabalia.jpg", region: "Gaza Strip", landArea: 22.1, latitude: 31.276, longitude: 34.258, category: "Urban" },
  { name: "Hebron - West Bank", image: "../images/jabalia.jpg", region: "West Bank", landArea: 60.2, latitude: 31.531, longitude: 35.089, category: "City" },
  { name: "Quds - West Bank", image: "../images/jabalia.jpg", region: "West Bank", landArea: 48.6, latitude: 31.768, longitude: 35.213, category: "City" },
  { name: "Nablus - West Bank", image: "../images/jabalia.jpg", region: "West Bank", landArea: 45.8, latitude: 32.221, longitude: 35.262, category: "City" },
  { name: "Jabalia-Gaza Strip", image: "../images/jabalia.jpg", region: "Gaza Strip", landArea: 15.5, latitude: 31.528, longitude: 34.464, category: "Urban" },
  { name: "Beit Lahia - Gaza Strip", image: "../images/jabalia.jpg", region: "Gaza Strip", landArea: 18.2, latitude: 31.588, longitude: 34.529, category: "Urban" },
  { name: "Shejaiya - Gaza Strip", image: "../images/jabalia.jpg", region: "Gaza Strip", landArea: 10.3, latitude: 31.529, longitude: 34.477, category: "Urban" },
  { name: "Rafah - Gaza Strip", image: "../images/jabalia.jpg", region: "Gaza Strip", landArea: 22.1, latitude: 31.276, longitude: 34.258, category: "Urban" },
  { name: "Hebron - West Bank", image: "../images/jabalia.jpg", region: "West Bank", landArea: 60.2, latitude: 31.531, longitude: 35.089, category: "City" },
  { name: "Quds - West Bank", image: "../images/jabalia.jpg", region: "West Bank", landArea: 48.6, latitude: 31.768, longitude: 35.213, category: "City" },
  { name: "Nablus - West Bank", image: "../images/jabalia.jpg", region: "West Bank", landArea: 45.8, latitude: 32.221, longitude: 35.262, category: "City" }
];


  let imagesData=[{ name: "Jabalia-Gaza Strip",image:"../images/jabalia.jpg",discreption:"jabalia ...."},
    { name: "Beit Lahia - Gaza Strip",image:"../images/jabalia.jpg",discreption:"Beit Lahia ...." },
    { name: "Shejaiya - Gaza Strip",image:"../images/jabalia.jpg",discreption:"Shejaiya ...." },
    { name: "Rafah - Gaza Strip" ,image:"../images/jabalia.jpg",discreption:"Rafah ...."},
    { name: "Hebron - west Bank",image:"../images/jabalia.jpg",discreption:"Hebron ...."},
    { name: "Quds - west Bank" ,image:"../images/jabalia.jpg", discreption:"Quds ...."},
  ]


  let demographicData = [
    { 
        villageName: "Jabalia-Gaza Strip", 
        populationSize: "50000", 
        ageDistribution: {
            "0-18": "60%",  
            "19-35": "20%", 
            "36-50": "20%", 
            "51-65": "20%", 
            "65+": "10%"   
        }, 
        genderRatios: "Male: 51%, Female: 49%", 
        growthRate: "2.5%" 
    },
    { 
        villageName: "Beit Lahia - Gaza Strip", 
        populationSize: "60000", 
        ageDistribution: {
            "0-18": "64%", 
            "19-35": "19%", 
            "36-50": "19%", 
            "51-65": "19%", 
            "65+": "10%"    
        }, 
        genderRatios: "Male: 52%, Female: 48%", 
        growthRate: "2.8%" 
    },
    { 
        villageName: "Shejaiya - Gaza Strip", 
        populationSize: "45000", 
        ageDistribution: {
            "0-18": "59%",  
            "19-35": "21%", 
            "36-50": "21%", 
            "51-65": "21%",
            "65+": "10%"   
        }, 
        genderRatios: "Male: 10%, Female: 90%", 
        growthRate: "3.0%" 
    },
    { 
        villageName: "Rafah - Gaza Strip", 
        populationSize: "70000", 
        ageDistribution: {
            "0-18": "66%",  
            "19-35": "19%", 
            "36-50": "19%", 
            "51-65": "19%", 
            "65+": "10%"   
        }, 
        genderRatios: "Male: 3%, Female: 97%", 
        growthRate: "2.3%" 
    },
    { 
        villageName: "Hebron - West Bank", 
        populationSize: "500000", 
        ageDistribution: {
            "0-18": "58%",  
            "19-35": "20%",
            "36-50": "20%", 
            "51-65": "20%", 
            "65+": "10%"    
        }, 
        genderRatios: "Male: 30%, Female: 70%", 
        growthRate: "2.0%" 
    },
    { 
        villageName: "Quds - West Bank", 
        populationSize: "120000", 
        ageDistribution: {
            "0-18": "67%",  
            "19-35": "18%", 
            "36-50": "18%", 
            "51-65": "18%", 
            "65+": "10%"    
        }, 
        genderRatios: "Male: 5%, Female: 95%", 
        growthRate: "2.7%" 
    },
    { 
        villageName: "Nablus - West Bank", 
        populationSize: "95000", 
        ageDistribution: {
            "0-18": "62%",  
            "19-35": "20%", 
            "36-50": "20%", 
            "51-65": "20%", 
            "65+": "10%"    
        }, 
        genderRatios: "Male: 1%, Female: 99%", 
        growthRate: "2.6%" 
    }
];



function calculateAvgAgeDistribution(data) {
 
  let totalAgeDistribution = {
      "0-18": 0,
      "19-35": 0,
      "36-50": 0,
      "51-65": 0,
      "65+": 0
  };

  data.forEach(village => {
      totalAgeDistribution["0-18"] += parseFloat(village.ageDistribution["0-18"]);
      totalAgeDistribution["19-35"] += parseFloat(village.ageDistribution["19-35"]);
      totalAgeDistribution["36-50"] += parseFloat(village.ageDistribution["36-50"]);
      totalAgeDistribution["51-65"] += parseFloat(village.ageDistribution["51-65"]);
      totalAgeDistribution["65+"] += parseFloat(village.ageDistribution["65+"]);
  });

  let numVillages = data.length;
  let avgAgeDistribution = [
      (totalAgeDistribution["0-18"] / numVillages).toFixed(2),
      (totalAgeDistribution["19-35"] / numVillages).toFixed(2),
      (totalAgeDistribution["36-50"] / numVillages).toFixed(2),
      (totalAgeDistribution["51-65"] / numVillages).toFixed(2),
      (totalAgeDistribution["65+"] / numVillages).toFixed(2)
  ];

  return avgAgeDistribution;
}


function calculateAvgGenderRatio(data) {
  let totalGenderRatio = {
      male: 0,
      female: 0
  };

  if (data.length === 0) return [0, 0];
  
  data.forEach(village => {
    
      let malePercentage = parseFloat(village.genderRatios.match(/Male: (\d+(\.\d+)?)/)?.[1]) || 0;
      let femalePercentage = parseFloat(village.genderRatios.match(/Female: (\d+(\.\d+)?)/)?.[1]) || 0;
      
      totalGenderRatio.male += malePercentage;
      totalGenderRatio.female += femalePercentage;
  });

  let numVillages = data.length;
  let avgGenderRatio = [
      totalGenderRatio.male / numVillages,  
      totalGenderRatio.female / numVillages 
  ];

  console.log("Average Gender Ratio:", avgGenderRatio);

  return avgGenderRatio;
}

function getVillageNames(data) {
 
  return data.map(village => village.villageName);
}


function getPopulationSizes(data) {
  return data.map(village => village.populationSize);
}


function calculateTotalPopulation(data) {
  return data.reduce((total, village) => total + parseInt(village.populationSize), 0);
}






function getTotalNumberOfVillages(data) {
  return data.length;
}


function getTotalNumberOfUrbanAreas(data) {
  return data.filter(city => city.category === "Urban").length;
}


function getAverageLandArea(data) {
  let totalLandArea = data.reduce((total, city) => total + city.landArea, 0);
  return totalLandArea / data.length;
}



function updateStatistics() {

  let totalVillages = getTotalNumberOfVillages(defaultCities);
  let totalUrbanAreas = getTotalNumberOfUrbanAreas(defaultCities);
  let totalPopulation = calculateTotalPopulation(demographicData);
  let avgLandArea = getAverageLandArea(defaultCities);


  document.getElementById('numVillage').textContent = totalVillages;
  document.getElementById('numUrban').textContent = totalUrbanAreas;
  document.getElementById('populationSize').textContent = totalPopulation;
  document.getElementById('avgLandArea').textContent = avgLandArea.toFixed(2);
}



function addLocationsToMap(cities) {
  cities.forEach(city => {
    const { name, latitude, longitude } = city;

    // Create a marker for each city
    L.marker([latitude, longitude]).addTo(map)
      .bindPopup(`<b>${name}</b>`)
      .openPopup();
  });
}



const ageDistributionPattern = /^(0-18: \d+%, 19-35: \d+%, 36-50: \d+%, 51-65: \d+%, 65\+: \d+%)(, \d+-\d+: \d+%)*$/;

const genderRatiosPattern = /^(Male\s*:\s*\d+\s*%,\s*Female\s*:\s*\d+\s*%)$|^(Female\s*:\s*\d+\s*%,\s*Male\s*:\s*\d+\s*%)$/;

// Validation functions
function validateAgeDistribution(ageDistribution) {
  const normalizedAgeDistribution = ageDistribution.trim().replace(/\s+/g, ' ');
  console.log("Validating Age Distribution:", normalizedAgeDistribution);
  return ageDistributionPattern.test(normalizedAgeDistribution);

}

function validateGenderRatios(genderRatios) {
 
  const normalizedGenderRatios = genderRatios.trim().replace(/\s+/g, ' ');
  console.log("Validating Gender Ratios:", normalizedGenderRatios);
  return genderRatiosPattern.test(normalizedGenderRatios)

}

