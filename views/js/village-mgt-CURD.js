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
        const response = await fetch("../html/add-village.html");
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
    const image=form.querySelector("input[name='image']").files[0] ;
    const updatedVillage = {
      name: form.querySelector("input[name='villageName']").value,
      region: form.querySelector("input[name='region']").value,
      landArea: parseFloat(form.querySelector("input[name='landArea']").value),
      latitude: parseFloat(form.querySelector("input[name='latitude']").value),
      longitude: parseFloat(form.querySelector("input[name='longitude']").value),
      image: image? URL.createObjectURL(image) : villageToUpdate.image, // Image is optional
      categories:villageToUpdate.categories
      
    };
 // Update the defaultCities array
  const index = defaultCities.findIndex(city => city.name === villageToUpdate.name);
  if (index !== -1) {
     defaultCities[index] = { ...defaultCities[index], ...updatedVillage };
     cities = [...defaultCities];

  }
}

async function initializeUpdateVillage() {
const updateButtons = document.querySelectorAll("#updateButton");

updateButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const villageName = event.target.dataset.villageName;
    const villageToUpdate = defaultCities.find(city => city.name === villageName); 

    try {
      const response = await fetch("../html/update-village.html");
      const overlayHTML = await response.text();
      const {overlay,overlayCSS,overlayContainer}=overlayFun(overlayHTML);

      const form = overlay.querySelector("form");
      if (form) {
        formSetUpdate(form,villageToUpdate,villageName)

        form.addEventListener("submit", (e) => {
          e.preventDefault();

          updateVillage(form, villageToUpdate);
          // Show success message
          successMsg('Updated successfully');

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

function formatAgeDistribution(ageDistribution) {
  return Object.entries(ageDistribution)
      .map(([range, percentage]) => `${range}: ${percentage}`)
      .join(", ");
}

function parseAgeDistribution(formattedString) {
  const ageDistribution = {};
  formattedString.split(", ").forEach(part => {
      const [range, percentage] = part.split(": ");
      ageDistribution[range] = percentage;
  });
  return ageDistribution;
}

function setUpdateFormDemg(form, DemographicToUpdate) {
  // Set values based on the village data
  form.querySelector("input[name='populationSize']").value = DemographicToUpdate.populationSize || "";
  form.querySelector("input[name='ageDistribution']").value = formatAgeDistribution(DemographicToUpdate.ageDistribution) || "";
  form.querySelector("input[name='genderRatios']").value = DemographicToUpdate.genderRatios || "";
  form.querySelector("input[name='growthRate']").value = DemographicToUpdate.growthRate || "";
}

function updateDemographic(form, villageName) {
  const ageDistribution = form.querySelector("input[name='ageDistribution']").value;
  const genderRatios = form.querySelector("input[name='genderRatios']").value;

  // Validate inputs
  if (!validateAgeDistribution(ageDistribution) || !validateGenderRatios(genderRatios)) {
    alert("Invalid input. Please check the age distribution and gender ratios.");
    return 0; // Return 0 for failure
  }


  // Fetch updated data from the form
  const updatedVillageDemo = {
    villageName,
    populationSize: form.querySelector("input[name='populationSize']").value,
    ageDistribution: parseAgeDistribution(ageDistribution),
    genderRatios,
    growthRate: form.querySelector("input[name='growthRate']").value, // Fixed growthRate assignment
  };

  // Update the array
  const index = demographicData.findIndex(city => city.villageName  === villageName);
  if (index !== -1) {
    demographicData[index] = { ...demographicData[index], ...updatedVillageDemo };
  } else {
    demographicData.push(updatedVillageDemo); // Fix: push the updatedVillageDemo object
  }

  return 1; // Return 1 for success
}

async function initializeUpdateDemographicData() {
  const updateDemographicButtons = document.querySelectorAll(".update-demographic-btn");

  updateDemographicButtons.forEach((button) => {
    
    button.addEventListener("click", async (event) => {
      const villageName = event.target.dataset.villageName;
      const DemographicToUpdate = demographicData.find(city => city.villageName === villageName); 
      try {
        const response = await fetch("../html/add-demographic-data.html");
        const overlayHTML = await response.text();

        const { overlay, overlayCSS, overlayContainer } = overlayFun(overlayHTML);

        const formTitle = overlay.querySelector("#formTitle");
        if (formTitle) {
          formTitle.textContent = `Add Demographic Data for ${villageName}`;
        }

        const form = overlay.querySelector("form");
        if (form) {
          setUpdateFormDemg(form, DemographicToUpdate);
        }
        form.addEventListener("submit", (e) => {
          e.preventDefault();

          if (updateDemographic(form, villageName)) {
            successMsg(); // Success message after successful update
          }  

          renderPage();

          // Close overlay
          overlay.style.display = "none";
        document.body.removeChild(overlayContainer);
        document.head.removeChild(overlayCSS);
        }); 
      

      } catch (error) {
        console.error("Error loading overlay:", error);
      }
    });
  });
}



async function initializeViewData() {
  const viewVillageDetails = document.querySelectorAll("#view-btn");

  viewVillageDetails.forEach((button) => {
    
    button.addEventListener("click", async (event) => {
      const villageName = event.target.dataset.villageName;
      console.log(villageName);
      const villageToView = defaultCities.find(city => city.name === villageName); 
      try {
        const response = await fetch("../html/view-details.html");
        const overlayHTML = await response.text();

        const { overlay, overlayCSS, overlayContainer } = overlayFun(overlayHTML);

        const villageDetails = overlay.querySelector("#Village-details");
        villageDetails.innerHTML = `
        <div class="village-details">
          <h2>${villageToView.name}</h2>
          <p class="par-view"><strong>Region:</strong> ${villageToView.region}</p>
          <p class="par-view"><strong>Land Area:</strong> ${villageToView.landArea} km²</p>
          <p class="par-view"><strong>Latitude:</strong> ${villageToView.latitude}</p>
          <p class="par-view"><strong>Longitude:</strong> ${villageToView.longitude}</p>
          <p class="par-view"><strong>Category:</strong> ${villageToView.category}</p>
          <img src="${villageToView.image}" alt="${villageToView.name}" class="village-image" />
        </div>
      `;

      } catch (error) {
        console.error("Error loading overlay:", error);
      }
    });
  });
}

async function initializeDeleteVillage() {
  const deleteButtons = document.querySelectorAll("#delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const villageName = event.target.dataset.villageName;
      console.log("Village to delete:", villageName);
      // Find the index of the village in defaultCities
      const villageIndex = defaultCities.findIndex(city => city.name === villageName);
      if (villageIndex === -1) {
        console.error("Village not found:", villageName);
        return;
      }
      try {
        // Remove the village from the array
        defaultCities.splice(villageIndex, 1);
        // Update cities array and re-render the page
         cities = [...defaultCities];
        renderPage();
        // Show success message
        successMsg("Deleted Successfully");
      } catch (error) {
        console.error("Error deleting village:", error);
      }
    });
  });
}
