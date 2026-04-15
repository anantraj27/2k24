/* ================= TYPING ANIMATION ================= */

const text = "FRESHER FEST 2026";
const typingText = document.getElementById("typing-text");

let index = 0;

function typeEffect(){

if(index < text.length){
typingText.innerHTML += text.charAt(index);
index++;
setTimeout(typeEffect,120);
}
}

typeEffect();


/* ================= REGISTRATION MESSAGE ================= */

const form = document.getElementById("form");
const msg = document.getElementById("msg");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

msg.innerHTML = "✅ Registration Successful!";
msg.style.color = "#00eaff";

form.reset();

});

}


/* ================= PARTICLES BACKGROUND ================= */

// particlesJS("particles-js",{
// particles:{

// number:{
// value:80,
// density:{
// enable:true,
// value_area:800
// }
// },

// color:{
// value:"#00eaff"
// },

// shape:{
// type:"circle"
// },

// opacity:{
// value:0.5
// },

// size:{
// value:3,
// random:true
// },

// line_linked:{
// enable:true,
// distance:150,
// color:"#00eaff",
// opacity:0.4,
// width:1
// },

// move:{
// enable:true,
// speed:2,
// direction:"none",
// random:false,
// straight:false,
// out_mode:"out"
// }

// },

// interactivity:{

// detect_on:"canvas",

// events:{
// onhover:{
// enable:true,
// mode:"grab"
// },
// onclick:{
// enable:true,
// mode:"push"
// }
// },

// modes:{
// grab:{
// distance:140,
// line_linked:{
// opacity:1
// }
// },
// push:{
// particles_nb:4
// }
// }

// },

// retina_detect:true
// });

/* ================= COUNTDOWN TIMER ================= */

const eventDate = new Date("Mar 23, 2026 09:00:00").getTime();

const countdown = setInterval(function(){

const now = new Date().getTime();

const distance = eventDate - now;

const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById("days").innerText = days;
document.getElementById("hours").innerText = hours;
document.getElementById("minutes").innerText = minutes;
document.getElementById("seconds").innerText = seconds;

if(distance < 0){
clearInterval(countdown);
}

},1000);



const login = document.querySelector(".register-btn")
const API = "/api";
login.addEventListener('click', async (e) => {

  
    try {
        const  {data}  = await axios.get(
            `${API}/auth/checkAuth`,
    
         
            {
                withCredentials: true
            }
        );
       
   
        if (data.success) {
           sessionStorage.setItem("username", data.name);
            window.location.href = "home.html";
        } else {
            window.location.href ='login.html'
            alert("Hey user 🤗 we couldn't find your account. Please log in. If you're new, go back 🔙 and register first.");
        }

    } catch (error) {
            if (error.response) {
        // Server responded with error status (4xx / 5xx)
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        alert(error.response.data.message || "Server error");

    } else if (error.request) {
        // Request sent but no response received
        alert("Server not responding");

    } else {
        // Something wrong in frontend code
        alert("Unexpected error: " + error.message);
    }
    }
});

