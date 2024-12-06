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