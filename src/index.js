document.addEventListener("DOMContentLoaded", ev => {
  const theatreId = 42;
  const URL = "https://evening-plateau-54365.herokuapp.com/theatres/42";
  const showCard = document.querySelector(".ui.cards.showings");
  let tickets;
  let showingArr;

  //fetch all the tickets
  fetch(URL)
    .then(res => res.json())
    .then(ticketArr => {
      tickets = ticketArr.showings;
      showingArr = ticketArr;
      tickets.forEach(ticket => {
        renderAllTickets(ticket);
      });
    });

  createTicket();

  //fetches
  function renderAllTickets(ticket) {
    return (showCard.innerHTML += ` <div class="card">
                                 <div class="content">
                                 <div class="header">
                                    ${ticket.film.title}
                                 </div>
                                 <div class="meta">
                                    ${ticket.film.runtime} minutes
                                 </div>
                                 <div class="description">
                                    <span class="ui label">
                                    ${ticket.showtime}
                                    </span>
                                    <div id="sold-ticket">
                                    ${ticket.tickets_sold} remaining tickets
                                    </div>
                                 </div>
                              </div>
                              <div class="extra content">
                                 <div  data-id="${
                                   ticket.id
                                 }" data-action="buy" class="ui blue button">Buy Ticket</div>
                              </div>
                           </div>

    `);
  } //end of the renderAll tickets

  function createTicket() {
    fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ showing_id: 182 })
    })
      .then(res => res.json())
      .then(newShowing => {
        console.log(newShowing);
      });
  } //end od the Create Tickets

  function buyTicket(id) {
    fetch(`https://evening-plateau-54365.herokuapp.com/theatres/42`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(console.log);
  }

  showCard.addEventListener("click", ev => {
    const ticketRemaining = document.querySelector("#sold-ticket").innerText;
    if (ev.target.dataset.action === "buy") {
      const ticketId = parseInt(ev.target.dataset.id);
      const foundTicket = tickets.find(ticket => ticket.id === ticketId);
      foundTicket.tickets_sold -= 1;
      foundTicket.tickets_sold;

      // this will call buyTickets(pass the TicketId)
      //body of the Fetch will be push the data to the server
      //update the dom and App status
      //rerender  alll the tickets 


    }
  });
}); //end of the DOMCONTENT LOADED
