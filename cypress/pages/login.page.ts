import { signup } from "../fixtures/sign-up";

const loginLocator = {
  username: "#username",
  password: "#password",
  logInButton: "[data-test=signin-submit]",
  rememberCheckbox: "[data-test='signin-remember-me']",
  usernameRequiredError: "#username-helper-text",
  passwordLengthError: "#password-helper-text",
  loginError: "[data-test='signin-error']",
};

export const loginPage = {
  login: () => {
    cy.fixture("login").then((signinOptions) => {
      cy.get(loginLocator.username).type(signinOptions.signinData.successful.username);
      cy.get(loginLocator.password).type(signinOptions.signinData.successful.password);
      cy.get(loginLocator.logInButton).click();
    });
  },
  loginAndRemember: () => {
    cy.fixture("login").then((signinOptions) => {
      cy.get(loginLocator.username).type(signinOptions.signinData.successful.username);
      cy.get(loginLocator.password).type(signinOptions.signinData.successful.password);
      cy.get(loginLocator.rememberCheckbox).click();
      cy.get(loginLocator.logInButton).click();
    });
  },
  loginJustCreatedUser: () => {
    cy.get(loginLocator.username).type(signup.successful.username);
    cy.get(loginLocator.password).type(signup.successful.password);
    cy.get(loginLocator.logInButton).click();
  },
  loginInvalidUser: () => {
    cy.fixture("login").then((signinOptions) => {
      cy.get(loginLocator.username).type(signinOptions.signinData.failed.username);
      cy.get(loginLocator.password).type(signinOptions.signinData.failed.password);
      cy.get(loginLocator.logInButton).click();
    });
  },
  loginWrongPassword: () => {
    cy.fixture("login").then((signinOptions) => {
      cy.get(loginLocator.username).type(signinOptions.signinData.successful.username);
      cy.get(loginLocator.password).type(signinOptions.signinData.failed.password);
      cy.get(loginLocator.logInButton).click();
    });
  },
  triggerInputErrors: () => {
    cy.get(loginLocator.password).type("s").blur();
  },
  checkInputErrors: () => {
    cy.fixture("login").then((signinErrors) => {
      cy.get(loginLocator.usernameRequiredError).should(
        "have.text",
        signinErrors.Errors.usernameRequired
      );
      cy.get(loginLocator.passwordLengthError).should(
        "have.text",
        signinErrors.Errors.passwordLength
      );
      cy.get(loginLocator.logInButton).should("be.disabled");
    });
  },
  checkInvalidUserError: () => {
    cy.fixture("login").then((userErrors) => {
      cy.get(loginLocator.loginError).should("have.text", userErrors.Errors.userInvalid);
    });
  },
  checkWrongPasswordError: () => {
    cy.fixture("login").then((passwordErrors) => {
      cy.get(loginLocator.loginError).should("have.text", passwordErrors.Errors.wrongPassword);
    });
  },
};
