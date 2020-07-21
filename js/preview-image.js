'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('#avatar');
  var fileChooserPhoto = document.querySelector('#images');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewPhoto = document.querySelector('.ad-form__photo img');

  function chooseFile(chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var checkEndFile = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (checkEndFile) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  fileChooserAvatar.addEventListener('change', function () {
    chooseFile(fileChooserAvatar, previewAvatar);
  });

  fileChooserPhoto.addEventListener('change', function () {
    chooseFile(fileChooserPhoto, previewPhoto);
  });

})();
