import React, { useState } from 'react';
import { request } from 'graphql-request';  // GraphQL request library

import '../styles/styles-CURD.css';


function AddDemoOverlay({onClose,villageName}) {

    console.log("vv",villageName)
    const [formData, setFormData] = useState({
        villageName: villageName,
        populationSize: '',
        ageDistribution: '',
        genderRatios: '',
        growthRate: ''
      });

      const endpoint = 'http://localhost:4000/graphql'; 
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Add validation for ageDistribution and genderRatios based on your patterns
        const ageDistributionPattern = /^(0-18: \d+%, 19-35: \d+%, 36-50: \d+%, 51-65: \d+%, 65\+: \d+%)(, \d+-\d+: \d+%)*$/;
        const genderRatiosPattern = /^(Male\s*:\s*\d+\s*%,\s*Female\s*:\s*\d+\s*%)$|^(Female\s*:\s*\d+\s*%,\s*Male\s*:\s*\d+\s*%)$/;
    
        if (!ageDistributionPattern.test(formData.ageDistribution)) {
          alert('Invalid Age Distribution format.');
          return;
        }
    
        if (!genderRatiosPattern.test(formData.genderRatios)) {
          alert('Invalid Gender Ratios format.');
          return;
        }
    
        const mutation = `
          mutation($villageName: String!, $populationSize: String!, $ageDistribution: String!, $genderRatios: String!, $growthRate: String!) {
            upsertDemographic(
              villageName: $villageName, 
              populationSize: $populationSize, 
              ageDistribution: $ageDistribution, 
              genderRatios: $genderRatios, 
              growthRate: $growthRate
            ) {
              villageName
              populationSize
              ageDistribution
              genderRatios
              growthRate
            }
          }
        `;
    
        try {
          // Execute the mutation
          const response = await request(endpoint, mutation, { ...formData });
          console.log('Demographic Data Added or Updated:', response);
          onClose(); // Close the overlay
        } catch (error) {
          console.error('Error adding or updating demographic data:', error);
        }
    };
    

 

  return (
    <div className="form-overlay" id="formOverlay">
        <div className="form-container">
            <button id="closeFormBtn" className="close-btn" aria-label="Close htmlForm" onClick={onClose}>&times;</button>
            <h2 id="formTitle">{`Add Demographic Data ${villageName} Village`}</h2> 
            
            <form id="addVillageForm" onSubmit={(e)=>handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="populationSize">Population Size:</label>
                    <input 
                    type="text" 
                    id="populationSize" 
                    name="populationSize" 
                    value={formData.populationSize} 
                    onChange={(e)=>handleInputChange(e)}
                    required/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="ageDistribution">Age Distribution:</label>
                    <input 
                    type="text"
                    id="ageDistribution"   
                    name="ageDistribution" 
                    placeholder="e.g., 0-14: 30%, 15-64: 60%, 65+: 10%" 
                    value={formData.ageDistribution}
                    onChange={(e)=>handleInputChange(e)}
                    required/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="genderRatios">Gender Ratios:</label>
                    <input 
                    type="text" 
                    id="genderRatios" 
                    name="genderRatios" 
                    placeholder="e.g., Male: 51%, Female: 49%" 
                    value={formData.genderRatios}
                    onChange={(e)=>handleInputChange(e)}
                    required/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="growthRate">Population Growth Rate:</label>
                    <input 
                    type="text" 
                    step="any" 
                    id="growthRate" 
                    name="growthRate"
                    value={formData.growthRate} 
                    onChange={(e)=>handleInputChange(e)}
                    required/>
                </div>

                <button type="submit" className="submit_btn">Add Demographic Data</button>
            </form>
        </div>
    </div>

  );
}

export default AddDemoOverlay;
