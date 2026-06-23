window.addEventListener("DOMContentLoaded", () => {

  const name = sessionStorage.getItem("username");

  document.getElementById("greeting").innerText =
    `Hello, ${name} 👋`;

});

const scheduledEvent = document.querySelector(".scheduled-events");


scheduledEvent.addEventListener("click",()=>{
   
  window.location.href="/scheduled-events.html"

})