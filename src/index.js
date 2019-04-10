const theatreId = 46;

//Grab HTML elements needed
const filmContainer = document.querySelector('.showings')

//Events

//Buy ticket of showing
filmContainer.addEventListener('click', buyTicket);

//Create local state
let showings = []

//Get movies
function getMovies() {

  //Fetch from API
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then((res) => {return res.json()})
  .then((movies) => {
    let output = ''
    movies.showings.forEach((movie) => {
      let remainingTickets = movie.capacity - movie.tickets_sold
      if (remainingTickets > 0) {
      output +=
      `
      <div class="card">
        <div class="content">
          <div class="header">
            ${movie.film.title}
          </div>
          <div class="meta">
            ${movie.film.runtime} minutes
          </div>
          <div class="description">
            <span class="ui label">
              ${movie.showtime}
            </span>
            <span class="tickets"> ${remainingTickets} </span> remaining tickets
          </div>
        </div>
        <div class="extra content" data-id="${movie.id}">
          <div class="ui blue button" style="display:block">Buy Ticket</div>
          <span class="sold-out" style="display:none">Sold out</span>
        </div>
      </div>
      `
    } else {
      output +=
      `
      <div class="card">
        <div class="content">
          <div class="header">
            ${movie.film.title}
          </div>
          <div class="meta">
            ${movie.film.runtime} minutes
          </div>
          <div class="description">
            <span class="ui label">
              ${movie.showtime}
            </span>
            <span class="tickets"> ${remainingTickets} </span> remaining tickets
          </div>
        </div>
        <div class="extra content" data-id="${movie.id}">
          <div class="ui blue button" style="display:none">Buy Ticket</div>
          <span class="sold-out" style="display:block">Sold out</span>
        </div>
      </div>
      `
    }
      //Update application state
      showings.push(movie)
    })
    filmContainer.innerHTML = output
  })
}

//Buy ticket function

function buyTicket(e) {
  e.preventDefault();
  if (e.target.className === 'ui blue button') {

    //Get movie id for API update
    let movieId = e.target.parentElement.dataset.id

    //Update showings state
    let movie = showings.find( movie => movie.id === parseInt(movieId))
    if (movie.tickets_sold < movie.capacity) {
      movie.tickets_sold + 1
      movie.capacity - 1
    }


    //Render UI of tickets remaining
    let tickets = e.target.parentElement.parentElement.querySelector('.tickets')
    tickets = parseInt(tickets.innerText--)

    //Update API through fetch
    fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({showing_id:movieId})
    })
    .then((res) => {
      //Update DOM if response is true/false
      if (res.ok) {return res.json()} else if (res.ok != true) {
        let soldOut = e.target.parentElement.parentElement.querySelector('.sold-out')
        let buyButton = e.target
        soldOut.style.display = "block"
        buyButton.style.display = "none"
      }
    })
  }
}

getMovies()
