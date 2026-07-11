const loader = document.getElementById("loader");
const title = document.getElementById("loader-title");
const status = document.getElementById("loader-status");

export function showLoader(
    heading = "Creating Account",
    message = "Please wait..."
){

    title.textContent = heading;
    status.textContent = message;

    loader.classList.remove("hidden");
}

export function hideLoader(){

    loader.classList.add("hidden");

    title.textContent = "";
    status.textContent = "";
}