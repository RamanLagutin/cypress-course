import { loginPage } from "../../pages/login.page";
import { homePage } from "../../pages/home.page";
import { transactionPage } from "../../pages/new-transaction.page";

describe("New Transaction", function () {
  beforeEach(() => {
    cy.task("db:seed");
    cy.openRWA();
    loginPage.login();
    transactionPage.open();
    transactionPage.chooseBeneficiary();
  });

  it("navigates to the new transaction form, selects a user and submits a transaction payment", function () {
    transactionPage.fillUpTransaction.successfully();
    transactionPage.pay();
    transactionPage.checkSuccessTransaction();
  });

  it("navigates to the new transaction form, selects a user and submits a transaction request", function () {
    transactionPage.fillUpTransaction.successfully();
    transactionPage.requestMoney();
    transactionPage.checkSuccessMoneyRequest();
  });

  it("displays new transaction errors", function () {
    transactionPage.triggerEmptyInputErrors();
    transactionPage.checkEmptyFieldErrors();
    transactionPage.checkPayRequestButtonsDisabled();

    transactionPage.fillUpTransaction.invalidData();
    transactionPage.checkInvalidAmountError();
    transactionPage.checkPayRequestButtonsDisabled();
  });

  it("submits a transaction payment and verifies the deposit for the receiver", function () {
    transactionPage.fillUpTransaction.successfully();
    transactionPage.pay();
    transactionPage.checkSuccessTransaction();

    homePage.signout();
    loginPage.loginBenefeciary();
    homePage.checkMoneyTransaction("payment");
  });

  it("submits a transaction request and accepts the request for the receiver", function () {
    transactionPage.fillUpTransaction.successfully();
    transactionPage.requestMoney();
    transactionPage.checkSuccessMoneyRequest();

    homePage.signout();
    loginPage.loginBenefeciary();
    homePage.checkMoneyTransaction("payment request");
  });
});
