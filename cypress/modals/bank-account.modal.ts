const bankAccountLocator = {
  bankName: "#bankaccount-bankName-input",
  routingNumber: "#bankaccount-routingNumber-input",
  accountNumber: "#bankaccount-accountNumber-input",
  submitButton: "[data-test='bankaccount-submit']",
};

export const bankAccountModal = {
  submit: () => {
    cy.fixture("bank-account").then((bankAccount) => {
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
