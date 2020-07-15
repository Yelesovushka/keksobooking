'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };

  function initXhr(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = initXhr(onLoad, onError);
      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
