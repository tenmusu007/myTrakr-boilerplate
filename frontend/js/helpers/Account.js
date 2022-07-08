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

const addAccountData = () => {
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

const renderBalance = () => {
  $('[name=username]').change(() => {
    let selectedUserId = $('[name=username]').val();
    for (let index = 0; index < accountsData.length; index++) {
      if (index === selectedUserId - 1) {
        return $('#summary').html(`
              <p>Username : ${accountsData[index].username}</p>
              <p class="balance">Balance : ${accountsData[index].balance}</p>
            `);
      }
    }
  });
};
