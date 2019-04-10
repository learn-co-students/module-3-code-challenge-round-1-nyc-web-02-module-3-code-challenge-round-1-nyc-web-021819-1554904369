const theatreId = 33
const theatreURL = "https://evening-plateau-54365.herokuapp.com/theatres/33"
const uiCards = document.getElementById('container')
let theatresArr;


fetch(theatreURL)
.then(r => r.json())
.then(json =>{
  theatresArr = json.showings
  renderTheatres(theatresArr);
})



uiCards.addEventListener('click', e => {
  if(e.target.dataset.action === "buy-ticket") {
    let ticketId = parseInt(e.target.dataset.id)
    let ticketObj = theatresArr.find(theatre => {
      return theatre.id === ticketId
    })
    let currTicketCount = ticketObj.capacity - ticketObj.tickets_sold

    if (currTicketCount > 0) {
      ++ticketObj.tickets_sold;
      uiCards.innerHTML = ''
      renderTheatres(theatresArr)
      postTickets(ticketId)
    }
    // } else if (currTicketCount <= 0) {
    //   uiCards.innerHTML = ''
    //   renderTheatresWithSoldOut(theatresArr)
    // }
  }
})



function postTickets(id) {
  const url = "https://evening-plateau-54365.herokuapp.com/tickets"
  return fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify({
      showing_id: id
    }),
    headers:{
    'Content-Type': 'application/json'
    }
  }).then(res => res.json())
.then(response => console.log('Success created a ticket', JSON.stringify(response)))
.catch(error => console.error('Error: show is sold out'));
}





function renderTheatres(arr) {
  arr.forEach(theatre => {
    uiCards.innerHTML += `
    <div class="card">
      <div class="content">
        <div class="header">
          ${theatre.film.title}
        </div>
      <div class="meta">
        ${theatre.film.runtime} minutes
      </div>
      <div class="description">
        <span class="ui label">
          ${theatre.showtime}
        </span>
      ${theatre.capacity - theatre.tickets_sold} remaining tickets
    </div>
  </div>
  <div class="extra content">
        ${createButtonOrSoldOut(theatre)}
  </div>
</div>
    `
  })
}

// {<div data-id="${theatre.id}" data-action ="buy-ticket" class="ui blue button">Buy Ticket</div>}


function createButtonOrSoldOut(theatre) {
  let count = theatre.capacity - theatre.tickets_sold
  if (count > 0) {
    return `
    <div class="extra content">
      <div data-id="${theatre.id}" data-action ="buy-ticket" class="ui blue button">Buy Ticket</div>
    </div>
          `
  } else {
    return `<p>SOLD OUT!!!!</p>`
  }
}


//create a function for a button to add  to form when ticket count greater than 0 then show button and when equal or less than zero than put SOLD OUT!!! instead of button
