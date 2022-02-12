Game.Data = (() => {
    let configMap = {}

    const privateInit = function() {
        console.log('Data init', configMap);
    }

    return {
        init: privateInit
    }
})()