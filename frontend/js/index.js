$(() => {
  //Start coding here!
  $('[name=from]').change(() => {
    let name = $('[name=from] option:selected').text();
    fromname = name;
    console.log(name);
  });
  $('[name=to]').change(() => {
    let name = $('[name=to] option:selected').text();
    toname = name;
    console.log(name);
  });
  $('[name=type]').change((e) => {
    let radiobtn = $('input[name=“type”]:checked').val();
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
  // categroy
  // $(“#categorybox”).hide()
  $('#addcategroy').on('click', (e) => {
    e.preventDefault();
    $('#categorybox').hide();
  });
  // $('[name=category]').change(() => {
  //   let test = $('[name=category] option:selected').text();
  //   fromname = name
  //   console.log(name);
  // });
  // Koki part /////////////////////////////////////
  users = [];
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
  }).done((data) => {
    //add new users
    $('#btnAddAccount').click(function (event) {
      let inputVal = $('#newUserName').val();
      jsonData = JSON.stringify({
        newAccount: {
          username: inputVal,
          transactions: [],
        },
      });
      if (inputVal !== '' && data.length === 0) {
        //first add
        addUserJson(jsonData, 'Success to add user for the first time');
      } else if (inputVal !== '' && data.length !== 0) {
        // after first add
        addUserJson(jsonData, 'Success to add user');
      } else {
        message = 'Error username is invalid';
        console.log(message);
      }
      event.preventDefault();
    });
    // console.log(users);
    setUser();
  });
});

const setUser = () => {
  $('[name=username]').change(() => {
    let selectedUser = $('[name=username]').val();
    for (let index = 0; index < users.length; index++) {
      if (users[index].username === selectedUser) {
        console.log(users[index]);
        $('#summary').html(`
              <p>Username : ${users[index].username}</p>
              <p>Balance : ${users[index].balance}</p>
            `);
        return users[index];
      }
    }
  });
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
      users.push(new Account(data.username, data.transactions));
      $('#selectUser').append(
        $('<option>').html(data.username).val(data.username)
      );
    })
    .fail((error) => {
      console.log('error', error);
    });
};
