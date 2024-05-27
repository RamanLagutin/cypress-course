// @ts-check
import "@cypress/code-coverage/support";
import "./commands";
import { isMobile } from "./utils";

function getViewportDimensions(device: string): { width: number; height: number } {
  switch (device.toLowerCase()) {
    case "iphone 15":
      return { width: 393, height: 852 };
    case "iphone 15 pro max":
      return { width: 430, height: 932 };
    case "samsung galaxy s21":
      return { width: 360, height: 800 };
    case "pixel 8 pro":
      return { width: 448, height: 998 };
    default:
      return { width: 1280, height: 1000 };
  }
}

beforeEach(() => {
  // cy.intercept middleware to remove 'if-none-match' headers from all requests
  // to prevent the server from returning cached responses of API requests
  cy.intercept(
    { url: "http://localhost:3001/**", middleware: true },
    (req) => delete req.headers["if-none-match"]
  );

  const device = Cypress.env("DEVICE") || "default";
  const { width, height } = getViewportDimensions(device);

  cy.viewport(width, height);

  // Throttle API responses for mobile testing to simulate real world condition
  if (isMobile()) {
    cy.intercept({ url: "http://localhost:3001/**", middleware: true }, (req) => {
      req.on("response", (res) => {
        // Throttle the response to 1 Mbps to simulate a mobile 3G connection
        res.setThrottle(1000);
      });
    });
  }
});
