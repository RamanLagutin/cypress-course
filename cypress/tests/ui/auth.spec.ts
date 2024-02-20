import { signupPage } from "../../pages/signup.page";
import { loginPage } from "../../pages/login.page";
import { homePage } from "../../pages/home.page";
import { userOnboardingModal } from "../../modals/user-onboarding.modal";
import { bankAccountModal } from "../../modals/bank-account.modal";
import { currentTimestampInSeconds } from "../../support/utils";

describe("User Sign-up and Login", function () {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should redirect unauthenticated user to signin page", function () {
    cy.location("pathname").should("equal", "/signin");
  });

  it("should redirect to the home page after login", function () {
    loginPage.login();
    cy.location("pathname").should("equal", "/");
  });

  it("should remember a user for 30 days after login", function () {
    loginPage.loginAndRemember();
    cy.location("pathname").should("equal", "/");

    const currentTimeInSeconds = currentTimestampInSeconds();
    cy.getCookie("connect.sid")
      .should("exist")
      .then((cookie) => {
        const cookieTimestamp = Math.trunc(cookie?.expiry as number);
        const cookieTimeInSeconds = Math.floor(cookieTimestamp / 10);
        expect(cookieTimeInSeconds).to.equal(currentTimeInSeconds);
      });
  });

  it("should allow a visitor to sign-up, login, and logout", function () {
    signupPage.open();
    signupPage.signup();
    cy.location("pathname").should("equal", "/signin");

    loginPage.loginJustCreatedUser();
    userOnboardingModal.clinckOnNext();
    bankAccountModal.submit();
    userOnboardingModal.clinckOnNext();
    cy.location("pathname").should("equal", "/");

    homePage.signout();
    cy.location("pathname").should("equal", "/signin");
  });

  it("should display login and signup errors", function () {
    loginPage.triggerInputErrors();
    loginPage.checkInputErrors();

    signupPage.open();
    signupPage.triggerInputErrors();
    signupPage.checkInputErrors();
  });

  it("should error for an invalid user", function () {
    loginPage.loginInvalidUser();
    loginPage.checkInvalidUserError();
  });

  it("should error for an invalid password for existing user", function () {
    loginPage.loginWrongPassword();
    loginPage.checkWrongPasswordError();
  });
});
