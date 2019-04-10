const theatreId = 45;
const movieUrl = 'https://evening-plateau-54365.herokuapp.com/theatres/45';
const ticketUrl = 'https://evening-plateau-54365.herokuapp.com/tickets'
let movies = []

// Adapters
let movieAdapter = adapter(movieUrl);
let ticketAdapter = adapter(ticketUrl);

// DOM Variables
let moviesContainer = document.querySelector('div.showings');




// capacity: 20
// film: {title: "If Not Now, When? 2", runtime: 113}
// id: 479
// showtime: "02:20AM"
// tickets_sold: 3

// event listeners
moviesContainer.addEventListener('click', e => {
    
    if (e.target.dataset.action === "buy" ) {
        const movieId = parseInt(e.target.dataset.id)
        console.log(movieId);
        // purchase ticket
        // decrement remaning tickets by one by post
        (async () => {
        const createdTicket = await ticketAdapter.create({showing_id: movieId})
        console.log(createdTicket);
        })();
        // reload tickets
       renderTickets();
    }
});

// Required Keys

// {
//   showing_id: <add showing_id here>
// }

// Example Responses:

// Successfully created ticket
// { "id": 3820, "showing_id": 182, "created_at": "2017-11-13T12:12:28.682Z" }
// Sold out
// { "error": "That showing is sold out" }
// // status 422






// load initial movie data and render
async function renderTickets() {
theater = await movieAdapter.getAll()
movies = await theater.showings
console.log(movies)
moviesContainer.innerHTML = ''
renderMoviesList(movies)
}
renderTickets()








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
