document.addEventListener("DOMContentLoaded", function() {

const theatreId = 49;
const URL = "https://evening-plateau-54365.herokuapp.com/theatres/49"
const TICKETURL = "https://evening-plateau-54365.herokuapp.com/tickets"
const showingsList = document.querySelector(".ui.cards.showings")
const buyButton = document.querySelector("div.ui.blue.button")
let movies = []


//As a user, when the page loads I should see a list of movie showings fetched from a remote API.
  fetch(URL)
    .then(function(response) {
      return response.json()
    })//end of the first .then
    .then(function(json) {
      movies = json.showings
      renderAllMovies()
      // renderAllShowings(json.showings)
    })//end of the second .then

 function renderOneMovie(movie) {
   showingsList.innerHTML += `
   <div data-id=${movie.id} class="card">
     <div data-id=${movie.id} class="content">
         <div data-id=${movie.id} class="header">
           ${movie.film.title}
         </div>
         <div data-id=${movie.id} class="meta">
           ${movie.film.runtime}
         </div>
         <div data-id=${movie.id} class="description">
           <span data-id=${movie.id} class="ui label">
             ${movie.showtime}
           </span>
           ${movie.capacity - movie.tickets_sold} remaining tickets
         </div>
       </div>
       <div class="extra content">
         <div data-id=${movie.id} data-action='buy' class="ui blue button">Buy Ticket</div>
       </div>
      </div>
   `
 }//end of renderOneMovie

 function renderAllMovies() {
   showingsList.innerHTML = ""
   movies.forEach(function(movie) {
     renderOneMovie(movie)
   })
 }//end of renderAllMovies

 //As a user, clicking on the 'Buy Ticket' button should purchase a ticket and decrement the remaining tickets by one

 showingsList.addEventListener("click", function(e) {
   const showingID = parseInt(e.target.dataset.id)
   let button = e.target
   if (e.target.dataset.action === "buy") {
     buyTicket(showingID, button)
   }//end of if
 })//end of addEventListener

 function buyTicket(id, button) {
   const foundMovie = movies.find(function(movie) {
     return movie.id === id
   })//closes find
   const remainingTickets = (foundMovie.capacity - foundMovie.tickets_sold)
   if (remainingTickets > 0) {
   foundMovie.tickets_sold++
     fetch(TICKETURL, {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
         body: JSON.stringify({showing_id: id, tickets_sold: foundMovie.tickets_sold})
     })//end of fetch
      renderAllMovies()
  } else {
    //sold out only appears when u click the buy button when the remaining is 0 already
    button.innerHTML = "Sold Out"
    window.alert("That showing is sold out");
    //can not get the button to disable
    //heres the idea though
    // when user clicks that button, they get the id for the button
    //with that id, im trying to location that specific buyButton
    //if that buy button id matches the id i pass in, then i will disable the button with
    //   (.disabled = true)
    // theButtonID = parseInt(button.dataset.id)
    // console.log(id)
    // if (theButtonID === id) {
    //   button.disabled = true
    // }

 }//end of else
}//end of buyTicket function




})// closes DOMContentLoaded
