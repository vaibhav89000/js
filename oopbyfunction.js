let User = function (email, password) {
  this.email = email;
  this.password = password;
  this.login = function () {
    console.log("login succesfull");
  };
};

//adding logout using prototype
User.prototype.logout = function () {
  console.log("logout done");
};

let user1 = new User("vaibhav", "password");
console.log(user1.email, user1.password);
user1.login();

user1.logout();

let Admin = function (...args) {
  User.apply(this, args);
};

Admin.prototype = Object.create(User.prototype);

Admin.prototype.deleteuser = function () {
  console.log("user is deleted by admin");
};

let admin1 = new Admin("vaibhav", "password");
console.log("admin", admin1.email, admin1.password);
admin1.deleteuser();

// ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function BankAccount(customerName, balance = 0) {
  this.customerName = customerName;
  this.accountNumber = Date.now();
  this.balance = balance;
}

BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
};

BankAccount.prototype.withdraw = function (amount) {
  this.balance -= amount;
};

function CurrentAccount(customerName, balance = 0) {
  BankAccount.call(this, customerName, balance);
  this.transactionLimit = 50000;
}

CurrentAccount.prototype = Object.create(BankAccount.prototype);

CurrentAccount.prototype.takeBusinessLoan = function (amount) {
  console.log("Taking business loan: " + amount);
};

function SavingAccount(customerName, balance = 0) {
  BankAccount.call(this, customerName, balance);
  this.transactionLimit = 10000;
}
SavingAccount.prototype = Object.create(BankAccount.prototype);

SavingAccount.prototype.takePersonalLoan = function (amount) {
  console.log("Taking personal loan: " + amount);
};

const rakeshAccount = new SavingAccount("Rakesh K", 500);
rakeshAccount.deposit(500);
rakeshAccount.withdraw(100);
rakeshAccount.takePersonalLoan(40000);
// console.log(rakeshAccount);
