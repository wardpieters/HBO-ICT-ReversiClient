class FeedbackWidget{
    constructor(elementId) {
        this._elementId = elementId;
    }

    get elementId() {
        return this._elementId;
    }

    generateIcon(success = true) {
        return (success ? `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.877px" height="101.052px" viewBox="0 0 122.877 101.052" enable-background="new 0 0 122.877 101.052" xml:space="preserve"><g><path d="M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z"/></g></svg>` :
            `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>`);
    }

    generateButtons(success = 'OK', danger = false) {
        return `<button type="button" class="btn btn-success">${success}</button>` +
            (danger !== false ? `<button type="button" class="btn btn-danger ml-3">${danger}</button>` : '');
    }

    show(message, type) {
        jQuery(`#${this.elementId}`).show()

        let element = $(`#${this.elementId}`);
        element.html('');
        element.removeAttr('class');
        element.addClass(`alert alert-${(type === "success" ? type : "danger")}`);

        let icon = document.createElement('div');
        icon.innerHTML = this.generateIcon(type === "success");
        icon.className = 'd-inline-block mr-3';
        element.append(icon);

        let text = document.createElement('p');
        text.innerText = message;
        text.className = 'd-inline-block';
        element.append(text);

        let buttons = document.createElement('div');
        buttons.className = "d-flex justify-content-md-end";
        buttons.innerHTML = this.generateButtons("Akkoord", "Weigeren");
        element.append(buttons);

        this.log({
            message: message,
            type: type
        })
    }

    hide() {
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
    if (show) {
        jQuery(`#${elementId}`).fadeIn(250);
    } else {
        jQuery(`#${elementId}`).fadeOut(250);
    }
}
