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

  let demographicData= [
    { villageName: "Jabalia-Gaza Strip", populationSize: "50000", ageDistribution: "0-14: 30%, 15-64: 60%, 65+: 10%", genderRatios: "Male: 51%, Female: 49%", growthRate: "2.5%" },
    { villageName: "Beit Lahia - Gaza Strip", populationSize: "60000", ageDistribution: "0-14: 32%, 15-64: 58%, 65+: 10%", genderRatios: "Male: 52%, Female: 48%", growthRate: "2.8%" },
    { villageName: "Shejaiya - Gaza Strip", populationSize: "45000", ageDistribution: "0-14: 28%, 15-64: 62%, 65+: 10%", genderRatios: "Male: 50%, Female: 50%", growthRate: "3.0%" },
    { villageName: "Rafah - Gaza Strip", populationSize: "70000", ageDistribution: "0-14: 33%, 15-64: 57%, 65+: 10%", genderRatios: "Male: 53%, Female: 47%", growthRate: "2.3%" },
    { villageName: "Hebron - West Bank", populationSize: "80000", ageDistribution: "0-14: 29%, 15-64: 61%, 65+: 10%", genderRatios: "Male: 49%, Female: 51%", growthRate: "2.0%" },
    { villageName: "Quds - West Bank", populationSize: "120000", ageDistribution: "0-14: 35%, 15-64: 55%, 65+: 10%", genderRatios: "Male: 50%, Female: 50%", growthRate: "2.7%" },
    { villageName: "Nablus - West Bank", populationSize: "95000", ageDistribution: "0-14: 31%, 15-64: 59%, 65+: 10%", genderRatios: "Male: 51%, Female: 49%", growthRate: "2.6%" }
];


const ageDistributionPattern = /^(0-14: \d+%, 15-64: \d+%, 65\+: \d+%)(, \d+-\d+: \d+%)*$/;

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

