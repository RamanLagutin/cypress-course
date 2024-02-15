const homeLocator = {
  signOutButton: "[data-test='sidenav-signout']",
};

export const homePage = {
  signout: () => {
    cy.get(homeLocator.signOutButton).click();
  },
};
