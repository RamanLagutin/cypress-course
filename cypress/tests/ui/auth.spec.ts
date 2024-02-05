describe("User Sign-up and Login", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })
  
  it("should redirect unauthenticated user to signin page", function () {
    cy.location("pathname").should("equal", "/signin")
  });

  it("should redirect to the home page after login", function () {
    cy.get("#username").should("exist").type("Katharina_Bernier")
    cy.get("#password").should("exist").type("s3cret")
    cy.get("[data-test=signin-submit]").should("exist").click()
    cy.location("pathname").should("equal", "/")
  });

  it("should remember a user for 30 days after login", function () {
    // check cookie `connect.sid` and its property `expiry`
    const date = new Date()
    const plus30Days = date.setDate(date.getDate() + 30)
    const currentTimestamp = Math.floor(plus30Days / 1000)
    const currentTimeInSeconds = Math.floor(currentTimestamp / 10)

    cy.get("#username").should("exist").type("Katharina_Bernier")
    cy.get("#password").should("exist").type("s3cret")
    cy.get("[data-test='signin-remember-me']").click()
    cy.get("[data-test=signin-submit]").should("exist").click()
    cy.location("pathname").should("equal", "/")
    cy.getCookie("connect.sid").should("exist").then((cookie) => {
      const cookieTimestamp = Math.trunc(cookie.expiry)
      const cookieTimeInSeconds = Math.floor(cookieTimestamp / 10)
      expect(cookieTimeInSeconds).to.equal(currentTimeInSeconds)
    })
  
});

  const testData = {
    firstName: crypto.randomUUID(),
    lastName: crypto.randomUUID(),
    username: crypto.randomUUID()
  }

  it("should allow a visitor to sign-up, login, and logout", function () {
    cy.get("[data-test='signup']").click()
    cy.location("pathname").should("equal", "/signup")
    cy.get("#firstName").should("exist").type(testData.firstName)
    cy.get("#lastName").should("exist").type(testData.lastName)
    cy.get("#username").should("exist").type(testData.username)
    cy.get("#password").should("exist").type("pa$$w0rd")
    cy.get("#confirmPassword").should("exist").type("pa$$w0rd")
    cy.get("[data-test='signup-submit']").click()
    cy.location("pathname").should("equal", "/signin")
    cy.get("#username").should("exist").type(testData.username)
    cy.get("#password").should("exist").type("pa$$w0rd")
    cy.get("[data-test=signin-submit]").should("exist").click()
    cy.get("[data-test='user-onboarding-next']").should("exist").click()
    cy.get("#bankaccount-bankName-input").should("exist").type("Priorbank")
    cy.get("#bankaccount-routingNumber-input").should("exist").type("858323339")
    cy.get("#bankaccount-accountNumber-input").should("exist").type("781374836")
    cy.get("[data-test='bankaccount-submit']").should("exist").click()
    cy.get("[data-test='user-onboarding-next']").should("exist").click()
    cy.get("[data-test='sidenav-signout']").should("exist").click()
    cy.location("pathname").should("equal", "/signin")
  });

  it("should display login and signup errors", function () {
    cy.get("#password").should("exist").type("s").blur()
    cy.get("#username-helper-text").should("exist").and("have.text", "Username is required")
    cy.get("#password-helper-text").should("exist").and("have.text", "Password must contain at least 4 characters")
    cy.get("[data-test=signin-submit]").should("exist").and("be.disabled")

    cy.get("[data-test='signup']").click()
    cy.get("#firstName").should("exist").click()
    cy.get("#lastName").should("exist").click()
    cy.get("#username").should("exist").click()
    cy.get("#password").should("exist").click()
    cy.get("#confirmPassword").should("exist").click().blur()
    cy.get("#firstName-helper-text").should("exist").and("have.text", "First Name is required")
    cy.get("#lastName-helper-text").should("exist").and("have.text", "Last Name is required")
    cy.get("#username-helper-text").should("exist").and("have.text", "Username is required")
    cy.get("#password-helper-text").should("exist").and("have.text", "Enter your password")
    cy.get("#confirmPassword-helper-text").should("exist").and("have.text", "Confirm your password")
    cy.get("[data-test='signup-submit']").should("exist").and("be.disabled")
  });

  it("should error for an invalid user", function () {
    cy.get("#username").should("exist").type("user_doesnt_exist")
    cy.get("#password").should("exist").type("pa$$w0rd")
    cy.get("[data-test=signin-submit]").should("exist").click()
    cy.get("[data-test='signin-error']").should("exist").and("have.text", "Username or password is invalid")
  });

  it("should error for an invalid password for existing user", function () {
    cy.get("#username").should("exist").type("Katharina_Bernier")
    cy.get("#password").should("exist").type("wrong_password")
    cy.get("[data-test=signin-submit]").should("exist").click()
    cy.get("[data-test='signin-error']").should("exist").and("have.text", "Username or password is invalid")
  });
});
