document.addEventListener("DOMContentLoaded", function(){
    let showings = []
    const theatreId = 50;
    const uiCardsShowings = document.querySelector('.ui.cards.showings')
    console.log(uiCardsShowings)

    fetch('https://evening-plateau-54365.herokuapp.com/theatres/50')
        .then(res => res.json())
        .then(function (json) {
            showings = json.showings
            console.log(showings.showings)
            showings.forEach(show => {
                uiCardsShowings.innerHTML += `
    <div class="card">
  <div class="content">
    <div class="header">
      ${show.film.title}
    </div>
    <div class="meta">
      ${show.film.runtime} minutes
    </div>
    <div class="description">
      <span class="ui label">
        ${show.showtime}
      </span>
      ${show.capacity - show.tickets_sold}  remaining tickets
    </div>
  </div>
  <div class="extra content">
    <div class="ui blue button">Buy Ticket</div>
  </div>
</div>
   `

    })

     })
})

uiCardsShowings.addEventListener('click', function(e){
    e.target.
})


