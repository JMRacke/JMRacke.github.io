// Error handling with bootstrap. Prepending to body. Still need to add default message.
export function handleError(msg) {
    const alertContainer = document.createElement("div");
    alertContainer.className = "alert alert-warning alert-dismissible fade show";
    alertContainer.setAttribute("role", "alert");
  
    alertContainer.innerHTML = `
    
          <strong>${msg}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          `;
    document.body.prepend(alertContainer);
  }

  export function noTracking(msg) {
    const noTracking = document.getElementById("form_noTrack");
      noTracking.classList.remove("hidden");
      const tracking = document.getElementById("form_track");
      tracking.classList.add("hidden");

    const alertContainer = document.createElement("div");
    alertContainer.className = "alert alert-info  alert-dismissible fade show";
    alertContainer.setAttribute("role", "alert");

    alertContainer.innerHTML = `
    
          <strong>${msg} Please enter your location</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          `;
    document.body.prepend(alertContainer);
    
  }
  /* *** */