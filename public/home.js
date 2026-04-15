window.addEventListener("DOMContentLoaded", () => {

  const name = sessionStorage.getItem("username");

  document.getElementById("greeting").innerText =
    `Hello, ${name} 👋`;

});