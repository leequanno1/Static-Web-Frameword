class EHistoryLog extends EEntityBase {

    static LOG_ADD_PLAYER = 1;
    static LOG_DELETE_PLAYER = 2;
    static LOG_MATCH_RESULT = 3;

    constructor(id, logType, data = undefined) {
        super();
        this.id = id;
        this.logType = logType;
        this.data = data;
        this.time = new Date();
    }

    /**
     * 
     * @returns log id
     */
    getEntityId() {
        return this.id;
    }

    static fcAddPlayerLog(players) {
        return new EHistoryLog(
            fwGenerateId(LOG_ID_H), 
            this.LOG_ADD_PLAYER, 
            {
                players: players.map(pl => {
                    return {
                        id: pl.id,
                        name: pl.name,
                        money: pl.money
                    };
                }),
            });
    }

    static fcDeletePlayerLog(players) {
        return new EHistoryLog(
            fwGenerateId(LOG_ID_H), 
            this.LOG_DELETE_PLAYER, 
            {
                players: players.map(pl => {
                    return {
                        id: pl.id,
                        name: pl.name,
                        money: pl.money
                    };
                }),
            });
    }

    static fcMatchResultLog(dealerMoney, playerInfs) {
        return new EHistoryLog(
            fwGenerateId(LOG_ID_H), 
            this.LOG_MATCH_RESULT, 
            {
                dealerMoney: dealerMoney,
                players: playerInfs.map(pl => {
                    return {
                        id: pl.id,
                        name: pl.name,
                        money: pl.money
                    };
                }),
            });
    }

}