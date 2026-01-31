const PLAYER_ID_H = "PID";

const LOG_ID_H = "LID";

const PAGE_STATE = {

    players : [
        new EPlayer(fwGenerateId(PLAYER_ID_H), "Player1"),
        new EPlayer(fwGenerateId(PLAYER_ID_H), "Player2"),
        new EPlayer(fwGenerateId(PLAYER_ID_H), "Player3"),
    ],
    
    slectedIds : [],

    /**
     * 
     * @param {EPlayer} player 
     */
    addPlayer(player) {
        this.players.push
    },
    
    /**
     * 
     * @param {string} id 
     */
    getPlayerById(id) {

    },

    removePlayer() {
        let popup = new FwPopup("Delete player?", "bala", true);
        popup.show("PAGE_STATE.doRemovePlayer()"); 
    },

    doRemovePlayer() {
        alert("Niga");
    },

    /**
     * 
     * @param {string} id 
     */
    addSelectedId(id) {
        this.slectedIds.push(id);
    },

    /**
     * 
     * @param {string} id 
     */
    removeSelectedId(id) {
        this.slectedIds = this.slectedIds.filter(item => item !== id);
        if (this.slectedIds.length === 0) {
            fwBoxInvisible("selectPlayerContainer");
            fwBoxInvisible("btnDeleteSlt");
            fwBoxVisible("btnOpenAddNew");
            fwBoxVisible("playerContainer");
        }
    },
}

const PMain = {

    onAfterInit() {
        const el = document.getElementById("playerContainer");
        fwAddLongPress(el, ()=> {
            fwBoxInvisible("playerContainer");
            fwBoxInvisible("btnOpenAddNew");
            fwBoxInvisible("insertPlayerContainer");
            fwBoxVisible("selectPlayerContainer");
            fwBoxVisible("btnDeleteSlt");
            CPlayerInsert.setPlayerName("");
        });
    },

    /**
     * 
     * @param {EPlayer} player 
     */
    render() {
        // get

        return `
            ${CDealder.render({})}
            <div
                style="
                    margin-block: 10px;
                    padding-inline: 5px;
                    display: flex;
                    min-height: 25px;
                    align-items: center;
                "
            >
                Total player(<span id="playerTotal">${PAGE_STATE.players.length}</span>)
                <div style="display: inline-block; flex: 1"></div>
                <button id="btnOpenAddNew" class="add-new-button" onclick="fwBoxVisible('insertPlayerContainer')">+</button>
                <button id="btnDeleteSlt" class="add-new-button display-none" onclick="PAGE_STATE.removePlayer()">🗑</button>
            </div>

            <!-- player item input -->
            <div id="insertPlayerContainer" class="display-none">
                ${CPlayerInsert.render()}
            </div>

            <!-- player items -->
            <div class="player-container dont-select" id="playerContainer">
                ${PAGE_STATE.players.map(ply => CPlayer.render(ply)).join("")}
            </div>

            <!-- player items -->
            <div id="selectPlayerContainer" class="display-none dont-select">
                ${PAGE_STATE.players.map(ply => CPlayerSelect.render(ply)).join("")}
            </div>
        `;
    }
}

renderPage(PMain);