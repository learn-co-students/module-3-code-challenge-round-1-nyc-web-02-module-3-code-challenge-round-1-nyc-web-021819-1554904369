
const theatreId = 45;
const movieUrl = 'https://evening-plateau-54365.herokuapp.com/theatres/45';
const ticketUrl = 'https://evening-plateau-54365.herokuapp.com/tickets'
let movies = []

// Adapters
let movieAdapter = adapter(movieUrl);
let ticketAdapter = adapter(ticketUrl);

// DOM Variables
let moviesContainer = document.querySelector('div.showings');

// event listeners
moviesContainer.addEventListener('click', e => {
    // Prevent purchase if sold out
    if (e.target.dataset.action === "buy" ) {
        const movieId = parseInt(e.target.dataset.id);
        // use ticket adapter for post
        (async () => {
        const createdTicket = await ticketAdapter.create({showing_id: movieId})
        })();
        // reload tickets
       loadMovies();
    }
});

// render functions
function renderMoviesList(movies) {
    movies.forEach(movie => renderMovieCard(movie))
}

function renderMovieCard(movie) {
const remaining_tickets = movie.capacity - movie.tickets_sold;
moviesContainer.innerHTML += `
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
        ${remaining_tickets} remaining tickets
        </div>
    </div>
    <div class="extra content">
        <div class="ui blue button" "data-tickets=${remaining_tickets} data-id=${movie.id} data-action="buy">Buy Ticket</div>
    </div>
    </div>`

if (remaining_tickets === 0) {
    soldOut(movie, remaining_tickets)
    }
}

function soldOut(movie, remaining_tickets) {
        const buttonDiv = document.querySelector(`[data-id="${movie.id}"]`)
        buttonDiv.parentElement.innerHTML = `
        <div class="ui blue button" "data-tickets=${remaining_tickets} data-id=${movie.id} data-action="sold out">Sold Out</div>`
}

// load initial movie data and render
async function loadMovies() {
    theater = await movieAdapter.getAll()
    movies = await theater.showings
    console.log(movies)
    moviesContainer.innerHTML = ''
    renderMoviesList(movies)
}

loadMovies()