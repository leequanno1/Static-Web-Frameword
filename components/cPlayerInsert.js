const CPlayerInsert = {

    playerName : "",

    onInput(event) {
        let input = event.target;
        CPlayer.playerName = input.value;
        console.log(CPlayer.playerName);
    },

    setPlayerName(playerName){
        this.playerName = playerName;
        document.getElementById("playerNameInput").value = playerName;
    },

    addPlayer() {
        // TODO: construct new player with ID
        // add to player list in PAGE_STATE
        this.setPlayerName("");
        fwBoxInvisible("insertPlayerContainer");
        console.log("Player added");
    },

    cancelAddPlayer() {
        this.setPlayerName("");
        fwBoxInvisible("insertPlayerContainer");
        console.log("Add cancel");
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