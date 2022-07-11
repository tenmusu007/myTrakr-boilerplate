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
  let user = []
  for (const i in data) {
    console.log(data[i].username);
    user.push(data[i].username)
  }
  return user
}
export const renderTran = (data, accountsData) => {
  $('[name=filter]').change(() => {
    console.log("rendfer", accountsData);
    let username = $('[name=filter] option:selected').text()
    let userId = $('[name=filter]').val()
    if (data.account === Number(userId)) {
      $('#table #transactionTable').remove();
      if (data.transactionType === "transfer") {
        for (const i in accountsData[Number(userId) - 1].transactions) {
          $('#table').append(
            `
            <tr class="table" id="transactionTable">
            <td>${accountsData[Number(userId) - 1].transactions[i].account}</td>
            <td>${accountsData[Number(userId) - 1].username}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].transactionType}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].category}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].description}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].value}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].accountIdFrom}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].accountIdTo}</td>
            </tr>
            `
          )
          $('#table').append(
            `
            <tr class="table" id="transactionTable">
            <td>${data.account}</td>
            <td>${accountsData[Number(userId) - 1].username}</td>
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
      } else {
        for (const i in accountsData[Number(userId) - 1].transactions) {
          $('#table').append(
            `
            <tr class="table" id="transactionTable">
            <td>${accountsData[Number(userId) - 1].transactions[i].account}</td>
            <td>${accountsData[Number(userId) - 1].username}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].transactionType}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].category}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].description}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].value}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].accountIdFrom}</td>
            <td>${accountsData[Number(userId) - 1].transactions[i].accountIdTo}</td>
            </tr>
            `
          )
        }
        $('#table').append(
          `
            <tr class="table" id="transactionTable">
            <td>${data.account}</td>
            <td>${accountsData[Number(userId) - 1].username}</td>
            <td>${data.transactionType}</td>
            <td>${data.category}</td>
            <td>${data.description}</td>
            <td>${data.value}</td>
            <td> </td>
            <td> </td>
            </tr>
            `
        );

      }
    }
  })
}
export const renderTranNormal = (accountsData) => {
  console.log("rendfer", accountsData);
  $('[name=filter]').change(() => {
    $('#table #transactionTable').remove()
    let username = $('[name=filter] option:selected').text()
    for(const i in accountsData){
      if(username === "All"){
          for (const x in accountsData[i].transactions) {
            $('#table').append(
              `
              <tr class="table" id="transactionTable">
              <td>${accountsData[i].transactions[x].account}</td>
              <td>${accountsData[i].username}</td>
              <td>${accountsData[i].transactions[x].transactionType}</td>
              <td>${accountsData[i].transactions[x].category}</td>
              <td>${accountsData[i].transactions[x].description}</td>
              <td>${accountsData[i].transactions[x].value}</td>
              <td>${accountsData[i].transactions[x].accountIdFrom}</td>
              <td>${accountsData[i].transactions[x].accountIdTo}</td>
              </tr>
              `
              )
            }
            // }
          }else if(username === accountsData[i].username){
            for (const x in accountsData[i].transactions) {
              $('#table').append(
                `
                <tr class="table" id="transactionTable">
                <td>${accountsData[i].transactions[x].account}</td>
                <td>${accountsData[i].username}</td>
                <td>${accountsData[i].transactions[x].transactionType}</td>
                <td>${accountsData[i].transactions[x].category}</td>
                <td>${accountsData[i].transactions[x].description}</td>
                <td>${accountsData[i].transactions[x].value}</td>
                <td>${accountsData[i].transactions[x].accountIdFrom}</td>
                <td>${accountsData[i].transactions[x].accountIdTo}</td>
                </tr>
                `
                )
              }
          }
      }
    })
}
export const renderTranAll =(accountsData)=>{
    console.log("rendfer", accountsData);
      $('#table #transactionTable').remove()
      for(const i in accountsData){
            for (const x in accountsData[i].transactions) {
              if(accountsData[i].transactions[x].transactionType === "transfer"){
                $('#table').append(
                  `
                  <tr class="table" id="transactionTable">
                  <td>${accountsData[i].transactions[x].account}</td>
                  <td>${accountsData[i].username}</td>
                  <td>${accountsData[i].transactions[x].transactionType}</td>
                  <td>${accountsData[i].transactions[x].category}</td>
                  <td>${accountsData[i].transactions[x].description}</td>
                  <td>${accountsData[i].transactions[x].value}</td>
                  <td>${accountsData[i].transactions[x].accountIdFrom}</td>
                  <td>${accountsData[i].transactions[x].accountIdTo}</td>
                  </tr>
                  `
                  )
                }else{
                  $('#table').append(
                    `
                    <tr class="table" id="transactionTable">
                    <td>${accountsData[i].transactions[x].account}</td>
                    <td>${accountsData[i].username}</td>
                    <td>${accountsData[i].transactions[x].transactionType}</td>
                    <td>${accountsData[i].transactions[x].category}</td>
                    <td>${accountsData[i].transactions[x].description}</td>
                    <td>${accountsData[i].transactions[x].value}</td>
                    <td>${accountsData[i].transactions[x].accountIdTo} </td>
                    <td>${accountsData[i].transactions[x].accountIdTo} </td>
                    </tr>
                    `
                    )
              }
            }
        }
}

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
  renderTran,
  convertTransaction,
  renderTranNormal,
  renderTranAll
};
