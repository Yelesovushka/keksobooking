'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };

  function initXhr(onSuccess, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open(method, url);
    xhr.send(data);
  }

  window.backend = {
    load: function (onLoad, onError) {
      initXhr(onLoad, onError, 'GET', URL_LOAD);
    },
    upload: function (onUpload, onError, data) {
      initXhr(onUpload, onError, 'POST', URL_UPLOAD, data);
    }
  };
})();
