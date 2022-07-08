class Transaction {
  constructor(
    amount,
    account,
    accountIdFrom,
    accountIdTo,
    category,
    description,
    id,
    transactionType
  ) {
    this.amount = amount;
    this.account = account;
    this.accountIdFrom = accountIdFrom;
    this.accountIdTo = accountIdTo;
    this.category = category;
    this.description = description;
    this.id = id;
    this.transactionType = transactionType;
  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Transfer extends Transaction {
  get value() {
    if (this.accountIdFrom === this.account) {
      console.log(this.accountIdFrom);
      console.log(this.account);
      return -this.amount;
    } else {
      return this.amount;
    }
  }
}

export const renderTran = (data) => {
  console.log(data);
  let username = $('[name=filter]').val()
  console.log(username);
    if (data.transactionType === "transfer") {
      $('#table').append(
        `
        <tr class="table" id="transactionTable">
        <td>${data.accountId}</td>
        <td>${username}</td>
        <td>${data.transactionType}</td>
        <td>${data.category}</td>
        <td>${data.description}</td>
        <td>${data.value}</td>
        <td>${data.accountIdFrom}</td>
        <td>${data.accountIdTo}</td>
        </tr>
        `
      );
    }
};
// export const renderTran = (data) => {
//   $('#table #transactionTable').remove();
//   console.log(data);
//   $.each(data, (index, value) => {
//     console.log(value.transactions);
//     // console.log(value.value);
//     console.log(data);
//     if(data.transactionType === "transfer"){
//       for (const key in value.transactions) {
//         $('#table').append(
//           `
//           <tr class="table" id="transactionTable">
//           <td>${value.id}</td>
//           <td>${value.username}</td>
//           <td>${value.transactions[key].transactionType}</td>
//           <td>${value.transactions[key].category}</td>
//           <td>${value.transactions[key].description}</td>
//           <td>${value.transactions[key].amount}</td>
//           <td>${value.transactions[key].accountIdFrom}</td>
//           <td>${value.transactions[key].accountIdTo}</td>
//           </tr>
//           `
//           );
//       }
//     }else{
//       for (const key in value.transactions) {
//         $('#table').append(
//           `
//           <tr class="table" id="transactionTable">
//           <td>${value.id}</td>
//           <td>${value.username}</td>
//           <td>${value.transactions[key].transactionType}</td>
//           <td>${value.transactions[key].category}</td>
//           <td>${value.transactions[key].description}</td>
//           <td>${value.transactions[key].amount}</td>
//           <td>${value.transactions[key].accountIdFrom}</td>
//           <td>${value.transactions[key].accountIdTo}</td>
//           </tr>
//           `
//           );
//       }
//     }
//   });
// };

export const convertTransaction = (transaction) => {
  if (transaction.transactionType == 'transfer') {
    return new Transfer(
      transaction.amount,
      transaction.accountId,
      transaction.accountIdFrom,
      transaction.accountIdTo,
      transaction.category,
      transaction.description,
      transaction.id,
      transaction.transactionType
    );
  } else if (transaction.transactionType == 'deposit') {
    return new Deposit(
      transaction.amount,
      transaction.accountId,
      transaction.accountIdFrom,
      transaction.accountIdTo,
      transaction.category,
      transaction.description,
      transaction.id,
      transaction.transactionType
    );
  } else {
    // if (accountsData[accountId - 1].balance + amount < 0) {
    //   return alert('You are not rich enough');
    // }

    // console.log(transaction);
    return new Withdrawal(
      transaction.amount,
      transaction.accountId,
      transaction.accountIdFrom,
      transaction.accountIdTo,
      transaction.category,
      transaction.description,
      transaction.id,
      transaction.transactionType
    );
  }
};

export default {
  renderTran,
  convertTransaction
};
