let radiovalue = '';
let fromname = '';
let toname = '';
let Username = '';
let transaction = '';
let tranArr = [];
let test;
let userObj;
let total = 0;
$('#addtran').on('click', (e) => {
  let radiobtn = $('input[name="type"]:checked').val();
  e.preventDefault();
  radiovalue = radiobtn;
  let txt = $('#transtxt').val();
  e.preventDefault();
  $.ajax({
    method: 'post',
    data: JSON.stringify({
      newTransaction: {
        accountId: 1,
        balance: total,
        username: 'atsu',
        // username: Username,
        typeof: 'deposit',
        // typeof: radiovalue,
        // typeof: radiovalue,
        category: 'food',
        from: 'koki',
        to: 'atsu',
        txt: txt,
        // amount: 100,
        amount: Number($('#transamount').val()),
      },
    }),
    url: 'http://localhost:3000/transaction',
    dataType: 'json',
    contentType: 'application/json',
  })
    .done((data) => {
      console.log('data post ajax', data);
      const dataInfo = data;
      console.log('data', dataInfo);
      $.ajax({
        method: 'get',
        url: 'http://localhost:3000/accounts',
        dataType: 'json',
      }).done((data2) => {
        console.log('"indiv Account"', data2);
        $.each(data2, (i, post) => {
          Username = post.username;
          console.log(Username, post.transactions);
          console.log('GET', post);
          console.log(
            'latest transaction',
            post.transactions[post.transactions.length - 1]
          );
          tranArr.push(post.transactions[post.transactions.length - 1]);
          console.log('testArr', tranArr[tranArr.length - 1].balance);
          test = new Deposit(
            post.transactions,
            post.transactions[post.transactions.length - 1]
          );
          test.commit();

          console.log('Transaction 1:', test);
        });
      });

      $.each(data, (i, post) => {
        $('#table').append(`
        <tr class="table">
          <td>${post.id}</td>
          <td>${post.username}</td>
          <td>${post.typeof}</td>
          <td>${post.category}</td>
          <td>${post.txt}</td>
          <td>${post.amount}</td>
          <td>${post.from}</td>
          <td>${post.to}</td>
        </tr>
        `);
      });
    })
    .fail((data) => {
      // $('.result').html(data);
      console.log(data);
    });
});

let testArry = [0];
class Transaction {
  constructor(newhistory, account) {
    console.log('newhistory', newhistory);
    // console.log("account", account);
    this.newhistory = newhistory;
    this.account = account;
  }
  commit() {
    // if (this.value < 0 && this.amount > this.account.balance) return;
    // this.account.transactions.push(this.value);
    // this.account.balance += this.value;
    console.log('account', this.account);
    console.log('value', this.value);
    console.log(
      'new balance(newhistory)',
      this.newhistory[this.newhistory.length - 1].balance
    );
    console.log('previous balance', this.account.balance);
    console.log('-------------');
    // return this.newhistory[(this.newhistory.length -1)].balance = this.value + this.account.balance
    // let currentBalance = this.value + this.account.balance
    total = this.value + this.account.balance;

    // testArry.push(currentBalance)
    testArry.push(total);
    console.log('balance:', testArry);
    // total = testArry.reduce((sum, element)=>{
    //   return sum + element;
    // },0)
    console.log(total);
    $('#summary').html(`
    <p>Username : ${Username}</p>
    <p>Balance : ${total}</p>
    `);
    return;
    // return this.newhistory.balance = this.value + this.newaccount.balance
    // return balance
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.newaccount;
  }
}

class Deposit extends Transaction {
  get value() {
    // console.log(this.newaccount[(this.newaccount.length-1)].amount);
    // return this.newaccount[(this.newaccount.length-1)].amount;
    return this.account.amount;
  }
}
// const myAccount = new Account('Koki Sakai');
console.log('Final:', test);
