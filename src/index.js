//MAIN COMMENTS: COULDN'T GET CHANGING BUTTON FIGURED OUT. INSTEAD PUT ALERT WHEN TICKETS HAD RUN OUT.


const theatreId = "https://evening-plateau-54365.herokuapp.com/theatres/39";
const showingsDiv = document.getElementsByClassName("ui cards showings")[0]
let showingsArray;


//GET Fetch

fetch(theatreId)
.then(res => res.json())
.then(data => {
  showingsArray = data.showings;
  renderShowings()
})





//Event Listeners

showingsDiv.addEventListener('click', ev => {
  if (ev.target.className === "ui blue button"){
       let ticketsLeft = parseInt(ev.target.parentNode.parentNode.querySelectorAll("span")[1].innerText)

       //requiring that there be at least one remaining before purchasing
       if (ticketsLeft > 0) {
        //Updating DOM with new remaining ticket count
         --ticketsLeft
         ev.target.parentNode.parentNode.querySelectorAll("span")[1].innerText = ticketsLeft

         //Updating API with ticket purchase
         let showingId = ev.target.dataset.id
         purchaseTicket(showingId)
    }
      else {
        alert("There are no tickets left for this showing!")
      }

  }
})


function renderShowings(){
  showingsArray.forEach(showing => {
    showingsDiv.innerHTML += `<div class="card">
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
          <span "remaining-tickets">${(showing.capacity) - showing.tickets_sold}</span> Remaining Tickets
        </div>
      </div>
      <div class="extra content">
       <div class="ui blue button" data-id=${showing.id}>Buy Ticket</div>
     </div>
   </div>
    </div>`

  })
}


 function purchaseTicket(showingId) {
   fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
     method: "POST",
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     body: JSON.stringify({
         showing_id:`${showingId}`
       })
     }
   )
   .then(res => res.json())
   .then(data => {})
 }
