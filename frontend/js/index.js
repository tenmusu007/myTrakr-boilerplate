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
  if(radiovalue === "withdraw" || radiovalue === "deposit" ){
    $("#transfer").hide();
    $("#account").show()
  }else if(radiovalue === "transfer"){
    $("#account").hide()
    $("#transfer").show();
  }
  })

// categroy
// $("#categorybox").hide()
$("#addcategroy").on("click",(e)=>{
  e.preventDefault();
  $("#categorybox").hide()
})
// $('[name=category]').change(() => {
//   let test = $('[name=category] option:selected').text();
//   fromname = name
//   console.log(name);
// });
});

