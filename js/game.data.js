Game.Data = (() => {
    const req = function (url, data = false, method = 'get') {
        return $.ajax(url, {
            method: method,
            data: data,
            contentType: "application/json",
        })
            .then(data => {
                return data;
            })
            .catch(e => {
                console.error(e.message);
            });
    }

    return {
        req
    }
})()