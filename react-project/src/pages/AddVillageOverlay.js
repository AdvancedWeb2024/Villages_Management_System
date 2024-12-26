import React, { useState } from 'react';
import '../styles/styles-CURD.css';


function AddImageOverlay({onClose}) {
 

  return (
    <div className="form-overlay" id="formOverlay">
    <div className="form-container">
        <button id="closeFormBtn" className="close-btn" onClick={onClose}>&times;</button>
        <h2>Add New Village</h2>
        <form id="addVillageForm">
            <div className="form-group">
                <label for="villageName">Village Name:</label>
                <input type="text" id="villageName" name="villageName"  required/>
            </div>
            <div className="form-group">
                <label for="region">Region/District:</label>
                <input type="text" id="region" name="region"  required/>
            </div>
            <div className="form-group">
                <label for="landArea">Land Area (sq km):</label>
                <input type="number" id="landArea" name="landArea"  required/>
            </div>
            <div className="form-group">
                <label for="latitude">Latitude:</label>
                <input type="number" step="any" id="latitude" name="latitude"  required/>
            </div>
            <div className="form-group">
                <label for="longitude">Longitude:</label>
                <input type="number" step="any" id="longitude" name="longitude"  required/>
            </div>
            <div className="form-group">
                <label for="image">Upload Image:</label>
                <input type="file" id="image" name="image" accept="image/*" required/>
            </div>
            <div className="form-group">
                <label for="categories">Categories/Tags:</label>
                <input type="text" id="categories" name="categories" placeholder="e.g., rural, urban" required/>
            </div>
            <button type="submit" className="submit_btn">Add Village</button>
        </form>
    </div>
</div>
  );
}

export default AddImageOverlay;
