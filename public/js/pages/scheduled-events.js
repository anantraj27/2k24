
import { socket } from "../src/service/socket.js";
alert("socket.js loaded bottom");
import { createEvent } from "../src/service/eventService.js";
import { userDetails } from "../src/service/eventService.js";
import { usersTable } from "../src/componenet/_UsersDetailCard.js";
import { eventCard } from "../src/componenet/_eventScheduledCard.js";
import { get } from "../src/service/api.js";
alert("JS Loaded");
console.log("JS Loaded");
const API = "/api";
const menuItems =
document.querySelectorAll(".menu-item");
  const name = sessionStorage.getItem("username");
const views =
document.querySelectorAll(".view");
  document.getElementById("greeting").innerText =
    `Hello, ${name} 👋`;
    alert(greeting ? "Greeting Found" : "Greeting Missing")
menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(menu =>
            menu.classList.remove("active")
        );

        item.classList.add("active");

        views.forEach(view =>
            view.classList.add("hidden")
        );

        const targetView =
            document.getElementById(
                item.dataset.view
            );

        targetView.classList.remove("hidden");

    });

});

let userTrackResult;
let statsResult ;
document.addEventListener("DOMContentLoaded", async () => {
     alert("DOMContentLoaded");
    try {
        const data = await get(`${API}/user/api/v1/dashboard-stats`);

        if (!data || !data.success) {
            throw new Error("Failed to load dashboard data.");
        }

        console.log("Dashboard:", data);

        userStats(data.myEvents || []);
        stats(data.stats || {});

    } catch (error) {
        console.error("Dashboard Error:", error);

        // Optional: User ko message dikhao
        const myEvents = document.querySelector(".my-events .card");
        if (myEvents) {
            myEvents.innerHTML = `
                <div class="activity-card">
                    <p>Unable to load dashboard. Please refresh the page.</p>
                </div>
            `;
        }
    }
});
const myEvents = document.querySelector(".my-events .card ");
const statsContainer = document.querySelector(".stats");

function stats(data){

     let html = ''

        html += `
        
        <div class="card">
                    <h2>${data.live_events}</h2>
                    <p>Live Events</p>
                </div>

                <div class="card">
                    <h2>${data.upcoming_events}</h2>
                    <p>Upcoming Events</p>
                </div>

                <div class="card">
                    <h2>${data.winners_published}</h2>
                    <p>Results Published</p>
                </div>
        
        
        `
        statsContainer.innerHTML=html



}

function userStats(data) {

    let html = "";

    if (data.length === 0) {
        html = `
            <div class="activity-card">
                <p>No events registered yet.</p>
            </div>
        `;
    } else {

        data.forEach(item => {

            html += `
                <div class="activity-card">
                    <h4>${item.event_name}</h4>

                    <div class="activity-row">
                        <span>Participation</span>
                        <strong>${item.event_name}</strong>
                    </div>

                    <div class="activity-row">
                        <span>Role</span>
                        <strong>${item.role}</strong>
                    </div>
                </div>
            `;
        });

    }

    myEvents.innerHTML = html;
}
const scheduledEvents = document.querySelector('[data-view="scheduled-view"]')


scheduledEvents.addEventListener("click",async()=>{

    try {
    const data = await get(`${API}/user/api/v1/scheduled-events?status=upcoming`);
        console.log("data---->",data.data)
        // const result =eventCard(data.data)
        // console.log("card--->",result)
        const container = document.querySelector(".event-grid");
        container.innerHTML = "";   // ⭐ Purane cards hata do

        data.data.forEach(event => {
            console.log("events-->",event)
            console.log("eventcard",eventCard(event))
            container.appendChild(eventCard(event));
        });
                
    } catch (error) {
        
    }

})

//--------- LIVE EVENT ---------------------
const liveEvents = document.querySelector('[data-view="live-view"]')
liveEvents.addEventListener("click",async()=>{

    try {
        const data = await get(`${API}/user/api/v1/scheduled-events?status=live`);
        console.log("data---->",data.data)
        // const result =eventCard(data.data)
        // console.log("card--->",result)
        const container = document.querySelector(".event-grid1");
        container.innerHTML = "";   // ⭐ Purane cards hata do

        data.data.forEach(event => {
            console.log("events-->",event)
            console.log("eventcard",eventCard(event))
            container.appendChild(eventCard(event));
        });
                
    } catch (error) {
        
    }

})

/*======================================
       socket.io()
  =======================================
*/
// const socket = io("https://twok24.onrender.com");
// socket.on("connect", () => {
//    console.log("Connected:", socket.id);
// });



// Newly created Events ..........

socket.on("eventScheduled", (event) => {

   // Naya event card add karo
   scheduledEvents.prepend(
    eventCard(event)
);})