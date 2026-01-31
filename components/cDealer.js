const CDealder = {
  render(dealer) {
    return `
            <div class="dealer-container">
                <span style="font-weight: 600; font-size: 18px">Dealer</span>
                <span class="money ps-money" style="margin-left: 25px"
                    ><span id="dealerMoney">0</span> $
                </span>
            </div>
        `;
  },
};
