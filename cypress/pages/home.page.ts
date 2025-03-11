import { Login } from "../models/login/login";
import { Transaction } from "../models/transactions/transaction";
import { isMobileDevice } from "../support/utils";

export const homeLocator = {
  signOutButton: "[data-test='sidenav-signout']",
  bankAccountsButton: "[data-test='sidenav-bankaccounts']",
  newTransactionButton: "[data-test='nav-top-new-transaction']",
  main: "[data-test='main']",
  transactionList: "[data-test='transaction-list']",
  bellButton: "[data-test='nav-top-notifications-link']",
  firstElement: "li:first",
  sidenavToggle: "[data-test='sidenav-toggle']",
};

function openSidebarMenuIfMobileDevice() {
  if (isMobileDevice()) {
    cy.get(homeLocator.sidenavToggle).click();
  }
}

export const homePage = {
  signout: () => {
    openSidebarMenuIfMobileDevice();
    cy.get(homeLocator.signOutButton).click();
  },
  openBankAccounts: () => {
    openSidebarMenuIfMobileDevice();
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
