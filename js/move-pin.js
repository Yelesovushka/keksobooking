'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PICK_HEIGHT = 22;
  var TOP_EDGE_ON_MAP = 130;
  var BOTTOM_EDGE_ON_MAP = 630;
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  function getMainPinPosition(evt, startCoords) {
    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    var newCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    var body = document.querySelector('body');
    var topEdge = TOP_EDGE_ON_MAP - PIN_HEIGHT - PICK_HEIGHT;
    var bottomEdge = BOTTOM_EDGE_ON_MAP - PIN_HEIGHT - PICK_HEIGHT;
    var leftEdge = body.offsetLeft - PIN_WIDTH / 2;
    var rightEdge = body.offsetLeft - PIN_WIDTH / 2 + body.offsetWidth;

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
      x: newCoords.x + PIN_WIDTH / 2,
      y: newCoords.y + PICK_HEIGHT + PIN_HEIGHT
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
