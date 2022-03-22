const Game = ((url) => {
    let config = {
        api : url,
    }

    const privateInit = function(){
        console.log('Private information!');
    }
    return {
        init: privateInit,
    }
})('/api/url')
