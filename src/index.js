// unique ID
const theatreId = 36;

// endpoints
const BASE_URL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
const TICKET_URL = 'https://evening-plateau-54365.herokuapp.com/tickets'


// DOM elements
const showingsDiv = document.querySelector('#showings')


// application state
let showings = []


// initial fetch
fetch(BASE_URL)
  .then(res => res.json())
  .then(data => {
    showings = data.showings
    renderAllShowings()
  })


// render all the showings
function renderAllShowings() {
  showings.forEach(showing => {
    showingsDiv.innerHTML += renderCard(showing)
  })
}


// render a single showing
function renderCard(showing) {
  return `<div class="card">
            <div class="content">
              <div class="header">
                ${showing.film.title}
              </div>
              <div class="meta">
                ${showing.film.runtime} minutes
              </div>
              <div class="description">
                <span class="ui label">
                  ${showing.showtime}
                </span>
                <span id="remaining-tickets">${showing.capacity - showing.tickets_sold}</span> remaining tickets
              </div>
            </div>
            <div class="extra content">
              <button class="ui blue button" data-id="${showing.id}" data-action="buy" ${showing.capacity - showing.tickets_sold === 0 ? `disabled` : ''}>${showing.capacity - showing.tickets_sold === 0 ? `sold out` : `Buy Ticket`}</button>
            </div>
          </div>`
}


// event listeners:

// user clicks on 'buy ticket' button
showingsDiv.addEventListener('click', e => {
  if (e.target.dataset.action === 'buy') {
    let button = e.target
    let showingId = parseInt(e.target.dataset.id)
    let showing = showings.find(showing => showing.id === showingId)
    let ticketsSold = showing.tickets_sold
    if (showing.capacity - showing.tickets_sold > 1) {
      showing.tickets_sold++
      e.target.parentNode.parentNode.querySelector("#remaining-tickets").innerText--
      createTicket(showingId)
    } else if (showing.capacity - showing.tickets_sold === 1) {
      showing.tickets_sold++
      e.target.parentNode.parentNode.querySelector("#remaining-tickets").innerText--
      button.innerText = 'sold out'
      button.disabled = true
      createTicket(showingId)
    }

  }
})


// additional fetches:

// create a ticket
function createTicket(showingId) {
  return fetch(TICKET_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      showing_id: showingId
    })
  })
  .then(res => res.json())
}
