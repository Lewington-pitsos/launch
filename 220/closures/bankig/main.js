function makeTrans(name, amount) {
  return { type: name, amount: amount};
}

function makeAccount(number) {
  var number = number;
  var balance = 0;
  var transactions = [];
  return {
    number: () => number,
    balance: () => balance,
    transactions: () => transactions,
    deposit: function(num) {
      transactions.push(makeTrans('deposit', num));
      return balance += num;
    },
    withdraw: function(num) {
      var taken = (balance >= num ?
        [balance -= num, num][1] :
        [balance, balance = 0][0])
      transactions.push(makeTrans('withdrawl', taken));
      return taken;
    }
  };
}

function makeBank() {
  var number = 101;
  var accounts = [];
  return {
    accounts: () => accounts,
    openAccount: function() {
      accounts.push(makeAccount(number));
      number++;
      return accounts[accounts.length - 1];
    },
    transfer: function(origin, destination, amount) {
      var taken = origin.withdraw(amount);
      return destination.deposit(taken);
    }
  };
}

var bank = makeBank();
var source = bank.openAccount();
console.log(source.deposit(10));
var destination = bank.openAccount();
console.log(bank.transfer(source, destination, 7));
console.log(source.balance());
console.log(destination.balance());

var account = makeAccount();

console.log(account.balance());

console.log(account.deposit(42));

console.log(account.balance());

console.log(account.withdraw(19));

console.log(account.balance());

console.log(account.withdraw(40));

console.log(account.balance());

console.log(account.transactions());
