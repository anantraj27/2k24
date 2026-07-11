const textarea = document.getElementById("confession");
const counter = document.getElementById("count");
const postBtn = document.getElementById("postBtn");
const feed = document.getElementById("feed");
const API = "/api/confession";
window.addEventListener("DOMContentLoaded", loadConfessions);

async function loadConfessions() {

    try {

        const { data } = await axios.get(API);

        feed.innerHTML = "";

        data.data.forEach(confession => {

            createCard(confession);

        });

    } catch (err) {

        console.error(err);

        alert("Unable to load confessions.");

    }

}
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

    counter.textContent = `${len} / 250`;

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

    if (text.length > 250) {
        alert("⚠️ Maximum 250 characters allowed.");
        return;
    }

    try {

        const avatar =
            avatars[Math.floor(Math.random() * avatars.length)];

        const { data } = await axios.post(API, {

            message: text,
            avatar

        });
        await loadConfessions();

        
        textarea.value = "";
        counter.textContent = "0 / 250";
        counter.style.color = "#999";

    } catch (err) {

        console.error(err);

        alert("Unable to post confession.");

    }

});

// Create Card
function createCard(confession) {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `

        <div class="top">

            <div class="profile">

                ${confession.avatar}

            </div>

            <div>

                <h3>Anonymous</h3>

                <span>Just now</span>

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

    feed.prepend(card);

    attachReaction(card);

}
function attachReaction(card) {

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

                console.error(err);

                alert(err.response?.data?.message || "Unable to react.");

            }

        });

    });

}
// Reaction


// Escape HTML
function escapeHTML(text){

    const div=document.createElement("div");

    div.innerText=text;

    return div.innerHTML;

}