'use strict';

(function () {
  var houseType = document.querySelector('#housing-type');
  var housePrice = document.querySelector('#housing-price');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseGuests = document.querySelector('#housing-guests');
  var houseFeatures = document.querySelectorAll('.map__checkbox');
  var houseFeaturesArr = Array.prototype.slice.call(houseFeatures);
  var formFilters = document.querySelector('.map__filters');

  var pinsCopy = [];
  /*
  function filterBySelect(pinProperty, select) {
    if(select.value !== 'any') {
      pinsCopy.filter(function (pin) {
        return pin.offer[pinProperty] === select.value;
      });
    }
  }*/

  function filterBySelect(pinProperty, select, rank) {
    if (select.value === 'any' || pinProperty === select.value) {
      rank++;
    }
    return rank;
  }

  function filterPins() {
    var filteredPins = pinsCopy;
    var FILTERS_COUNT = 5;
    console.log(filteredPins);
    filteredPins = pinsCopy.filter(function (pin) {
      var rank = 0;

      rank = filterBySelect(pin.offer.type, houseType, rank);
      rank = filterByPrice(pin.offer.price, rank);
      rank = filterBySelect(pin.offer.rooms, houseRooms, rank);
      rank = filterByGuests(pin.offer.guests, rank);
      rank = filterByFeatures(pin.offer.features, rank);

      return rank === FILTERS_COUNT;
    });

    console.log(filteredPins);
    window.pins.resetPins();
    window.helpers.hideElement(document.querySelector('.popup'));
    window.pins.renderPins(filteredPins);
  }

  function filterByPrice(price, rank) {
    var result;

    if (housePrice.value === 'any') {
      result = true;
    } else if (price <= 10000) {
      result = housePrice.value === 'low';
    } else if (price >= 50000) {
      result = housePrice.value === 'high';
    } else {
      result = housePrice.value === 'middle';
    }

    if (result) {
      rank++;
    }

    return rank;
  }


  function filterByGuests(guests, rank) {
    var result;

    if (guests > 3) {
      result = houseGuests.value === 'any';
    } else {
      result = houseGuests.value === guests;
    }

    if (result) {
      rank++;
    }

    return rank;
  }

  function filterByFeatures(features, rank) {
    var checkFeatures = houseFeaturesArr.filter(function (elem) {
      return elem.checked === true;
    });

    var result = checkFeatures.every(function (elem) {
      return features.includes(elem);
    });

    if (result) {
      rank++;
    }

    return rank;
  }

  function onPinsFilterChange() {
    console.log(pinsCopy);
    window.debounce(filterPins);
  }

  window.filters = {
    init: function (pinsArray) {
      pinsCopy = pinsArray.slice();

      formFilters.addEventListener('change', onPinsFilterChange);
    }
  };

})();
