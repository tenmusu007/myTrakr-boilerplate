class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }
}

// $.ajax({
//   method: 'post',
//   data: JSON.stringify(
//     {
//       newAccount: {
//         username: "atsu",
//         transactions:[]
//       }
//     },
//   ),
//   // data: JSON.stringify("atsu"),
//   url: 'http://localhost:3000/accounts',
//   dataType: 'json',
//   contentType: "application/json",
// })
//   .done((data) => {
//     $("#test").html(data)
//     console.log('data post ajax', data)
//   })
//   .fail((data) => {
//     // $('.result').html(data);
//     console.log(data);
//   });
