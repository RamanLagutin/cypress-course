import { Transaction } from "../models/transactions/transaction";
import { homeLocator } from "../pages/home.page";
import { loginPage } from "./login.page";

const transactionPageLocator = {
  amount: "#amount",
  note: "#transaction-create-description-input",
  payButton: "[data-test='transaction-create-submit-payment']",
  userBalance: "[data-test='sidenav-user-balance']",
  paymentMessage: ".MuiTypography-gutterBottom",
  requestButton: "[data-test='transaction-create-submit-request']",
  amountHelperText: "#transaction-create-amount-input-helper-text",
  noteHelperText: "#transaction-create-description-input-helper-text",
  firstElement: "ul li:first",
};

export const transactionPage = {
  open: () => {
    cy.get(homeLocator.newTransactionButton).click();
    cy.location("pathname").should("equal", "/transaction/new");
  },
  chooseBeneficiary: () => {
    cy.get(transactionPageLocator.firstElement).click();
  },
  fillUpTransaction: {
    successfully: () => {
      cy.fixture("transaction").then((transaction: Transaction) => {
        cy.get(transactionPageLocator.amount).type(
          transaction.transactionData.successful.amount.toString()
        );
        cy.get(transactionPageLocator.note).type(transaction.transactionData.successful.note);
      });
    },
    invalidData: () => {
      cy.fixture("transaction").then((transaction: Transaction) => {
        cy.get(transactionPageLocator.amount).type(transaction.transactionData.invalid.amount);
      });
    },
  },
  pay: () => {
    cy.get(transactionPageLocator.payButton).click();
  },
  requestMoney: () => {
    cy.get(transactionPageLocator.requestButton).click();
  },
  triggerEmptyInputErrors: () => {
    cy.fixture("transaction").then((transaction: Transaction) => {
      cy.get(transactionPageLocator.amount).click();
      cy.get(transactionPageLocator.note).click();
      cy.get(homeLocator.main).click();
    });
  },
  checkSuccessTransaction: () => {
    cy.fixture("transaction").then((transaction: Transaction) => {
      cy.get(transactionPageLocator.paymentMessage)
        .contains("Paid")
        .contains(`${transaction.transactionData.successful.amount}`)
        .contains("for")
        .contains(`${transaction.transactionData.successful.note}`);
    });
  },
  checkSuccessMoneyRequest: () => {
    cy.fixture("transaction").then((transaction: Transaction) => {
      cy.get(transactionPageLocator.paymentMessage)
        .contains("Requested")
        .contains(`${transaction.transactionData.successful.amount}`)
        .contains("for")
        .contains(`${transaction.transactionData.successful.note}`);
    });
  },
  checkInvalidAmountError: () => {
    cy.fixture("transaction").then((transaction: Transaction) => {
      cy.get(transactionPageLocator.amountHelperText).contains(
        transaction.errors.amount.invalidData
      );
    });
  },
  checkEmptyFieldErrors: () => {
    cy.fixture("transaction").then((transaction: Transaction) => {
      cy.get(transactionPageLocator.amountHelperText).contains(
        transaction.errors.amount.emptyField
      );
      cy.get(transactionPageLocator.noteHelperText).contains(transaction.errors.note.emptyField);
    });
  },
  checkPayRequestButtonsDisabled: () => {
    cy.get(transactionPageLocator.payButton).should("be.disabled");
  },
};

export const transactionModule = {
  createPayment: () => {
    loginPage.login();
    transactionPage.open();
    transactionPage.chooseBeneficiary();
    transactionPage.fillUpTransaction.successfully();
    transactionPage.pay();
    transactionPage.checkSuccessTransaction();
  },
};
