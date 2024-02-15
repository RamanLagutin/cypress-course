import { signup, signupErrors } from "../fixtures/sign-up";

const signupLocator = {
  signupOpen: "[data-test='signup']",
  firstName: "#firstName",
  lastName: "#lastName",
  username: "#username",
  password: "#password",
  confirmPassword: "#confirmPassword",
  signupButton: "[data-test='signup-submit']",
  firstNameError: "#firstName-helper-text",
  lastNameError: "#lastName-helper-text",
  usernameError: "#username-helper-text",
  passwordError: "#password-helper-text",
  confirmPasswordError: "#confirmPassword-helper-text",
};

export const signupPage = {
  open: () => {
    cy.get(signupLocator.signupOpen).click();
    cy.location("pathname").should("equal", "/signup");
  },
  signup: () => {
    cy.get(signupLocator.firstName).type(signup.successful.firstName);
    cy.get(signupLocator.lastName).type(signup.successful.lastName);
    cy.get(signupLocator.username).type(signup.successful.username);
    cy.get(signupLocator.password).type(signup.successful.password);
    cy.get(signupLocator.confirmPassword).type(signup.successful.password);
    cy.get(signupLocator.signupButton).click();
  },
  triggerInputErrors: () => {
    cy.get(signupLocator.firstName).click();
    cy.get(signupLocator.lastName).click();
    cy.get(signupLocator.username).click();
    cy.get(signupLocator.password).click();
    cy.get(signupLocator.confirmPassword).click().blur();
  },
  checkInputErrors: () => {
    cy.get(signupLocator.firstNameError).should("have.text", signupErrors.firstName);
    cy.get(signupLocator.lastNameError).should("have.text", signupErrors.lastName);
    cy.get(signupLocator.usernameError).should("have.text", signupErrors.username);
    cy.get(signupLocator.passwordError).should("have.text", signupErrors.password);
    cy.get(signupLocator.confirmPasswordError).should("have.text", signupErrors.confirmPassword);
    cy.get(signupLocator.signupButton).should("be.disabled");
  },
};
