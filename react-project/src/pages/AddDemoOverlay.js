import React, { useState } from 'react';
import '../styles/styles-CURD.css';


function AddDemoOverlay({onClose}) {
 

  return (
    <div className="form-overlay" id="formOverlay">
        <div className="form-container">
            <button id="closeFormBtn" className="close-btn" aria-label="Close Form" onClick={onClose}>&times;</button>
            
            <h2 id="formTitle">Add Demographic Data for Village</h2> 
            
            <form id="addVillageForm">
                <div className="form-group">
                    <label for="populationSize">Population Size:</label>
                    <input type="text" id="populationSize" name="populationSize" required/>
                </div>
                
                <div className="form-group">
                    <label for="ageDistribution">Age Distribution:</label>
                    <input type="text" id="ageDistribution" name="ageDistribution" placeholder="e.g., 0-14: 30%, 15-64: 60%, 65+: 10%" required/>
                </div>
                
                <div className="form-group">
                    <label for="genderRatios">Gender Ratios:</label>
                    <input type="text" id="genderRatios" name="genderRatios" placeholder="e.g., Male: 51%, Female: 49%" required/>
                </div>
                
                <div className="form-group">
                    <label for="growthRate">Population Growth Rate:</label>
                    <input type="text" step="any" id="growthRate" name="growthRate" required/>
                </div>

                <button type="submit" className="submit_btn">Add Demographic Data</button>
            </form>
        </div>
    </div>

  );
}

export default AddDemoOverlay;
