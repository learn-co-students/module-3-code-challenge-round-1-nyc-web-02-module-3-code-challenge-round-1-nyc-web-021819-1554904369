const theatreId = 41;


document.addEventListener('DOMContentLoaded', function () {

//DOM variables

let all_showings = []
const showingsContainer = document.querySelector(".ui.cards.showings")

  fetch('https://evening-plateau-54365.herokuapp.com/theatres/41')
    .then(res => res.json())
    .then(function (theatre) {
      all_showings = theatre.showings
        console.log(all_showings[0])
        // console.log(all_showings[0].capacity)
        // console.log(all_showings[0].showtime)
        // console.log(all_showings[0])
      render_all_showings(all_showings)
    })


  const render_all_showings = function () {
    showHTML = all_showings.map(render_showing)
    showingsContainer.innerHTML = showHTML.join("")
  }


// create HTML
// title = show.film.title
//runtime = show.film.runtime
// capacity = show.capacity
// showtime = show.showtime
//tickets_sold = capacity - show.tickets_sold

  const render_showing = function (show) {
    return `
            <div class="card" data-cardId=${show.id}>
              <div class="content">
                <div class="header">
                  <h3>${show.film.title}</h3>
                </div>
                <div class="meta">
                  <span> ${show.film.runtime} minutes
                </div>
                <div class="description">
                  <span class="ui label">
                    ${show.showtime}
                  </span>
                  <span id="ticketsRemaining" data-ticketsID=${show.id}>
                    ${show.capacity - show.tickets_sold}
                    </span>
                  remaining tickets
                </div>
              </div>
              <div class="extra content">
                <div class="ui blue button" data-showId=${show.id}> Buy Ticket</div>
              </div>
            </div>
          `
    // capacity: 20
    // film: {title: "The Widening Gyre 2", runtime: 104}
    // id: 435
    // showtime: "12:53AM"
    // tickets_sold: 14
  }


  //event listeners

  showingsContainer.addEventListener('click', function (e){
    console.log(e.target.parentElement)

    showID = parseInt(e.target.dataset.showid)
    ticketsremaining = document.querySelector(`[data-ticketsid='${showID}']`)
    ticketsremainingparsed = parseInt(ticketsremaining.innerText)

    if (ticketsremainingparsed === 0) {
      e.target.className = ""
      e.target.innerText = "Sold Out"
      ticketsremaining.innerText = "0 "
    }

    if (e.target.className === "ui blue button") {
      selected_show = all_showings.find(function(show) {
        return show.id === showID
      })

      let tickets_sold =  selected_show.tickets_sold
      tickets_sold ++
      let remainingTickets = selected_show.capacity - tickets_sold

      fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          'showing_id': showID
      })
    })
    .then(res => res.json())
    .then(function(){
      ticketsremaining.innerText = remainingTickets
    })

    }

  })

  // As a user, clicking on the 'Buy Ticket' button should purchase a ticket and decrement the remaining tickets by one. This information should be persisted in the remote API.





}) //DOMContentLoaded close
