abstract class BankAccount {
  private static _totalAccounts: number = 0;

  private readonly _ownerName: string;
  private _balance: number;

  constructor(ownerName: string, initialBalance: number) {
    this._ownerName = ownerName;
    this._balance = initialBalance;
    BankAccount._totalAccounts++;
  }

  public static get totalAccounts(): number {
    return BankAccount._totalAccounts;
  }

  public getOwnerName(): string {
    return this._ownerName;
  }

  abstract calculateInterest(): number;

  public deposit(amount: number): void {
    this._balance += amount;
  }

  public withdraw(amount: number): void {
    this._balance -= amount;
  }

  public getBalance(): number {
    return this._balance;
  }

  public static displayTotalAccounts(): void {
    console.log(`Total Accounts: ${BankAccount.totalAccounts}`);
  }
}

export { BankAccount };

class SavingsAccount extends BankAccount {
  private _interestRate: number;

  constructor(ownerName: string, initialBalance: number, interestRate: number) {
    super(ownerName, initialBalance);
    this._interestRate = interestRate;
  }

  public calculateInterest(): number {
    return this.getBalance() * this._interestRate;
  }
}

export { SavingsAccount };

class CheckingAccount extends BankAccount {
  private _transactionLimit: number;

  constructor(
    ownerName: string,
    initialBalance: number,
    transactionLimit: number
  ) {
    super(ownerName, initialBalance);
    this._transactionLimit = transactionLimit;
  }

  public withdraw(amount: number): void {
    if (amount > this._transactionLimit) {
      console.log(
        `Warning: Exceeds transaction limit of $${this._transactionLimit}`
      );
    } else {
      super.withdraw(amount);
    }
  }

  public calculateInterest(): number {
    return 0;
  }
}

export { CheckingAccount };
