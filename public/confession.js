const textarea = document.getElementById("confession");
const counter = document.getElementById("count");
const postBtn = document.getElementById("postBtn");
const feed = document.getElementById("feed");
const API = "/api/confession";

// let category = "confession";
// const branch = document.getElementById('branch')
// const batch = document.getElementById('branch')

window.addEventListener("DOMContentLoaded", loadConfessions);

let page = 1;
const limit = 10;
async function loadConfessions() {
    try {
        const { data } = await axios.get(API, {
            params: {
                page,
                limit
            }
        });

        // Sirf first page pe clear karo
        if (page === 1) {
            feed.innerHTML = "";
        }

        data.data.forEach(confession => {
            createCard(confession);
        });

    } catch (err) {
        console.error(err);
    }
}
// window.addEventListener("scroll", () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
//         page++;
//         loadConfessions();
//     }
// });
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
    ) {
        page++;
        loadConfessions();
    }
});
// const typeButtons = document.querySelectorAll(".type-btn");

// typeButtons.forEach(btn => {

//     btn.addEventListener("click", () => {

//         // Active class remove
//         typeButtons.forEach(b => b.classList.remove("active"));

//         // Active class add
//         btn.classList.add("active");

//         // Category update
//         category = btn.dataset.type;

//         // Placeholder change
//         if (category === "confession") {

//             textarea.placeholder =
//                 "Confess something... Nobody will know it's you 😌";

//         } else {

//              textarea.placeholder =
// "Write your last message... 💌 (e.g. To my parents..., To a friend..., To someone special...)";
               

//         }

//     });

// });
let sessionId = localStorage.getItem("confessionSession");

if(!sessionId){

    sessionId = crypto.randomUUID();

    localStorage.setItem(
        "confessionSession",
        sessionId
    );

}

const avatars = [
    "👻","🐼","🐱","🦊","🐸",
    "🐧","🐻","🐨","🦁","🐯","🐰"
];

// Character Counter
textarea.addEventListener("input", () => {

    const len = textarea.value.length;

    counter.textContent = `${len} / 500`;

    if (len < 50) {
        counter.style.color = "#ff4d4d";
    } else {
        counter.style.color = "#22c55e";
    }

});

// Post Button
postBtn.addEventListener("click", async () => {

    const text = textarea.value.trim();

    if (text.length < 50) {
        alert("⚠️ Confession must contain at least 50 characters.");
        return;
    }

    if (text.length > 500) {
        alert("⚠️ Maximum 500 characters allowed.");
        return;
    }

    try {

        const avatar =
            avatars[Math.floor(Math.random() * avatars.length)];

        const { data } = await axios.post(API, {

            message: text,
            avatar,
            // branch,
            // batch

        });
       createCard(data.data, true);

        
        textarea.value = "";
        counter.textContent = "0 / 500";
        counter.style.color = "#999";

    } catch (err) {

    console.error(err);

    const message =
        err.response?.data?.message || "Unable to post confession.";

    alert(message);

}

});

// Create Card
function createCard(confession, isNew = false) {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `

        <div class="top">

            <div class="profile">
                ${confession.avatar}
            </div>

            <div>

                <h3>Anonymous</h3>

                <span>${timeAgo(confession.created_at)}</span>

            </div>

        </div>

        <p class="message">

            ${escapeHTML(confession.message)}

        </p>

        <div class="reaction">

            <button
                class="reaction-btn love"
                data-id="${confession.id}"
                data-type="love">

                ❤️ <span>${confession.love_count}</span>

            </button>

            <button
                class="reaction-btn fire"
                data-id="${confession.id}"
                data-type="fire">

                🔥 <span>${confession.fire_count}</span>

            </button>

            <button
                class="reaction-btn laugh"
                data-id="${confession.id}"
                data-type="laugh">

                😂 <span>${confession.laugh_count}</span>

            </button>

            <button
                class="report-btn"
                data-id="${confession.id}">

                ⚠️ Report

            </button>

        </div>

    `;

    if (isNew) {

        feed.prepend(card);

    } else {

        feed.append(card);

    }

    attachReaction(card);

}
function attachReaction(card) {

    // ❤️ 🔥 😂

    const buttons = card.querySelectorAll(".reaction-btn");

    buttons.forEach(btn => {

        btn.addEventListener("click", async () => {

            if (btn.classList.contains("clicked"))
                return;

            try {

                const id = btn.dataset.id;

                const reaction = btn.dataset.type;

                await axios.patch(

                    `${API}/${id}/react`,

                    {

                        reaction,

                        sessionId

                    }

                );

                const span = btn.querySelector("span");

                span.textContent =
                    Number(span.textContent) + 1;

                btn.classList.add("clicked");

                btn.style.background = "#2563eb";

                btn.style.color = "#fff";

            } catch (err) {

                alert(err.response?.data?.message || "Unable to react.");

            }

        });

    });

    // 🚩 REPORT

    const reportBtn = card.querySelector(".report-btn");

    reportBtn.addEventListener("click", async () => {

        const ok = confirm(

            "Report this confession?\n\nFalse reports are discouraged."

        );

        if (!ok) return;

        try {

            await axios.patch(

                `${API}/${reportBtn.dataset.id}/report`,

                {

                    sessionId

                }

            );

            reportBtn.disabled = true;

            reportBtn.textContent = "✅ Reported";

        } catch (err) {

            alert(

                err.response?.data?.message ||

                "Unable to report."

            );

        }

    });

}
// Reaction
function timeAgo(date) {

    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

    if (seconds < 60)
        return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60)
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24)
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);

    if (days < 7)
        return `${days} day${days > 1 ? "s" : ""} ago`;

    return new Date(date).toLocaleDateString();
}

// Escape HTML
function escapeHTML(text){

    const div=document.createElement("div");

    div.innerText=text;

    return div.innerHTML;

}