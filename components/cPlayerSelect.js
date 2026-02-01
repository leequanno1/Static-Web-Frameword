const SELECT_PLAYER_LIST_STATE = {

}

const CPlayerSelect = {

    /**
     * Convert date to string format
     * @param {Date} time 
     */
    timeConverter(time) {
        const _time = new Date(time);
        const pad = (n) => String(n).padStart(2, "0");

        const dd = pad(_time.getDate());
        const MM = pad(_time.getMonth() + 1);
        const yy = String(_time.getFullYear()).slice(-2);
        const hh = pad(_time.getHours());
        const mm = pad(_time.getMinutes());

        return `${dd}/${MM}/${yy} ${hh}:${mm}`;
    },

    onCheckInput(event, id) {
        let input = event.target;
        if (input.checked) {
            PAGE_STATE.addSelectedId(id);
        } else {
            PAGE_STATE.removeSelectedId(id);
        }
    },

    render(player) {
        const _player = Object.assign(new EPlayer("", ""), player);
        return `
            <label class="player-item select-able" for="chk_${_player.id}" style="height: 47px">
                <input type="checkbox" id="chk_${_player.id}" oninput="CPlayerSelect.onCheckInput(event, '${_player.id}')" style="margin-right: 10px" />
                <div class="player-name" style="flex: 1; text-align: left">
                    ${_player.name}
                </div>
                <span class="time-zone">${CPlayerSelect.timeConverter(_player.time)}</span>
            </label>
        `;
    }
}