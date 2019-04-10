
//--------------------------VARIABLES-------------------------------------------
const theatreId = 48;
const moviesURL = 'https://evening-plateau-54365.herokuapp.com/theatres/48'
const ticketsURL = 'https://evening-plateau-54365.herokuapp.com/tickets'
let movies


//-------------------------LOAD THE PAGE----------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  console.log("im here!!")

//------------------------SHOW THE MOVIES---------------------------------------

function fetchMovies (){
  fetch(moviesURL)
  .then(response => response.json())
  .then(moviesArray => {
    console.log(moviesArray)
      movies = moviesArray.showings
      console.log(movies)
      showMovies(movies)
  })
}

fetchMovies()

//--------------------------CREATE/BUY A TICKET-------------------------------------

//add anevent lsitener for the submit button, prevent the default, rub the buy a ticket function
document.addEventListener('submit', (event) =>{
  event.preventDefault()
  buyATicket()
})

//create the ticket purchase
function buyATicket(){
  fetch(ticketsURL, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
        showing_id: <add showing_id here>})
        //need to find the parent node of the event and get the showing ID

    })
    .then(response => response.json())
    .then(json) =>{
        alert("You bought a ticket!!")
        //add ticket info to alert
    })
  }

//--------------------------UPDATE THE TICKET INFO-----------------------------


document.addEventListener('submit', (event) =>{
  updateShowing()
})
function updateShowing(){
  fetch(ticketsURL, {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
        showing_id: <add showing_id here>})
    })
    .then(response => response.json())
    .then(json) =>{
    //rerender the page with new data
    })
  }
//-------------------------HELPER FUNCTIONS-------------------------------------

function showMovies(movies){

  var div = document.createElement('div');
    div.className = 'showings';
    div.innerHTML =
    movies.map((movie) => {
      // console.log(movie.film.runtime)
      return
      `
      <div class="card">
  <div class="content">
    <div class="header">
      ${movie.film.title}
    </div>
    <div class="meta">
      ${movie.film.runtime}
    </div>
    <div class="description">
      <span class="ui label">
        ${movie.film.showtime}
      </span>
    ${movie.capacity}
    </div>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
</div>
`
}).join("")
    document.getElementById('ui cards showings').appendChild(div);
}




})
