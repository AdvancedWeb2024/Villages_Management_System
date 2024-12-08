
var cities = [...defaultCities];
var selectElement = document.getElementById('sort-select');
selectElement.size = 1; // normal size

var cityListContainer = document.getElementById("village-list");
var prevButton = document.getElementById("prev-page");
var nextButton = document.getElementById("next-page");
var searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase().trim(); 
  console.log(searchTerm)
  if (searchTerm === "") {
    cities = defaultCities.slice();
  } else {
    cities = defaultCities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm)
    );
  }

  // Re-render the page with the filtered cities
  renderPage();
});



// Select sort option - extend sizing when dropdown is clicked
selectElement.addEventListener('click', function () {
  selectElement.classList.add('open');
  selectElement.size = 2;
});

// Select sort option - normal sizing when focus is lost
selectElement.addEventListener('blur', function () {
  selectElement.classList.remove('open');
  selectElement.size = 1;
});

// select sort option extend sizing whec drop
selectElement.addEventListener('click', function () {
  selectElement.classList.add('open');
    selectElement.size = 2;
});

// select sort option normal sizing 
selectElement.addEventListener('blur', function () {
  selectElement.classList.remove('open');
    selectElement.size = 1;

});

function pageCounter() {
  let currentPage = 1;
  const itemsPerPage = 5;

  let startIndex = 0;

  return {
    getStartIndex: () => {
      startIndex = (currentPage - 1) * itemsPerPage;
      return startIndex;
    },
    getEndIndex: (citiesLength) => Math.min(startIndex + itemsPerPage, citiesLength),
    incrementCurrentPage: () => currentPage++,
    decrementCurrentPage: () => currentPage--,
    getCurrentPage: () => currentPage
  };
}

var pageController = pageCounter();

function createButton(cityName) {
  const buttonContainer = document.createElement("div");

  // Helper function to create a button
  const createButtonElement = (text, id, extraClasses = []) => {
    const button = document.createElement("button");
    button.classList.add("button", "button-cont", ...extraClasses);
    button.textContent = text;
    button.id = id;
    button.dataset.villageName = cityName;
    return button;
  };

  // Create buttons
  const viewButton = createButtonElement("View", "view-btn");
  const updateButton = createButtonElement("Update Village", "updateButton");
  const deleteButton = createButtonElement("Delete Village", "delete-btn");
  const updateDemographicButton = createButtonElement("Add Demographic Data","update-demographic-btn",["update-demographic-btn"]);

  // Append buttons to the container
  [viewButton, updateButton, deleteButton, updateDemographicButton].forEach((btn) => {
    buttonContainer.appendChild(btn);
  });

  return buttonContainer;
}


function renderPage() {

  // Clear the existing list
  cityListContainer.innerHTML = "";

  // Calculate start and end indices
  const startIndex = pageController.getStartIndex();
  const endIndex = pageController.getEndIndex(cities.length);

  // Slice the cities array for the current page
  const currentCities = cities.slice(startIndex, endIndex);

  currentCities.forEach((city) => {
    const villageItem = document.createElement("div");
    villageItem.classList.add("village-list-item");

    const cityName = document.createElement("p");
    cityName.textContent = city.name; // City name
    villageItem.appendChild(cityName); // Append city name to item container

    // Create the buttons section

    const buttonContainer = createButton(city.name);


    // Append buttons' container to item container
    villageItem.appendChild(buttonContainer);

     // Append item container to list container
     cityListContainer.appendChild(villageItem);
   
  });
  initializeAddVillage(); // Call the function to bind event listeners
  initializeUpdateVillage();
  initializeUpdateDemographicData();
  initializeViewData();
  initializeDeleteVillage();

  // Enable/disable buttons

  prevButton.disabled = pageController.getCurrentPage() === 1; // No prev 
  nextButton.disabled = endIndex >= cities.length; // No next at the end

}

prevButton.addEventListener("click", () => {
  pageController.decrementCurrentPage();
  renderPage();
});

nextButton.addEventListener("click", () => {
  pageController.incrementCurrentPage();
  renderPage();
});

// Initial render
renderPage();


function compareStrings(a, b) {
  //  case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}


document.getElementById("sort-select").addEventListener("change", function () {
  if (this.value == "0") {
    cities = defaultCities.slice();
    renderPage();
  } else {
    cities = cities.sort(function (a, b) {
      return compareStrings(a.name || "", b.name || "");
    });

    // Re-render the page with the sorted cities

    renderPage();
  }
});

