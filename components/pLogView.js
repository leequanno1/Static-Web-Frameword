

const PLogView = {

  logs : [],

  renderAddPlayerLog(historyLog) {
    return `
      <div class="log-item add-log">
        <div class="title-wrapper">
          <span class="log-title add-title">ADD</span>
          <span class="log-time">${fwTimeFormat(historyLog.time)}</span>
          <button class="expand" onclick="PLogView.onToggleClick(event)"><i class="fa-solid fa-angle-down"></i></button>
        </div>
        <div class="log-des add-des">
          <span>${historyLog.data.players[0].name}</span>
        </div>
      </div>
    `;
  },

  renderDelPlayerLog(historyLog) {
    return `
      <div class="log-item add-log">
        <div class="title-wrapper">
          <span class="log-title delete-title">DELETE</span>
          <span class="log-time">${fwTimeFormat(historyLog.time)}</span>
          <button class="expand" onclick="PLogView.onToggleClick(event)"><i class="fa-solid fa-angle-down"></i></button>
        </div>
        <div class="log-des del-des">
          <span>${historyLog.data.players[0].name}</span>
        </div>
      </div>
    `;
  },

  renderMatchResultLog(historyLog) {
    return `
      <div class="log-item add-log">
        <div class="title-wrapper">
          <span class="log-title res-title">MATCH RESULT</span>
          <span class="log-time">${fwTimeFormat(historyLog.time)}</span>
          <button class="expand" onclick="PLogView.onToggleClick(event)"><i class="fa-solid fa-angle-down"></i></button>
        </div>
        <div class="log-des res-des">
          <div class="item-row dealer">
            <span class="name">Dealer</span>
            <span class="money">${historyLog.data.dealerMoney} $</span>
          </div>
          ${historyLog.data.players.map(_player => {
            return `
              <div class="item-row player">
                <span class="name">${_player.name}</span>
                <span class="money">${_player.money} $</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  },

  onToggleClick(e) {
    if (e.target.closest(".expand")) {
      e.target.closest(".log-item").classList.toggle("open");
    }
  },

  fcLogComponent(historyLogs) {
    return historyLogs.map(log => {
      switch (log.logType) {
        case EHistoryLog.LOG_ADD_PLAYER:
          return this.renderAddPlayerLog(log);
        case EHistoryLog.LOG_DELETE_PLAYER:
          return this.renderDelPlayerLog(log);
        case EHistoryLog.LOG_MATCH_RESULT:
          return this.renderMatchResultLog(log);
        default:
          break;
      }
    }).join(" ");
  },

  showClearStoratePopup() {
    let popup = PU_CLEAR_STORATE_CONFIRM;
    popup.show("PLogView.clearData()")
  },

  clearData() {
    fwClearStorateData();
    location.reload(true);
  },

  /**
   *
   * @param {EPlayer} player
   */
  render() {

    const _logsO = fwGetObjectFromStorate("LID");
    if (!!_logsO) {
      this.logs = _logsO.map((log) =>
        Object.assign(new EHistoryLog("", ""), log),
      );
    }

    return `
          <div><h1 style="margin: 10px;">Logs view</h1></div>
          <div class="log-list-container" style="margin-bottom: 40px;">
            ${this.fcLogComponent(this.logs)}
          </div>
          <div class="log-action">
            <a href="${getRedirectLink("/")}">Go back</a>
            <button onclick="PLogView.showClearStoratePopup()">Clear data</button>
          </div>
        `;
  },
};

renderPage(PLogView);