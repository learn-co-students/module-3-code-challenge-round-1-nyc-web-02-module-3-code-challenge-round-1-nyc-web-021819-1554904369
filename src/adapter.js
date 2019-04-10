const adapter = (url) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    const getAll = async () => {
        const resp = await fetch(url)
        const jsonMovies = await resp.json()
        return jsonMovies
    }

    const create = async (body) => {
        const createConfig = {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }
        const resp = await fetch(url, createConfig)
        const jsonCreated = await resp.json()
        return jsonCreated
    }


    return {
        getAll,
        create
    }
}
