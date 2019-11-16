'use strict';

let getInformationByLocal = () => {
    const data = localStorage.getItem('dataUser');
    dataUser = JSON.parse(data)
    loadUser();
}

let loadUser = () => {
    showInfoUser();
    $('#signUp-btn-head').toggleClass('hide');
    $('.btn-registration').toggleClass('hide');
    $('#user-block').html(dataUser.name);
}

let showSlider = () => {
    for (let slide of dataSlider) {
        let slideBlock = $('<div/>', {
            "class": `swiper-slide`,
            "style": `background-image:url(${slide.url}); background-position: center top; background-repeat: no-repeat;`
        }).appendTo('#swiper-slider');

        $('<div/>', {
            text: `${slide.title}: ${slide.description}`,
            "class": 'slide-text',
        }).appendTo(slideBlock);
    }
    settingsSlider();
}

let settingsSlider = () => {
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 5600,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

let inputValidation = (idOutput, inputValue, checkCondition) => {
    let checkValue = inputValue.match(checkCondition);
    $(idOutput).html('');
    if (checkValue !== null) {
        $(idOutput).html('');
        return checkValue;
    } else {
        $(idOutput).html('Wrong!');
        return checkValue;
    }
}

let regUser = () => {
    let nameUser = $('#nameSignUp').val();
    let passUser = $('#passSignUp').val();
    let emailUser = $('#emailSignUp').val();
    let nameCheck = inputValidation('#wrongName', nameUser, formatName);
    let passCheck = inputValidation('#wrongPass', passUser, formatPass);
    let emailCheck = inputValidation('#wrongEmail', emailUser, formatEmail);

    if (nameCheck && passCheck && emailCheck) {
        let objUser = new User();
        let newUser = Object.create(objUser);
        newUser.name = nameCheck[0];
        newUser.password = passCheck.input;
        newUser.email = emailCheck[0];
        dataUser = newUser;
        clearForm();
        showInfoUser();
        addInLocalStorage();
        $('.modal-area-registration').toggleClass('hide');
        $('#signUp-btn-head').toggleClass('hide');
        $('.btn-registration').toggleClass('hide');
        $('#user-block').html(newUser.name);
    }
}

let addInLocalStorage = () => {
    let dataInStorage = JSON.stringify(dataUser);
    localStorage.setItem('dataUser', dataInStorage);
}

let clearForm = () => {
    $('#nameSignUp').val('');
    $('#passSignUp').val('');
    $('#emailSignUp').val('');
}

let showInfoUser = () => {
    $('#infoUserBlock').html(`Name: ${dataUser.name} <br> Email: ${dataUser.email}`)
}

// Выход с учетки
let exitUser = () => {
    dataUser = [];
    localStorage.removeItem('dataUser');
    //hide
    $('.modal-area-user').toggleClass('hide');
    //show
    $('#signUp-btn-head').toggleClass('hide');
    $('.btn-registration').toggleClass('hide');
    //clear
    $('#user-block').html('');
    $('#infoUserBlock').html('');
}

// Отправка адреса почты
let sendEmail = () => {
    let mailPromo = $("#promo").val();
    let mailCheck = inputValidation('#error-mail', mailPromo, formatEmail)
    if (mailCheck) {
        let dataEmail = JSON.stringify(mailCheck[0]);
        $.ajax({
            type: "POST",
            url: "http://httpbin.org/post",
            data: dataEmail
        }).done(function (msg) {
            alert("Congratulations! Discount sent to your email");
            console.log(msg.form);
        }).fail(function (msg) {
            alert("Error");
            console.log(msg.form);
        }).always(function () {
            console.log("Complete");
        });
        $("#promo").val('')
    }
}
