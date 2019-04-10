window.addEventListener('DOMContentLoaded', e => {
  console.log("DOM content has loaded");

  const theatreId = 51;
  const URL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
  const POSTURL = "https://evening-plateau-54365.herokuapp.com/tickets"
  const showings = document.querySelector("#movie-showings")

  //fetch all movies and append to DOM
  fetchMovies(URL, appendMoviesToDom)

  //event listener for 'Buy Ticket' button
  showings.addEventListener('click', e => {
    if(e.target.dataset.action === "buy-ticket"){

      const movieId = e.target.dataset.id
      let ticketsSold = parseInt(document.querySelector(`#tickets-sold-${movieId}`).innerText)
      ticketsSold--

      const body = { tickets_sold: ticketsSold, showing_id: movieId }
      postTicket(body)
    }
  });

  //append all movies to the DOM
  function appendMoviesToDom(movies) {
    showings.innerHTML = ''
    movies.showings.forEach(makeMovieCard)
  };

  //make HTML card for movie showing
  function makeMovieCard(movie) {
    showings.innerHTML +=
    `<div class="card">
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
            <div hidden="true" id="tickets-sold-${movie.id}">${movie.tickets_sold}</div>
            <span >${movie.capacity - movie.tickets_sold}</span> remaining tickets
          </div>
        </div>
        <div data-id="${movie.id}" class="extra content">
          ${buttonDisplay(movie)}
        </div>
      </div>
    `
  }

  //display 'buy button' or 'sold out' text depending on status
  function buttonDisplay(movie) {
    if(movie.capacity - movie.tickets_sold > 0){
      return `<div data-id="${movie.id}" data-action="buy-ticket" id="movie-${movie.id}" class="ui blue button">Buy Ticket</div>`
    } else {
      return "Sold Out"
    }
  }

  //create fetch helper functions
  //fetch theater movie showings (make a fetch get request)
  function fetchMovies(url, callBack) {
    fetch(url)
    .then(res => res.json())
    .then(callBack)
  }

  //buy a new ticket (make a fetch post request)
  function postTicket(body) {
    fetch(POSTURL, {
      method: "POST",
      headers:
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      fetchMovies(URL, appendMoviesToDom)
    })
  }

});
