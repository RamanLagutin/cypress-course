import { bankAccountLocator } from "../locators/bankaccount.locators";

export const bankAccountsPage = {
  openCreateBankAccountForm: () => {
    cy.get(bankAccountLocator.createButton).click();
  },
  checkBankAccountCreated: () => {
    cy.fixture("bankaccount").then((bankAccount: any) => {
      cy.get("ul li:last")
        .within(() => {
          cy.get(bankAccountLocator.deleteButton).contains("Delete");
        })
        .contains(bankAccount.bankAccountData.successful.bankName);
    });
  },
  deleteLastAccount: () => {
    cy.fixture("bankaccount").then((bankAccount: any) => {
      cy.get("ul li:last").within(() => {
        cy.get(bankAccountLocator.deleteButton).click();
      });
    });
  },
  checkAccountIsDeleted: () => {
    cy.fixture("bankaccount").then((bankAccount: any) => {
      cy.get("ul li:last").within(() => {
        cy.get(bankAccountLocator.deleteButton).should("not.exist");
        cy.contains("Deleted");
      });
    });
  },
};

export const createBankAccountForm = {
  createNewBankAccount: () => {
    cy.fixture("bankaccount").then((bankAccount) => {
      cy.get(bankAccountLocator.bankName).type(bankAccount.bankAccountData.successful.bankName);
      cy.get(bankAccountLocator.routingNumber).type(
        bankAccount.bankAccountData.successful.routingNumber
      );
      cy.get(bankAccountLocator.accountNumber).type(
        bankAccount.bankAccountData.successful.accountNumber
      );
      cy.get(bankAccountLocator.submitButton).click();
    });
  },
  leaveEmptyInput: (inputName: string) => {
    cy.get(bankAccountLocator[inputName as keyof typeof bankAccountLocator]).click();
    cy.get(bankAccountLocator.createBankAccountForm).click();
  },
  checkEmptyInputError: (inputName: string) => {
    let inputError = inputName + "Error";
    cy.fixture("bankaccount").then((errors) => {
      cy.get(bankAccountLocator[inputError as keyof typeof bankAccountLocator]).should(
        "have.text",
        errors.createBankAccountFormErrors[inputName as keyof typeof bankAccountLocator].empty
      );
    });
  },
  putLessThanMin: (inputName: string) => {
    cy.fixture("bankaccount").then((bankAccount) => {
      cy.get(bankAccountLocator[inputName as keyof typeof bankAccountLocator]).type(
        bankAccount.bankAccountData.failed.wrongNumberOfChars.lessThanMin[
          inputName as keyof typeof bankAccountLocator
        ]
      );
    });
  },
  checkLessThanMinError: (inputName: string) => {
    let inputError = inputName + "Error";
    cy.fixture("bankaccount").then((errors) => {
      cy.get(bankAccountLocator[inputError as keyof typeof bankAccountLocator]).should(
        "have.text",
        errors.createBankAccountFormErrors[inputName as keyof typeof bankAccountLocator]
          .lessThanMinChars
      );
    });
  },
  putMoreThanMaxAccountNumber: () => {
    cy.fixture("bankaccount").then((bankAccount) => {
      cy.get(bankAccountLocator.accountNumber).type(
        bankAccount.bankAccountData.failed.wrongNumberOfChars.moreThanMax.accountNumber
      );
    });
  },
  checkMoreThanMaxAccountNumberError: () => {
    cy.fixture("bankaccount").then((errors) => {
      cy.get(bankAccountLocator.accountNumberError).should(
        "have.text",
        errors.createBankAccountFormErrors.accountNumber.maxThanMaxChars
      );
    });
  },
};
