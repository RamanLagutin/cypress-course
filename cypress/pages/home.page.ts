import { Login } from "../models/login/login";
import { Transaction } from "../models/transactions/transaction";

export const homeLocator = {
  signOutButton: "[data-test='sidenav-signout']",
  bankAccountsButton: "[data-test='sidenav-bankaccounts']",
  newTransactionButton: "[data-test='nav-top-new-transaction']",
  main: "[data-test='main']",
  transactionList: "[data-test='transaction-list']",
  bellButton: "[data-test='nav-top-notifications-link']",
  firstElement: "li:first",
};

export const homePage = {
  signout: () => {
    cy.get(homeLocator.signOutButton).click();
  },
  openBankAccounts: () => {
    const isMobileDevice = (): boolean => !!Cypress.env("DEVICE");
    const _clickSidebarMobile = () => {
      cy.get('[data-test="sidenav-toggle"]').should("be.visible").click();
    };
    const _clickAccountsBtn = () => cy.get(homeLocator.bankAccountsButton).click();

    const _openBankAccountsMobile = () => {
      _clickSidebarMobile();
      _clickAccountsBtn();
    };
    
    isMobileDevice() ? _openBankAccountsMobile() : _clickAccountsBtn();
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
  openBenefeciarysTransaction: () => {
    cy.fixture("login").then((signinOptions: Login) => {
      cy.get(homeLocator.transactionList).within(() => {
        cy.contains(`${signinOptions.signinData.benefeciary.name} paid`).parent().click();
      });
    });
  },
  openTransactionOtherUsers: () => {
    cy.fixture("login").then((signinOptions: Login) => {
      cy.get(homeLocator.transactionList).within(() => {
        cy.contains(
          `${signinOptions.signinData.benefeciary.name} paid ${signinOptions.signinData.successful.name}`
        )
          .parent()
          .click();
      });
    });
  },
  openNotifications: () => {
    cy.get(homeLocator.bellButton).click();
  },
};
