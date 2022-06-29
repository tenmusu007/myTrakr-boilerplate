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
    if (radiovalue === "withdraw" || radiovalue === "deposit") {
      $("#transfer").hide();
      $("#account").show()
    } else if (radiovalue === "transfer") {
      $("#account").hide()
      $("#transfer").show();
    }
  })

  $('[name=category]').change(() => {
    let category = $('[name=category] option:selected').text();
    Category = category
    // console.log(Category);
  });

  $('#addcategroy').on('click', (e) => {
    e.preventDefault();
    $('#categorybox').hide();
  });

  // categroy
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
  // filter/////

  // accounts////////////
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
      // event.preventDefault();

    });
    // console.log(users);
    // filter by account
    $('[name=filter]').change(() => {
      console.log("yse");
      let filterName = $('[name=filter] option:selected').text();
      // console.log("slected",filterName);
      let filterList = $.grep(data, (value, index) => {
        // console.log(value.transactions);
        if (filterName === value.username) {
          // console.log(value.username);
          // console.log("pass");
          return value.transactions;
        }else{
          $('#table').empty
        }
      })
      // console.log("tran",filterList[0].transactions.length);
      // console.log(filterList);
      // $('#tableTitle').empty()
      if(filterList[0].transactions.length > 0){
        $('#table #transactionTable').remove();
        $.each(filterList, (index, value) =>{
          // console.log(value);
          for (const key in value.transactions) {
            console.log(value.transactions[key]);
            $('#table').append(
              `
              <tr class="table" id="transactionTable">
                <td>${value.id}</td>
                <td>${value.username}</td>
                <td>${value.transactions[key].typeof}</td>
                <td>${value.transactions[key].category}</td>
                <td>${value.transactions[key].txt}</td>
                <td>${value.transactions[key].amount}</td>
                <td>${value.transactions[key].from}</td>
                <td>${value.transactions[key].to}</td>
              </tr>
              `
              );
            }
          })
        }
        else{
          $('#table1').empty()
          console.log("transaction empty");
        }
      // const filterMap = $.map(filterList, (post, i) => {
      //   // console.log(post.transactions);
      //   return
      // });
    });
    setUser(data);
    addUserSelectBox(data);
    // checkUserId(data)

    console.log(data);
  })
})

// const checkUserId =(data)=>{
//   console.log(data[0].id);
// }

// Koki part /////////////////////////////////////
const setUser = (data) => {
  $('[name=username]').change(() => {
    let selectedUser = $('[name=username]').val();
    // test(selectedUser)
    for (let index = 0; index < data.length; index++) {
      if (data[index].username === selectedUser) {
        // console.log(data[index]);
        $('#summary').html(`
              <p>Username : ${data[index].username}</p>
              <p>Balance : ${data[index].balance}</p>
            `);
        return data[index];
      }
    }
  });
};
const addUserSelectBox = (data) => {
  console.log(data);
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
      new Account(data.username, data.transactions);
    })
    .fail((error) => {
      console.log('error', error);
    });
};
