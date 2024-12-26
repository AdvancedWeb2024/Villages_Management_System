import React, { useState ,useEffect} from 'react';
import { request } from 'graphql-request';  // GraphQL request library
import "../styles/village-mgt.css";
import ViewVillageOverlay  from './ViewVillageOverlay';
import UpdateVillageOverlay from './UpdateVillageOverlay';
import AddDemoOverlay from './AddDemoOverlay';
import AddVillageOverlay from './AddVillageOverlay';

function VillageMgt() {
  const [currentCities, setCurrentCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cities, setCities] = useState([]);
  const [defaultCities, setDefaultCities] = useState([]);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [dropdownSize, setDropdownSize] = useState(1); // State to manage size of sort select
  const [selectedCity, setSelectedCity] = useState(null);
  const [overlay, setOverlay] = useState(null);

  const endpoint = 'http://localhost:4000/graphql';  // Replace with your backend URL

  const QUERIES = {
    FETCH_VILLAGES: `
      query {
        villages {
          name
          image
          region
          landArea
          latitude
          longitude
          category
        }
      }
    `,
    DELETE_VILLAGE: `
      mutation($name: String!) {
        deleteVillage(name: $name) {
          name
        }
      }
    `,
  };
  
  const fetchVillages = async () => {
    try {
      const response = await request(endpoint, QUERIES.FETCH_VILLAGES);
      setCities(response.villages);
      setDefaultCities(response.villages);
    } catch (error) {
      console.error("Error fetching villages:", error);
    }
  };
  
  const handleDelete = async (name) => {
    try {
      const data = await request(endpoint, QUERIES.DELETE_VILLAGE, { name });
      console.log("Deleted Village:", data); 
      fetchVillages();
    } catch (error) {
      console.error('Error deleting village:', error);
    }
  };


  useEffect(() => {
    fetchVillages();

  },[]);

  useEffect(() => {
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, cities.length);
  
    setCurrentCities(cities.slice(startIndex, endIndex));
    setIsPrevDisabled(currentPage === 1);
    setIsNextDisabled(endIndex >= cities.length);
  }, [currentPage, cities]);

  
  const handleOpenOverlay = (type, city) => {
    setOverlay({ type, city });
  };

  const handleCloseOverlay = () => {
    setOverlay(null);
  };

  
  const handleClick = () => {
    setDropdownSize(2); // Expand the dropdown
  };

  const handleBlur = () => {
    setDropdownSize(1); // Collapse the dropdown
  };

  const compareStrings = (a, b) => {
    // Case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return a < b ? -1 : a > b ? 1 : 0;
  };
  
  const handleSelectSort = (value) => {
    if (value === "0") {
      setCities(defaultCities.slice());
    } else if (value === "1") {
      setCities([...cities].sort((a, b) => compareStrings(a.name || "", b.name || "")));
    }
  };
 
  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase().trim();
    if (searchTerm === "") {
      setCities(defaultCities.slice()); // Reset to default cities
    } else {
      setCities(
        defaultCities.filter((city) =>
          city.name.toLowerCase().includes(searchTerm)
        )
      );
    }
  };


  const handleView=(villageName)=>{
    setSelectedCity(defaultCities.find(city => city.name === villageName));
    handleOpenOverlay("view");
  }
  const handleUpdateVillage=(villageName)=>{
    setSelectedCity(defaultCities.find(city => city.name === villageName));
    handleOpenOverlay("updateVlg");

  }



  
  return (
    <div className="village-mgt">
      {overlay?.type === "view" && <ViewVillageOverlay onClose={handleCloseOverlay} city={selectedCity}/>}
      {overlay?.type === "updateVlg" && <UpdateVillageOverlay onClose={handleCloseOverlay} city={selectedCity} fetchVillages ={fetchVillages }/>}
      {overlay?.type === "addDem" && <AddDemoOverlay onClose={handleCloseOverlay} villageName={overlay.city}  />}
      {overlay?.type === "addVlg" && <AddVillageOverlay onClose={handleCloseOverlay} fetchVillages ={fetchVillages }  />}
    
      
      <button 
        className="button" 
        id="showFormBtn"
        onClick={()=>handleOpenOverlay("addVlg")}
      >
        Add New Village
      </button>
      <div className="view-village">
        <h2> View Village List </h2>
        <input
          type="text"
          name="search"
          id="search-bar"
          placeholder="Search Villages..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="Village-list-control">
          <div className="sort">
            <label>Sort By: </label>
            <select
              id="sort-select"
              className={dropdownSize > 1 ? "open" : ""}
              size={dropdownSize} // Dynamically set the size
              onClick={handleClick} // Expand on click
              onBlur={handleBlur} // Collapse on blur
              onChange={(e)=>handleSelectSort(e.target.value)}
            >
              <option value="0" selected>Default</option>
              <option value="1">Alphabetical</option>
            </select>
          </div>
          <div className="paging">
            <label>Page: </label>
            <button
              className="button button-cont"
              id="prev-page"
              disabled={isPrevDisabled}
              onClick={() => setCurrentPage(currentPage-1)}
            >
              Prev
            </button>
            <button
              className="button button-cont"
              id="next-page"
              disabled={isNextDisabled}
              onClick={() => setCurrentPage(currentPage+1)}
            >
              Next
            </button>
          </div>
        </div>
        <div className="village-list" id="village-list">
          {currentCities.map((city, index) => (
            <div className="village-list-item" key={index}>
              <p> {city.name} </p>
              <div>
                <button
                  id="view-btn"
                  className="button button-cont"
                  data-village-name={city.name}
                  onClick={() => handleView(city.name)}
                >
                  View
                </button>
                <button
                  id="updateButton"
                  className="button button-cont"
                  data-village-name={city.name}
                  onClick={() => handleUpdateVillage(city.name)}
                >
                  Update Village
                </button>
                <button
                  id="delete-btn"
                  className="button button-cont"
                  data-village-name={city.name}
                  onClick={() => handleDelete(city.name)}
                >
                  Delete Village
                </button>
                <button
                  id="update-demographic-btn"
                  className="button button-cont"
                  data-village-name={city.name}
                  onClick={() => handleOpenOverlay("addDem",city.name)}
                >
                  Add Demographic Data
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VillageMgt;

