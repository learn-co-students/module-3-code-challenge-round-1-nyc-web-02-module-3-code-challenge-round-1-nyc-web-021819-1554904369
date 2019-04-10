const movieApi = (() => {
    const baseURL = "https://evening-plateau-54365.herokuapp.com"
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    const getAll = () => {
        return fetch(`${baseURL}/theatres/${theatreId}`).then(res => res.json())
    }

    const buyTicket = (body) => {
        return fetch(`${baseURL}/tickets`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        }).then(res => res.json())
    }

    return {
        getAll,
        buyTicket
    }
})()
