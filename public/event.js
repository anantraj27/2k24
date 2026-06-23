const sportsContainer = document.querySelector(".sports-container");
const literallyContainer = document.querySelector(".literally-container");
const culturalContainer = document.querySelector(".cultural-container");
const technicalContainer = document.querySelector(".technical-container");

const events = [
  {
    Active: true,
    name: "Cricket",
    type: "Team",
    category: "sports",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779185732/Cricket_olzutg.png",
    fields: [
      {
        type: "text",
        placeholder: "Team Name ",
      },
      {
        type: "text",
        placeholder: "Caption Name ",
      },
      {
        type: "tel",
        placeholder: "Caption phone_no ",
      },
      {
        type: "tel",
        placeholder: "caption_registration_no(college)",
      },
      {
        type: "textarea",
        placeholder: "Player Names ",
      },
    ],
  },
  {
    Active: true,
    name: "VollyBall",
    type: "Team",
    category: "sports",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779185731/vollyball_alobcl.png",
    fields: [
      {
        type: "text",
        placeholder: "Team Name ",
      },
      {
        type: "text",
        placeholder: "Caption Name ",
      },
      {
        type: "tel",
        placeholder: "Caption phone_no ",
      },
      {
        type: "tel",
        placeholder: "caption_registration_no(college)",
      },
      {
        type: "textarea",
        placeholder: "Player Names ",
      },
    ],
  },
 
  {
    Active: true,
    name: "Badminton",
    type: "Team / Solo",
    category: "sports",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779188380/badminton_bz15sy.png",

    fields: {
      team: [
        {
          type: "text",
          placeholder: "Team Name",
        },
        {
          type: "text",
          placeholder: "Captain Name",
        },
        {
          type: "tel",
          placeholder: "Captain Phone No",
        },
        {
          type: "tel",
          placeholder: "Captain Registration No (College)",
        },
        {
          type: "textarea",
          placeholder: "Player Names",
        },
      ],

      solo: [
        {
          type: "text",
          placeholder: "Enter Player Name",
        },
        {
          type: "tel",
          placeholder: "Enter Your Phone No",
        },
        {
          type: "tel",
          placeholder: "Enter Your Registration No (College)",
        },
      ],
    },
  },
    {
    Active: true,
    name: "Chess",
    type: "Solo",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779366617/Chess_psu9o6.png",
    category: "sports",

    fields: [
      {
        type: "text",
        placeholder: "Enter player name ",
      },
      {
        type: "tel",
        placeholder: "Enter your Phone NO",
      },
      {
        type: "tel",
        placeholder: "Enter your Registration_No(college)",
      },
    ],
  },

  {
    Active: true,
    name: "WebDevelopment )",
    type: "Solo",
    category: "Technical",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779182828/webdevelopment_jdouof.png",
    fields: [
      {
        type: "text",
        placeholder: "Enter player name ",
      },
      {
        type: "tel",
        placeholder: "Enter your Phone NO",
      },
      {
        type: "tel",
        placeholder: "Enter your Registration_No(college)",
      },
    ],
  },
  {
    Active: true,
    name: "TechnicalQuizz",
    type: "Team",
    category: "Technical",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779182827/TEchnicalquizz_zsqlmk.png",
    fields: [
      {
        type: "text",
        placeholder: "Team Name ",
      },
      {
        type: "text",
        placeholder: "Caption Name ",
      },
      {
        type: "tel",
        placeholder: "Caption phone_no ",
      },
      {
        type: "tel",
        placeholder: "caption_registration_no(college)",
      },
      {
        type: "textarea",
        placeholder: "Player Names ",
      },
    ],
  },
  {
    Active: true,
    name: "Debugger",
    type: "Solo",
    category: "Technical",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779182837/DEbugger_t1pw4w.png",
    fields: [
      {
        type: "text",
        placeholder: "Enter player name ",
      },
      {
        type: "tel",
        placeholder: "Enter your Phone NO",
      },
      {
        type: "tel",
        placeholder: "Enter your Registration_No(college)",
      },
    ],
  },
  {
    Active: true,
    name: "OpenHackaThon",
    type: "Team",
    category: "Technical",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779182836/openhackathone_unhxjc.png",
    fields: [
      {
        type: "text",
        placeholder: "Team Name ",
      },
      {
        type: "text",
        placeholder: "Caption Name ",
      },
      {
        type: "tel",
        placeholder: "Caption phone_no ",
      },
      {
        type: "tel",
        placeholder: "caption_registration_no(college)",
      },
      {
        type: "textarea",
        placeholder: "Player Names ",
      },
    ],
  },
  {
    Active: true,
    name: "Singing",
    type: "Solo",
    category: "Cultural",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779355409/Singing_jszy1c.png",
    fields: [
      {
        type: "text",
        placeholder: "Enter player name ",
      },
      {
        type: "tel",
        placeholder: "Enter your Phone NO",
      },
      {
        type: "tel",
        placeholder: "Enter your Registration_No(college)",
      },
    ],
  },
  {
    Active: true,
    name: "RampWalk",
    type: "Solo",
    category: "Cultural",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779355460/Rampwalk_p1jaad.png",
    fields: [
      {
        type: "text",
        placeholder: "Enter your name ",
      },
      {
        type: "text",
        placeholder: "Enter your Gender(M/F) ",
      },

      {
        type: "tel",
        placeholder: "Enter your Phone NO",
      },
      {
        type: "tel",
        placeholder: "Enter your Registration_No(college)",
      },
    ],
  },
  {
    Active: true,
    name: "Dance",
    type: "Team / Solo",
    category: "Cultural",
    image_link:
      "https://res.cloudinary.com/dwq2rdoke/image/upload/v1779356228/Dance_sh2yuk.png",
     fields: {
      team: [
        {
          type: "text",
          placeholder: "Team Name",
        },
        {
          type: "text",
          placeholder: "Captain Name",
        },
        {
          type: "tel",
          placeholder: "Captain Phone No",
        },
        {
          type: "tel",
          placeholder: "Captain Registration No (College)",
        },
        {
          type: "textarea",
          placeholder: "Player Names",
        },
      ],

      solo: [
        {
          type: "text",
          placeholder: "Enter Player Name",
        },
        {
          type: "tel",
          placeholder: "Enter Your Phone No",
        },
        {
          type: "tel",
          placeholder: "Enter Your Registration No (College)",
        },
      ],
    },
  },
];

events.forEach((event, index) => {
  if (!event.Active) {
    return;
  }

  let card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
        <img src="${event.image_link}">

    <h3>${event.name}</h3>

    <div class="card-bottom">

        <p class="event-type">${event.type}</p>

        <button onclick="openForm(${index})">
            Register
        </button>

    </div>

       `;
  if (event.category.toLowerCase().trim() === "technical") {
    technicalContainer.appendChild(card);
  } else if (event.category.toLowerCase().trim() === "sports") {
    sportsContainer.appendChild(card);
  } else if (event.category.toLowerCase().trim() === "literary") {
    literaryContainer.appendChild(card);
  } else if (event.category.toLowerCase().trim() === "cultural") {
    culturalContainer.appendChild(card);
  }
});

const formPopup = document.querySelector(".form-popup");

const formContent = document.querySelector(".form-content");

const closeBtn = document.querySelector(".close-btn");
const sportsName = document.querySelector(".sportsName");
closeBtn.addEventListener("click", () => {
  formPopup.style.display = "none";
});
function openForm(index) {
  const event = events[index];

  function renderFields(fields, selectedValue = "team") {
    formContent.innerHTML = "";

    const event = events[index];

    if (event.type === "Team / Solo") {
      optionRender(selectedValue);
    }

    const form = document.createElement("form");
    sportsName.innerText = `${event.name}  (${event.type})`;
    // displaying sports name
    fields.forEach((field) => {
      let input;
      if (field.type == "textarea") {
        input = document.createElement("textarea");
      } else {
        input = document.createElement("input");

        input.type = field.type;
      }
      input.placeholder = field.placeholder;
      form.appendChild(input);
    });

    const submitBtn = document.createElement("button");

    submitBtn.innerText = "Submit";

    form.appendChild(submitBtn);

    formContent.appendChild(form);
    formPopup.style.display = "flex";
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
      renderFields(event.fields[select.value], select.value);
    });
  }

  if (event.type === "Team / Solo") {
    optionRender("team");
    renderFields(event.fields.team);
  } else {
    renderFields(event.fields);
  }

  console.log(event);
}
