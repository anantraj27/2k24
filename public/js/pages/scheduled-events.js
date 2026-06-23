import { socket } from "../src/service/socket.js";
import { createEvent } from "../src/service/eventService.js";
import { userDetails } from "../src/service/eventService.js";
import { usersTable } from "../src/componenet/_UsersDetailCard.js";
import { eventCard } from "../src/componenet/_eventScheduledCard.js";
import { get } from "../src/service/api.js";
const menuItems =
document.querySelectorAll(".menu-item");

const views =
document.querySelectorAll(".view");

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

document 
let userTrackResult;
let statsResult ;
window.onload = async()=>{
    console.log("hello")
    try {
      let response = await fetch("/user/dashboard-stats");
     
       
      if(!response.ok){

        throw new Error(`HTTP! status code ${response.status}`)
      }
     let data = await response.json()
      
      userTrackResult = data.myEvents;
      statsResult = data.stats ; 
     console.log("response aaya ---> ",data)
     userStats(userTrackResult);
     stats(statsResult);

    } catch (error) {
        
        console.log(error.message);
    }

}
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

function userStats(data){
        
    let html = ''

    data.forEach(item =>{

        html += `<div id=${item.event_id}>
             <p><span >Participaticipation : </span> ${item.event_name}</p>
             <p><span>Role : </span> ${item.role}</p>
             

        </div>`
    })

    myEvents.innerHTML=html;

}
const scheduledEvents = document.querySelector('[data-view="scheduled-view"]')
const liveEvents = document.querySelector('[data-view="live-view"]')

scheduledEvents.addEventListener("click",async()=>{

    try {
        const data = await get('/user/dashboard-stats/get/status?status=upcoming');
        const result =eventCard(data.data)
        console.log("card--->",result)
        const container = document.querySelector(".event-grid");

        data.data.forEach(event => {
            container.appendChild(eventCard(event));
        });
                
    } catch (error) {
        
    }

    
     

    
})



