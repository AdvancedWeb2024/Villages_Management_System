import React, { useState ,useEffect} from 'react';
import "../styles/village-mgt.css";
import ViewVillageOverlay  from './ViewVillageOverlay';
import UpdateVillageOverlay from './UpdateVillageOverlay';
import AddDemoOverlay from './AddDemoOverlay';
import AddImageOverlay from './AddVillageOverlay';
let defaultCities = [
  { name: "Jabalia-Gaza Strip", image: "../../images/jabalia.jpg", region: "Gaza Strip", landArea: 15.5, latitude: 31.528, longitude: 34.464, category: "Urban" },
  { name: "Beit Lahia - Gaza Strip", image: "../../images/jabalia.jpg", region: "Gaza Strip", landArea: 18.2, latitude: 31.588, longitude: 34.529, category: "Urban" },
  { name: "Shejaiya - Gaza Strip", image: "../../images/jabalia.jpg", region: "Gaza Strip", landArea: 10.3, latitude: 31.529, longitude: 34.477, category: "Urban" },
  { name: "Rafah - Gaza Strip", image: "../../images/jabalia.jpg", region: "Gaza Strip", landArea: 22.1, latitude: 31.276, longitude: 34.258, category: "Urban" },
  { name: "Hebron - West Bank", image: "../../images/hebron.jpg", region: "West Bank", landArea: 60.2, latitude: 31.531, longitude: 35.089, category: "City" },
  { name: "Quds - West Bank", image: "../../images/quds.jpg", region: "West Bank", landArea: 48.6, latitude: 31.768, longitude: 35.213, category: "City" },
  { name: "Nablus - West Bank", image: "../../images/nablus.jpg", region: "West Bank", landArea: 45.8, latitude: 32.221, longitude: 35.262, category: "City" },
  { name: "Jenin - West Bank", image: "../../images/jenin.jpg", region: "West Bank", landArea: 37.3, latitude: 32.459, longitude: 35.300, category: "City" },
  { name: "Tulkarm - West Bank", image: "../../images/tulkarm.jpg", region: "West Bank", landArea: 28.0, latitude: 32.311, longitude: 35.021, category: "City" },
  { name: "Qalqilya - West Bank", image: "../../images/qalqilya.jpg", region: "West Bank", landArea: 23.0, latitude: 32.189, longitude: 34.970, category: "City" },
  { name: "Bethlehem - West Bank", image: "../../images/bethlehem.jpg", region: "West Bank", landArea: 27.4, latitude: 31.705, longitude: 35.202, category: "City" },
  { name: "Ramallah - West Bank", image: "../../images/ramallah.jpg", region: "West Bank", landArea: 16.3, latitude: 31.899, longitude: 35.204, category: "City" },
  { name: "Jericho - West Bank", image: "../../images/jericho.jpg", region: "West Bank", landArea: 58.7, latitude: 31.866, longitude: 35.459, category: "City" },
  { name: "Salfit - West Bank", image: "../../images/salfit.jpg", region: "West Bank", landArea: 23.5, latitude: 32.083, longitude: 35.183, category: "City" },
  { name: "Tubas - West Bank", image: "../../images/tubas.jpg", region: "West Bank", landArea: 25.0, latitude: 32.320, longitude: 35.369, category: "City" }
]


function pageCounter(currentPage,setCurrentPage) {
  const itemsPerPage = 5;
  let startIndex = 0;

  return {
    getStartIndex: () => {
      startIndex = (currentPage - 1) * itemsPerPage;
      return startIndex;
    },
    getEndIndex: (citiesLength) => Math.min(startIndex + itemsPerPage, citiesLength),
    incrementCurrentPage: () => setCurrentPage(currentPage+1),
    decrementCurrentPage: () => setCurrentPage(currentPage-1),
    getCurrentPage: () => currentPage
  };
}

function VillageMgt() {
  const [currentCities, setCurrentCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [cities, setCities] = useState([]);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [shViewOverlay, setShViewOverlay] = useState(false);
  const [shUpdateOverlay, setShUpdateOverlay] = useState(false);
  const [shAddDemoOverlay, setShAddDemoOverlay] = useState(false);
  const [shAddVillageOverlay, setShAddVillageOverlay] = useState(false);
  const pageController = pageCounter(currentPage, setCurrentPage);
  const [dropdownSize, setDropdownSize] = useState(1); // State to manage size of sort select
  const [selectedCity, setSelectedCity] = useState(null);


  useEffect(() => {
    setCities(defaultCities);
  }, []);

  useEffect(() => {
    setStartIndex(pageController.getStartIndex());
    setEndIndex(pageController.getEndIndex(cities.length));
    setCurrentCities(cities.slice(startIndex, endIndex));
    setIsPrevDisabled(pageController.getCurrentPage() === 1);
    setIsNextDisabled(endIndex >= cities.length);
  }, [currentPage, startIndex, endIndex, cities.length,cities]);


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

  const handleCloseOverlay = () => {
    setShViewOverlay(false); // Close overlay
    setShUpdateOverlay(false);
    setShAddDemoOverlay(false);
    setShAddVillageOverlay(false);

  };

  const handleView=(villageName)=>{
    setShViewOverlay(true);
    setSelectedCity(defaultCities.find(city => city.name === villageName));
  }
  const handleUpdateVlg=()=>{
    setShUpdateOverlay(true);
  }

  const handleDelete=(villageName)=>{
    const villageIndex = defaultCities.findIndex(city => city.name === villageName);
    if (villageIndex === -1) {
      console.error("Village not found:", villageName);
      return;
    }
    try {
      defaultCities.splice(villageIndex, 1);
    setCities([...defaultCities]);
    } catch (error) {
      console.error("Error deleting village:", error);
    }
  }

  const handleUpdateDem=()=>{
    setShAddDemoOverlay(true);
  }
  const handleAddVillage=()=>{
    setShAddVillageOverlay(true);
  }
  
  return (
    <div className="village-mgt">
      {shViewOverlay && <ViewVillageOverlay onClose={handleCloseOverlay} city={selectedCity}/>}
      {shUpdateOverlay && <UpdateVillageOverlay onClose={handleCloseOverlay} />}
      {shAddDemoOverlay && <AddDemoOverlay onClose={handleCloseOverlay} />}
      {shAddVillageOverlay && <AddImageOverlay onClose={handleCloseOverlay} />}

      
      <button 
        className="button" 
        id="showFormBtn"
        onClick={()=>handleAddVillage()}
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
              onClick={() => pageController.decrementCurrentPage()}
            >
              Prev
            </button>
            <button
              className="button button-cont"
              id="next-page"
              disabled={isNextDisabled}
              onClick={() => pageController.incrementCurrentPage()}
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
                  onClick={() => handleUpdateVlg(city.name)}
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
                  onClick={() => handleUpdateDem(city.name)}
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

