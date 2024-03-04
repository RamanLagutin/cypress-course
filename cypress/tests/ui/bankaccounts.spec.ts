import { loginPage } from "../../pages/login.page";
import { homePage } from "../../pages/home.page";
import { bankAccountsPage } from "../../pages/bankaccounts.page";
import { createBankAccountForm } from "../../pages/bankaccounts.page";
import { createBankAccountInputs } from "../../locators/bankaccount.locators";
import { signupPage } from "../../pages/signup.page";
import { userOnboardingModal } from "../../modals/user-onboarding.modal";
import { bankAccountModal } from "../../modals/bankaccount.modal";

describe("Bank Accounts", function () {
  beforeEach(() => {
    cy.visit("/");
    loginPage.login();
    homePage.openBankAccounts();
    bankAccountsPage.openCreateBankAccountForm();
  });

  it("creates a new bank account", function () {
    createBankAccountForm.createNewBankAccount();
    bankAccountsPage.checkBankAccountCreated();
  });

  it("should display bank account form errors", function () {
    for (let fieldName of createBankAccountInputs) {
      createBankAccountForm.leaveEmptyInput(fieldName);
    }

    for (let fieldName of createBankAccountInputs) {
      createBankAccountForm.checkEmptyInputError(fieldName);
    }

    for (let fieldName of createBankAccountInputs) {
      createBankAccountForm.putLessThanMin(fieldName);
    }

    for (let fieldName of createBankAccountInputs) {
      createBankAccountForm.checkLessThanMinError(fieldName);
    }

    createBankAccountForm.putMoreThanMaxAccountNumber();
    createBankAccountForm.checkMoreThanMaxAccountNumberError();
  });

  it("soft deletes a bank account", function () {
    homePage.openBankAccounts();
    bankAccountsPage.deleteLastAccount();
    bankAccountsPage.checkAccountIsDeleted();
  });

  it("renders an empty bank account list state with onboarding modal", function () {
    homePage.signout();
    cy.location("pathname").should("equal", "/signin");
    signupPage.open();
    signupPage.signup();
    cy.location("pathname").should("equal", "/signin");

    loginPage.loginJustCreatedUser();
    userOnboardingModal.clinckOnNext();
    bankAccountModal.submit();
    userOnboardingModal.clinckOnNext();
    cy.location("pathname").should("equal", "/");

    homePage.openBankAccounts();
    bankAccountsPage.checkBankAccountCreated();
  });
});
