// class Account {
//   constructor(username) {
//     this.username = username;
//     this.transactions = [];
//   }

//   get balance() {
//     return this.transactions.reduce((total, transaction) => {
//       return total + transaction;
//     }, 0);
//   }
// }

class Account {
  constructor(username, transactions = []) {
    this.username = username;
    this.transactions = transactions;
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction.amount;
      // return total + transaction.value;
    }, 0);
  }
}
