$(() => {
  //Start coding here!
  $('[name=to]').change(() => {
    let name = $('[name=to] option:selected').text();
    toname = name
    console.log(name);
  });
  $('[name=type]').change((e) => {
  let radiobtn = $('input[name="type"]:checked').val();
  e.preventDefault();
  radiovalue = radiobtn;
  console.log(radiovalue);
  if(radiovalue === "withdraw" || radiovalue === "deposit" ){
    $("#transfer").hide();
    $("#account").show()
  }else if(radiovalue === "transfer"){
    $("#account").hide()
    $("#transfer").show();
  }
  })
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
    Category = category
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
  $("#categorybox").hide()
  $('[name=category]').change(() => {
    let test = $('[name=category] option:selected').text();
    // console.log(test);
    if (test === "add category") {
      $("#categorybox").show()
      $("#addvategorybtn").on("click", (e) => {
        e.preventDefault();
        let newcategory = $("#categoryinput").val()
        $.ajax({
          method: 'post',
          data: JSON.stringify(
            {
              newCategory: {
                name: newcategory,
              }
            },
          ),
          url: 'http://localhost:3000/categories',
          dataType: 'json',
          contentType: "application/json",
        })
          .done((data) => {
            // console.log('data post ajax', data)
            $.ajax({
              method: 'get',
              url: 'http://localhost:3000/categories',
              dataType: 'json',
            })
              .done((data) => {
                // console.log(data);
                const list = $.map(data, (value, index) => {
                  // console.log(data);
                  // console.log(value);
                  return ` <option value="${value.name.name}" key="">${value.name.name}</option>
                        
                      `
                })
                $("#categoryselect").empty()
                $("#categoryselect").append(
                  `
                    <option id="none">none</option>
                    <option id="addcategory" value="addcategory" >add category</option>
                    `
                )
                $("#categoryselect").append(
                  $.each(list, (i, post) => {
                    `
                      ${post}
                      
                      `
                  })
                )
              })
          })
          .fail((data) => {
          });
      })
    }
  })
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
        // console.log(message);
      }
      event.preventDefault();
    });
    // console.log(users);
    setUser();
  })
  // Koki part /////////////////////////////////////
})


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
