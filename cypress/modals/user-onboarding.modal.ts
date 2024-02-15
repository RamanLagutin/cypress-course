const userOnboardingLocator = {
  nextButton: "[data-test='user-onboarding-next']",
};

export const userOnboardingModal = {
  clinckOnNext: () => {
    cy.get(userOnboardingLocator.nextButton).should("exist").click();
  },
};
