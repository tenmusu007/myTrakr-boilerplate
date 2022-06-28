let radiovalue = ""
let fromname = ""
let toname = ""
let Username = ""
let transaction = ""
let tranArr = []
let deposit
let withdrawal
let userObj
let total = 0
$('#addtran').on('click', (e) => {
  let radiobtn = $('input[name="type"]:checked').val();
  e.preventDefault();
  radiovalue = radiobtn;
  console.log(radiovalue);
  let txt = $("#transtxt").val();
  // let amount = Number($("#transa mount").val())
  // if (radiovalue === "withdraw") {
  //   amount = Number($("#transa mount").val())
  // }
  e.preventDefault();
  $.ajax({
    method: 'post',
    data: JSON.stringify(
      {
        newTransaction: {
          accountId: 1,
          balance: total,
          username: "atsu",
          // username: Username,
          // typeof: "deposit",
          typeof: radiovalue,
          category: "food",
          from: "koki",
          to: "atsu",
          txt: txt,
          amount: Number($("#transamount").val()),
          // amount: 
          // radiovalue === "withdraw" ? -amount : amount,
        }
      },
    }),
    url: 'http://localhost:3000/transaction',
    dataType: 'json',
    contentType: 'application/json',
  })
    .done((data) => {
      // console.log('data post ajax', data)
      const dataInfo = data
      // console.log("data", dataInfo);
      $.ajax({
        method: 'get',
        url: 'http://localhost:3000/accounts',
        dataType: 'json',
      }).done((data2) => {
        console.log('"indiv Account"', data2);
        $.each(data2, (i, post) => {
          Username = post.username;
          console.log(Username, post.transactions);

          console.log("GET", post);
          console.log("latest transaction", post.transactions[(post.transactions.length - 1)]);
          // tranArr.push(post.transactions[(post.transactions.length - 1)])
          // console.log("testArr", tranArr[(tranArr.length - 1)].balance);
          console.log("transaction", post.transactions.typeof);
          // if (post.transactions.typeof ===undefined) {
          //   return alert("select Transaction")
          // }else 
          if (post.transactions[(post.transactions.length - 1)].typeof == "withdraw") {
            withdrawal = new Withdrawal(post.transactions, post.transactions[(post.transactions.length - 1)])
            withdrawal.commit()
          } else if (post.transactions[(post.transactions.length - 1)].typeof == "deposit") {
            deposit = new Deposit(post.transactions, post.transactions[(post.transactions.length - 1)])
            deposit.commit();
          } else {
            console.log("Worng");
          }
          // console.log('Transaction 1:', deposit);
        })
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
      // console.log(data);
    });
});

let testArry = [0];


class Transaction {
  constructor(newhistory, account) {
    // console.log("newhistory", newhistory);
    // console.log("account", account);
    this.newhistory = newhistory;
    this.account = account;
    let testArry = [0]
  }
  commit() {
    // if (this.value < 0 && this.amount > this.account.balance) return;
    // this.account.transactions.push(this.value);
    // this.account.balance += this.value;
    console.log("account", this.account)
    console.log("value", this.value)
    console.log("new balance(newhistory)", this.newhistory[(this.newhistory.length - 1)].balance)
    console.log("previous balance", this.account.balance)
    console.log("previous amount", this.account.amount)
    console.log("-------------");
    if (this.value < 0 && this.account.balance < this.account.amount) {
      console.log("faile");
      total = "erro"
    } else if (this.value < 0 && this.account.balance > this.account.amount) {
      total = this.account.balance - this.account.amount
      // console.log(withdrawal);
    } else if (this.value > 0) {
      total = this.account.amount + this.account.balance
    }

    // testArry.push(total)
    // console.log('balance:', testArry);
    console.log(total);
    $('#summary').html(`
    <p>Username : ${Username}</p>
    <p>Balance : ${total}</p>
    `)
    return
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.account.amount;
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
console.log('Final:', withdrawal, deposit);

