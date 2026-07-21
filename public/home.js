const messages = [
  "📱 123456789... Bas ek number missing hai — tumhara. 😏",

  "📸 Instagram hai? Kyunki meri feed ko finally ek reason mil gaya. ✨",

  "🌙 Mummy-Papa bolte the sapno ka peecha karo... isliye tumse baat kar raha hoon. 😉",

  "🎨 Kya tum artist ho? Ek hi nazar me mera pura attention draw kar liya. ❤️",

  "🏡 Tum Barbie ho kya? Kyunki tumhe dekhte hi future ka Dreamhouse imagine ho gaya. 😂",

  "➗ Math me weak hoon... par tumhari value samajhne ke liye calculator nahi chahiye. 💖",

  "😄 Tumhara naam kya hai... ya 'mine' bolna jaldi ho jayega? 🤭",

  "💋 Tumhari smile dekh ke lagta hai aaj ka din already successful hai. ✨",

  "❤️ Organ donor nahi hoon... par dil dene ka mood zaroor hai. 😌",

  "😘 Ek smile udhaar de do... interest ke saath wapas kar dunga. 😂",

  "🗺️ Map hai? Kyunki tumhari aankhon me direction hi bhool gaya. 👀",

  "🪞 Mirror hai? Mujhe future ki ek jhalak dekhni thi... hum dono saath. 😏",

  "💊 Lagta hai tumhe Vitamin Me ki kami ho gayi hai. 🤭",

  "📶 WiFi router ho kya? Connection automatically full aa raha hai. 📡",

  "⚖️ Agar khoobsurti crime hoti... to tum lifetime sentence deserve karte. 😌",

  "🌤️ Aaj zyada beautiful kya hai... weather ya tumhari smile? ☀️",

  "🌹 Tumhe dekhkar lagta hai kisi ne 'perfect timing' ko insaan bana diya. ✨",

  "💬 Tum reply karo ya na karo... smile to already aa gayi. 😊",

  "☕ Coffee peene aaya tha... distraction free me mil gaya. 😂",

  "💫 Tumhari vibe itni achhi hai ki algorithm bhi recommend kare. 🤍",

    "💻 Are you JavaScript? Kyunki tumhare bina page complete nahi lagta. 😌",

  "🐞 Tum bug nahi ho... warna main kabhi fix hi nahi karna chahta. 😂",

  "⚡ Are you CSS? Kyunki tumne meri life ko style de diya. ✨",

  "🌐 Are you localhost? Kyunki har baar tumhare paas hi return aa jata hoon. 🤍",

  "📦 Tum npm package ho kya? Ek baar install kiya... ab remove nahi ho rahe. 😅",

  "🔒 Are you HTTPS? Kyunki tumhare saath connection secure feel hota hai. ❤️",

  "🧠 Tum meri favourite variable ho... kyunki tum kabhi out of scope nahi jaati. 😉",

  "🚀 Are you Git? Kyunki har din tumhare saath commit karne ka mann karta hai. 😂",
  "📶 Are you a Router? Kyunki meri feelings ka best route tum hi ho. 😏",

  "⚡ Are you DNS? Kyunki tumhare bina kisi aur tak pahunch hi nahi pata. 🌐",

  "🛜 Are you a Hotspot? Kyunki tumhare aas-paas sab connect hona chahte hain. 😂",
  "📚 Are you my favourite subject? Kyunki pura din bas tumhare baare me hi sochta rehta hoon. 😌",

"☕ Coffee thandi ho sakti hai... tumhari smile ka effect nahi. ✨",

"📖 Tum library ki silent zone ho kya? Kyunki tumhe dekhte hi main bhi chup ho jata hoon. 🤭",

"🎯 Agar tum assignment hoti... to deadline se pehle complete kar leta. 😂",

"🪄 Tum magician ho kya? Kyunki baaki sab background blur ho jata hai. ✨",

"📱 Battery 1% pe ho ya 100%... tumhara message hamesha priority rahega. ❤️",

"🎵 Tum playlist ka favourite song ho kya? Repeat pe chalne ka mann karta hai. 🎧",

"💬 Tumhari 'Hi' bhi notification nahi... celebration lagti hai. 🥹",

"🌙 Chand dekhne nikla tha... tum mil gaye. Bonus mil gaya. 😌",

"📸 Selfie log camera se lete hain... meri favourite picture to tumhari smile hai. 😊",

"🚦 Tum traffic signal ho kya? Kyunki tumhe dekhte hi main ruk jata hoon. 😂",

"🧲 Magnet ho kya? Kyunki attention automatically tumhari taraf chala jata hai. 😏",

"🌈 Tum mood booster ho kya? Ek smile aur pura din set. ☀️",

"📝 Attendance kam ho sakti hai... tumhari yaad kabhi short nahi hoti. 😂",

"🎁 Aaj ka best surprise? Tumhe dekh lena. 🤍",

"📡 Network weak ho sakta hai... tumhari vibe kabhi weak nahi hoti. 📶",

"🛒 Shopping list me kuch nahi tha... phir bhi tum pasand aa gaye. 😄",

"🎮 Game over tab hota hai jab tum 'Bye' bol dete ho. 😂",

"🌍 Google Maps duniya dikha sakta hai... par tum jaisa koi nahi. ✨",

"💫 Tumhari smile ka dark mode kabhi mat lana. 😌",

"📅 Calendar me favourite date nahi... favourite person mil gaya. 🤭",

"📦 Are you an API? Kyunki bina tumhare response ke request adhoori lagti hai. 💻",

"⚛️ Are you React? Kyunki tum meri har state instantly change kar dete ho. 😄",

"📨 Are you SMTP? Kyunki meri saari feelings tum tak deliver ho jaati hain. 💌",

"🧠 Are you RAM? Kyunki tum hamesha mere mind me loaded rehte ho. 😂",

"🌐 Are you HTTP 200? Kyunki tumhe dekhte hi sab OK lagne lagta hai. ✅",

"🔑 Are you a Primary Key? Kyunki tumhare jaisa duplicate milna impossible hai. 😉",

"🖥️ Are you Stack Overflow? Kyunki har problem ka answer tumhare paas lagta hai. 😄"
];

window.addEventListener("DOMContentLoaded", () => {

    if (sessionStorage.getItem("playLoginMusic") === "true") {

        const audio = new Audio("/images/waaanBeYours.mp3");
        audio.volume = 0.5;

        audio.play().catch(err => {
            console.log("Audio Error:", err);
        });

        sessionStorage.removeItem("playLoginMusic");
    }



    
});
const hour = new Date().getHours();

let greet = "Hello";

if(hour < 12)
    greet = "Good Morning";

else if(hour < 17)
    greet = "Good Afternoon";

else if(hour < 21)
    greet = "Good Evening";

else
    greet = "Still Awake? 😅";

document.getElementById("greeting").textContent =
`${greet}, ${sessionStorage.getItem("username")} 👋`;

const random = messages[Math.floor(Math.random() * messages.length)];

document.getElementById("personal-message").textContent = random;
const scheduledEvent = document.querySelector(".scheduled-events");


scheduledEvent.addEventListener("click",()=>{
   
  window.location.href="/scheduled-events.html"

})
document.querySelector(".event-registration").addEventListener("click",()=>{
   
  window.location.href="/events_.html"

})
document.querySelector(".confession-wall").addEventListener("click",()=>{
   
  window.location.href="/confession.html"

})