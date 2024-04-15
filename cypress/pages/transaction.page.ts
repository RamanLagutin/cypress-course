const transactionLocator = {
  likeButton: "[data-test='transaction-like-button-",
};

export const transactioSummaryPage = {
  likeTransaction: () => {
    cy.url().then((url: String) => {
      cy.get(transactionLocator.likeButton + url.split("/").pop()).click();
    });
  },
};
