'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  function getMainPinPosition(evt, startCoords) {
    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    var pinWidth = 65;
    var pinHeight = 65;
    var pickHeight = 22;

    var newCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    var body = document.querySelector('body');
    var topEdge = 130 - pinHeight - pickHeight;
    var bottomEdge = 630 - pinHeight - pickHeight;
    var leftEdge = body.offsetLeft - pinWidth / 2;
    var rightEdge = body.offsetLeft - pinWidth / 2 + body.offsetWidth;

    if (newCoords.y < topEdge) {
      newCoords.y = topEdge;
    } else if (newCoords.y > bottomEdge) {
      newCoords.y = bottomEdge;
    }

    if (newCoords.x < leftEdge) {
      newCoords.x = leftEdge;
    } else if (newCoords.x > rightEdge) {
      newCoords.x = rightEdge;
    }

    var pickCoords = {
      x: newCoords.x + pinWidth / 2,
      y: newCoords.y + pickHeight + pinHeight
    };

    mainPin.style.top = newCoords.y + 'px';
    mainPin.style.left = newCoords.x + 'px';
    addressInput.value = parseInt(pickCoords.x, 10) + ', ' + parseInt(pickCoords.y, 10);
  }

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      getMainPinPosition(moveEvt, startCoords);

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
