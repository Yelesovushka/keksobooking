'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var roomInput = document.querySelector('#room_number');
  var guestInput = document.querySelector('#capacity');
  var checkinInput = document.querySelector('#timein');
  var checkoutInput = document.querySelector('#timeout');
  var adForm = document.querySelector('.ad-form');
  var inputs = adForm.querySelectorAll('input, select');
  var resetButton = adForm.querySelector('.ad-form__reset');

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

    resetForm();
  }

  function onMessageClick(evt) {
    hideMessage(evt);
  }

  function onMessageKeydown(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
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

  function resetForm() {
    adForm.reset();
    window.page.reset();
    window.previewImage.reset();
    priceInput.placeholder = '1000';
  }

  function onResetClick(evt) {
    evt.preventDefault();
    resetForm(evt);
  }

  function onResetKeydown(evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      evt.preventDefault();
      resetForm(evt);
    }
  }

  function setTitleCustomValidity() {
    var valueLength = titleInput.value.length;
    var minLength = titleInput.minLength;
    var maxLength = titleInput.maxLength;

    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное для заполнения поле');
    } else if (valueLength < minLength) {
      titleInput.setCustomValidity('Введите еще ' + (minLength - valueLength) + ' символов');
    } else if (valueLength > maxLength) {
      titleInput.setCustomValidity('Удалите ' + (valueLength - maxLength) + ' символов');
    } else {
      titleInput.setCustomValidity('');
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

  function setPriceCustomValidity() {
    var value = parseInt(priceInput.value, 10);
    var max = parseInt(priceInput.max, 10);
    var min = setMinPriceOnRoom();

    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное для заполнения поле');
    } else if (value > max) {
      priceInput.setCustomValidity('Максимальная цена превышена на ' + (value - max));
    } else if (value < min) {
      priceInput.setCustomValidity('Минимальная цена занижена на ' + (min - value));
    } else {
      priceInput.setCustomValidity('');
    }
  }

  function setGuestsCustomValidity() {
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

  titleInput.addEventListener('invalid', setTitleCustomValidity);
  titleInput.addEventListener('input', setTitleCustomValidity);

  typeInput.addEventListener('change', function () {
    setPriceCustomValidity();
    priceInput.placeholder = setMinPriceOnRoom();
  });

  priceInput.addEventListener('input', setPriceCustomValidity);
  priceInput.addEventListener('invalid', setPriceCustomValidity);

  checkinInput.addEventListener('change', function () {
    checkoutInput.value = checkinInput.value;
  });

  checkoutInput.addEventListener('change', function () {
    checkinInput.value = checkoutInput.value;
  });

  roomInput.addEventListener('change', setGuestsCustomValidity);
  guestInput.addEventListener('change', setGuestsCustomValidity);

  adForm.addEventListener('submit', onSubmitClick);

  resetButton.addEventListener('click', onResetClick);
  resetButton.addEventListener('keydown', onResetKeydown);
})();
