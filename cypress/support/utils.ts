export const isMobile = () => {
  return Cypress.config("viewportWidth") < Cypress.env("mobileViewportWidthBreakpoint");
};

export function currentTimestampInSeconds() {
  const date = new Date();
  const plus30Days = date.setDate(date.getDate() + 30);
  const currentTimestamp = Math.floor(plus30Days / 1000);
  return Math.floor(currentTimestamp / 10);
}

export const isMobileDevice = (): boolean => Boolean(Cypress.env("DEVICE"));
