import React, { useState } from 'react';
import '../styles/styles-CURD.css';


function ViewVillageOverlay({onClose,city}) {
 

  return (
    <div className="form-overlay" id="formOverlay">
        <div className="form-container">
            <h2> Village Details</h2>
            <button id="closeFormBtn" className="close-btn" onClick={onClose}>&times;</button>
            <div id="Village-details">
                
                     <h2>{city.name}</h2>
                     <p className="par-view"><strong>Region:</strong> {city.region}</p>
                     <p className="par-view"><strong>Land Area:</strong> {city.landArea} km²</p>
                     <p className="par-view"><strong>Latitude:</strong> {city.latitude}</p>
                     <p className="par-view"><strong>Longitude:</strong> {city.longitude}</p>
                     <p className="par-view"><strong>Category:</strong> {city.category}</p>
                     <img src={city.image} alt={city.name} className="village-image" />
  
            </div>
        </div>
    </div>
  );
}

export default ViewVillageOverlay;
