Game.SignalR = (() => {
    let configMap = {}
    let connection = null;

    const init = async (apiUrl, gameToken, onMovementUpdate, onPlayerLeave) => {
        configMap.apiUrl = apiUrl;
        await SetupConnection(gameToken, onMovementUpdate, onPlayerLeave);
    }

    const SetupConnection = async (gameToken, onMovementUpdate, onPlayerLeave) => {
        connection = new signalR.HubConnectionBuilder().withUrl(configMap.apiUrl, {
            withCredentials: false
        }).build();

        connection.on("ReceiveMovementUpdate", (providedGameToken) => {
            if(gameToken === providedGameToken) {
                onMovementUpdate()
            }
        });

        connection.on("LeavePlayerUpdate", (providedGameToken) => {
            if(gameToken === providedGameToken) {
                onPlayerLeave()
            }
        });

        await connection.start();
    }

    return {
        init
    }
})()
