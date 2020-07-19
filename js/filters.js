'use strict';

(function () {
  var FILTERS_COUNT = 5;
  var DEFAULT_SELECT_VALUE = 'any';
  var houseType = document.querySelector('#housing-type');
  var housePrice = document.querySelector('#housing-price');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseGuests = document.querySelector('#housing-guests');
  var houseFeatures = document.querySelectorAll('.map__checkbox');
  var houseFeaturesArr = Array.prototype.slice.call(houseFeatures);
  var formFilters = document.querySelector('.map__filters');
  var selects = document.querySelectorAll('.map__filter');
  var checkboxes = document.querySelectorAll('.map__checkbox');
  var pinsCopy = [];

  function filterPins() {
    var filteredPins = pinsCopy;

    filteredPins = pinsCopy.filter(function (pin) {
      var rank = 0;

      rank = filterBySelect(pin.offer.type, houseType, rank);
      rank = filterByPrice(pin.offer.price, rank);
      rank = filterBySelect(pin.offer.rooms, houseRooms, rank);
      rank = filterBySelect(pin.offer.guests, houseGuests, rank);
      rank = filterByFeatures(pin.offer.features, rank);

      return rank === FILTERS_COUNT;
    });

    window.pins.resetPins();
    window.helpers.hideElement(document.querySelector('.popup'));
    window.pins.renderPins(filteredPins);
  }

  function filterBySelect(pinProperty, select, rank) {
    if (select.value === DEFAULT_SELECT_VALUE || pinProperty.toString() === select.value) {
      rank++;
    }
    return rank;
  }

  function filterByPrice(price, rank) {
    var result;

    switch (housePrice.value) {
      case 'low':
        result = price <= 10000;
        break;
      case 'middle':
        result = price > 10000 && price < 50000;
        break;
      case 'high':
        result = price >= 50000;
        break;
      default:
        result = true;
    }

    if (result) {
      rank++;
    }

    return rank;
  }

  function filterByFeatures(features, rank) {
    var checkedFeatures = houseFeaturesArr.filter(function (elem) {
      return elem.checked;
    });

    var result = checkedFeatures.every(function (elem) {
      return features.includes(elem.value);
    });

    if (result) {
      rank++;
    }

    return rank;
  }

  function onPinsFilterChange() {
    window.debounce(filterPins);
  }

  window.filters = {
    init: function (pinsArray) {
      pinsCopy = pinsArray.slice();

      formFilters.addEventListener('change', onPinsFilterChange);
    },
    reset: function () {
      pinsCopy = [];
      formFilters.removeEventListener('change', onPinsFilterChange);

      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }

      for (var j = 0; j < selects.length; j++) {
        selects[j].options[0].selected = true;
      }
    }
  };
})();
