
var addNewImage=document.getElementById("add-image");

var imageListContainer=document.getElementById("image-list");


function renderPage(){

  imageListContainer.innerHTML = "";

    imagesData.forEach((city) => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");
    
        const cityImg = document.createElement("img");
        cityImg.src=city.image;
        galleryItem.appendChild(cityImg); // Append city image to item container
    
        const discreption = document.createElement("div");
        galleryItem.classList.add("desc");
        discreption.innerHTML = `<b>${city.name}</b><br>${city.discreption}`;
        galleryItem.appendChild(discreption);// Append city disc to item container
    
        // Append item container to list container
        imageListContainer.appendChild(galleryItem);
  });
  initializeAddImage();

}



async function initializeAddImage() {
  const addNewImage=document.getElementById("add-image");
  if (!addNewImage) {
    console.error("Add Village button not found");
    return;
  }

  addNewImage.addEventListener("click", async () => {
    try {
      const response = await fetch("../html/add-image.html");
      const overlayHTML = await response.text();
      const {overlay,overlayCSS,overlayContainer}=overlayFun(overlayHTML);

    // Populate the villageName dropdown with city names
    const villageNameDropdown = overlay.querySelector("#villageName");
    defaultCities.forEach(city => {
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

        // Add the new village to the image list
        imagesData.push(newVillage);

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


renderPage();