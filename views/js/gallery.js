var addNewImage = document.getElementById("add-image");
var imageListContainer = document.getElementById("image-list");

// Hide the "Add New Image" button if the user is not an admin
function checkUserRole() {
  const userRole = sessionStorage.getItem("role"); // Get user role from sessionStorage
  if (userRole !== "admin") {
    addNewImage.style.display = "none"; // Hide the button for non-admin users
  }
}

// Function to render the gallery page
function renderPage() {
  imageListContainer.innerHTML = "";

  imagesData.forEach((city) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    const cityImg = document.createElement("img");
    cityImg.src = city.image;
    galleryItem.appendChild(cityImg); // Append city image to item container

    const discreption = document.createElement("div");
    discreption.classList.add("desc");
    discreption.innerHTML = `<b>${city.name}</b><br>${city.discreption}`;
    galleryItem.appendChild(discreption); // Append city description to item container

    // Append item container to list container
    imageListContainer.appendChild(galleryItem);
  });

  initializeAddImage(); // Set up the Add Image button functionality
}

// Initialize the Add Image button with functionality
async function initializeAddImage() {
  if (!addNewImage) {
    console.error("Add Image button not found");
    return;
  }

  addNewImage.addEventListener("click", async () => {
    try {
      const response = await fetch("../html/add-image.html");
      const overlayHTML = await response.text();
      const { overlay, overlayCSS, overlayContainer } = overlayFun(overlayHTML);

      // Populate the dropdown with default city names
      const villageNameDropdown = overlay.querySelector("#villageName");
      defaultCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.name;
        option.textContent = city.name;
        villageNameDropdown.appendChild(option);
      });

      const form = overlay.querySelector("form");
      form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        const villageName = form.querySelector("select[name='villageName']").value;
        const discreption = form.querySelector("input[name='discreption']").value;
        const image = form.querySelector("input[name='image']").files[0];

        const newVillage = {
          name: villageName,
          image: image ? URL.createObjectURL(image) : null,
          discreption,
        };

        // Add the new village to the images data list
        imagesData.push(newVillage);

        // Show success message
        successMsg();

        // Re-render the image list
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

// Call checkUserRole to handle button visibility
checkUserRole();

// Render the gallery page
renderPage();
