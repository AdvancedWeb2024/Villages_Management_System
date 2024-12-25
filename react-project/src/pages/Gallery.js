import React, { useState, useEffect } from 'react';
import '../styles/gallery.css';
import AddImageOverlay from './AddImageOverlay';


function Gallery() {
  const [citiesList, setCitiesList] = useState([
  { name: "Jabalia-Gaza Strip",image:"/images/jabalia.jpg",discreption:"jabalia ...."},
    { name: "Beit Lahia - Gaza Strip",image:"/images/jabalia.jpg",discreption:"Beit Lahia ...." },
    { name: "Shejaiya - Gaza Strip",image:"/images/jabalia.jpg",discreption:"Shejaiya ...." },
    { name: "Rafah - Gaza Strip" ,image:"/images/jabalia.jpg",discreption:"Rafah ...."},
    { name: "Hebron - west Bank",image:"/images/jabalia.jpg",discreption:"Hebron ...."},
    { name: "Quds - west Bank" ,image:"/images/jabalia.jpg", discreption:"Quds ...."},
  ]);

  useEffect(() => {
    const userRole = sessionStorage.getItem("role"); // Get user role from sessionStorage
    const addNewImage=document.getElementById("add-image")
  if (userRole !== "admin") {
    addNewImage.style.display = "none"; // Hide the button for non-admin users
  }
  }, []);

  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility

  const handleAddImageClick = () => {
    setShowOverlay(true); // Show overlay when button is clicked
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false); // Close overlay
  };

  const handleAddImageList = (city) => {
    setCitiesList([...citiesList, city]); // Ensure you're adding the new city to the existing list
  };
  

  return (
    <div className="gallery">
      <button className="mybut" id="add-image" onClick={handleAddImageClick}>Add New Image</button>
      {showOverlay && <AddImageOverlay onClose={handleCloseOverlay} setCiitesList={handleAddImageList}  />}
      <div className="image-list" id="image-list">
        {citiesList.map((city, index) => (
          <div className="gallery-item" key={index}>
            <img src={city.image} alt={city.name} /> 
            <div className="desc">
              <b>{city.name}</b> 
              <br />
              {city.discreption} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
