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
        configMap = {...configMap, ...options}

        await setupGameBoard()
        registerHandlers()
        await SetupSignalR()
        afterInit()
    }

    const setupGameBoard = async () => {
        let gameData = await getGame()
        updateGameBoard(gameData)
    }

    const updateGameBoard = (gameData) => {
        configMap.currentGame = gameData;

        updateGameState(gameData)
        populateBoard(gameData.game.bord)
    }

    const updateGameState = (gameData) => {
        $('#game_state').html(getTurnText(gameData));

        $('#game_black_count').html(`Zwart: ${gameData.stats.blackCount}`);
        $('#game_white_count').html(`Wit: ${gameData.stats.whiteCount}`);

        $('#game_progressbar').attr('aria-valuenow', gameData.stats.totalCount).width(`${(gameData.stats.totalCount / 40) * 100}%`)
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
            updateGameBoard(data)
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

        $('#skip_turn').click(skipTurn);
    }

    const skipTurn = async () => {
        await Game.Data.req(`${configMap.apiUrl}/game/${configMap.gameToken}/${configMap.playerToken}/skip`)
            .then((data) => {
                updateGameBoard(data)

                Swal.fire({
                    title: 'Beurt overgeslagen',
                    text: `Je hebt een beurt overgeslagen. ${getTurnText(data)}!`,
                    confirmButtonText: 'Sluiten'
                })
            })
            .catch(e => fancyError(e))
    }

    const SetupSignalR = async () => {
        try {
            await Game.SignalR.init(`${configMap.apiUrl}/hub`,
                configMap.gameToken,
                () => {
                    setupGameBoard()
                },
                () => {
                    setupGameBoard()

                    Swal.fire({
                        title: 'Speler geleaved',
                        text: 'Een speler heeft het spel verlaten. Nodig iemand anders uit, of verlaat het spel.',
                        confirmButtonText: 'Begrepen!',
                    })
                },
                () => {
                    setupGameBoard()
                },
            )

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

        if (configMap.currentGame.game.gameFinished) {
            gameFinished()
        }
    }

    const gameFinished = () => {
        $('#leave_game').prop('disabled', true);

        Swal.fire({
            title: 'Spel afgelopen',
            text: configMap.currentGame.game.gameWinner === 0 ? "Het is gelijkspel!" : (configMap.colors[configMap.currentGame.game.gameWinner] + " heeft gewonnen!"),
            showCancelButton: true,
            confirmButtonText: '<a class="text-white" href="/">Terug naar het overzicht</a>',
            cancelButtonText: 'Sluiten'
        })
    }
    
    const getTurnText = (data) => {
        let colorTurn = configMap.colors[configMap.currentGame.game.aandeBeurt];

        if (data.game.gameFinished) {
            return `Het spel is afgelopen`;
        }

        if (!data.isPlayable) {
            return `Wachten op spelers &hellip;`;
        }

        return (data.isMyTurn ? `Jij (${colorTurn.toLowerCase()}) bent` : colorTurn + " is") + " nu aan de beurt";
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
        return await Game.Data.req(`${configMap.apiUrl}/game/${configMap.gameToken}/${configMap.playerToken}`)
            .then(data => {
                return data;
            }).catch(e => fancyError(e))
    }

    return {
        init: privateInit
    }
})()
