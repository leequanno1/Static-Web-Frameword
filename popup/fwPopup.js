class FwPopup {
    constructor(title, description = "", hasCancel = true) {
        this.id = fwGenerateId("PU");
        this.title = title;
        this.description = description;
        this.hasCancel = hasCancel;
    }

    /**
     * 
     * @param {String} onAccept action name alias 
     */
    show(onAccept) {
        const div = document.createElement("div");
        div.id = this.id;
        div.classList.add("overlay");
        div.innerHTML = `
            <div class="popup-form">
                <div class="popup-title">${this.title}</div>
                <div class="popup-des">${this.description}</div>
                <div style="display: flex;justify-content: end;gap: 10px;">
                    <button class="button-primary" onclick="(function(){${onAccept}})()">${this.hasCancel?"Accept":"Ok"}</button>
                    ${this.hasCancel?`<button class="button-secondary" onclick="(function(){FwPopup.remove('${this.id}')})()">Cancel</button>`:""}
                </div>
            </div>
        `;

        document.body.appendChild(div);
    }

    static remove(id) {
        document.body.removeChild(document.getElementById(id));
    }
}