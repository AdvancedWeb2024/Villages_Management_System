import React, { useState } from 'react';
import { request } from 'graphql-request';
import '../styles/styles-CURD.css';
import Notification from '../components/Notification';
function AddImageOverlay({ onClose ,fetchVillages }) {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [landArea, setLandArea] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [category, setCategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null); 
  const [image, setImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  

  const endpoint = 'http://localhost:4000/graphql'; 

  const addVillageMutation = `
    mutation($name: String!, $image: String!, $region: String!, $landArea: Float!, $latitude: Float!, $longitude: Float!, $category: String!) {
      addVillage(name: $name, image: $image, region: $region, landArea: $landArea, latitude: $latitude, longitude: $longitude, category: $category) {
        name
        image
        region
        landArea
        latitude
        longitude
        category
      }
    }
  `;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);  // Set the preview (base64 encoded image)
    };
    if (file) {
      reader.readAsDataURL(file);  // Read the file as data URL for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagePath = imagePreview; 

    try {
      // Pass all necessary fields to the mutation
      const data = await request(endpoint, addVillageMutation, {
        name,
        image: imagePath,
        region,
        landArea: parseFloat(landArea),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        category,
      });

      // Here you can handle the success or reset the form if needed
      console.log('Village Added:', data.addVillage);
      fetchVillages ();
      setShowSuccess(true);
      setTimeout(()=>{
        onClose();
      },2000);
    } catch (error) {
      console.error('Error adding village:', error);
    }
  };

  return (
    <div className="form-overlay" id="formOverlay">
      <div className="form-container">
        <button id="closeFormBtn" className="close-btn" onClick={onClose}>&times;</button>
        <h2>Add New Village</h2>
        <form id="addVillageForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="villageName">Village Name:</label>
            <input 
              type="text" 
              id="villageName" 
              name="villageName" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="region">Region/District:</label>
            <input 
              type="text" 
              id="region" 
              name="region" 
              required 
              value={region}
              onChange={(e) => setRegion(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="landArea">Land Area (sq km):</label>
            <input 
              type="number" 
              id="landArea" 
              name="landArea" 
              required 
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="latitude">Latitude:</label>
            <input 
              type="number" 
              step="any" 
              id="latitude" 
              name="latitude" 
              required 
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="longitude">Longitude:</label>
            <input 
              type="number" 
              step="any" 
              id="longitude" 
              name="longitude" 
              required 
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories/Tags:</label>
            <input 
              type="text" 
              id="categories" 
              name="categories" 
              required 
              value={category}
              onChange={(e) => setCategory(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input 
              type="file" 
              id="image" 
              name="image" 
              accept="image/*"  
              onChange={handleImageChange} 
              required
            />
          </div>
          {/* {imagePreview && (
            <img src={imagePreview} alt="Image Preview" className="image-preview" />
          )} */}
          <button type="submit" className="submit_btn">Add Village</button>
        </form>
        {showSuccess && <Notification msg="Village added successfully!"/>}

      </div>
      
    </div>
  );
}

export default AddImageOverlay;
