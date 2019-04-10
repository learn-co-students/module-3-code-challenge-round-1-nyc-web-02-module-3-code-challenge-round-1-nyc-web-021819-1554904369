const theatreId = 44;
const theatreLink = 'https://evening-plateau-54365.herokuapp.com/theatres/44'


// DOM elements
const showingsDiv = document.querySelector('.showings')


//fetching of all showings
fetchAllShowings()


//event listeners
showingsDiv.addEventListener('click', function(e){
  if (e.target.matches('.button')) {
    const showing_id = e.target.dataset.id
    fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({showing_id: showing_id})
    })
    .then(res => res.json())
    .then(function(){
      fetchAllShowings()
    })
  }
})


//fetch request for all showings
function fetchAllShowings(){
  fetch(theatreLink)
  .then(res => res.json())
  .then(function(theatre){
    showingsDiv.innerHTML = ""
    theatre.showings.forEach(function(showing){
      createShowing(showing)
    })
  })
}


//creation of each showing 'card'
function createShowing(showing){
  if (showing.capacity - showing.tickets_sold === 0){
    showingsDiv.innerHTML += soldOutShowing(showing)
  }else {
  showingsDiv.innerHTML += notSoldOutShowing(showing)
  }
}


//HTML creation of a showing with tickets left
function notSoldOutShowing(showing){
  return `<div class="card">
  <div class="content">
    <div class="header">
      ${showing.film.title}
    </div>
    <div class="meta">
      ${showing.film.runtime} minutes
    </div>
    <div class="description">
      <span class="ui label">
        ${showing.showtime}
      </span>
      ${showing.capacity - showing.tickets_sold} remaining tickets
    </div>
  </div>
  <div class="extra content">
    <div data-id=${showing.id} class="ui blue button">Buy Ticket</div>
  </div>
</div>`
}


//HTML creation of a sold-out showing
function soldOutShowing(showing){
  return `<div class="card">
  <div class="content">
    <div class="header">
      ${showing.film.title}
    </div>
    <div class="meta">
      ${showing.film.runtime} minutes
    </div>
    <div class="description">
      <span class="ui label">
        ${showing.showtime}
      </span>
      ${showing.capacity - showing.tickets_sold} remaining tickets
    </div>
  </div>
  <div class="extra content">
    <div data-id=${showing.id}>Sold Out</div>
  </div>
</div>`
}
