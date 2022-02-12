Game.Model = (() => {
    let configMap = {
        username: ""
    }

    const privateInit = function() {
        console.log('Model init', configMap);
    }

    return {
        init: privateInit
    }
})()