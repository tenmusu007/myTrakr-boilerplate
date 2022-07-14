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
      return -this.amount;
    } else {
      return this.amount;
    }
  }
}
export const User = (data) => {
  let user = [];
  for (const i in data) {
    user.push(data[i].username);
  }
  return user;
};
export const renderTranNormal = (accountsData) => {
  $('#table #transactionTable').remove();
  for (const i in accountsData) {
    render(accountsData[i]);
  }

  $('[name=filter]').change(() => {
    $('#table #transactionTable').remove();
    let username = $('[name=filter] option:selected').text();
    for (const i in accountsData) {
      if (username === 'All') {
        render(accountsData[i]);
      } else if (username === accountsData[i].username) {
        render(accountsData[i]);
      }
    }
  });
};
const render = (accountsData) => {
  for (const x in accountsData.transactions) {
    $('#table').append(
      `
    <tr class="table" id="transactionTable">
    <td>${accountsData.transactions[x].account}</td>
    <td>${accountsData.username}</td>
    <td>${accountsData.transactions[x].transactionType}</td>
    <td>${accountsData.transactions[x].category}</td>
    <td>${accountsData.transactions[x].description}</td>
    <td>${accountsData.transactions[x].value}</td>
    <td>${accountsData.transactions[x].accountIdFrom}</td>
    <td>${accountsData.transactions[x].accountIdTo}</td>
    </tr>
    `
    );
  }
};

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
  convertTransaction,
  renderTranNormal,
};
