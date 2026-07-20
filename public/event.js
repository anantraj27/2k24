const sportsContainer = document.querySelector(".sports-container");
const literallyContainer = document.querySelector(".literary-container");
const culturalContainer = document.querySelector(".cultural-container");
const technicalContainer = document.querySelector(".technical-container");

const API = "/api";
let events;
const getPosts = async () => {
  try {
    const result = await axios.get(
      `${API}/user/api/v1/events`

    )
    console.log("result",result.data)
    
    events=result.data.data.events
    console.log(events)
    renderEvents(result.data.data.events)
    
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Request completed");
  }
};
getPosts()
let selectedPlayers = [];
function renderEvents(events){
events.forEach((event, index) => {
  if (!event.Active) {
    return;
  }

  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id=event.id;

card.innerHTML = `
  <img
    src="${event.image_link.replace('/upload/', '/upload/f_auto,q_auto,w_500/')}"
    loading="lazy"
    decoding="async"
    alt="${event.name}">

  <h3>${event.name}</h3>

  <div class="card-bottom">
    <p class="event-type">${event.type}</p>

    <button data-id="${event.id}" onclick="openForm(${index})">
      Register
    </button>
  </div>
`;

       
  if (event.category.toLowerCase().trim() === "tech") {
    technicalContainer.appendChild(card);
  } else if (event.category.toLowerCase().trim() === "sports") {
    sportsContainer.appendChild(card);
  } else if (event.category.toLowerCase().trim() === "literary") {
    literallyContainer.appendChild(card);
  } else if (event.category.toLowerCase().trim() === "cultural") {
    culturalContainer.appendChild(card);
  }
});
}

const formPopup = document.querySelector(".form-popup");

const formContent = document.querySelector(".form-content");

const closeBtn = document.querySelector(".close-btn");
const sportsName = document.querySelector(".sportsName");

closeBtn.addEventListener("click", () => {
  selectedPlayers = [];
  formPopup.style.display = "none";
});


function openForm(index) {
 selectedPlayers = [];
  const event = events[index];
   let participationType =
    event.type === "team/solo" ? "team" : event.type;

  function renderFields(fields, selectedValue = "team") {
    formContent.innerHTML = "";

    const event = events[index];

    if (event.type === "team/solo") {
      optionRender(selectedValue);
    }

    const form = document.createElement("form");
    sportsName.innerText = `${event.name}  (${event.type})`;
    // displaying sports name
    //--------------------------------
    fields.forEach((field) => {
      if (field.type === "radio") {

    const wrapper = document.createElement("div");
    wrapper.className = "radio-group";

    wrapper.innerHTML = `
        <p>${field.placeholder}</p>

        <div class="radio-options">

            <label>
                <input
                    type="radio"
                    name="${field.field_name}"
                    value="Male"
                    required
                >
                Male
            </label>

            <label>
                <input
                    type="radio"
                    name="${field.field_name}"
                    value="Female"
                >
                Female
            </label>

        </div>
    `;

    form.appendChild(wrapper);

return ;}
     if (field.type === "player_picker") {

    
    const wrapper = document.createElement("div");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = field.placeholder;
    input.name = field.field_name; 

    const dropdown = document.createElement("div");
    dropdown.className = "player-dropdown";

    const selectedBox = document.createElement("div");
    selectedBox.className = "selected-players";

    const count = document.createElement("p");
    count.className = "player-count";

    wrapper.append(input, dropdown, selectedBox, count);
    form.appendChild(wrapper);

    updateCount();

    input.addEventListener("input", async () => {

      // alert("Registration has not started you will notified Once started Via Group..✨");

        const q = input.value.trim();

        if (!q) {
            dropdown.innerHTML = "";
            return;
        }

        const res = await fetch(`${API}/user/api/v1/search-users?q=${q}`, {
        credentials: "include"
        });
        const data = await res.json();

        dropdown.innerHTML = "";

        data.users.forEach(user => {

            const option = document.createElement("div");

            option.innerText = user.name;

            option.addEventListener("click", () => {

                // duplicate
                if (selectedPlayers.some(p => p.id === user.id))
                    return;

                // max players
                if (selectedPlayers.length >= event.max_players) {
                    alert(`Maximum ${event.max_players} players allowed`);
                    return;
                }

                selectedPlayers.push(user);

                renderPlayers();

                input.value = "";
                dropdown.innerHTML = "";

            });

            dropdown.appendChild(option);

        });

    });

    function updateCount() {

        count.textContent =
            `Current: ${selectedPlayers.length} | Min: ${event.min_players} | Max: ${event.max_players}`;

        if (selectedPlayers.length < event.min_players) {
            count.style.color = "red";
        } else {
            count.style.color = "green";
        }

    }

    function renderPlayers() {

        selectedBox.innerHTML = "";

        selectedPlayers.forEach(player => {

            const chip = document.createElement("span");

            chip.innerHTML = `
                ${player.name}
                <button type="button">✕</button>
            `;

            chip.querySelector("button").addEventListener("click", () => {

                selectedPlayers = selectedPlayers.filter(
                    p => p.id !== player.id
                );

                renderPlayers();

            });

            selectedBox.appendChild(chip);

        });

        updateCount();

    }

    return;
}
      
      let input;
      if (field.type == "textarea") {
        input = document.createElement("textarea");
      } else {
        input = document.createElement("input");

        input.type = field.type;
      }
      input.placeholder = field.placeholder;
      input.name = field.field_name;    

      
      form.appendChild(input);
    });

const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.innerText = "Submit";

form.appendChild(submitBtn);
formContent.appendChild(form);
formPopup.style.display = "flex";

form.addEventListener("submit", async (e) => {
  // alert("Registration has not started you will notified Once started Via Group..✨");

    e.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);

    // Team Validation
    if (participationType === "team") {

        if (!payload.team_name?.trim()) {
            alert("Enter Team Name");
            return;
        }

        if (selectedPlayers.length < event.min_players) {
            alert(`Minimum ${event.min_players} players required`);
            return;
        }

    }

    // Captain Name
    if (!payload.captain_name?.trim()) {
        alert("Enter Name");
        return;
    }

    // Phone Validation
    if (
        !payload.captain_phone ||
        !/^[6-9]\d{9}$/.test(payload.captain_phone)
    ) {
        alert("Enter valid 10 digit phone number");
        return;
    }

    // Registration Validation
    if (!payload.captain_registration_no?.trim()) {
        alert("Enter Registration Number");
        return;
    }

    payload.event_id = event.id;
    payload.participation_type = participationType;
    payload.event_name = event.name;
    console.log(payload);

    if (selectedPlayers.length > 0) {
        payload.player_ids = selectedPlayers.map(player => player.id);
    }

    console.log(payload);

    try {

        const { data } = await axios.post(
            `${API}/user/api/v1/register-event`,
            payload,
            {
        withCredentials: "include"
        }
        );

        alert(data.message);

        form.reset();

        selectedPlayers = [];

        formPopup.style.display = "none";

    } catch (err) {

        console.error(err);

        alert(
            err.response?.data?.message ||
            "Something went wrong"
        );

    }

});
    
  }

  function optionRender(selectedValue) {
    const lable = document.createElement("label");

   
    const select = document.createElement("select");
    const option1 = document.createElement("option");

    option1.value = "team";

    option1.innerText = "Team";
    const option2 = document.createElement("option");

    option2.value = "solo";

    option2.innerText = "Solo";

    select.appendChild(option1);
    select.appendChild(option2);
    
    formContent.appendChild(select);

    select.value = selectedValue;
    select.addEventListener("change", () => {
      participationType = select.value; 
      renderFields(event.fields[select.value], select.value);
    });
  }

  if (event.type === "team/solo") {
    optionRender("team");
    renderFields(event.fields.team);
  } else {
    renderFields(event.fields);
  }

  console.log(event);
  
}


    