import { Transaction } from "../models/transactions/transaction";

export const homeLocator = {
  signOutButton: "[data-test='sidenav-signout']",
  bankAccountsButton: "[data-test='sidenav-bankaccounts']",
  newTransactionButton: "[data-test='nav-top-new-transaction']",
  main: "[data-test='main']",
  transactionList: "[data-test='transaction-list']",
  firstElement: "li:first",
};

export const homePage = {
  signout: () => {
    cy.get(homeLocator.signOutButton).click();
  },
  openBankAccounts: () => {
    cy.get(homeLocator.bankAccountsButton).click();
  },
  checkMoneyTransaction: (transactionType: string) => {
    cy.fixture("transaction").then((transaction: Transaction) => {
      cy.get(homeLocator.transactionList).within(() => {
        cy.get(homeLocator.firstElement)
          .contains(transactionType === "payment" ? "-" : "+")
          .contains(`$${transaction.transactionData.successful.amount}.00`);
        cy.get(homeLocator.firstElement).contains(transaction.transactionData.successful.note);
      });
    });
  },
};
