document.addEventListener("DOMContentLoaded", () => {


  const movieContainer = document.getElementById('movie container')
  const theatreId = 52;
  let theatres;



  fetch('https://evening-plateau-54365.herokuapp.com/theatres/52')
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
        theatres = json

        Object.keys(theatres).map(function(key, value) {

            let theatreId = theatres.id
            let theatreName = theatres.name
            let theatreShowings = theatres.showings

            theatreShowings.forEach(function(films) {

                let remainingTkts = films.capacity - films.tickets_sold
                movieContainer.innerHTML +=
                  `<div class="card">
            <div class="content">
            <div class="header">
            ${films.film.title}
            </div>
            <div class="meta">
            ${films.film.runtime} minutes
            </div>
            <div film-id=${films.id} class="description">
            <span class="ui label">
            ${films.showtime}
            </span>
            ${remainingTkts}  remaining tickets
            </div>
            </div>
            <div class="extra content">
            <div  data-action='buy ticket' data-id=${films.id} class="ui blue button">Buy Ticket</div>
            </div>
            </div>`



                movieContainer.addEventListener('click', function(e) {
                    console.log(e.target.dataset.action)
                    if (e.target.dataset.action === 'buy ticket') {
                    const ticketId = e.target.dataset.id
                    const showing_id: 0

                    const ticketObj {
                      ticketId: ticketId,
                      showing_id: showing_id
                    }
                    //subtract tkt from right film remaing tkts
                    //if/else statement about if tkt is remaining and error or success statement

                    fetch('https://evening-plateau-54365.herokuapp.com/theatres/52/`${ticketId}`','{
                      method: 'POST',
                      header:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                      },
                      body: JSON.stringify(ticketObj)
                    })
                    .then(function(ticketObj) {
                      return response.json()




                    }


                })

            })

        })
    })
//end of contentloaded
})
