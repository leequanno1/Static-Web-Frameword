const CPlayer = {

    CONST_HIDDEN_INPUT_MATCH_RES    : "hip_mr_",

    CONST_HIDDEN_INPUT_PLAYER_MONEY : "hip_pm_",

    CONST_PLAYER_MONEY_WRAPPER      : "pm_wrapper_",

    CONST_PLAYER_MONEY              : "pm_",

    CONST_BTN_SUBTRACT              : "btn_subtract_",

    CONST_BTN_PLUS                  : "btn_plus_",

    CONST_MONEY_POINT               : "ip_mp_",

  /**
   *
   * @param {String} id player id
   * @returns integer player match result
   */
  getMatchResult(id) {
    let input = document.getElementById(`${this.CONST_HIDDEN_INPUT_MATCH_RES}${id}`);
    return parseInt(input.value);
  },

  /**
   *
   * @param {String} id player id
   * @returns integer player money
   */
  getPlayerMoney(id) {
    let input = document.getElementById(`${this.CONST_HIDDEN_INPUT_PLAYER_MONEY}${id}`);
    return parseInt(input.value);
  },

  /**
   * DOM after end match and calc player money
   * @param {String} id player id
   */
  domUpdate(id) {
    let newMN = this.getPlayerMoney(id) + this.getMatchResult(id);
    document.getElementById(`${this.CONST_HIDDEN_INPUT_PLAYER_MONEY}${id}`).value = newMN;
    let mnSpan = document.getElementById(`${this.CONST_PLAYER_MONEY}${id}`);
    let mnWrapper = document.getElementById(`${this.CONST_PLAYER_MONEY_WRAPPER}${id}`);
    // update css
    if (newMN >= 0) {
      mnWrapper.classList.remove("ng-money");
      mnWrapper.classList.add("ps-money");
    } else {
      mnWrapper.classList.remove("ps-money");
      mnWrapper.classList.add("ng-money");
    }
    // update text money
    mnSpan.textContent = newMN;
    // reset match result
    this.setMatchResult(id, 0);
    // unlock input
    document.getElementById(`${this.CONST_MONEY_POINT}${id}`).disabled = false;
    // enable action button
    document.getElementById(`${this.CONST_BTN_SUBTRACT}${id}`).disabled = true;
    document.getElementById(`${this.CONST_BTN_PLUS}${id}`).disabled = true;
  },

  domPrepare(id) {
    // enable action button and lock input
    document.getElementById(`${this.CONST_BTN_PLUS}${id}`).disabled = false;
    document.getElementById(`${this.CONST_BTN_SUBTRACT}${id}`).disabled = false;
    document.getElementById(`${this.CONST_MONEY_POINT}${id}`).disabled = true;
  },

  domReset(id) {
    // enable action button and lock input
    document.getElementById(`${this.CONST_BTN_PLUS}${id}`).disabled = true;
    document.getElementById(`${this.CONST_BTN_SUBTRACT}${id}`).disabled = true;
    document.getElementById(`${this.CONST_MONEY_POINT}${id}`).disabled = false;
  },

  plusMN(id) {
    let hipMatchRes = document.getElementById(`${this.CONST_HIDDEN_INPUT_MATCH_RES}${id}`);
    let matchPoints = document.getElementById(`${this.CONST_MONEY_POINT}${id}`);
    // check state
    if (matchPoints.value != 0) {
      if (hipMatchRes.value == 0) {
        hipMatchRes.value = parseInt(matchPoints.value);
        document.getElementById(`${this.CONST_BTN_SUBTRACT}${id}`).disabled = true;
      } else {
        hipMatchRes.value = 0;
        document.getElementById(`${this.CONST_BTN_SUBTRACT}${id}`).disabled = false;
      }
    }
  },

  subtractMN(id) {
    let hipMatchRes = document.getElementById(`${this.CONST_HIDDEN_INPUT_MATCH_RES}${id}`);
    let matchPoints = document.getElementById(`${this.CONST_MONEY_POINT}${id}`);
    // check state
    if (matchPoints.value != 0) {
      if (hipMatchRes.value == 0) {
        hipMatchRes.value = parseInt(matchPoints.value) * -1;
        document.getElementById(`${this.CONST_BTN_PLUS}${id}`).disabled = true;
      } else {
        hipMatchRes.value = 0;
        document.getElementById(`${this.CONST_BTN_PLUS}${id}`).disabled = false;
      }
    }
  },

  /**
   *
   * @param {String} id
   * @param {Int} point
   */
  setMatchResult(id, point) {
    document.getElementById(`${this.CONST_HIDDEN_INPUT_MATCH_RES}${id}`).value = point;
  },

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
                <div id="${this.CONST_PLAYER_MONEY_WRAPPER}${_player.id}" class="money ${_player.money < 0 ? "ng-money" : "ps-money"}">
                    <span id="${this.CONST_PLAYER_MONEY}${_player.id}">${_player.money}</span> $
                    <input id="${this.CONST_HIDDEN_INPUT_PLAYER_MONEY}${_player.id}" value="${_player.money}" type="hidden"/>
                </div>
                </div>
                <div class="action-zone">
                <button id="${this.CONST_BTN_SUBTRACT}${_player.id}" disabled class="btn-action" onclick="CPlayer.subtractMN('${_player.id}')">
                    -
                </button>
                <input
                    type="text"
                    name="playerMondyInput_$id"
                    id="${this.CONST_MONEY_POINT}${_player.id}"
                    class="input-money"
                    value="0"
                />
                <input id="${this.CONST_HIDDEN_INPUT_MATCH_RES}${_player.id}" value="0" type="hidden"/>
                <button id="${this.CONST_BTN_PLUS}${_player.id}" disabled class="btn-action" onclick="CPlayer.plusMN('${_player.id}')">
                    +
                </button>
                </div>
            </div>
        `;
  },
};
