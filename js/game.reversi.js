Game.Reversi = (() => {
    let configMap = {}

    const privateInit = async (apiUrl, gameToken, afterInit) => {
        configMap.apiUrl = apiUrl.replace(/\/$/, '');
        configMap.gameToken = gameToken;
        await setupGameBoard()
        registerHandlers()
        afterInit()
    }

    const onMove = async (x, y) => {
        console.log(x, y, configMap.currentGame)

         await Game.Data.req(`${configMap.apiUrl}/game/${configMap.gameToken}/move`, JSON.stringify({
             playerToken: configMap.currentGame.player1Token,
             x: x,
             y: y,
         }), 'post');
    }

    const registerHandlers = () => {
        $('#game_board > div').click(function() {
            let index = $(this).index();

            let y = index % 8;
            let x = (index - y) / 8;

            onMove(x, y)
        })

        $('#skip_turn').click(async function() {
            let a = await Game.Data.req(`${configMap.apiUrl}/game/${configMap.gameToken}/${configMap.currentGame.player1Token}/skip`);
            console.log(a);
        })
    }

    const setupGameBoard = async () => {
        let gameData = await getGame()
        configMap.currentGame = gameData;

        let board = gameData.bord;

        for (let i in board) {
            let row = board[i];

            for (let j in row) {
                let value = row[j];

                if(value > 0) {
                    let nth = parseInt(j) + (parseInt(i) * 8);
                    $(`#game_board > div:eq(${nth})`).addClass(`active ${value === 1 ? "white" : "black"}`)
                }
            }
        }
    }

    const getGame = async () => {
        return await Game.Data.req(`${configMap.apiUrl}/game/${configMap.gameToken}`);
    }

    return {
        init: privateInit
    }
})()
