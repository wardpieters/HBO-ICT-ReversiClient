Game.Giphy = (() => {
    const init = async (searchTerm) => {
        return await getImages(searchTerm);
    }

    const getImages = async (searchTerm) => {
        return await Game.Data.req(`https://api.giphy.com/v1/gifs/search?api_key=TPHraCV5UogIV6lcdq5ou52a3AqjwIeM&limit=10&q=${searchTerm}`)
            .then(data => {
                return data;
            })
    }

    return {
        init
    }
})()
