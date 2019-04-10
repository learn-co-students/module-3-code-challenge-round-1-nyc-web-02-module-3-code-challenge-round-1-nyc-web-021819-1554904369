const theatreId = null;
const showingDiv = document.querySelector(".card")
const bodyTag = document.querySelector("body")
let theatres

fetch('https://evening-plateau-54365.herokuapp.com/theatres/35')
.then(res => res.json())
.then(function(json){
    // console.log(json["showings"])
    theatres = json["showings"]
    // console.log(showingDiv);
    
    theatres.forEach(function(theatre){
        let ticketleft = theatre.capacity - theatre.tickets_sold
        let showId = theatre.id
        // console.log(ticketleft)
        // console.log(showId)
        showingDiv.innerHTML += `
        <div class="ui cards showings" >
            <div class="card">
      
         <div class="content">
            <div class="header">
            ${theatre.film.title}
            </div>
            <div class="meta">
            ${theatre.film.runtime} minutes
            </div>
         <blockquote data-id = "${showId}">
            <div class="description">
            <span class="ui label">
                ${theatre.showtime}
            </span>
            <span>${ticketleft}</span> remaining tickets
            </div>
        </blockquote>
        </div>
        <div class="extra content">
            <div class="ui blue button" data-action="buy" data-id="${showId}">Buy Ticket</div>
        </div>
        </div>
         
        </div>
        `       
    })//end of foreach

})//end of get fetch

bodyTag.addEventListener("click",function(e){
    // console.log(e.target)
    console.log(this.querySelectorAll("blockquote"))
    if (e.target.dataset.action==="buy"){
        let showId = parseInt(e.target.dataset.id)
        //send to the back end with ticket purchase info
        fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
        method: 'POST',
        headers:
        {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({ 
            showing_id: showId
         })
        })//end of fetch 
        .then(res => res.json())
        .then(function(json){
        // should upstate local state variable 
            let resShowId = json.showing_id
            let purchasedShow = theatres.find(function (show) {
                return show.id === resShowId
            })

            if (purchasedShow.tickets_sold === 0){
                //i should probably send user a error message as ticekts are sold out
            }else{
                //without errors these are the things need to update
                //tickets to be sold out

                //tickets remaining i tried to use blockquote to select that
            }
           
            // console.table(theatres)
            // let ticSpanTag = e.target.querySelector("span")
            // console.log(e.target.parentNode.parentNode.parentNode)
           


        })
    }
    
})//end of eventlisenting 






