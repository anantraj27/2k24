

export function featureEventCard(data){
   const card = document.createElement("div");
       card.className ="event-card";
       card.dataset.eventId =`${data.scheduled_id}`
     card.innerHTML = `
              

            <h4 class="event-name">${data.name}</h4>

            <p class="event-teams">
                <strong class="teamA">${data.team_a}</strong>
                vs
                <strong class="TeamB">${data.team_b}</strong>
            </p>

            <p class="event-data">
                📅 ${new Date(data.event_date).toLocaleDateString("en-In")}
            </p>
            <input
            type="date"
            id="eventDate"
            required
        >
        <button class="edit-date">
            edit-date
        </button>


            <p class="event-time">
                ⏰ ${data.event_time}
            </p>
             <input
            type="time"
            id="eventTime"
            required
        >
        
        <button class="edit-time">
            edit-time
        </button>


            <p  class="event-venue" >
                ${data.venue}
            </p>

            <p>
                Status :
                <span class="status upcoming">
                   ${data.status}
                </span>
            </p>

            <p class="event-winner">
                Winner :${data.winner}
                
            </p>
            <div class="winner-box">

        <select class="winner-select">

            <option value="">
                Select Winner
            </option>

            <option value=${data.team_a_Id}>
                ${data.team_a}
            </option>

            <option value=${data.team_b_Id}>
                ${data.team_b}
            </option>

        </select>

        <button class="save-winner">
            Save Winner
        </button>
    </div>
            <div class="actions">

                <button class="start-btn">
                    Start Match
                </button>

                <button class="complete-btn">
                    Complete Match
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>        
`
return card;
}


export function eventCard(event) {

    const card = document.createElement("div");

    card.className = "event-card";
    card.dataset.eventId = event.scheduled_id;

    card.innerHTML = `
        <h4 class="event-name">${event.name}</h4>

        <p class="event-teams">
            <strong>${event.team_a}</strong>
            vs
            <strong>${event.team_b}</strong>
        </p>

        <p>
            📅 ${new Date(event.event_date)
                .toLocaleDateString("en-IN")}
        </p>

        <p>⏰ ${event.event_time}</p>

        <p>📍 ${event.venue}</p>

        <p>
            Status:
            <span class="status ${event.status}">
                ${event.status}
            </span>
        </p>
    `;

    return card;
}