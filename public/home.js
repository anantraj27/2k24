window.addEventListener("DOMContentLoaded", () => {

    const name = sessionStorage.getItem("username") || "Guest";

    document.getElementById("greeting").textContent =
        `Hello, ${name} 👋`;

    const hour = new Date().getHours();

    let message = "";

    if(hour < 12){

        message =
        "🌅 A new day, new opportunities. Make today's events unforgettable.";

    }else if(hour < 18){

        message =
        "🚀 You're doing great. Keep registrations and live events running smoothly.";

    }else{

        message =
        "🌙 Great work today. Finish strong and keep everything under control.";

    }

    document.getElementById("personal-message").textContent =
        message;

});
const scheduledEvent = document.querySelector(".scheduled-events");


scheduledEvent.addEventListener("click",()=>{
   
  window.location.href="/scheduled-events.html"

})
document.querySelector(".event-registration").addEventListener("click",()=>{
   
  window.location.href="/events_.html"

})