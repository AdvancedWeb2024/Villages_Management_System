import React, { useState } from 'react';
import { request } from 'graphql-request';
import '../styles/styles-CURD.css';
import Notification from '../components/Notification';

function UpdateVillageOverlay({onClose,city,fetchVillages}) {

     const [name, setName] = useState(city.name);
      const [region, setRegion] = useState(city.region);
      const [landArea, setLandArea] = useState(city.landArea);
      const [latitude, setLatitude] = useState(city.latitude);
      const [longitude, setLongitude] = useState(city.longitude);
      const [category, setCategory] = useState(city.category);
      const [imagePreview, setImagePreview] = useState(null); 
      const [image, setImage] = useState(null);
      const [showSuccess, setShowSuccess] = useState(false);
      
 
    const endpoint = 'http://localhost:4000/graphql'; 

    const updateVillageMutation = `
      mutation($name: String!, $image: String!, $region: String!, $landArea: Float!, $latitude: Float!, $longitude: Float!, $category: String!) {
       updateVillage(name: $name, image: $image, region: $region, landArea: $landArea, latitude: $latitude, longitude: $longitude, category: $category) {
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
          const data = await request(endpoint, updateVillageMutation, {
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
          fetchVillages();
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
            <h2>Update Village</h2>
            <form id="addVillageForm" onSubmit={(e)=>handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="villageName">Village Name:</label>
                    <input 
                    type="text"
                     id="villageName"
                    name="villageName" 
                    defaultValue={name} 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="region">Region/District:</label>
                    <input 
                    type="text" 
                    id="region"
                     name="region" 
                     defaultValue={region}
                     value={region}
                    onChange={(e) => setRegion(e.target.value)} 
                       required/>
                </div>
                <div className="form-group">
                    <label htmlFor="landArea">Land Area (sq km):</label>
                    <input 
                    type="number" 
                    step="any" 
                    id="landArea" 
                    name="landArea" 
                    defaultValue={landArea}
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)} 
                    required/>
                </div>
                <div className="form-group">
                    <label htmlFor="latitude">Latitude:</label>
                    <input 
                    type="number" 
                    step="any"
                     id="latitude" 
                     name="latitude" 
                     defaultValue={latitude}
                     value={latitude}
                    onChange={(e) => setLatitude(e.target.value)} 
                    required/>
                </div>
                <div className="form-group">
                    <label htmlFor="longitude">Longitude:</label>
                    <input 
                    type="number" 
                    step="any" 
                    id="longitude" 
                    name="longitude" 
                    defaultValue={longitude}
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)} 
                    required/>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Upload Image:</label>
                    <input 
                    type="file" 
                    id="image" 
                    name="image" 
                    accept="image/*" 
                    onChange={handleImageChange} />
                </div>
                <button type="submit" className="submit_btn">Update Village</button>
            </form>
            {showSuccess && <Notification msg="Village Updated successfully!"/>}
        </div>
    </div>
  );
}

export default UpdateVillageOverlay;
