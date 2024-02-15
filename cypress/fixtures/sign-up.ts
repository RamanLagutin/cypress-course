var Chance = require("chance");
var chance = new Chance();

export let signup = {
  successful: {
    firstName: chance.first(),
    lastName: chance.last(),
    username: chance.cf(),
    password: chance.bb_pin(),
  },
  failed: {
    firstName: chance.letter(),
    lastName: chance.letter(),
    username: chance.letter(),
    password: chance.letter(),
    confirmPassword: chance.bb_pin(),
  },
};

export const signupErrors = {
  firstName: "First Name is required",
  lastName: "Last Name is required",
  username: "Username is required",
  password: "Enter your password",
  confirmPassword: "Confirm your password",
};
