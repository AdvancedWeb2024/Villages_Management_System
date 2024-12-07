function renderPage() {
  const imageListContainer = document.getElementById("image-list");

  defaultCities.forEach((city) => {
    // Create gallery item container
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    // Create city image
    const cityImg = document.createElement("img");
    cityImg.src = city.image;

    // Append city image to gallery item
    galleryItem.appendChild(cityImg);

    // Create city description
    const description = document.createElement("div");
    description.classList.add("desc");
    description.innerText = `Description of ${city.name}`;

    // Append description to gallery item
    galleryItem.appendChild(description);

    // Append gallery item to list container
    imageListContainer.appendChild(galleryItem);
  });
}

// Render the page on load
renderPage();