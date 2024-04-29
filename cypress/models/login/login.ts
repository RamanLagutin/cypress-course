export type Login = {
  signinData: {
    successful: {
      username: string;
      password: string;
    };
    benefeciary: {
      username: string;
      password: string;
    };
    failed: {
      username: string;
      password: string;
    };
  };
  Errors: {
    usernameRequired: string;
    passwordLength: string;
    userInvalid: string;
    wrongPassword: string;
  };
};
