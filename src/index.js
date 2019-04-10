// constants
const theatreId = 47;
const showingDiv = document.querySelector(".showings")


//Run the DOM Content Loaded functions
document.addEventListener('DOMContentLoaded', domLoadFunctions)
function domLoadFunctions(){
  fetchFilms()
}

function fetchFilms(){
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${47}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    renderFilms(myJson);
  });
}

function renderFilms(response){
  // console.log("response", response)
  // console.log("showings", response.showings)
  const showings = response.showings
  //wipe previous html before rerendering
  showingDiv.innerHTML = ''
  //render films
  showings.forEach(showing => renderShowing(showing))
}

function renderShowing(showing){
  const film = {
    id: showing.id,
    title: showing.film.title,
    runtime: showing.film.runtime,
    capacity: showing.capacity,
    showtime: showing.showtime,
    tickets_sold: showing.tickets_sold
  }
  const div = document.createElement("div")
  div.classList.add("card")
  div.setAttribute('data-id', showing.id)
  //remove when refactoring to do this via fetch
  div.setAttribute('data-remaining-tickets', (showing.capacity - showing.tickets_sold))
  div.innerHTML =
  `<div class="content">
      <div class="header">
        ${film.title}
      </div>
      <div class="meta">
        ${film.runtime} minutes
      </div>
      <div class="description">
        <span class="ui label">
          ${film.showtime}
        </span>
        ${film.capacity - film.tickets_sold} remaining tickets
      </div>
    </div>
    <div class="extra content">
      <div class="ui blue button">Buy Ticket</div>
    </div>`
  showingDiv.appendChild(div)
}
