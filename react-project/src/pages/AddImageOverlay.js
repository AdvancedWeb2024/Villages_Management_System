import React, { useState } from 'react';
import '../styles/styles-CURD.css';

let defaultCities = [
  { name: "Jabalia-Gaza Strip", image: "/images/jabalia.jpg", region: "Gaza Strip", landArea: 15.5, latitude: 31.528, longitude: 34.464, category: "Urban" },
  // Other cities...
];

function AddImageOverlay({ onClose, setCiitesList }) {
  const [villageName, setVillageName] = useState('');
  const [discreption, setDiscreption] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For preview

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagePath = imagePreview; // Use the preview as the image path
    const newPost = { name:villageName, discreption, image: imagePath };
    setCiitesList(newPost);  // Update the cities list
    console.log(villageName);
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
            <label htmlFor="villageName">Village Name:</label>
            <select
              id="villageName"
              name="villageName"
              style={{ width: '100%' }}
              required
              value={villageName}
              onChange={(e) => setVillageName(e.target.value)}
            >
              <option value="" disabled>Select a City</option>
              {defaultCities.map((city, index) => (
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
      </div>
    </div>
  );
}

export default AddImageOverlay;
