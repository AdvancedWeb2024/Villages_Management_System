
function renderPage(){

    const imageListContainer=document.getElementById("image-list");

    defaultCities.forEach((city) => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");
    
        const cityImg = document.createElement("img");
        cityImg.src=city.image;
        galleryItem.appendChild(cityImg); // Append city image to item container
    
        const discreption = document.createElement("div");
        galleryItem.classList.add("desc");
        discreption.innerText="discreption...........";
        galleryItem.appendChild(discreption);// Append city disc to item container
    
        // Append item container to list container
        imageListContainer.appendChild(galleryItem);
  });

}

renderPage();