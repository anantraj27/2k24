let loader;
let loaderTitle;
let loaderStatus;
let interval;

async function initLoader(){

    const html = await fetch("/spiner.html")
        .then(r=>r.text());

    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );

    loader = document.getElementById("loader");
    loaderTitle = document.getElementById("loader-title");
    loaderStatus = document.getElementById("loader-status");
}

await initLoader();

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

export function showLoader(title="Loading"){

    loaderTitle.textContent = title;

    let i=0;

    loaderStatus.textContent = messages[0];

    loader.classList.remove("hidden");

    interval = setInterval(()=>{

        i=(i+1)%messages.length;

        loaderStatus.textContent=messages[i];

    },900);

}

export function hideLoader(){

    clearInterval(interval);

    loader.classList.add("hidden");

}