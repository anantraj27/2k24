export function showLoader(title, message){

    document.getElementById("loader-title").textContent = title;
    document.getElementById("loader-status").textContent = message;

    document.getElementById("loader").classList.remove("hidden");
}

export function hideLoader(){

    document.getElementById("loader").classList.add("hidden");

}