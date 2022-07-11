export const renderCategory = (data) => {
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
export const checkCategory = ()=>{
  let categoryArr = [];
  $('[name=category]').change(() => {
    let selectdCategory = $('[name=category] option:selected').text();
    if (selectdCategory === 'add category') {
      $('#categorybox').show();
      $('#addvategorybtn').on('click', (e) => {
        e.preventDefault();
        let newcategory = $('#categoryinput').val();
        if(newcategory === " "){
          return alert("Plase add category")
        }
        const checkCategory = $.inArray(newcategory, categoryArr);
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

}
export default { renderCategory,checkCategory };
