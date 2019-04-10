// constants
const theatreId = 47;
const showingDiv = document.querySelector(".showings")


//Run the DOM Content Loaded functions
document.addEventListener('DOMContentLoaded', domLoadFunctions)
function domLoadFunctions(){
  fetchFilms()
}

// Event Listeners
// calls a below click handler function which determines what to do with e
document.addEventListener('click', clickHandler)

//the following functions render the page
function fetchFilms(){
  fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${47}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    renderFilms(myJson);
  });
}

// takes the fetch response, wipes the previous showings list from the dom
// and then calls for each on each showing to render the showings
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
  const disabledClass = (film.capacity - film.tickets_sold > 0) ? "weGoodToBuyFam" : "disabled"
  const buttonText = (disabledClass==="disabled") ? "Sold Out": "Buy Ticket"
  div.classList.add("card")
  div.setAttribute('data-id', showing.id)
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
        <div class="ui blue ${disabledClass} button">${buttonText}</div>
    </div>`
  showingDiv.appendChild(div)
}

function clickHandler(e){
  // this if is to determine whether the click is being used to buy a new ticket
  // this class only exists if we good to buy fam
  if (e.target.className === "ui blue weGoodToBuyFam button"){
    // pulls id from parent
    const id = e.target.parentNode.parentNode.dataset.id
    // use that id to buy a ticket
    buyTicket(id)
  }
}

// send the fetch to create an new ticket, render all the films again
function buyTicket(id){
  fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({showing_id: id}), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(fetchFilms)
}
