const selectElement = document.getElementById('sort-select');
selectElement.size = 1;

selectElement.addEventListener('click', function () {
  selectElement.classList.add('open');
    selectElement.size = 2;
});

selectElement.addEventListener('blur', function () {
  selectElement.classList.remove('open');
    selectElement.size = 1;
});

const cities = [
  { name: "Jabalia-Gaza Strip" },
  { name: "Beit Lahia - Gaza Strip" },
  { name: "Shejaiya - Gaza Strip" },
  { name: "Hebron - west Bank"},
  { name: "Quds - west Bank" }

];

const cityListContainer = document.getElementById("village-list");

cities.forEach(city => {
    const villageItem = document.createElement("div");
    villageItem.classList.add("village-list-item");

    const cityName = document.createElement("p");
    cityName.textContent = city.name; // City name
    villageItem.appendChild(cityName); //Append city name to item container

    // Create the buttons section
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

    // Append buttons' container to item container
    villageItem.appendChild(buttonContainer);

   // Append item container to list container
    cityListContainer.appendChild(villageItem);
});

