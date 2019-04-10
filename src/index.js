const theatreId = 38;
const baseURL = "https://evening-plateau-54365.herokuapp.com"
let allMovies
let showings

// Event Listeners

// action that occurs when DOM is loaded
document.addEventListener('DOMContentLoaded', function(){
    showings = document.getElementsByClassName("ui cards showings")[0]
    getAllMovies()
    buyTicket()
})
// action that occurs when you buy a ticket
function buyTicket() {
    showings.addEventListener('click', e => {
        if (e.target.dataset.action === "buy"){
            const movieId = e.target.dataset.showingId
            const body = {showing_id: movieId}
            const movie = allMovies.find(function(movie){
                return movie.id === parseInt(movieId)
            })
            purchaseTicket(body).then(() => {
                movie.tickets_sold += 1
                addMoviesToDOM()
            })
        }
    })
}

// Convert to HTML

// generates html for a movie
function movieToHTML(movie) {
    const remaining_tickets = movie.capacity - movie.tickets_sold
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
function addMoviesToDOM() {
    showings.innerHTML = ''
    allMovies.forEach((movie) => {
        showings.innerHTML += movieToHTML(movie)
    })
}

// Fetches

// gets all movies from db
function getAllMovies() {
    movieApi.getAll()
        .then(theater => {
                allMovies = theater.showings
                addMoviesToDOM()
        })
}

// increases ticket sold by 1
function purchaseTicket(body) {
    return movieApi.buyTicket(body)
}
