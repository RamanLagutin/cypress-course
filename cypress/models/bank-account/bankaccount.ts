export type bankAccount = {
  bankAccountData: {
    successful: {
      bankName: string;
      routingNumber: string;
      accountNumber: string;
    };
    failed: {
      wrongNumberOfChars: {
        lessThanMin: {
          bankName: string;
          routingNumber: string;
          accountNumber: string;
        };
        moreThanMax: {
          accountNumber: string;
        };
      };
    };
  };
  createBankAccountFormErrors: {
    bankName: {
      empty: string;
      lessThanMinChars: string;
    };
    routingNumber: {
      empty: string;
      lessThanMinChars: string;
    };
    accountNumber: {
      empty: string;
      lessThanMinChars: string;
      maxThanMaxChars: string;
    };
  };
};
