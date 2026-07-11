const textarea = document.getElementById("confession");
const counter = document.getElementById("count");
const postBtn = document.getElementById("postBtn");
const feed = document.getElementById("feed");

const avatars = [
    "👻",
    "🐼",
    "🐱",
    "🦊",
    "🐸",
    "🐧",
    "🐻",
    "🐨",
    "🐼",
    "🦁",
    "🐯",
    "🐰"
];

// Character Counter
textarea.addEventListener("input", () => {

    counter.textContent =
        `${textarea.value.length} / 250`;

});

// Post Confession
postBtn.addEventListener("click", () => {

    const text = textarea.value.trim();

    if (text === "") {

        alert("Write something first 😊");

        return;
    }

    if (text.length > 250) {

        alert("Maximum 250 characters.");

        return;
    }

    createCard(text);

    textarea.value = "";

    counter.textContent = "0 / 250";

});

// Create Card
function createCard(message) {

    const avatar =
        avatars[Math.floor(Math.random() * avatars.length)];

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `

        <div class="top">

            <div class="profile">
                ${avatar}
            </div>

            <div>

                <h3>Anonymous</h3>

                <span>Just now</span>

            </div>

        </div>

        <p class="message">

            ${escapeHTML(message)}

        </p>

        <div class="reaction">

            <button class="love">

                ❤️ <span>0</span>

            </button>

            <button class="fire">

                🔥 <span>0</span>

            </button>

            <button class="laugh">

                😂 <span>0</span>

            </button>

        </div>

    `;

    feed.prepend(card);

    attachReaction(card);

}

// Reactions
function attachReaction(card) {

    const buttons =
        card.querySelectorAll(".reaction button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            if (button.classList.contains("clicked"))
                return;

            const span =
                button.querySelector("span");

            span.textContent =
                Number(span.textContent) + 1;

            button.classList.add("clicked");

        });

    });

}

// Prevent HTML Injection
function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.innerText = text;

    return div.innerHTML;

}