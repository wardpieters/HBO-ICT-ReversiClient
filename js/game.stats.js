Game.Stats = (() => {
    let configMap = {}

    const init = () => {
        let stats = getStats();
        let labels = [...Array(stats?.length).keys()].map(a => `Zet ${a+1}`)

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Zwart',
                    backgroundColor: 'black',
                    data: getGraphData('black'),
                },
                {
                    label: 'Wit',
                    backgroundColor: 'darkgray',
                    data: getGraphData('white'),
                }
            ]
        };

        configMap.chartOne = new Chart(
            document.getElementById('graph_1'),
            {
                type: 'bar',
                data,
                options: {
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true
                        }
                    }
                }
            }
        );
    }

    const getStats = () => JSON.parse(localStorage.getItem('GameStats')) ?? [];

    const updateStats = (gameData) => {
        let state = getStats()

        state.push({
            blackCount: gameData.stats.blackCount,
            whiteCount: gameData.stats.whiteCount,
            totalCount: gameData.stats.totalCount,
            timestamp: Date.now()
        });

        let newData = JSON.stringify(state);

        localStorage.setItem('GameStats', newData)

        updateGraphs()
    }

    const updateGraphs = () => {
        configMap.chartOne.destroy()
        init()
    }

    const getGraphData = (color) => {
        let data = getStats()
        let returnData = [];

        data.forEach((val, i) => {
            let pushValue = 2;

            if(i > 0) {
                if (color === 'black') pushValue = data[i - 1].blackCount;
                else pushValue = data[i - 1].whiteCount;
            }

            returnData.push(pushValue)
        })

        return returnData;
    }

    const clear = () => {
        localStorage.removeItem('GameStats');
    }

    return {
        init,
        updateStats,
        clear,
        getGraphData
    }
})()
