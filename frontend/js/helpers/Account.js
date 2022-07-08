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
import { convertTransaction } from './Transaction.js';

class Account {
  constructor(username, transactions = []) {
    this.username = username;
    this.transactions = transactions;
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      // return total + transaction.amount;
      return total + transaction.value;
    }, 0);
  }
}
export const getaccountData = (data) => {
  return data.map((account) => {
    const newTransactions = account.transactions.map((transaction) => {
      return convertTransaction(transaction);
    });
    return new Account(account.username, newTransactions);
  });
};

export const addAccountData = () => {
  $('#btnAddAccount').click(function () {
    const inputVal = $('#newUserName').val();
    if (inputVal !== '') {
      const user = new Account(inputVal);
      const jsonData = JSON.stringify({
        newAccount: {
          username: user.username,
          transactions: user.transactions,
        },
      });
      connectAjax('post', 'accounts', jsonData);
    } else {
      return alert('Username is empty');
    }
  });
};

export const renderBalance = (accountsData) => {
  $('[name=username]').change(() => {
    let selectedUserId = $('[name=username]').val();
    for (let index = 0; index < accountsData.length; index++) {
      if (index === selectedUserId - 1) {
        console.log(accountsData[index].balance);
        $('#summary').html(`
              <p>Username : ${accountsData[index].username}</p>
              <p class="balance">Balance : ${accountsData[index].balance}</p>
            `);
        return accountsData[index].balance;
      }
    }
  });
};

export default { getaccountData, addAccountData, renderBalance };
