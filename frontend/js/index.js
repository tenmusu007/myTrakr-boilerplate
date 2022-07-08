$(() => {
  $('#transfer').hide();
  let test;
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
    // console.log(radiovalue);
    if (radiovalue === 'withdraw' || radiovalue === 'deposit') {
      $('#transfer').hide();
      $('#account').show();
    } else if (radiovalue === 'transfer') {
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
    addAccountData();
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

    accountsData = data.map((account) => {
      return new Account(account.username, account.transactions);
    });

    renderBalance();
    addUserSelectBox(data);
    addTransactionData();
  });
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

const renderTran = (data) => {
  $('#table #transactionTable').remove();
  $.each(data, (index, value) => {
    // console.log(value.transactions);
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
};

// add transaction data to json
const addTransactionData = () => {
  $('#addtran').on('click', (e) => {
    e.preventDefault();
    let accountId = $('[name=username]').val();
    let transactionType = $('input[name="type"]:checked').val();
    let description = $('#transtxt').val();
    let amount = Number($('#transamount').val());
    let category = $('[name=category] option:selected').val();
    // console.log(amount);
    // console.log(accountsData[accountId - 1].balance);

    //required account
    if (accountId == 'username') {
      return alert('choose account');
    }

    //required typing amount
    if (amount <= 0) {
      return alert('type greater than 0 amount');
    }

    if (transactionType === 'withdraw') {
      withdrawal = new Withdrawal(
        Number($('#transamount').val()),
        accountsData[accountId - 1]
      );
      // console.log(withdrawal);
      // console.log(withdrawal.value);
      // withdrawal.commit();
      amount = withdrawal.value;
      if (accountsData[accountId - 1].balance + amount < 0) {
        return alert('You are not rich enough');
      }
    } else if (transactionType === 'deposit') {
      deposit = new Deposit(
        Number($('#transamount').val()),
        accountsData[accountId - 1]
      );
      // console.log(deposit);
      // console.log(deposit.value);
      // deposit.commit();
      amount = deposit.value;
    } else {
      console.log('Something Wrong in Transfer');
    }

    //require category
    if (category === 'Select category' || category === 'addcategory') {
      return alert('choose category');
    }

    // let accountIdTo = 0;
    // let accountIdFrom = 0;
    const jsonTransactionData = JSON.stringify({
      newTransaction: {
        accountId: accountId,
        accountIdFrom: '',
        accountIdTo: '',
        transactionType: transactionType,
        category: category,
        description: description,
        amount: amount,
      },
    });

    connectAjax('post', 'transaction', jsonTransactionData);
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
      $('<option>').html(data[index].username).val(data[index].username)
    );
    $('#to').append(
      $('<option>').html(data[index].username).val(data[index].username)
    );
  }
};
