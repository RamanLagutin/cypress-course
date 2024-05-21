import { homePage } from "../../pages/home.page";
import { loginPage } from "../../pages/login.page";
import { notificationsPage } from "../../pages/notifications.page";
import { transactioSummaryPage } from "../../pages/transaction.page";
import { transactionModule } from "../../pages/new-transaction.page";

describe("notifications from user interactions", function () {
  beforeEach(() => {
    cy.task("db:seed");
    cy.openRWA();
  });

  it(
    "User A likes a transaction of User B; User B gets notification that User A liked transaction",
    { browser: "!firefox" },
    function () {
      loginPage.login();
      homePage.openBenefeciarysTransaction();
      transactioSummaryPage.likeTransaction();

      homePage.signout();
      loginPage.loginBenefeciary();
      homePage.openNotifications();
      notificationsPage.checkLastLikedTransaction("successfulUser");
    }
  );

  it("User C likes a transaction between User A and User B; User A and User B get notifications that User C liked transaction", function () {
    loginPage.loginThirdUser();
    homePage.openTransactionOtherUsers();
    transactioSummaryPage.likeTransaction();

    homePage.signout();
    loginPage.login();
    homePage.openNotifications();
    notificationsPage.checkLastLikedTransaction("thirdUser");

    homePage.signout();
    loginPage.loginBenefeciary();
    homePage.openNotifications();
    notificationsPage.checkLastLikedTransaction("thirdUser");
  });

  it("User A sends a payment to User B", function () {
    transactionModule.createPayment();

    homePage.signout();
    loginPage.loginBenefeciary();
    homePage.openNotifications();
    notificationsPage.checkLastPaymentTransaction("benefeciaryUser");
  });

  it("renders an empty notifications state", function () {
    loginPage.login();
    homePage.openNotifications();
    notificationsPage.dismissAllNotifications();
  });
});
