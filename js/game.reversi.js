Game.Reversi = (() => {
    let configMap = {
        colors: {
            0: 'Geen',
            1: 'Wit',
            2: 'Zwart',
        }
    }

    const privateInit = async (apiUrl, options = {}, afterInit) => {
        configMap.apiUrl = apiUrl.replace(/\/$/, '');
        configMap.gameToken = options.gameToken;
        configMap.playerToken = options.playerToken;
        await setupGameBoard()
        registerHandlers()
        await SetupSignalR()
        afterInit()
    }

    const onMove = async (x, y) => {
        Game.Data.req(`${configMap.apiUrl}/game/${configMap.gameToken}/move`, {
            data: JSON.stringify({
                playerToken: configMap.playerToken,
                x: x,
                y: y,
            }),
            method: 'post'
        }).then(data => {
            configMap.currentGame = data;
            populateBoard(data.bord)
        }).catch(e => fancyError(e))
    }

    const registerHandlers = () => {
        $('#game_board > div').click(function () {
            if ($(this).hasClass('active')) return;

            let index = $(this).index();

            let y = index % 8;
            let x = (index - y) / 8;

            onMove(x, y)
        })

        $('#skip_turn').click(async function () {
            await Game.Data.req(`${configMap.apiUrl}/game/${configMap.gameToken}/${configMap.playerToken}/skip`, {
                beforeSend: () => $('#skip_turn').addClass('loading'),
                complete: () => $('#skip_turn').removeClass('loading'),
            })
                .then((data) => {
                    configMap.currentGame = data;
                    populateBoard(data.bord)

                    Swal.fire({
                        title: 'Beurt overgeslagen',
                        text: `Je hebt een beurt overgeslagen. ${configMap.colors[configMap.currentGame.aandeBeurt] + " is nu aan de beurt!"}`,
                        confirmButtonText: 'Sluiten'
                    })
                })
                .catch(e => fancyError(e))
        })
    }

    const setupGameBoard = async () => {
        let gameData = await getGame()
        configMap.currentGame = gameData;

        populateBoard(gameData.bord)
    }

    const SetupSignalR = async () => {
        try {
            await Game.SignalR.init(`${configMap.apiUrl}/hub`, () => {
                setupGameBoard()
            })
            console.log('SignalR done!')
        } catch (e) {
            console.log('SignalR error!')
        }
    }

    const populateBoard = (board) => {
        $(`#game_board > div`).removeClass('active white black');

        for (let i in board) {
            let row = board[i];

            for (let j in row) {
                let value = row[j];

                if (value > 0) {
                    let nth = parseInt(j) + (parseInt(i) * 8);
                    $(`#game_board > div:eq(${nth})`).addClass(`active ${value === 1 ? "white" : "black"}`)
                }
            }
        }

        if (configMap.currentGame.gameFinished) {
            Swal.fire({
                title: 'Spel afgelopen',
                text: configMap.currentGame.gameWinner === 0 ? "Het is gelijkspel!" : (configMap.colors[configMap.currentGame.gameWinner] + " heeft gewonnen!"),
                showCancelButton: true,
                confirmButtonText: '<a class="text-white" href="/">Terug naar het overzicht</a>',
                cancelButtonText: 'Sluiten'
            })
        }
    }

    const fancyError = (e) => {
        let msg = e.responseJSON ? e.responseJSON.message : "Onbekende fout";

        Swal.fire({
            title: 'Er is een fout opgetreden',
            icon: 'error',
            text: msg,
            confirmButtonText: 'Sluiten'
        })
    }

    const getGame = async () => {
        return await Game.Data.req(`${configMap.apiUrl}/game/${configMap.gameToken}`)
            .then(data => {
                return data;
            }).catch(e => fancyError(e))
    }

    return {
        init: privateInit
    }
})()
