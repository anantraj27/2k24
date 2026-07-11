let loader;
let loaderTitle;
let loaderStatus;
let interval;

const messages = [
    "TCP Three-Way Handshake...",
    "Sending SYN Packet...",
    "Receiving SYN-ACK...",
    "Sending ACK...",
    "Connection Established...",
    "Authenticating Session...",
    "Fetching Database...",
    "Receiving Response..."
];

async function initLoader() {

    // Spinner pehle se load hai kya?
    if (document.getElementById("loader")) {

        loader = document.getElementById("loader");
        loaderTitle = document.getElementById("loader-title");
        loaderStatus = document.getElementById("loader-status");

        return;
    }

    // HTML load karo
    const response = await fetch("/spiner.html");

    if (!response.ok) {
        throw new Error("spinner.html not found");
    }

    const html = await response.text();

    document.body.insertAdjacentHTML("beforeend", html);

    loader = document.getElementById("loader");
    loaderTitle = document.getElementById("loader-title");
    loaderStatus = document.getElementById("loader-status");

    // Initial state hidden
    loader.classList.add("hidden");
}

await initLoader();

export function showLoader(title = "Connecting To Freshers Arena") {

    if (!loader) return;

    loaderTitle.textContent = title;

    loaderStatus.textContent = messages[0];

    loader.classList.remove("hidden");

    clearInterval(interval);

    let i = 0;

    interval = setInterval(() => {

        i++;

        if (i >= messages.length) {
            i = 0;
        }

        loaderStatus.textContent = messages[i];

    }, 900);
}

export function hideLoader() {

    if (!loader) return;

    clearInterval(interval);

    loader.classList.add("hidden");
}