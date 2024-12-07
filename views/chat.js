let activeAdmins=[...adminData];


function renderPage(){
    displayAdminInfo();
}


  function displayAdminInfo() {
    const container = document.getElementById('admin-container');
    container.innerHTML = "";

    activeAdmins.forEach(admin => {
      if (admin.active === 'y') { 
        activeAdmins.push(admin);
        const adminDiv = document.createElement('div');
        // Admin image
        const adminImg = document.createElement('img');
        adminImg.src = admin.image;
        adminImg.alt = "user image";
        
        // Admin name
        const adminName = document.createElement('p');
        adminName.classList.add('user-name');
        adminName.id = 'adminName';
        adminName.textContent = admin.name;
        
        

        const adminClickHandler = () => {
            const chatBlock = document.getElementById('chat-block');
            const chatTitle = document.getElementById('chat-with');
            
            chatBlock.style.display = 'block';
            chatTitle.textContent = `Chat with: ${admin.name}`;
          };

        adminDiv.addEventListener('click',adminClickHandler);
      
        // Append image and name to the div
        adminDiv.appendChild(adminImg);
        adminDiv.appendChild(adminName);
        
        
        // Append the admin div to the container
        container.appendChild(adminDiv);
      }
    });
  }
  
const searchBar=document.getElementById("search-bar");

  searchBar.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase().trim(); 
    console.log(searchTerm)
    if (searchTerm === "") {
      activeAdmins = adminData.slice();
    } else {
      activeAdmins = adminData.filter((admin) =>
        admin.name.toLowerCase().includes(searchTerm)
      );
    }
  
    // Re-render the page with the filtered cities
    renderPage();
  });

  
  renderPage();