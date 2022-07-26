export const renderCategory = (data) => {
  const list = $.map(data, (value, index) => {
    return `<option value="${value.name.name}" key="">${value.name.name}</option>`;
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
      post;
    })
  );
};

export const checkCategory = (data) => {
  const list = $.map(data, (value, index) => {
    return value.name.name;
  });
  $('[name=category]').change(() => {
    let selectdCategory = $('[name=category] option:selected').text();
    if (selectdCategory === 'add category') {
      $('#categorybox').show();
      $('#addcategorybtn').on('click', (e) => {
        let newcategory = $('#categoryinput').val();
        if (newcategory === ' ') {
          return alert('Plase add category');
        }
        const checkCategory = $.inArray(newcategory, list);
        if (checkCategory < 0) {
          $.ajax({
            method: 'post',
            data: JSON.stringify({
              newCategory: {
                name: newcategory,
              },
            }),
            url: 'https://final-project-transaction.herokuapp.com/categories',
            dataType: 'json',
            contentType: 'application/json',
          }).done((data) => {
            $.ajax({
              method: 'get',
              url: 'https://final-project-transaction.herokuapp.com/categories',
              dataType: 'json',
            }).done((data) => {
              renderCategory(data);
            });
          });
        } else {
          return alert('The category is aleady added');
        }
      });
    }
  });
};
export default { renderCategory, checkCategory };
