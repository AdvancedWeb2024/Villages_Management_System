import React, { useState, useEffect } from 'react';
import { request } from 'graphql-request';  // GraphQL request library
import '../styles/gallery.css';
import AddImageOverlay from './AddImageOverlay';

function Gallery() {
  const [villagesList, setVillagesList] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  const endpoint = 'http://localhost:4000/graphql';  // Replace with your backend URL

  // Fetch villages from GraphQL
  const fetchVillages = async () => {
    const endpoint = 'http://localhost:4000/graphql';  // Replace with your backend URL
    const query = `
      query {
        villages {
          name
        }
      }
    `;
    try {
      const response = await request(endpoint, query);
      console.log('GraphQL response:', response);  // Log the response
      setVillagesList(response.villages);  // Store response in state
    } catch (error) {
      console.error('Error fetching villages:', error);
    }
  };
  

  // Fetch images from GraphQL
  const fetchImages = async () => {
    const query = `
      query {
        images {
          name
          image
          description
        }
      }
    `;
    try {
      const data = await request(endpoint, query);  // Send query to backend
      setImagesList(data.images);  // Store images in state
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchVillages();  // Fetch villages on component mount
    fetchImages();    // Fetch images on component mount
  }, []);

  useEffect(() => {
    const userRole = sessionStorage.getItem("role"); // Get user role from sessionStorage
    const addNewImage = document.getElementById("add-image");
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


  return (
    <div className="gallery">
      <button className="mybut" id="add-image" onClick={handleAddImageClick}>Add New Image</button>
      {showOverlay && <AddImageOverlay onClose={handleCloseOverlay} imagesList={imagesList} setImagesList={setImagesList} villagesList={villagesList} />}
      <div className="image-list" id="image-list">
        {imagesList.map((image, index) => (
          <div className="gallery-item" key={index}>
            <img src={image.image} alt={image.name} />
            <div className="desc">
              <b>{image.name}</b>
              <br />
              {image.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
