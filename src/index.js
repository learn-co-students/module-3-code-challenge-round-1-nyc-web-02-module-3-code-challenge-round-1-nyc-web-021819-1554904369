const theatreId = 37;
document.addEventListener("DOMContentLoaded", () => {
  const showings_container = document.getElementById("card_container")

  fetch("https://evening-plateau-54365.herokuapp.com/theatres/37")
    .then(res => res.json())
    .then(json => {
      const theater = json
      const showings = theater.showings
      showings.forEach(function(showing) {
        displayShowings(showing)
        purchaseTicket(showing)
      })
      function displayShowings(showing) {
        console.log(showing.film.title)
        showing.tickets_left = showing.capacity - showing.tickets_sold
        console.log(showing.tickets_left)

        // card formatting rendered strangely - I made my own card container
        showings_container.innerHTML +=
          `<div class="card">
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
                ${showing.tickets_left} remaining tickets
              </div>
            </div>
            <div class="extra content">
              <div class="ui blue button" id="${showing.id}">Buy Ticket</div>
            </div>
          </div>`
      }
    function purchaseTicket(showing) {
      showing.tickets_left = showing.capacity - showing.tickets_sold
      document.addEventListener("click", (e) => {
          if (e.target.class === "ui blue button") {
            if (e.target.id === `${showing.id}`) {
              if ((showing.tickets_left) > 0) {
              showings_container.innerHTML = ''
              showing.tickets_left--
              create_ticket(showing)
              displayShowings(showing)
            }}
          }})
      }
      // Was unable to finish my create ticket function in time


      // function create_ticket(showing, (e) => {
      //   let Obj = {method: 'POST',
      //   headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
      //   required_keys: JSON.stringify({
      //   "showing_id":`${showing.id}`})}
      //   fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, Obj)
      //     .then(res => res.json())
      //     .then(json =>
      //     )
      // })
    })
})
