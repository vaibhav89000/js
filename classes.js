// Encapsulation -> Access modifiers

//            | Parent   |   Child   | Outside class
// Public     |  Yes     |   Yes     | Yes               -> customerName
// Private    |  Yes     |   No      | No                -> #balance
// Protected  |  Yes     |   Yes     | No                -> use private to make protected

// BankAccount class with variables and methods
class BankAccount {
  customerName;
  accountNumber;
  #balance = 0; // This is private

  constructor(customerName, balance) {
    this.customerName = customerName;
    this.#balance += balance;
    this.accountNumber = Date.now();
  }

  deposit(amount) {
    this.#balance += amount;
  }

  widthdraw(amount) {
    this.#balance -= amount;
  }

  // getter for private members
  get balance() {
    return this.#balance;
  }

  //   setter for private members
  set balance(amount) {
    this.#balance = amount;
  }
}

user1 = new BankAccount("john", 1000);
console.log(user1.balance);

user1.deposit(2000);
user1.widthdraw(500);
console.log(user1.balance);
// console.log(user1.#balance);

user1.balance = 10000;
console.log(user1.balance);

// ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Inheritance

class CurrentAccount extends BankAccount {
  transactionLimit = 50000;

  constructor(customerName, balance = 0) {
    super(customerName, balance);
  }

  takeBusinessLoan(amount) {
    console.log("Taking business loan: " + amount);
  }
}

user2 = new CurrentAccount("jane", 1000);
user2.deposit(5000);
console.log(user2);

// ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Polymorphism

class Animal {
  // Base class method
  speak() {
    console.log("The animal makes a sound.");
  }
}

class Dog extends Animal {
  // Overriding the speak method
  speak() {
    console.log("The dog barks.");
  }
}

class Cat extends Animal {
  // Overriding the speak method
  speak() {
    console.log("The cat meows.");
  }
}

class Cow extends Animal {
  // Overriding the speak method
  speak() {
    console.log("The cow moos.");
  }
}

// Function that accepts any Animal and calls the speak method
function makeAnimalSpeak(animal) {
  animal.speak(); // Calls the appropriate method depending on the object type
}

// Usage
const myDog = new Dog();
const myCat = new Cat();
const myCow = new Cow();

makeAnimalSpeak(myDog); // The dog barks.
makeAnimalSpeak(myCat); // The cat meows.
makeAnimalSpeak(myCow); // The cow moos.
