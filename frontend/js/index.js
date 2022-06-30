$(() => {

  // Account to /////
  $('[name=to]').change(() => {
    let name = $('[name=to] option:selected').text();
    toname = name;
    // console.log(name);
  });

  $('[name=type]').change((e) => {
    let radiobtn = $('input[name="type"]:checked').val();
    e.preventDefault();
    radiovalue = radiobtn;
    console.log(radiovalue);
    if (radiovalue === 'withdraw' || radiovalue === 'deposit') {
      $('#transfer').hide();
      $('#account').show();
    } else if (radiovalue === 'transfer') {
      $('#account').hide();
      $('#transfer').show();
    }
  });

  $('[name=category]').change(() => {
    let category = $('[name=category] option:selected').text();
    Category = category;
    // console.log(Category);
  });

  $('#addcategroy').on('click', (e) => {
    e.preventDefault();
    $('#categorybox').hide();
  });

  // categroy

  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/categories',
    dataType: 'json',
  })
    .done((data) => {
      // console.log("atsu", data);
      renderCategory(data)
    });
  $("#categorybox").hide()
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
            $.ajax({
              method: 'get',
              url: 'http://localhost:3000/categories',
              dataType: 'json',
            })
              .done((data) => {
                console.log("atsu", data);
                renderCategory(data)
              });
          })

      });
    }
  });

  // accounts////////////
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
        addUserJson(jsonData, 'Success to add user');
      } else {
        message = 'Error username is invalid';
        console.log(message);
      }
    });

    // filter/////
    $('[name=filter]').change(() => {
      console.log('yse');
      let filterName = $('[name=filter] option:selected').text();
      // console.log("slected",filterName);
      let filterList = $.grep(data, (value, index) => {
        // console.log(value.transactions);
        if (filterName === value.username) {
          // console.log(value.username);
          // console.log("pass");
          return value.transactions;
        } else {
          $('#table').empty;
        }
      });
      // console.log("tran",filterList[0].transactions.length);
      console.log(filterList);
      if (filterList[0].transactions.length > 0) {
        $('#table #transactionTable').remove();
        $.each(filterList, (index, value) => {
          for (const key in value.transactions) {
            $('#table').append(
              `
              <tr class="table" id="transactionTable">
              <td>${value.id}</td>
              <td>${value.username}</td>
                <td>${value.transactions[key].transactionType}</td>
                <td>${value.transactions[key].category}</td>
                <td>${value.transactions[key].description}</td>
                <td>${value.transactions[key].amount}</td>
                <td>${value.transactions[key].accountIdFrom}</td>
                <td>${value.transactions[key].accountIdTo}</td>
              </tr>
              `
            );
          }
        });
      } else {
        $('#table1').empty();
        console.log('transaction empty');
      }
    });

    $('[name=username]').change(() => {
      let selectedUser = $('[name=username]').val();
      for (let index = 0; index < data.length; index++) {
        if (data[index].username === selectedUser) {
          $('#summary').html(`
            <p>Username : ${data[index].username}</p>
            <p class="balance">Balance : ${data[index].balance}</p>
          `);
          setUser = data[index];
          console.log(setUser);
        }
      }
    });
    // setUser(data);
    addUserSelectBox(data);
  });
});
// const getCategory = ()=>{

// }
const renderCategory = (data) => {
  const list = $.map(data, (value, index) => {
    return ` <option value="${value.name.name}" key="">${value.name.name}</option>
          
        `
  })
  $("#categoryselect").empty()
  $("#categoryselect").append(
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
}

// Koki part /////////////////////////////////////
// const setUser = (data) => {
//   // $('[name=username]').change(() => {
//   //   let selectedUser = $('[name=username]').val();
//   //   for (let index = 0; index < data.length; index++) {
//   //     if (data[index].username === selectedUser) {
//   //       $('#summary').html(`
//   //             <p>Username : ${data[index].username}</p>
//   //             <p>Balance : ${data[index].balance}</p>
//   //           `);
//   //     }
//   //   }
//     // let setUser;
//     // $('[name=username]').change(() => {
//     //   let selectedUser = $('[name=username]').val();
//     //   for (let index = 0; index < data.length; index++) {
//     //     if (data[index].username === selectedUser) {
//     //       $('#summary').html(`
//     //         <p>Username : ${data[index].username}</p>
//     //         <p class="balance">Balance : ${data[index].balance}</p>
//     //       `);
//     //       setUser = data[index];
//     //       console.log(setUser);
//     //     }
//     //   }
//     // });
//     // setUser(data);
//     addUserSelectBox(data);
//   }

// Koki part /////////////////////////////////////
// const setUser = (data) => {
//   let setUser;
//   $('[name=username]').change(() => {
//     let selectedUser = $('[name=username]').val();
//     for (let index = 0; index < data.length; index++) {
//       if (data[index].username === selectedUser) {
//         $('#summary').html(`
//             <p>Username : ${data[index].username}</p>
//             <p class="balance">Balance : ${data[index].balance}</p>
//           `);
//         setUser = data[index];
//       }
//     }
//   });
// };

// add transaction data to json
$('#addtran').on('click', (e) => {
  console.log("test");
  let accountId = setUser.id;
  let transactionType = $('input[name="type"]:checked').val();
  let description = $('#transtxt').val();
  let amount = Number($('#transamount').val());
  // let accountIdTo = 0;
  // let accountIdFrom = 0;
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

  $.ajax({
    method: 'post',
    data: jsonTransactionData,
    url: 'http://localhost:3000/transaction',
    dataType: 'json',
    contentType: 'application/json',
  }).done((data) => {
    console.log('Post transaction', data);
  });
});

const addUserSelectBox = (data) => {
  // console.log(data);
  for (let index = 0; index < data.length; index++) {
    $('#selectUser').append(
      $('<option>').html(data[index].username).val(data[index].username)
    );
    $('#filterselct').append(
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
      console.log(user);
    })
    .fail((error) => {
      console.log('error', error);
    });
};
