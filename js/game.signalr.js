Game.SignalR = (() => {
    let configMap = {}
    let connection = null;

    const init = async (apiUrl, gameToken, onMovementUpdate, onPlayerLeave, onPlayerJoin, onPlayerSkip) => {
        configMap.apiUrl = apiUrl;
        await SetupConnection(gameToken, onMovementUpdate, onPlayerLeave, onPlayerJoin, onPlayerSkip);
    }

    const SetupConnection = async (gameToken, onMovementUpdate, onPlayerLeave, onPlayerJoin, onPlayerSkip) => {
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

        connection.on("JoinPlayerUpdate", (providedGameToken) => {
            if(gameToken === providedGameToken) {
                onPlayerJoin()
            }
        });

        connection.on("ReceiveSkipUpdate", (providedGameToken) => {
            if(gameToken === providedGameToken) {
                onPlayerSkip()
            }
        });

        await connection.start();
    }

    return {
        init
    }
})()
