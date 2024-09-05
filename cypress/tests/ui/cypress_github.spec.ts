import { cypressHomePage } from "../../pages/cypress.home.page";
import { loginPage } from "../../pages/login.page";

describe("User is able to open Cypress' GitHub via Real World App", function () {
  beforeEach(() => {
    cy.openRWA();
  });

  it("should open Cypress' GirHub via Real World App", function () {
    loginPage.openCypressPage();
    cypressHomePage.openCompanyMenu();
  });
});
