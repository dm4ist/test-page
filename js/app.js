'use strict';

if (localStorage.getItem('dataUser') !== null) {
  getInformationByLocal();
};

let promise = new Promise((resolve, reject) => {
  fetch('json/dataMentors.json')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Problem! status: ' +
            response.status);
          return;
        }
        response.json().then(function (data) {
          resolve(data);
        });
      }
    )
    .catch(function (err) {
      console.log('Error', err);
    });
});

promise.then(
  msg => {
    dataSlider = msg;
    showSlider();
  }
);

$('#close-modal-window').off('click').on('click', function () {
  $('.modal-area-registration').toggleClass('hide');
});

$('.btn-registration').off('click').on('click', function () {
  $('.modal-area-registration').toggleClass('hide');
});

$('#signUp-btn-head').off('click').on('click', function () {
  $('.modal-area-registration').toggleClass('hide');
});

$('#user-block').off('click').on('click', function () {
  $('.modal-area-user').toggleClass('hide');
});

$('#close-user-window').off('click').on('click', function () {
  $('.modal-area-user').toggleClass('hide');
});

$('#btn-signUp').off('click').on('click', function () {
  regUser();
});

$('#btn-exit').off('click').on('click', function () {
  exitUser();
});

// Отправка адреса почты
$('#btn-promo').on('click', function () {
  sendEmail();
});