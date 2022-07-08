import { renderTran, convertTransaction } from './helpers/Transaction.js';
import {
  getaccountData,
  addAccountData,
  renderBalance,
} from './helpers/Account.js';
import { connectAjax } from './helpers/Common.js';

$(() => {
  $('#transfer').hide();
  let test;
  // Account to /////
  $('[name=to]').change(() => {
    let name = $('[name=to] option:selected').text();
    // console.log(name);
  });

  $('[name=type]').change((e) => {
    let radiobtn = $('input[name="type"]:checked').val();
    e.preventDefault();
    // console.log(radiovalue);
    if (radiobtn === 'withdraw' || radiobtn === 'deposit') {
      $('#transfer').hide();
      $('#account').show();
    } else if (radiobtn === 'transfer') {
      $('#account').hide();
      $('#transfer').show();
      // $("#addtran").on("click",(e)=>{
      //   Account.test()
      //   e.preventDefault()
      // })
    }
  });

  // $('[name=category]').change(() => {
  //   let category = $('[name=category] option:selected').text();
  // });

  $('#addcategroy').on('click', (e) => {
    e.preventDefault();
    $('#categorybox').hide();
  });

  // categroy

  let categoryArr = [];

  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/categories',
    dataType: 'json',
  }).done((data) => {
    // console.log("atsu", data);
    renderCategory(data);
    $.map(data, (value, index) => {
      // console.log(value.name.name);
      categoryArr.push(value.name.name);
    });
    // console.log(categoryArr);
  });
  $('#categorybox').hide();
  $('[name=category]').change(() => {
    test = $('[name=category] option:selected').text();
    // console.log(test);
    if (test === 'add category') {
      $('#categorybox').show();
      $('#addvategorybtn').on('click', (e) => {
        e.preventDefault();
        let newcategory = $('#categoryinput').val();
        // console.log(newcategory);
        const checkCategory = $.inArray(newcategory, categoryArr);
        // console.log(checkCategory);
        if (checkCategory < 0) {
          categoryArr.push(newcategory);

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
          }).done((data) => {
            $.ajax({
              method: 'get',
              url: 'http://localhost:3000/categories',
              dataType: 'json',
            }).done((data) => {
              console.log('atsu', data);
              renderCategory(data);
            });
          });
        } else {
          return alert('The category is aleady added');
        }
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
    // addAccountData();
    renderTran(data);

    // filter/////
    $('[name=filter]').change(() => {
      $.ajax({
        method: 'get',
        url: 'http://localhost:3000/accounts',
        dataType: 'json',
      }).done((data) => {
        // console.log('yse');
        let filterName = $('[name=filter] option:selected').text();
        // console.log(filterName);
        if (filterName === 'Select user name') {
          return renderTran(data);
        }
        let filterList = $.grep(data, (value, index) => {
          // console.log(value.transactions);
          if (filterName === value.username) {
            return value.transactions;
          } else {
            $('#table').empty;
          }
        });
        // console.log("tran",filterList[0].transactions.length);
        // console.log(filterList);
        if (filterList[0].transactions.length > 0) {
          renderTran(filterList);
        } else {
          $('#table1').empty();
          console.log('transaction empty');
        }
      });
    });

    const accountsData = [...getaccountData(data)];
    // console.log(renderBalance(accountsData));

    renderBalance(accountsData);

    $('[name=username]').change(() => {
      let selectedUser = $('[name=username]').val();
      for (let index = 0; index < accountsData.length; index++) {
        if (accountsData[index].username === selectedUser) {
          setUser = data[index];
          return $('#summary').html(`
              <p>Username : ${accountsData[index].username}</p>
              <p class="balance">Balance : ${accountsData[index].balance}</p>
            `);
        }
      }
    });
    $('[name=from]').change(() => {
      let selectedUserFrom = $('[name=from]').val();
      for (let index = 0; index < accountsData.length; index++) {
        if (accountsData[index].username === selectedUserFrom) {
          setUserFrom = data[index];
        }
      }
    });
    $('[name=to]').change(() => {
      let selectedUserTo = $('[name=to]').val();
      for (let index = 0; index < accountsData.length; index++) {
        if (accountsData[index].username === selectedUserTo) {
          setUserTo = data[index];
        }
      }
    });

    addUserSelectBox(data);
    addTransactionData(accountsData);
  });
});
$('#btnAddAccount').click(function (e) {
  e.preventDefault();
  const inputVal = $('#newUserName').val();
  if (inputVal !== '') {
    // const user = new Account(inputVal);
    const jsonData = JSON.stringify({
      newAccount: {
        username: inputVal,
        transactions: [],
      },
    });
    connectAjax('post', 'accounts', jsonData);
  } else {
    return alert('Username is empty');
  }
});
// }
const renderCategory = (data) => {
  const list = $.map(data, (value, index) => {
    return ` <option value="${value.name.name}" key="">${value.name.name}</option>

        `;
  });
  $('#categoryselect').empty();
  $('#categoryselect').append(
    `
      <option id="">Select category</option>
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
};

// add transaction data to json
let setUser = 0;
let setUserFrom = 0;
let setUserTo = 0;
let accountIdFrom = 0;
let accountIdTo = 0;
const addTransactionData = (accountsData) => {
  $('#addtran').on('click', (e) => {
    e.preventDefault();
    accountIdFrom = Number($('[name=from]').val());
    accountIdTo = Number($('[name=to]').val());
    let accountId = Number($('[name=username]').val());
    let transactionType = $('input[name="type"]:checked').val();
    let description = $('#transtxt').val();
    let amount = Number($('#transamount').val());
    let category = $('[name=category] option:selected').val();

    //required typing amount
    if (amount <= 0) {
      return alert('type greater than 0 amount');
    }

    if (
      (transactionType == 'withdraw' &&
        accountsData[accountId - 1].balance < amount) ||
      (transactionType == 'transfer' &&
        accountsData[accountIdFrom - 1].balance < amount)
    ) {
      return alert('You are not rich enough');
    }

    if (transactionType == 'transfer' && !accountIdTo) {
      return alert('To is empty');
    } else if (transactionType == 'transfer' && !accountIdFrom) {
      return alert('From is empty');
    } else if (transactionType == 'transfer' && accountIdFrom == accountIdTo) {
      return alert('To and From are the same');
    }

    if (category === 'Select category' || category === 'addcategory') {
      //require category
      return alert('choose category');
    }

    const jsonTransactionData = JSON.stringify({
      newTransaction: {
        accountId: accountId,
        accountIdFrom: accountIdFrom,
        accountIdTo: accountIdTo,
        transactionType: transactionType,
        category: category,
        description: description,
        amount: amount,
      },
    });
    $.ajax({
      method: 'post',
      data: jsonTransactionData,
      url: `http://localhost:3000/transaction`,
      dataType: 'json',
      contentType: 'application/json',
    })
      .done((data) => {
        console.log(data);
        data.forEach((element) => {
          let newTransaction = element;

          const convertedTransaction = convertTransaction(newTransaction);
          console.log(convertedTransaction.value);
        });
      })
      .fail((data) => {
        console.log(`FAILED ${method} ${url}`, data);
      });
  });
};

const addUserSelectBox = (data) => {
  for (let index = 0; index < data.length; index++) {
    $('#selectUser').append(
      $('<option>').html(data[index].username).val(data[index].id)
    );
    $('#filterselct').append(
      $('<option>').html(data[index].username).val(data[index].username)
    );
    $('#from').append(
      $('<option>').html(data[index].username).val(data[index].id)
    );
    $('#to').append(
      $('<option>').html(data[index].username).val(data[index].id)
    );
  }
};
