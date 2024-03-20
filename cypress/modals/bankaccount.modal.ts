import { bankAccountLocator } from "../locators/bankaccount.locators";

export const bankAccountModal = {
  submit: () => {
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
};
