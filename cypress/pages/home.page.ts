export const homeLocator = {
  signOutButton: "[data-test='sidenav-signout']",
  bankAccountsButton: "[data-test='sidenav-bankaccounts']",
  newTransactionButton: "[data-test='nav-top-new-transaction']",
  main: "[data-test='main']",
  transactionList: "[data-test='transaction-list']",
};

export const homePage = {
  signout: () => {
    cy.get(homeLocator.signOutButton).click();
  },
  openBankAccounts: () => {
    cy.get(homeLocator.bankAccountsButton).click();
  },
  checkMoneyTransaction: (transactionType: String) => {
    cy.fixture("transaction").then((transaction: any) => {
      cy.get(homeLocator.transactionList).within(() => {
        cy.get("li:first")
          .contains(transactionType === "payment" ? "-" : "+")
          .contains(`$${transaction.transactionData.successful.amount}.00`);
        cy.get("li:first").contains(transaction.transactionData.successful.note);
      });
    });
  },
};
