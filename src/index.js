// DOM Elements and Variables
const baseUrl = 'https://evening-plateau-54365.herokuapp.com/theatres/34'
const showings = document.querySelector('.ui-cards-showings')
const theatreId = null;
let movies = []

// Event Listeners
showings.addEventListener('click', (e) => {
  if (e.target.className === 'ui blue button' && (e.target.dataset.tickets - e.target.dataset.sold > 0)) {
    // let id = e.target.parentNode.parentNode.parentNode.id
    let showingId = e.target.parentNode.parentNode.id
    let ticketsSold = parseInt(e.target.dataset.sold)
    let newTicketsSold = ticketsSold + 1

    // I would do pessimistic rendering so only the # of tickets can be sold, but I cant get the fetch to work.
    updateTheater(showingId)
    .then(data => {
      let film = movies[0].showings.find(movie => movie.id == showingId)
      film.tickets_sold++
      addTheatersToDOM(movies[0])

      // getAllTheaters().then(addTheatersToDOM)
    })

    // movies[0].showings.forEach(movie => {
    //   if (movie.id == showingId) {
    //     movie.tickets_sold += 1
    //
    //   }
    // })
    // addTheatersToDOM(movies[0])

  }
})

// Converts to html
function theaterToHTML(showing) {
  let buttonContent
  if (showing.capacity - showing.tickets_sold <= 0) {
    buttonContent = 'Sold Out'
  } else {
    buttonContent = 'Buy Ticket'
  }
  return `
    <div class="card" id=${showing.id}>
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
          ${showing.capacity - showing.tickets_sold} remaining tickets
        </div>
      </div>
      <div class="extra content">
        <div class="ui blue button" data-tickets=${showing.capacity} data-sold=${showing.tickets_sold}>${buttonContent}</div>
      </div>
    </div>
  `
}

// Adds to DOM
function addTheatersToDOM(theaters) {
  showings.innerHTML = theaters.showings.map(theaterToHTML).join('')
  // showings.innerHTML += theaters.forEach(theater => theaterToHTML(theater))
}

// Fetches
function getAllTheaters() {
  return fetch(baseUrl)
  .then(res => res.json())
}

function updateTheater(showingId) {
  return fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
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

// Start App
function init() {
  getAllTheaters().then(theater => {
    addTheatersToDOM(theater)
    movies.push(theater)
  })
}

init()
