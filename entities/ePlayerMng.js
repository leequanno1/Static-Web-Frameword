// import "../fws/entitybase/eEntityBase"
// import "../scripts/localStorateMng"
// import "./ePlayer"

/**
 * 
 */
class EPlayerMng extends EEntityBase{

    constructor() {
        super();
        this.players = []; 
    }

    /**
     * 
     * @param {EPlayer} player 
     */
    addPlayer(player) {
        this.players.push(player);
    }

    /**
     * 
     * @param {string} playerId 
     */
    removePlayer(playerId) {
        this.players = this.players.filter(item => item.id !== playerId);
    }

    /**
     * 
     * @returns 
     */
    getEntityId() {
        return "E_PLAYER_MNG";
    }

    /**
     * 
     */
    saveToStorate() {
        // call save storate function method
        saveLocalStorate(this.getEntityId(), this);
    }

    static fromJsonObject(jsonObject) {

        return Object.assign(new EPlayerMng(), jsonObject);
    }

    static fromJsonString(jsonString) {

        const jsonObject = JSON.parse(jsonString);
        return Object.assign(new EPlayerMng(), jsonObject);
    }
}