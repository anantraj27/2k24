
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const inputBox = document.querySelector('.input-box');
    const viewportHeight = window.visualViewport.height;
    const windowHeight = window.innerHeight;

    // Agar keyboard khula hai toh viewportHeight kam ho jayegi
    if (viewportHeight < windowHeight) {
      const keyboardHeight = windowHeight - viewportHeight;
      inputBox.style.bottom = `${keyboardHeight}px`;
    } else {
      // Keyboard band hone par wapas niche
      inputBox.style.bottom = '0px';
    }
    
    // Auto-scroll to bottom taaki naya message dikhta rahe
    const messages = document.querySelector('.messages');
    messages.scrollTop = messages.scrollHeight;
  });
}







const socket = io();
let client_socketID=''
socket.on('connect', function(){
var id = socket.id;
  client_socketID=id;
})

const input = document.getElementById("messageInput");
const button = document.getElementById("sendBtn");
const messages = document.getElementById("messages");


let state ='';
button.disabled=true;
let box = document.createElement("div");
input.addEventListener('input',(e)=>{

button.disabled=e.target.value.trim()=='';

socket.emit("typing");


});

socket.on("type_message", (data) => {
box.innerHTML=data.message;
box.style.backgroundColor='black'
box.style.color='white';
messages.appendChild(box)

console.log("ys typing")
}
);

// box.style.display='none'

button.addEventListener("click", () => {
 
  const msg = input.value;
  button.disabled=true;
  socket.emit("chat_message", msg);

  input.value = "";

});

input.addEventListener("keypress", (e) => {


if(e.key == 'Enter'){
    if(e.target.value.trim()!=''){
   button.disabled=true;

  const msg = input.value;

  socket.emit("chat_message", msg);

  input.value = "";
  }
  

  }


});




socket.on("chat_message", (data) => {

  console.log(data)
if (client_socketID === data.serverId) {
    console.log("this is client msg");
  } 
  else {
    console.log("this is server msg");
  }

const div = document.createElement("div");
div.style.cssText = `
 
  background: black;
   width: fit-content;
  padding:  10px 50px 10px 10px;
`;
  
  div.style.background='black'

  div.className = "message";

  div.textContent = data.message;

  messages.appendChild(div);

});