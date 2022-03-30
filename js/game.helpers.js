Game.Helpers = (() => {
    const fancyError = (e) => {
        let msg = e.responseJSON ? e.responseJSON.message : "Onbekende fout";

        Swal.fire({
            title: 'Er is een fout opgetreden',
            icon: 'error',
            text: msg,
            confirmButtonText: 'Sluiten'
        })
    }

    const getRandomItem = (arr) => {
        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        return arr[randomIndex];
    }

    return {
        fancyError,
        getRandomItem
    }
})()
