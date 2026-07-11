const messages = [

"☕ Chai peene ke baad hi bugs dikhte hain... trust the process 😂",

"📚 Attendance kam hai? Confidence high rakho 😎",

"😂 Assignment submit kar diya? Ya phir 'kal karunga' mode ON hai?",

"💘 Crush online hai... lekin pehle registrations check kar lo 😏",

"🎯 Aaj ka target: Zero bugs, zero drama, full attendance!",

"📖 Notes sabke paas hote hain... samajhne wale alag level ke hote hain 😅",

"🏆 Trophy sirf winners le jayenge... memories sab le jayenge ❤️",

"😎 Last bench wale bhi kabhi-kabhi history bana dete hain.",

"🍜 Mess ka khana survive kar liya? Phir life me kuch bhi possible hai 😂",

"📢 Internal marks ka tension baad me... pehle event mast chalao!",

"😂 Group project me kaam ek karta hai... marks sab lete hain.",

"💡 Code chale ya na chale... confidence kabhi down mat hone dena 😌",

"👀 Crush mil jaye to eye contact maintain karna... panic nahi 😆",

"🎉 Aaj naye dost banao... LinkedIn connections baad me bana lena 😁",

"📝 Viva me jo confidence dikhate ho... wahi real superpower hai 😅",

"📈 CGPA important hai... lekin memories ka koi backlog nahi hota ❤️",

"😄 Agar faculty idhar aa gayi... ye message automatically disappear ho gaya 😶",

"🚀 Placement ka tension baad me... pehle semester survive karo 😂",

"🎓 Degree sabko milegi... college stories sabki alag hongi.",

"✨ Smile! Shayad aaj ka din yaadgaar ban jaye 😄",

"😂 WiFi slow ho sakta hai... tumhara enthusiasm nahi.",

"💻 Ctrl + S daba diya? Future wala tum thank you bolega.",

"📢 College me do hi cheeze fast failti hain... rumours aur assignment deadlines 😂",

"🤝 Friends acche ho to 4 saal 4 mahine lagte hain.",

"🎯 Attendance 75% ho ya na ho... enthusiasm 100% hona chahiye 😎",

"😂 Exam ke ek din pehle sabko topper banne ki feeling aati hai.",

"📚 Library me padhne jao... aur dost mil jaye... game over 😆",

"💘 Agar crush smile kar de... pura din productive lagta hai 😂",

"☕ Coding + Coffee = Semester Survival Kit.",

"🚀 Server down ho sakta hai... tumhara confidence nahi.",

"😂 Semester shuru hote hi motivation full... end tak bas passing marks ki dua 😅",

"📢 Faculty: 'Any Questions?'  Entire Class: 😶",

"🎉 College fest ka asli winner wahi hai jo photos me sab jagah ho 😂",

"🧠 DSA tough hai... lekin 8 AM wali class usse bhi tough hai.",

"📖 Syllabus dekh ke shock lagta hai... phir bhi last week me hi padhte hain 😅",

"🏆 Hackathon ho ya viva... confidence aadha kaam kar deta hai.",

"😴 Hostel me '5 minute aur' sabse bada jhoot hai 😂",

"😂 Semester ka sabse dangerous sentence: 'Abhi bahut time hai.'",

"💡 Debugging se patience aur patience se placement milta hai 😎",

"🎈 Agar aaj kisi naye insaan se mile... Hi bolne me kya jaata hai? 😊",

"🔥 College khatam ho jayega... ye moments nahi milenge dobara ❤️"

];
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