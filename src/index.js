const theatreId = 38;
const baseURL = "https://evening-plateau-54365.herokuapp.com/theatres/38"
let allMovies
let showings

document.addEventListener('DOMContentLoaded', function(){
    showings = document.getElementsByClassName("ui cards showings")[0]
    getAllMovies()
    buyTicket()
})

// Event Listeners

// action that occurs when you buy a ticket
function buyTicket() {
    showings.addEventListener('click', e => {
        if (e.target.dataset.action === "buy"){
            const movieId = e.target.dataset.showingId
            const body = {showing_id: movieId}
            const movie = allMovies.find(function(movie){
                return movie.id === parseInt(movieId)
            })
            purchaseTicket(body).then(function() {
                movie.tickets_sold += 1
                addMoviesToDOM()
            })
        }
    })
}

// Convert to HTML

// generates html for a movie
function movieToHTML(movie) {
    let remaining_tickets = movie.capacity - movie.tickets_sold
    let extra = `<div data-action="buy" data-showing-id=${movie.id} class="ui blue button">Buy Ticket</div>`

    if (remaining_tickets === 0) {
        extra = `<p> Sold Out </p>`
    } 

    return `<div class="card">
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
                    ${extra}
                </div>
            </div>
            `
}
// Add to Dom

// adds movies to the dom
function addMoviesToDOM(){
    showings.innerHTML = ''
    allMovies.forEach(function(movie){
        showings.innerHTML += movieToHTML(movie)
    })
}

// fetches

// gets all movies from db
function getAllMovies() {
    fetch(baseURL)
    .then(res => res.json())
    .then(theater => {
        allMovies = theater.showings
        addMoviesToDOM()
    })
}

// increases ticket sold by 1
function purchaseTicket(body){
    return fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(res => res.json())
}
