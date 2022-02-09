class FeedbackWidget{
    constructor(elementId) {
        this._elementId = elementId;
    }

    get elementId() { //getter, set keyword voor setter methode
        return this._elementId;
    }

    show(message, type) {
        toggleFeedback(this.elementId)

        let element = $(`#${this.elementId}`);
        element.text(message);
        element.class = `alert alert-${(type === "success" ? type : "danger")}`;

        this.log({
            message: message,
            type: type
        })
    }

    hide(){
        toggleFeedback(this.elementId, false)
    }

    log(message) {
        let logItems = JSON.parse(localStorage.getItem("feedback_widget") || "[]");
        logItems.unshift(message);

        localStorage.setItem("feedback_widget", JSON.stringify(logItems.slice(0, 10)));
    }

    removeLog() {
        localStorage.removeItem("feedback_widget")
    }

    history() {
        console.log('history!')

        let logItems = JSON.parse(localStorage.getItem("feedback_widget") || "[]");
        for (let logItemsKey in logItems) {
            let item = logItems[logItemsKey];
            console.log(`${parseInt(logItemsKey) + 1}. type ${item.type} - ${item.message}`)
        }
    }
}

function toggleFeedback(elementId, show = true) {
    document.getElementById(elementId).style.display = ((show) ? "block" : "none");
}