import { renderTran, renderTranNormal, renderTranAll, convertTransaction } from './helpers/Transaction.js';
import { renderCategory, checkCategory } from './helpers/Category.js';
import { getaccountData, renderBalance } from './helpers/Account.js';
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
    }
  });


  $('#addcategroy').on('click', (e) => {
    e.preventDefault();
    $('#categorybox').hide();
  });

  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/categories',
    dataType: 'json',
  }).done((data) => {
    renderCategory(data);
  });
  $('#categorybox').hide();

  // accounts////////////
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
  }).done((data) => {
    //add new users
    const accountsData = [...getaccountData(data)];
    renderBalance(accountsData);
    console.log(accountsData);
    renderTranAll(accountsData);
    renderTranNormal(accountsData);

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
  // e.preventDefault();
  const inputVal = $('#newUserName').val();
  if (inputVal !== '') {
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

// add transaction data to json
const addTransactionData = (accountsData) => {
  let accountIdFrom = 0;
  let accountIdTo = 0;
  $('#addtran').on('click', (e) => {
    // e.preventDefault();
    let transactionType = $('input[name="type"]:checked').val();
    if (transactionType !== "transfer") {
      accountIdFrom = ""
      accountIdTo = ""
    } else {
      accountIdFrom = Number($('[name=from]').val());
      accountIdTo = Number($('[name=to]').val());
    }
    let accountId = Number($('[name=username]').val());
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
          console.log(convertedTransaction);
          console.log(convertedTransaction.value);
          renderTran(convertedTransaction, accountsData)
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
      $('<option>').html(data[index].username).val(data[index].id)
    );
    $('#from').append(
      $('<option>').html(data[index].username).val(data[index].id)
    );
    $('#to').append(
      $('<option>').html(data[index].username).val(data[index].id)
    );
  }
};

checkCategory()