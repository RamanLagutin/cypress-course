export type Transaction = {
  transactionData: {
    successful: {
      amount: number;
      note: string;
    };
    invalid: {
      amount: "-" | "+";
      note: number;
    };
  };
  errors: {
    amount: {
      invalidData: string;
      emptyField: string;
    };
    note: {
      emptyField: string;
    };
  };
};
