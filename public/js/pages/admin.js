
import { socket } from "../src/service/socket.js";
import { createEvent } from "../src/service/eventService.js";
import { userDetails } from "../src/service/eventService.js";
import { usersTable } from "../src/componenet/_UsersDetailCard.js";
import { eventCard ,featureEventCard} from "../src/componenet/_eventScheduledCard.js";
import { get } from "../src/service/api.js";

const API = "/api";
/* =========================
   DASHBOARD SECTION
========================= */

  document.addEventListener("DOMContentLoaded", async (req,res)=>{

    

    const data = await get(`${API}/admin/api/v1/dashboard-data`);
    const dashboard = document.getElementById("dashboard");


    for(const [keys , value] of Object.entries(data.user)){

      const element =document.getElementById(keys);
      if(element){
        element.innerHTML= value
      }
    }

loadRegistrationEvents();

})



const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

const navItems = document.querySelectorAll("#sidebar li");
const pages = document.querySelectorAll(".page");
const scheduledEvents = document.getElementById("scheduledEvents");
const registrationEvent = document.getElementById("registrationEvent");
const registrationBody = document.getElementById("registrationBody");
const liveEvents = document.getElementById("liveEvents");
async function loadEvents(status, container) {
    try {
        const response = await fetch(`${API}/user/api/v1/scheduled-events?status=${status}`);

        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        container.innerHTML = "";

        data.data.forEach(event => {
            container.appendChild(featureEventCard(event));
        });

    } catch (error) {
        console.error(error);
    }
}
function attachEventActions(container) {

    container.addEventListener("click", async (e) => {

        const card = e.target.closest(".event-card");
        if (!card) return;

        const id = card.dataset.eventId;

        try {

            // ===========================
            // Update Date & Time
            // ===========================
            if (
                e.target.classList.contains("edit-date") ||
                e.target.classList.contains("edit-time")
            ) {

                const event_date = card.querySelector("#eventDate").value;
                const event_time = card.querySelector("#eventTime").value;

                if (!event_date || !event_time) {
                    alert("Select Date and Time");
                    return;
                }

                const response = await fetch(
                    `${API}/admin/api/v1/scheduled-events/${id}/date-time`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            event_date,
                            event_time
                        })
                    }
                );

                alert((await response.json()).message);
                return;
            }

            // ===========================
            // Start Match
            // ===========================
            if (e.target.classList.contains("start-btn")) {

                const response = await fetch(
                    `${API}/admin/api/v1/scheduled-events/${id}/status`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            status: "live"
                        })
                    }
                );

                alert((await response.json()).message);

                // Reload both sections
                loadEvents("upcoming", scheduledEvents);
                loadEvents("live", liveEvents);

                return;
            }

            // ===========================
            // Complete Match
            // ===========================
            if (e.target.classList.contains("complete-btn")) {

                const response = await fetch(
                    `${API}/admin/api/v1/scheduled-events/${id}/status`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            status: "completed"
                        })
                    }
                );

                alert((await response.json()).message);

                loadEvents("upcoming", scheduledEvents);
                loadEvents("live", liveEvents);

                return;
            }

            // ===========================
            // Declare Winner
            // ===========================
            if (e.target.classList.contains("save-winner")) {

                const select = card.querySelector(".winner-select");

                const winnerId = select.value;
                const winnerName =
                    select.options[select.selectedIndex].dataset.name;

                if (!winnerId) {
                    alert("Select Winner");
                    return;
                }

                const response = await fetch(
                    `${API}/admin/api/v1/scheduled-events/${id}/winner`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            winner: winnerId,
                            winner_name: winnerName
                        })
                    }
                );

                alert((await response.json()).message);

                return;
            }

            // ===========================
            // Delete Event
            // ===========================
            if (e.target.classList.contains("delete-btn")) {

                if (!confirm("Delete this event?")) return;

                const response = await fetch(
                    `${API}/admin/api/v1/scheduled-events/${id}`,
                    {
                        method: "DELETE"
                    }
                );

                alert((await response.json()).message);

                card.remove();

                return;
            }

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }

    });

}
loadEvents("upcoming", scheduledEvents);
loadEvents("live", liveEvents);

attachEventActions(scheduledEvents);
attachEventActions(liveEvents);
navItems.forEach(item => {

    item.addEventListener("click", () => {

        const target = item.dataset.page;

        pages.forEach(page => {
            page.classList.remove("active");
        });

        document
            .getElementById(target)
            .classList.add("active");

        if (target === "events") {
            loadEvents("upcoming", scheduledEvents);
            loadEvents("live", liveEvents);
        }

        if (window.innerWidth < 768) {
            sidebar.classList.remove("show");
        }

    });

});

const voteStatus = document.getElementById("voteStatus");

document
.getElementById("startVote")
.addEventListener("click", (e) => {
  document.getElementById("stopVote").style.backgroundColor=""
  e.target.style.backgroundColor="#22C55E"
  voteStatus.textContent = "ON";
});

document
.getElementById("stopVote")
.addEventListener("click", (e) => {
  document.getElementById("startVote").style.backgroundColor=""
  e.target.style.backgroundColor="#EF4444"
  voteStatus.textContent = "OFF";
});



/* =========================
   PATICIPANTS SECTION
========================= */

const userCategory = document.getElementById("userCategory");
userCategory.addEventListener("change" , async ()=>{

  if(userCategory.value=='') return ;
  
  try {
      const data =await userDetails(`${API}/admin/api/v1/users?category=${userCategory.value}`);
      const userData =  document.querySelector(".user-data");

    userData.innerHTML= usersTable(data.data) ; // get user table .
  }
    catch (error) {

    console.log(error);
    
  }
})
  //-------------------------------



const eventCategory = document.getElementById("eventCategory");
const sports =  document.getElementById("eventSelect"); // ---> Root 
const team_A = document.getElementById("teamA")
const team_B = document.getElementById("teamB")

//{  Starting of all events ... -->Root  }


eventCategory.addEventListener("change" , async ()=>{

  if(eventCategory.value=='') return ;
   
  try{
      const data = await get(`${API}/admin/api/v1/events?category=${eventCategory.value}`); 
       
      sports.innerHTML= `<option value="">Select Events </option>`
      
      let value = data.data.map(event =>{

        return  `<option value="${event.id}">${event.name}</option>`;
        
      }).join("");

          
    sports.innerHTML +=value; 
 
  }
 
  
catch(error){

  console.log(error);
}

});



sports.addEventListener("change", async() => {

    if (sports.value === "") return;
    
    try{
    const data = await get(`${API}/admin/api/v1/teams?category=${eventCategory.value}&event-id=${sports.value}`)

console.log("data",data)
 const html= data.data.map(member => {
              
      return `<option value="${member.id}"> ${member.name}</option>`
    }).join("");

        team_A.innerHTML = `<option value="">Select Team A</option>` + html;
        team_B.innerHTML =`<option value="">Select Team B</option>` + html;
   
  }

  catch(error){

    console.log(error);
  }


});
    



if(team_A && team_B)
{

  team_A.addEventListener("change" , (e)=>{
  
        
      let selectedTeam=  e.target.value;

      [...team_B.options].forEach( option =>{
         option.hidden = false;

        if(option.value!= ""  && option.value === selectedTeam){
            option.hidden = true;
        }
      })
      
  })
   
  team_B.addEventListener("change" , (e)=>{
        
      let selectedTeam =  e.target.value;

      [...team_A.options].forEach( option =>{
         option.hidden = false;

        if(option.value!= ""  && option.value === selectedTeam){
            option.hidden = true;
        }
  })
      
  })
}

// events 
// Update , delete , add ..  Client --> server

// server to client --> get data ..


/* =========================
   EVENT SCHEDULE SECTION
========================= */ 

const venue = document.getElementById("venue")
const eventDate = document.getElementById("eventDate")
const eventTime = document.getElementById("eventTime")
const button = document.getElementById("createEventBtn")


const form = document.querySelector(".event-form")


function validate() {
  button.disabled = !(
    venue.value &&
    eventDate.value &&
    eventTime.value &&
    team_A.value &&
    team_B.value &&
    sports.value &&
    eventCategory.value
  );
  console.log(button.disabled)
return  button.disabled;}
/*   
  this is the event delegation :
  it enables event delegation.
  In this practice, when we want some code 
  to run when the user interacts with any one of a  
  large number of child elements, we set the event
  istener on their parent and have events that happen
  on them bubble up to their parent rather than having
  to set the event listener on every child individually.
*/
form.addEventListener("input", validate);
form.addEventListener("change", validate);

/*======================================
       socket.io()
  =======================================
*/

socket.on("connect", () => {
   console.log("Connected:", socket.id);
});



// Newly created Events ..........

socket.on("eventScheduled", (event) => {

   // Naya event card add karo
   scheduledEvents.prepend(
    featureEventCard(event)
);})
 // [
      //   body.participation_type,
      //   body.event_id,
      //   body.team_A,
      //   body.team_B,
      //   body.date,
      //   body.time,
      //   body.venue,
      // ],

button.addEventListener("click", ()=>{

      const result = validate();
      if(result){
        return ;
      }
   const data={
            participation_type:eventCategory.options[eventCategory.selectedIndex].text.toLowerCase().trim(),
            event_id : sports.value  ,
            team_A :team_A.value,
            team_B:team_B.value,
            date :eventDate.value,
            time :eventTime.value,
            venue:venue.value,

          }
      const response = fetch(`${API}/admin/api/v1/scheduled-events`,
          {
            method:"POST",
            headers :{
              'Content-type':"application/json",
            },
            body :JSON.stringify(data)

          }
        )
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
           return response.json();
         })
      .then(result => console.log('Success:', result))
      .catch(error => console.error('Error:', error));



})

async function loadRegistrationEvents() {

    try {

        const data = await get(`${API}/admin/api/v1/events?all=true`);

        registrationEvent.innerHTML = `
            <option value="">
                Select Event
            </option>
        `;

        data.data.forEach(event => {

            registrationEvent.innerHTML += `
                <option value="${event.id}">
                    ${event.name}
                </option>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}
registrationEvent.addEventListener("change", async () => {

    if (!registrationEvent.value) return;

    try {

        const data = await get(
            `${API}/admin/api/v1/check-registration?event_id=${registrationEvent.value}`
        );

        renderRegistration(data.data);

    } catch (error) {

        console.log(error);

    }

});
function renderRegistration(data) {

    registrationBody.innerHTML = "";

    data.forEach(team => {

        registrationBody.innerHTML += `
            <tr>

                <td>${team.team_name}</td>

                <td>${team.captain_name}</td>

                <td>${team.captain_phone}</td>

                <td>${team.captain_registration_no}</td>

                <td>${team.gender}</td>

                <td>${team.players}</td>

            </tr>
        `;

    });

}


 









