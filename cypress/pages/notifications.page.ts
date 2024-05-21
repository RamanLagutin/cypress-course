const notificationsLocator = {
  notificationsList: "[data-test='notifications-list']",
  noNotificationsSign: "[data-test='empty-list-header']",
};

export const notificationsPage = {
  checkLastLikedTransaction: (user: string) => {
    cy.fixture("login").then((userData: any) => {
      cy.get(notificationsLocator.notificationsList).within(() => {
        const userNames = {
          successfulUser: userData.signinData.successful.name,
          benefeciaryUser: userData.signinData.benefeciary.name,
          thirdUser: userData.signinData.thirdUser.name,
        };
        cy.get("li:first").contains(
          `${userNames[user as keyof typeof userNames]} liked a transaction.`
        );
      });
    });
  },
  checkLastPaymentTransaction: (user: string) => {
    cy.fixture("login").then((userData: any) => {
      cy.get(notificationsLocator.notificationsList).within(() => {
        const userNames = {
          successfulUser: userData.signinData.successful.name,
          benefeciaryUser: userData.signinData.benefeciary.name,
          thirdUser: userData.signinData.thirdUser.name,
        };
        cy.get("li:first").contains(
          `${userNames[user as keyof typeof userNames]} received payment.`
        );
      });
    });
  },
  dismissAllNotifications: () => {
    cy.get(`${notificationsLocator.notificationsList} > li`).then((notifications) => {
      for (let i = 0; i < notifications.length; i++) {
        cy.contains("button", "Dismiss").click();
      }
    });
    cy.fixture("transaction").then((transactionData) => {
      cy.get(notificationsLocator.noNotificationsSign)
        .should("exist")
        .contains(transactionData.noNotifications.message);
    });
  },
};
