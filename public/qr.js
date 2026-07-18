console.log("JS Started56");

document.getElementById("downloadBtn").addEventListener("click", () => {
    console.log("Clicked");
});
const badges = [
  "🌟 Rising Star",
  "🔥 Campus Legend (Loading...)",
  "⚔️ Challenger",
  "🎓 Fresh Face",
  "👑 MVP Candidate",
  "🎯 Goal Getter",
  "🦄 Rare Find",
  "💎 Hidden Gem",
  "🚀 Next Big Thing",
  "🌈 Positive Vibes Only",
  "📡 Always Online",
  "🧠 Think Tank",
  "⚡ High Voltage",
  "🎲 Lucky One",
  "🏆 Future Achiever",

  "💻 Code Wizard",
  "🐛 Bug Hunter",
  "⚙️ Debug Specialist",
  "🚀 Startup Material",
  "📚 Lifelong Learner",
  "🧩 Puzzle Master",
  "🌙 Night Owl",
  "☕ Caffeine Powered",
  "🎮 Gamer Mode",
  "🎧 Playlist Curator",
  "📷 Memory Collector",
  "🎨 Creative Mind",
  "🎤 Stage Ready",
  "🎬 Main Character",
  "🤝 Team Player",

  "🧭 Campus Explorer",
  "🛰️ Future Innovator",
  "🪄 Magic Happens Here",
  "🌍 Dream Chaser",
  "🌱 Growing Everyday",
  "✨ Built Different",
  "🧃Good Vibes Only",
  "😎 Chill Operator",
  "📈 Leveling Up",
  "🎯 Focus Mode",
  "🪙 Lucky Spawn",
  "💡 Idea Machine",
  "🔮 Future CEO",
  "📖 Bookworm",
  "🦉 Wise Soul",

  "⚡ Fast Learner",
  "🎪 Chaos Manager",
  "🎉 Fun Certified",
  "🌊 Go With The Flow",
  "🚴 Adventure Seeker",
  "🎁 Full of Surprises",
  "🏅 Potential Unlocked",
  "🌠 Dream Builder",
  "🎇 Bright Future",
  "🛡️ Fearless Spirit",
  "🎭 Multi-Talent",
  "🎪 Vibe Creator",
  "💫 Limitless Energy",
  "🧠 Big Brain Energy",
  "🎈Happy Human",

  "🌟 One of One",
  "👀 Everyone's Favourite",
  "🦋 Fresh Beginnings",
  "📍Making Memories",
  "🛸 Out of the Box",
  "🪐 Future Icon",
  "🥇Top Tier",
  "📢 Worth Knowing",
  "🎯 On a Mission",
  "🦾 Future Ready",
  "🎊 Campus Ready",
  "💙 Kind Soul",
  "🌞 Sunshine Energy",
  "🔥 Unstoppable",
  "🏁 Just Getting Started"
];

const random = badges[Math.floor(Math.random() * badges.length)];

const badge = document.getElementById("badge")
const name = document.getElementById("name")

const Qr_name =sessionStorage.getItem("Qr_name");
// name.textContent =Qr_name;
badge.textContent = `✨ Your Badge: ${random}`;
const card = document.querySelector(".card");
document.getElementById("shareBtn").addEventListener("click", async () => {

    try{

        const dataUrl = await htmlToImage.toPng(card);

        const blob = await (await fetch(dataUrl)).blob();

        const file = new File(
            [blob],
            `Freshers2026.png`,
            { type: "image/png" }
        );

        if(navigator.canShare && navigator.canShare({ files:[file] })){

            await navigator.share({
                title: "Freshers 2026",
                text: "Check out my Freshers QR Badge! 🎉",
                files: [file]
            });

        }else{

            alert("Sharing is not supported on this browser. Please download the image and share it manually.");

        }

    }catch(err){

        console.error(err);

    }

});


document.getElementById("downloadBtn").addEventListener("click", async () => {

    const dataUrl = await htmlToImage.toPng(card);

    const link = document.createElement("a");
    link.download = `Freshers2026.png`;
    link.href = dataUrl;
    link.click();

});