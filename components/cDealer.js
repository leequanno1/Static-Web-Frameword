const CDealder = {

  dealerMoney: 0,

  addMoney(addedMoney) {
    // update dealder money
    this.dealerMoney += addedMoney;
    // DOM data
    document.getElementById("dealerMoney").innerHTML = this.dealerMoney;
    let wrapper = document.getElementById("dealerMoneyWrapper");
    if (this.dealerMoney < 0) {
        wrapper.classList.add("ng-money");
        wrapper.classList.remove("ps-money");
    } else {
        wrapper.classList.add("ps-money");
        wrapper.classList.remove("ng-money");
    }
  },

  render(dealer) {
    return `
            <div class="dealer-container">
                <span style="font-weight: 600; font-size: 18px">Dealer</span>
                <span class="money ${this.dealerMoney < 0 ? "ng-money" : "ps-money"}" id="dealerMoneyWrapper" style="margin-left: 50px"
                    ><span id="dealerMoney">${this.dealerMoney}</span> $
                </span>
            </div>
        `;
  },
};
