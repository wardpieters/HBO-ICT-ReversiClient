Game.Data = (() => {
    const req = (url, options = {}) => Game.API.req(url, options)

    return {
        req
    }
})()