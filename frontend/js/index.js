$(() => {
  //Start coding here!
  $('[name=from]').change(() => {
    let name = $('[name=from] option:selected').text();
    fromname = name
    console.log(name);
  });
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

  // categroy
  // $("#categorybox").hide()
  $("#categorybox").hide()
  $('[name=category]').change(() => {
    let test = $('[name=category] option:selected').text();
    console.log(test);
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
            console.log('data post ajax', data)
            $.ajax({
              method: 'get',
              url: 'http://localhost:3000/categories',
              dataType: 'json',
            })
              .done((data) => {
                console.log(data);
                const list = $.map(data,(value,index)=>{ 
                  console.log(data);
                  console.log(value);
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
  });
});

