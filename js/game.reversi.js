Game.Reversi = (() => {
    let configMap = {}

    const privateInit = function(url) {
        configMap.api = url;
        console.log('Private information!', configMap);
    }

    return {
        init: privateInit
    }
})()