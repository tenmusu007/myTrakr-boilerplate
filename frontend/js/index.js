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
});
