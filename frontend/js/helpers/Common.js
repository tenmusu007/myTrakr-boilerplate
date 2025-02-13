//common functions that can be used in different cases
export const connectAjax = (method, url, sendingData = '') => {
  $.ajax({
    method: method,
    data: sendingData,
    url: `https://dashboard.heroku.com/apps/final-project-transaction/deploy/heroku-git/`,
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
export const DomainUrl = "https://final-project-transaction.herokuapp.com/"
export default { connectAjax };
