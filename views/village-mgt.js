
let cities = [...defaultCities];
const selectElement = document.getElementById('sort-select');
selectElement.size = 1; // normal size

const cityListContainer = document.getElementById("village-list");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");


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

const pageController = pageCounter();

function createButton(cityName) {

  const buttonContainer = document.createElement("div");

  const viewButton = document.createElement("button");
  viewButton.classList.add("button", "button-cont");
  viewButton.textContent = "View";

  const updateButton = document.createElement("button");
  updateButton.classList.add("button", "button-cont");
  updateButton.textContent = "Update Village";

  updateButton.id = "updateButton";
  updateButton.dataset.villageName = cityName; // Add the village name here



  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "button-cont");
  deleteButton.textContent = "Delete Village";

  const updateDemographicButton = document.createElement("button");

  updateDemographicButton.classList.add("button", "button-cont", "update-demographic-btn");
  updateDemographicButton.textContent = "Add Demographic Data";
  updateDemographicButton.dataset.villageName = cityName; // Add the village name here


  // Append buttons to button container
  buttonContainer.appendChild(viewButton);
  buttonContainer.appendChild(updateButton);
  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(updateDemographicButton);

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
  // Assuming you want case-insensitive comparison
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

function addVillage(form){
  const villageName = form.querySelector("input[name='villageName']").value;
  const region = form.querySelector("input[name='region']").value;
  const landArea = form.querySelector("input[name='landArea']").value;
  const latitude = form.querySelector("input[name='latitude']").value;
  const longitude = form.querySelector("input[name='longitude']").value;
  const image = form.querySelector("input[name='image']").files[0];
  const categories = form.querySelector("input[name='categories']").value;

  // Assuming the village data is added to the 'cities' array
  const newVillage = {
    name: villageName,
    region,
    landArea,
    latitude,
    longitude,
    image: image ? URL.createObjectURL(image) : null,
    categories: categories.split(",").map(tag => tag.trim())
  };

  // Add the new village to the cities list
  defaultCities.push(newVillage);
   cities = [...defaultCities]

}

async function initializeAddVillage() {
  const addVillageButton = document.getElementById("showFormBtn");
  if (!addVillageButton) {
    console.error("Add Village button not found");
    return;
  }

  addVillageButton.addEventListener("click", async () => {
    try {
      const response = await fetch("./Add_village.html");
      const overlayHTML = await response.text();

      const {overlay,overlayCSS,overlayContainer}=overlayFun(overlayHTML);

      const form = overlay.querySelector("form");
      form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        addVillage(form);

        // Show success message
       successMsg();
        // Re-render the village list
        renderPage();

        // Close the form overlay
        overlay.style.display = "none";
        document.body.removeChild(overlayContainer);
        document.head.removeChild(overlayCSS);
      });
    } catch (error) {
      console.error("Error loading overlay:", error);
    }
  });
}

function formSetUpdate(form,villageToUpdate,villageName){

  form.querySelector("input[name='villageName']").value = villageName;
  form.querySelector("input[name='region']").value = villageToUpdate.region || "";
  form.querySelector("input[name='landArea']").value = villageToUpdate.landArea || "";
  form.querySelector("input[name='latitude']").value = villageToUpdate.latitude || "";
  form.querySelector("input[name='longitude']").value = villageToUpdate.longitude || "";
}

function updateVillage(form, villageToUpdate){
    // fetch updated data from the form
    const updatedVillage = {
      name: form.querySelector("input[name='villageName']").value,
      region: form.querySelector("input[name='region']").value,
      landArea: parseFloat(form.querySelector("input[name='landArea']").value),
      latitude: parseFloat(form.querySelector("input[name='latitude']").value),
      longitude: parseFloat(form.querySelector("input[name='longitude']").value),
      image: form.querySelector("input[name='image']").files[0], // Image is optional
      categories:villageToUpdate.categories
      
    };
 // Update the defaultCities array
  const index = defaultCities.findIndex(city => city.name === villageName);
  if (index !== -1) {
     defaultCities[index] = { ...defaultCities[index], ...updatedVillage };

  }
}

async function initializeUpdateVillage() {
const updateButtons = document.querySelectorAll("#updateButton");

updateButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const villageName = event.target.dataset.villageName;
    const villageToUpdate = defaultCities.find(city => city.name === villageName); 

    try {
      const response = await fetch("./update_village.html");
      const overlayHTML = await response.text();
      const {overlay,overlayCSS,overlayContainer}=overlayFun(overlayHTML);

      const form = overlay.querySelector("form");
      if (form) {
        formSetUpdate(form,villageToUpdate,villageName)

        form.addEventListener("submit", (e) => {
          e.preventDefault();

          updateVillage(form, villageToUpdate);
          // Show success message
          successMsg();

          // Re-render the village list (or any UI displaying the villages)
          renderPage();

          // Close overlay
          overlay.style.display = "none";
        document.body.removeChild(overlayContainer);
        document.head.removeChild(overlayCSS);
        }); 
      }

    } catch (error) {
      console.error("Error loading overlay:", error);
    }
  });
});
}

function updateDemographic(form){

}

async function initializeUpdateDemographicData() {
const updateDemographicButtons = document.querySelectorAll(".update-demographic-btn");

updateDemographicButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const villageName = event.target.dataset.villageName; 

    try {
      const response = await fetch("./Add_Demographic_Data.html");
      const overlayHTML = await response.text();

      const {overlay,overlayCSS,overlayContainer}=overlayFun(overlayHTML);

      const formTitle = overlay.querySelector("#formTitle");
      if (formTitle) {
        formTitle.textContent = `Add Demographic Data for ${villageName}`;
      }

      const form = overlay.querySelector("form");
      if (form) {
        form.querySelector("input[name='villageName']").value = villageName;
      }

      // Close overlay
      overlay.style.display = "none";
      document.body.removeChild(overlayContainer);
      document.head.removeChild(overlayCSS);
    } catch (error) {
      console.error("Error loading overlay:", error);
    }
  });
});
}

