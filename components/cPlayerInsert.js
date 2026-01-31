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

    addPlayer() {
        // TODO: construct new player with ID
        // add to player list in PAGE_STATE
        PAGE_STATE.players.push(new EPlayer(fwGenerateId(PLAYER_ID_H), this.playerName.trim()));
        PAGE_STATE.domReloadPlayes();
        this.setPlayerName("");
        fwBoxInvisible("insertPlayerContainer");
    },

    cancelAddPlayer() {
        this.setPlayerName("");
        fwBoxInvisible("insertPlayerContainer");
    },

    render() {
        return `
            <div class="player-item insertable" style="height: 47px">
                <input class="player-name-input" id="playerNameInput" type="text" oninput="CPlayerInsert.onInput(event)"/>
                <div></div>
                <button
                    class="btn-action ps-money"
                    style="margin-right: 5px; border: none; color: var(--white)"
                    onclick="CPlayerInsert.addPlayer()"
                >✓</button>
                
                <button
                    class="btn-action ng-money"
                    style="border: none; color: var(--white)"
                    onclick="CPlayerInsert.cancelAddPlayer()"
                >X</button>
            </div>
        `;
    }
}