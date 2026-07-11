window.addEventListener("DOMContentLoaded", () => {

    const name = sessionStorage.getItem("username") || "Guest";

    document.getElementById("greeting").textContent =
        `Welcome back, ${name} 👋`;

    const hour = new Date().getHours();

    let msg = "";

    if(hour < 12){

        msg = "🌅 Good morning! Your events are waiting. Let's make today a success.";

    }else if(hour < 18){

        msg = "🚀 Stay focused. Registrations, schedules and live events are under your control.";

    }else{

        msg = "🌙 Great work today. Take one final look before wrapping up the event.";

    }

    document.getElementById("personal-message").textContent = msg;

});
const scheduledEvent = document.querySelector(".scheduled-events");


scheduledEvent.addEventListener("click",()=>{
   
  window.location.href="/scheduled-events.html"

})
document.querySelector(".event-registration").addEventListener("click",()=>{
   
  window.location.href="/events_.html"

})