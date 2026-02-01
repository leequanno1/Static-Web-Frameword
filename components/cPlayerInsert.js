const CPlayerInsert = {

    playerName : "",

    onInput(event) {
        let input = event.target;
        this.playerName = input.value;
    },

    setPlayerName(playerName){
        this.playerName = playerName;
        document.getElementById("playerNameInput").value = playerName;
    },

    addPlayer(event) {
        // add to player list in PAGE_STATE
        event.preventDefault();
        if (!this.playerName.trim()) {
            // open pupup
            let popup = PU_BLANK_PLAYER_NAME;
            popup.show(`CPlayerInsert.popupClose('${popup.id}')`);
            return;
        }
        const _player = new EPlayer(fwGenerateId(PLAYER_ID_H), this.playerName.trim());
        PAGE_STATE.players.push(_player);
        PAGE_STATE.domReloadPlayes();
        this.setPlayerName("");
        fwBoxInvisible("insertPlayerContainer");
        // save to storate
        fwSaveLocalStorate(PLAYER_ID_H, PAGE_STATE.players);
        // TODO: save log
        PAGE_STATE.addLog(EHistoryLog.LOG_ADD_PLAYER, [_player]);
    },

    popupClose(popupId) {
        FwPopup.remove(popupId);
    },

    cancelAddPlayer(event) {
        event.preventDefault();
        this.setPlayerName("");
        fwBoxInvisible("insertPlayerContainer");
    },

    inputFocus() {
        document.getElementById("playerNameInput").focus();
    },

    preventSubmitAction(event) {
        event.preventDefault();
    },

    render() {
        return `
            <form onsubmit="preventSubmitAction(event)" id="insertPlayerForm" class="player-item insertable" style="height: 47px">
                <input class="player-name-input" id="playerNameInput" type="text" oninput="CPlayerInsert.onInput(event)"/>
                <div></div>
                <button
                    class="btn-action ps-money"
                    style="margin-right: 5px; border: none; color: var(--white)"
                    onclick="CPlayerInsert.addPlayer(event)"
                    type="submit"
                >✓</button>
                
                <button
                    type="button"
                    class="btn-action ng-money"
                    style="border: none; color: var(--white)"
                    onclick="CPlayerInsert.cancelAddPlayer(event)"
                >X</button>
            </form>
        `;
    }
}