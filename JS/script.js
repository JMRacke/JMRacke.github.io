
//Search Form Sumbmit Handler
form_id.addEventListener("submit", (event) =>{
    event.preventDefault();

    if (navigator.geolocation) {

        /*success - A callback function that takes a GeolocationPosition object as its sole input parameter.
        error - An optional callback function that takes a GeolocationPositionError object as its sole input parameter.
        */
        navigator.geolocation.getCurrentPosition(success,error)
    }else{
        form_input_noTracking.classList.remove("hidden");
    }

})