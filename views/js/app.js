function overlayFun(overlayHTML){
    const overlayContainer = document.createElement("div");
    overlayContainer.innerHTML = overlayHTML;
    document.body.appendChild(overlayContainer);

    const overlayCSS = document.createElement("link");
    overlayCSS.rel = "stylesheet";
    overlayCSS.href = "../css/styles-CURD.css";
    document.head.appendChild(overlayCSS);

    const overlay = document.getElementById("formOverlay");
    overlay.style.display = "flex";

    const closeButton = overlay.querySelector(".close-btn");
      closeButton.addEventListener("click", () => {
        overlay.style.display = "none";
        document.body.removeChild(overlayContainer);
        document.head.removeChild(overlayCSS);
      });
      return {overlay,overlayCSS,overlayContainer};
}

function successMsg(msg) {
  // Show success message
  const successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.textContent = msg || "Added successfully!";
  document.body.appendChild(successMessage);

  // Apply overlay styles dynamically
  successMessage.style.position = "fixed";
  successMessage.style.top = "0%";
  successMessage.style.left = "50%";
  successMessage.style.backgroundColor = "#28a745";
  successMessage.style.color = "#fff";
  successMessage.style.padding = "20px";
  successMessage.style.borderRadius = "8px";
  successMessage.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  successMessage.style.zIndex = "1000";
  successMessage.style.fontSize = "18px";
  successMessage.style.textAlign = "center";

  setTimeout(() => {
      successMessage.remove(); // Remove success message after 3 seconds
  }, 3000);
}


