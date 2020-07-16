'use strict';

// валидация формы

(function () {
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var roomInput = document.querySelector('#room_number');
  var guestInput = document.querySelector('#capacity');
  var checkinInput = document.querySelector('#timein');
  var checkoutInput = document.querySelector('#timeout');
  var adForm = document.querySelector('.ad-form');
  var inputs = adForm.querySelectorAll('input, select');
  var submitBtn = adForm.querySelector('.ad-form__submit');
  var resetButton = adForm.querySelector('.ad-form__reset');

  function syncRoomAndGuestInputs() {
    if (roomInput.value === '1' && guestInput.value !== '1') {
      roomInput.setCustomValidity('1 комната для 1 гостя');
    } else if (roomInput.value === '2' && guestInput.value !== '1' && guestInput.value !== '2') {
      roomInput.setCustomValidity('2 комнаты для 1 или 2 гостей');
    } else if (roomInput.value === '3' && guestInput.value === '100') {
      roomInput.setCustomValidity('3 комнаты для 1, 2 или 3 гостей');
    } else if (roomInput.value === '100' && guestInput.value !== '0') {
      roomInput.setCustomValidity('100 комнат не для гостей');
    } else {
      roomInput.setCustomValidity('');
    }

    if (guestInput.value === '1' && roomInput.value === '100') {
      guestInput.setCustomValidity('Для 1 гостя - 1, 2 или 3 комнаты');
    } else if (guestInput.value === '2' && roomInput.value !== '2' && roomInput.value !== '3') {
      guestInput.setCustomValidity('Для 2 гостей - 2 или 3 комнаты');
    } else if (guestInput.value === '3' && roomInput.value !== '3') {
      guestInput.setCustomValidity('Для 3 гостей - 3 комнаты');
    } else if (guestInput.value === '0' && roomInput.value !== '100') {
      guestInput.setCustomValidity('100 комнат не для гостей');
    } else {
      guestInput.setCustomValidity('');
    }
  }

  function setMinPriceOnRoom() {
    var minPrice;

    switch (typeInput.value) {
      case 'flat':
        minPrice = 1000;
        break;
      case 'bungalo':
        minPrice = 0;
        break;
      case 'house':
        minPrice = 5000;
        break;
      default:
        minPrice = 10000;
    }

    return minPrice;
  }

  function checkValidity() {
    var input;
    var errorsNumber = 0;

    for (var i = 0; i < inputs.length; i++) {
      input = inputs[i];
      if (input.checkValidity() === false) {
        input.style.borderColor = 'red';
        errorsNumber++;
      } else {
        input.style.borderColor = '#d9d9d3';
      }
    }

    if (errorsNumber === 0) {
      window.backend.upload(onUpload, onError, new FormData(adForm));
    }
  }

  function onSubmitClick(evt) {
    evt.preventDefault();
    checkValidity();
  }

  function onUpload() {
    var successMessageTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);

    successMessage.classList.add('message');

    document.body.insertAdjacentElement('afterbegin', successMessage);

    document.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageKeydown);

    adForm.reset();
    window.page.reset();
  }

  function onMessageClick(evt) {
    hideMessage(evt);
  }

  function onMessageKeydown(evt) {
    if (evt.keyCode === 27) {
      hideMessage(evt);
    }
  }

  function hideMessage() {
    var message = document.querySelector('.message');
    document.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageKeydown);
    message.remove();
  }

  function onError() {
    var errorMessageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);

    errorMessage.classList.add('message');

    document.body.insertAdjacentElement('afterbegin', errorMessage);

    document.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageKeydown);
  }

  function resetForm(evt) {
    evt.preventDefault();
    adForm.reset();
  }

  function onResetClick(evt) {
    resetForm(evt);
  }

  function onResetKeydown(evt) {
    if (evt.keyCode === 13) {
      resetForm(evt);
    }
  }

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное для заполнения поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', function () {
    var valueLength = titleInput.value.length;
    var minLength = titleInput.minLength;
    var maxLength = titleInput.maxLength;

    if (valueLength < minLength) {
      titleInput.setCustomValidity('Введите еще ' + (minLength - valueLength) + ' символов');
    } else if (valueLength > maxLength) {
      titleInput.setCustomValidity('Удалите ' + (valueLength - maxLength) + ' символов');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  typeInput.addEventListener('change', function () {
    priceInput.placeholder = setMinPriceOnRoom();
  });

  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное для заполнения поле');
    } else {
      priceInput.setCustomValidity('');
    }
  });

  priceInput.addEventListener('input', function () {
    var value = priceInput.value;
    var max = priceInput.max;
    var min = setMinPriceOnRoom();

    if (value > max) {
      priceInput.setCustomValidity('Максимальная цена превышена на ' + (value - max));
    } else if (value < min) {
      priceInput.setCustomValidity('Минимальная цена занижена на ' + (min - value));
    } else {
      priceInput.setCustomValidity('');
    }
  });


  checkinInput.addEventListener('change', function () {
    if (checkinInput.value === '12:00') {
      checkoutInput.value = '12:00';
    } else if (checkinInput.value === '13:00') {
      checkoutInput.value = '13:00';
    } else {
      checkoutInput.value = '14:00';
    }
  });

  checkoutInput.addEventListener('change', function () {
    if (checkoutInput.value === '12:00') {
      checkinInput.value = '12:00';
    } else if (checkoutInput.value === '13:00') {
      checkinInput.value = '13:00';
    } else {
      checkinInput.value = '14:00';
    }
  });

  roomInput.addEventListener('change', syncRoomAndGuestInputs);
  guestInput.addEventListener('change', syncRoomAndGuestInputs);
  submitBtn.addEventListener('click', onSubmitClick);
  resetButton.addEventListener('click', onResetClick);
  resetButton.addEventListener('keydown', onResetKeydown);
})();
