const category = document.getElementById("category");
const eventSelect = document.getElementById("event");

const events = {

sports: ["Cricket","Football","Badminton","Chess"],

technical: ["Hackathon","Coding Contest","Web Design","Robotics"],

cultural: ["Dance","Singing","Drama","Fashion Show"],

literary: ["Debate","Quiz","Essay Writing","Poetry"]

};

category.addEventListener("change", function(){

const selected = this.value;

eventSelect.innerHTML = "<option value=''>Select Event</option>";

if(events[selected]){

events[selected].forEach(function(ev){

const option = document.createElement("option");

option.value = ev;
option.textContent = ev;

eventSelect.appendChild(option);

});

}

});


// Form message

const form = document.getElementById("eventForm");
const msg = document.getElementById("regMsg");

form.addEventListener("submit", function(e){

e.preventDefault();

msg.innerHTML = "✅ Registration Successful!";
msg.style.color = "#00eaff";

form.reset();

});