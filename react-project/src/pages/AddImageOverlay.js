import React, { useState } from 'react';
import { request } from 'graphql-request';
import '../styles/styles-CURD.css';
import Notification from '../components/Notification';

function AddImageOverlay({ onClose, imagesList,setImagesList,villagesList }) {
  const [name, setName] = useState('');
  const [discreption, setDiscreption] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For preview
  const endpoint = 'http://localhost:4000/graphql'; 
  const [showSuccess, setShowSuccess] = useState(false);


  const addImageMutation = `
  mutation($name: String!, $image: String!, $description: String!) {
    addImage(name: $name, image: $image, description: $description) {
      name
      image
      description
    }
  }
`;

const handleSubmit = async (e) => {
  e.preventDefault();
  const imagePath = imagePreview; // Use the preview as the image path
  try {
    console.log('Payload:', { name, image: imagePath, description: discreption });

    const data = await request(endpoint, addImageMutation, {
      name,
      image: imagePath, // Match mutation's variable
      description: discreption, // Correct spelling
    });
    setImagesList([...imagesList, data.addImage]); // Update state with the new image
    setName('');
    setImagePreview('');
    setDiscreption('');
    setShowSuccess(true);
    setTimeout(()=>{
      onClose();
    },4000)
  
  } catch (error) {
    console.error('Error adding image:', error.response || error.message);
  }
};



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a preview of the image using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);  // Set the preview (base64 encoded image)
    };
    if (file) {
      reader.readAsDataURL(file);  // Read the file as data URL for preview
    }
  };

  return (
    <div className="form-overlay" id="formOverlay">
      <div className="form-container">
        <button id="closeFormBtn" className="close-btn" onClick={onClose}>&times;</button>
        <h2>Add New Village</h2>
        <form id="addImageForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Village Name:</label>
            <select
              id="name"
              name="name"
              style={{ width: '100%' }}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <option value="" disabled>Select a City</option>
              {villagesList.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="discreption">Description:</label>
            <textarea
              id="discreption"
              name="discreption"
              required
              value={discreption}
              onChange={(e) => setDiscreption(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              onChange={handleImageChange}
            />
          </div>

          {/* Display the image preview if available */}
          {imagePreview && (
              <img src={imagePreview} alt="Image Preview" className="image-preview" />
          )}

        <button type="submit" className="submit_btn">Add Image</button>
        </form>

        {showSuccess && <Notification msg="Gallery post added successfully!"/>}

      </div>
    </div>
  );
}

export default AddImageOverlay;
