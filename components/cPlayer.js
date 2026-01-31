const CPlayer = {

    /**
     * 
     * @param {EPlayer} player 
     */
    render(player) {
        const _player = Object.assign(new EPlayer("", ""), player);
        return `
            <div class="player-item" id="${_player.id}">
                <div class="player-name">${_player.name}</div>
                <div class="money-zone">
                <div class="money ${_player.money < 0? "ng-money": "ps-money"}">
                    <span id="pm_${_player.id}">${_player.money}</span> $
                </div>
                </div>
                <div class="action-zone">
                <button class="btn-action" data-action="subtractMoney">
                    -
                </button>
                <input
                    type="text"
                    name="playerMondyInput_$id"
                    id="playerMondyInput_$id"
                    class="input-money"
                    value="0"
                />
                <button class="btn-action" data-action="addMoney">
                    +
                </button>
                </div>
            </div>
        `
    }
}