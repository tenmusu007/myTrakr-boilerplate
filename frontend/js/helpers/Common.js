//common functions that can be used in different cases
export const connectAjax = (method, url, sendingData = '') => {
  $.ajax({
    method: method,
    data: sendingData,
    url: `http://localhost:3000/${url}`,
    dataType: 'json',
    contentType: 'application/json',
  })
    .done((data) => {
      console.log(`${method} ${url}`, data);
    })
    .fail((data) => {
      console.log(`FAILED ${method} ${url}`, data);
    });
};

export default { connectAjax };
