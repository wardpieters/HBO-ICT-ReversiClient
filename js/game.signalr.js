Game.SignalR = (() => {
    let configMap = {}
    let connection = null;

    const init = async (apiUrl, onMovementUpdate) => {
        configMap.apiUrl = apiUrl;
        await SetupConnection(onMovementUpdate);
    }

    const SetupConnection = async (onMovementUpdate) => {
        connection = new signalR.HubConnectionBuilder().withUrl(configMap.apiUrl, {
            //withCredentials: false
        }).build();

        connection.on("ReceiveMovementUpdate", () => {
            onMovementUpdate()
        });

        await connection.start();
    }

    return {
        init
    }
})()
