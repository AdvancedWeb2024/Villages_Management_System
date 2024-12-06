
let cities = [...defaultCities];

const selectElement = document.getElementById('sort-select');
selectElement.size = 1; //normal size
const cityListContainer = document.getElementById("village-list");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");


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
  let startIndex=0; 

    return {
    getStartIndex: () => {
      startIndex=(currentPage-1)*itemsPerPage;
      return startIndex },
    getEndIndex: (citiesLength) => Math.min(startIndex + itemsPerPage, citiesLength), 
    incrementCurrentPage: () => currentPage++,
    decrementCurrentPage:(x)=>currentPage--,
    getCurrentPage:()=>currentPage,
  }
}

const pageController=pageCounter();

function createButton(){
  const buttonContainer = document.createElement("div");

  const viewButton = document.createElement("button");
  viewButton.classList.add("button", "button-cont");
  viewButton.textContent = "View";

  const updateButton = document.createElement("button");
  updateButton.classList.add("button", "button-cont");
  updateButton.textContent = "Update Village";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "button-cont");
  deleteButton.textContent = "Delete Village";

  const updateDemographicButton = document.createElement("button");
  updateDemographicButton.classList.add("button", "button-cont");
  updateDemographicButton.textContent = "Update Demographic Data";

  // Append buttons to button container
  buttonContainer.appendChild(viewButton);
  buttonContainer.appendChild(updateButton);
  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(updateDemographicButton);

  return buttonContainer;

}

function renderPage() {
  console.log("rendering");
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
    const buttonContainer = createButton();

    // Append buttons' container to item container
    villageItem.appendChild(buttonContainer);

    // Append item container to list container
    cityListContainer.appendChild(villageItem);
  });

  // Enable/disable buttons
  prevButton.disabled = pageController.getCurrentPage() === 1; //no prev 
  nextButton.disabled = endIndex >= cities.length; //no next the end
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
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}


document.getElementById("sort-select").addEventListener("change", function() {
  if (this.value == "0") {
    cities=defaultCities.slice();
    pageController.
    renderPage();
  }else{
    cities = cities.sort(function (a, b) {
      return compareStrings(a.name || "", b.name || "");
    }); 

    // Re-render the page with the sorted tech
    renderPage();
  }
});

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase().trim(); 
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
