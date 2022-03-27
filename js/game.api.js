Game.API = (() => {
    const req = function (url, options = {}) {
        return $.ajax(url, {
            method: 'get',
            data: false,
            contentType: "application/json",
            dataType: 'json',
            ...options
        })
    }

    return {
        req
    }
})()