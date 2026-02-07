const PLAYER_ID_H = "PID";

const LOG_ID_H = "LID";

const PAGE_STATE = {
  players: [],

  logs: [],

  slectedIds: [],

  initPageData() {
    // get object data
    const _playersO = fwGetObjectFromStorate(PLAYER_ID_H);
    const _logsO = fwGetObjectFromStorate(LOG_ID_H);
    // map data
    if (!!_playersO) {
      this.players = _playersO.map((player) =>
        Object.assign(new EPlayer("", ""), player),
      );
    }
    if (!!_logsO) {
      this.logs = _logsO.map((log) =>
        Object.assign(new EHistoryLog("", ""), log),
      );
    }
    CDealder.dealerMoney = this.players.reduce((pre, pl) => pre + pl.money, 0) * (-1);
  },

  /**
   *
   * @param {EPlayer} player
   */
  addPlayer(player) {
    this.players.push;
  },

  findPlayerById(id) {
    return this.players.find((_player) => _player.id === id);
  },

  /**
   *
   * @param {int} type
   * @param {object} data
   */
  addLog(type, players, dealderMoney = null) {
    let _log;
    switch (type) {
      case EHistoryLog.LOG_ADD_PLAYER:
        _log = EHistoryLog.fcAddPlayerLog(players);
        break;
      case EHistoryLog.LOG_DELETE_PLAYER:
        _log = EHistoryLog.fcDeletePlayerLog(players);
        break;
      case EHistoryLog.LOG_MATCH_RESULT:
        _log = EHistoryLog.fcMatchResultLog(dealderMoney, players);
        break;
      default:
        return;
    }

    this.logs.unshift(_log);
    fwSaveLocalStorate(LOG_ID_H, this.logs);
  },

  removePlayer() {
    if (!this.slectedIds.length) {
      this.domReloadSelectPlayers();
      fwBoxInvisible("playerContainer");
      fwBoxInvisible("btnOpenAddNew");
      fwBoxInvisible("insertPlayerContainer");
      fwBoxVisible("selectPlayerContainer");
      fwBoxVisible("btnDeleteSlt");
      CPlayerInsert.setPlayerName("");
    } else {
      let popup = PU_DELETE_PLAYER;
      popup.show(`PAGE_STATE.doRemovePlayer('${popup.id}')`);
    }
  },

  doRemovePlayer(popupId) {
    // remove from player list and select list
    const _players = [
      ...this.players.filter((player) => this.slectedIds.includes(player.id)),
    ];
    this.players = this.players.filter(
      (player) => !this.slectedIds.includes(player.id),
    );
    this.slectedIds = [];
    this.domReloadPlayes();
    // dom UI
    fwBoxInvisible("selectPlayerContainer");
    fwBoxVisible("btnOpenAddNew");
    fwBoxVisible("playerContainer");
    FwPopup.remove(popupId);
    // save to storate
    fwSaveLocalStorate(PLAYER_ID_H, this.players);
    this.addLog(EHistoryLog.LOG_DELETE_PLAYER, _players);
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
    this.slectedIds = this.slectedIds.filter((item) => item !== id);
    if (this.slectedIds.length === 0) {
      fwBoxInvisible("selectPlayerContainer");
      fwBoxVisible("btnOpenAddNew");
      fwBoxVisible("playerContainer");
    }
  },

  renderNewGameAction() {
    document.getElementById();
  },

  renderNGConfirmAction() {
    // dom confirm actions
    document.getElementById("actionDoomSession").innerHTML = `
            <button onclick="PAGE_STATE.onNewGameCancelClick()" class="btn-secondary">Cancel</button>
            <button onclick="PAGE_STATE.onEndGameClick()" class="btn-primary">End round</button>
        `;
  },

  onNewGameClick() {
    // DOM prepare
    for (player of this.players) {
      CPlayer.domPrepare(player.id);
    }
    // hide add player button
    fwBoxInvisible("btnOpenAddNew");
    // reder confirm actions
    this.renderNGConfirmAction();
  },

  onNewGameCancelClick() {
    // DOM preset players
    for (player of this.players) {
      CPlayer.domReset(player.id);
    }
    // show button add player
    fwBoxVisible("btnOpenAddNew");
    // DOM new game button
    document.getElementById("actionDoomSession").innerHTML = `
            <button class="btn-primary" onclick="PAGE_STATE.onNewGameClick()">New game</button>
        `;
  },

  onEndGameClick() {
    // open confirm popup
    let popup = PU_ENDMATCH_CONFIRM;
    popup.show(`PAGE_STATE.onEndGameConfirmClick('${popup.id}')`);
  },

  /**
   *
   * @param {String} popupId
   */
  onEndGameConfirmClick(popupId) {
    // get total score dealer will be add
    let totalAddScore = 0;
    let matchRes = 0;
    // cacl total add score
    for (player of this.players) {
      matchRes = CPlayer.getMatchResult(player.id);
      totalAddScore += -1 * matchRes;
      player.money += matchRes;
    }
    // update dealer money
    CDealder.addMoney(totalAddScore);
    // DOM player record data
    for (player of this.players) {
      CPlayer.domUpdate(player.id);
    }
    // show button add player
    fwBoxVisible("btnOpenAddNew");
    // DOM new game button
    document.getElementById("actionDoomSession").innerHTML = `
            <button class="btn-primary" onclick="PAGE_STATE.onNewGameClick()">New game</button>
        `;
    FwPopup.remove(popupId);
    // Add end match log
    this.addLog(
      EHistoryLog.LOG_MATCH_RESULT,
      this.players,
      CDealder.dealerMoney,
    );
    // update players storate data
    fwSaveLocalStorate(PLAYER_ID_H, PAGE_STATE.players);
  },

  openInsertBox() {
    fwBoxVisible("insertPlayerContainer");
    requestAnimationFrame(() => {
      CPlayerInsert.inputFocus();
    });
  },

  // DOM SESSION
  domReloadPlayes() {
    // rerender from from players array
    let reloadedContent = this.players
      .map((player) => CPlayer.render(player))
      .join(" ");
    document.getElementById("playerContainer").innerHTML = reloadedContent;
    this.domTotalPlayers();
  },

  domReloadSelectPlayers() {
    // rerender from from players array
    let reloadedContent = this.players
      .map((player) => CPlayerSelect.render(player))
      .join(" ");
    document.getElementById("selectPlayerContainer").innerHTML =
      reloadedContent;
    this.domTotalPlayers();
  },

  domTotalPlayers() {
    document.getElementById("playerTotal").innerHTML = this.players.length;
  },
};

PAGE_STATE.initPageData();

const PMain = {
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
                <button id="btnOpenAddNew" class="add-new-button" onclick="PAGE_STATE.openInsertBox()"><i class="fa-solid fa-plus"></i></button>
                <span style="width:10px"></span>
                <button id="btnDeleteSlt" class="add-new-button" onclick="PAGE_STATE.removePlayer()"><i class="fa-regular fa-trash-can"></i></button>
            </div>

            <!-- player item input -->
            <div id="insertPlayerContainer" class="display-none">
                ${CPlayerInsert.render()}
            </div>

            <!-- player items -->
            <div class="player-container dont-select" id="playerContainer">
                ${PAGE_STATE.players.map((ply) => CPlayer.render(ply)).join("")}
            </div>

            <!-- player items -->
            <div id="selectPlayerContainer" class="display-none dont-select">
                ${PAGE_STATE.players.map((ply) => CPlayerSelect.render(ply)).join("")}
            </div>
            
            <div class="game-action-session" id="actionDoomSession">
                <button class="btn-primary" onclick="PAGE_STATE.onNewGameClick()">New game</button>
            </div>
        `;
  },
};

renderPage(PMain);
