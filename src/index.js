const theatreId = null;
const baseURL = 'https://evening-plateau-54365.herokuapp.com/theatres/40'
const uiCardsShowing = document.querySelector('.ui.cards.showings')

let films;
document.addEventListener('click', e =>{
  if(e.target.className ===  'ui blue button'){
  theFilm = films.find(film => film.id == e.target.id)
  theCard = document.getElementById(`${theFilm.id}`)
  let remaining = theCard.querySelector('.remaining')
  remaining.innerText = parseInt(remaining.innerText) - 1
  theCard.querySelector('.remaining').dataset.sold = parseInt(theCard.querySelector('.remaining').dataset.sold) + 1;
  theFilm.tickets_sold = theCard.querySelector('.remaining').dataset.sold
  console.log(theFilm.id);
  postTickets(theFilm);
   if(remaining.innerText == 0){
     alert("💥Sold Out!💥")
     theCard.querySelector('.ui.blue').remove()
     theCard.querySelector('.extra').innerText = 'Sold Out😱'
   }


};


})//addEventListener-end





function displayFilms(film) {
  uiCardsShowing.innerHTML =''
  return uiCardsShowing.innerHTML += `<div class="card" id = ${film.id}>
                                  <div class="content" id = ${film.id}>
                                    <div class="header" id = ${film.id}>
                                      ${film['film'].title}
                                    </div>
                                    <div class="meta">
                                      ${film['film'].runtime} minutes
                                    </div>
                                    <div class="description">
                                      <span class="ui label">
                                     ${film.showtime}
                                      </span>
                                        <span class='remaining' data-sold=${film.tickets_sold}>
                             ${film.capacity -film.tickets_sold}</span> remaining tickets
                                    </div>
                                  </div>
                                  <div class="extra content">
                                    <div class="ui blue button" id = ${film.id}>Buy Ticket</div>
                                  </div>
                                </div>
                                  `

}


function renderFilms(films){
  uiCardsShowing.innerHTML = films.map(displayFilms).join('')
}


function getAll() {
  return fetch(baseURL)
  .then(res => res.json())
}



function postTickets(film){
  const obj = {
    method: 'POST',
    headers: {"Content-Type":"application/json", "Accept": "application/json"},
    body: JSON.stringify({
       showing_id: 40,
       id: film.id,
    })
  }
  return fetch('https://evening-plateau-54365.herokuapp.com/tickets', obj)
  .then(res => res.json())
  .then(json => { console.log(json)
})
}



// function updateFilm(film){
//   const obj = {
//     method: 'PATCH',
//     headers: {"Content-Type":"application/json"},
//     body: JSON.stringify({
//        id: film.id,
//        tickets_sold: film.tickets_sold
//     })
//   }
//   fetch(`${baseURL}, obj)
//   .then(res => res.json())
//   .then(json => { console.log(json);
// })
// };




function init(){
  getAll().then(json => {
    // console.log(json["showings"][0]);
    films = json["showings"]
    renderFilms(films)
  })
}

init()
