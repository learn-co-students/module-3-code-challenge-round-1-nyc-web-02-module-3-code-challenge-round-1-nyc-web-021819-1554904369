const theatreId = 43;
let allMovies 
document.addEventListener('DOMContentLoaded', ()=> {
const cardShowings = document.querySelector("#showList")

//event listeners 

cardShowings.addEventListener('click', e => {

    if(e.target.dataset.action === "buy"){
        let currTickets = e.target.parentElement.parentElement.querySelector('p').innerText
        
        // debugger
        let currValue = parseInt(currTickets.split(" ")[0])
        newTicketValue = currValue -1 
       
        e.target.parentElement.parentElement.querySelector('p').innerText = newTicketValue + " remaining tickets"
        // debugger
        const movieId = e.target.dataset.id

        // fetch(`https://evening-plateau-54365.herokuapp.com/theatres/43"`,{ 
        //     method: 'PATCH',
        //     headers: {
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify( {
        //     ticket_sold: ticketsSold
        // })
        // }).then( res => res.json())
        const showCard = e.target.parentElement.parentElement
        const movieTitle = showCard.querySelector(".header").innerText
        fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                showing_id: movieId,
                movie: movieTitle
            })
        }).then(res => res.json())
    }

})







function movieToHTML(movie){
    
    let remainingTickets = `${movie.capacity}` - `${movie.tickets_sold}`
    return `
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
                 ${movie.tickets_sold} tickts sold //REMOVE THIS
                <p data-pTag="#${movie.id}"> ${remainingTickets} remaining tickets </p>
            </div>
        </div>
        <div class="extra content">
            <div class="ui blue button" data-action="buy" data-id="${movie.id}">Buy Ticket</div>
        </div>
    </div>
    `
}

function renderAllMovies(){
    // debugger
   cardShowings.innerHTML += allMovies.showings.map(movie => 
    movieToHTML(movie)).join("")
}

//fetches

    fetch("https://evening-plateau-54365.herokuapp.com/theatres/43")
    .then(res => res.json())
    .then(movies => {
        allMovies = movies
        console.log(allMovies.showings)
        renderAllMovies()
    } )

    

// function init(){

// }
// init

}) // end of DOM Content loaded