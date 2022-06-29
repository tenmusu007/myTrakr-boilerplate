$(() => {
  //Start coding here!
  $('[name=to]').change(() => {
    let name = $('[name=to] option:selected').text();
    toname = name;
    // console.log(name);
  });
  $('[name=type]').change((e) => {
    let radiobtn = $('input[name="type"]:checked').val();
    e.preventDefault();
    radiovalue = radiobtn;
    // console.log(radiovalue);
    if (radiovalue === 'withdraw' || radiovalue === 'deposit') {
      $('#transfer').hide();
      $('#account').show();
    } else if (radiovalue === 'transfer') {
      $('#account').hide();
      $('#transfer').show();
    }
  });
  $('[name=from]').change(() => {
    let name = $('[name=from] option:selected').text();
    fromname = name;
    // console.log(name);
  });
  $('[name=to]').change(() => {
    let name = $('[name=to] option:selected').text();
    toname = name;
    // console.log(name);
  });
  $('[name=category]').change(() => {
    let category = $('[name=category] option:selected').text();
    Category = category;
    // console.log(Category);
  });
  $('#addcategroy').on('click', (e) => {
    e.preventDefault();
    $('#categorybox').hide();
    // $('[name=category]').change(() => {
    //   let test = $('[name=category] option:selected').text();
    //   fromname = name
    // console.log(name);
    // });
  });
  // let radiobtn = $('input[name="type"]:checked').val();
  // // e.preventDefault();
  // radiovalue = radiobtn;
  // console.log(radiovalue);

  // categroy
  // $("#categorybox").hide()
  $('#categorybox').hide();
  $('[name=category]').change(() => {
    let test = $('[name=category] option:selected').text();
    // console.log(test);
    if (test === 'add category') {
      $('#categorybox').show();
      $('#addvategorybtn').on('click', (e) => {
        e.preventDefault();
        let newcategory = $('#categoryinput').val();
        $.ajax({
          method: 'post',
          data: JSON.stringify({
            newCategory: {
              name: newcategory,
            },
          }),
          url: 'http://localhost:3000/categories',
          dataType: 'json',
          contentType: 'application/json',
        })
          .done((data) => {
            // console.log('data post ajax', data)
            $.ajax({
              method: 'get',
              url: 'http://localhost:3000/categories',
              dataType: 'json',
            }).done((data) => {
              // console.log(data);
              const list = $.map(data, (value, index) => {
                // console.log(data);
                // console.log(value);
                return ` <option value="${value.name.name}" key="">${value.name.name}</option>

                      `;
              });
              $('#categoryselect').empty();
              $('#categoryselect').append(
                `
                    <option id="none">none</option>
                    <option id="addcategory" value="addcategory" >add category</option>
                    `
              );
              $('#categoryselect').append(
                $.each(list, (i, post) => {
                  `
                      ${post}

                      `;
                })
              );
            });
          })
          .fail((data) => {});
      });
    }
  });

  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
  }).done((data) => {
    //add new users
    $('#btnAddAccount').click(function (event) {
      let inputVal = $('#newUserName').val();
      if (inputVal !== '') {
        user = new Account(inputVal, []);
        jsonData = JSON.stringify({
          newAccount: {
            username: user.username,
            transactions: user.transactions,
            balance: user.balance,
          },
        });
        addUserJson(jsonData, 'Success to add user for the first time');
      } else {
        message = 'Error username is invalid';
        console.log(message);
      }
      event.preventDefault();
    });

    let setUser;
    $('[name=username]').change(() => {
      // $('#table .tableTra').remove();
      let selectedUser = $('[name=username]').val();
      for (let index = 0; index < data.length; index++) {
        if (data[index].username === selectedUser) {
          $('#summary').html(`
            <p>Username : ${data[index].username}</p>
            <p class="balance">Balance : ${data[index].balance}</p>
          `);
          setUser = data[index];
        }
      }
      // for (let index = 0; index < setUser.transactions.length; index++) {
      //   $('#table').append(`
      //     <tr class="tableTra">
      //       <td>${setUser.transactions[index].accountId}</td>
      //       <td>${setUser.username}</td>
      //       <td>${setUser.transactions[index].transactionType}</td>
      //       <td>${setUser.transactions[index].category}</td>
      //       <td>${setUser.transactions[index].description}</td>
      //       <td>${setUser.transactions[index].amount}</td>
      //     </tr>
      //   `);
      // }
    });
    addUserSelectBox(data);

    // add transaction data to json
    $('#addtran').on('click', (e) => {
      // console.log(setUser);
      let accountId = setUser.id;
      let transactionType = $('input[name="type"]:checked').val();
      let description = $('#transtxt').val();
      let amount = Number($('#transamount').val());
      accountIdTo = 0;
      jsonTransactionData = JSON.stringify({
        newTransaction: {
          accountId: accountId,
          accountIdFrom: '',
          accountIdTo: '',
          transactionType: transactionType,
          category: '',
          description: description,
          amount: amount,
        },
      });

      e.preventDefault();
      console.log(description);

      $.ajax({
        method: 'post',
        data: jsonTransactionData,
        url: 'http://localhost:3000/transaction',
        dataType: 'json',
        contentType: 'application/json',
      }).done((data) => {
        console.log('Post transaction', data);
        // post.transactions[post.transactions.length - 1].typeof == 'withdraw';
      });
    });
  });
});

// const setUser = (data) => {
//   let result;
//   $('[name=username]').change(() => {
//     let selectedUser = $('[name=username]').val();
//     for (let index = 0; index < data.length; index++) {
//       if (data[index].username === selectedUser) {
//         $('#summary').html(`
//         <p>Username : ${data[index].username}</p>
//         <p>Balance : ${data[index].balance}</p>
//         `);
//         console.log(data[index]);
//         result = data[index];
//       }
//     }
//   });
//   return result;
// };

const addUserSelectBox = (data) => {
  for (let index = 0; index < data.length; index++) {
    $('#selectUser').append(
      $('<option>').html(data[index].username).val(data[index].username)
    );
  }
};

const addUserJson = (jsonData, message) => {
  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
    data: jsonData,
    contentType: 'application/json',
  })
    .done((data) => {
      console.log(message, data);
      // user = new Account(data.username, data.transactions);
      console.log(user);
    })
    .fail((error) => {
      console.log('error', error);
    });
};
