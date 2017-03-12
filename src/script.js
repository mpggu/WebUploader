function storePassword(password) {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.password = password;
}

function getPassword() {
  if (typeof localStorage === 'undefined') {
    return '';
  }

  return localStorage.password || '';
}

function uploadFile(file) {
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    return;
  }

  if (!file) {
    return alert('Datei konnte nicht geladen werden!');
  }

  var auth = prompt('Passwort bitte!', getPassword());

  var r = new FileReader();
  r.onload = function (e) {
    var content = e.target.result;
    var url = 'http://sudocode.me:6767/api/v1/vplan';

    $.ajax({
      url: url,
      data: {
        vplan: content
      },
      error: function(xhr, statusText) {
        alert('Datei konnte nicht hochgeladen werden: ' + xhr.status + ', ' + statusText)
      },
      success: function() {
        if (!getPassword()) {
          storePassword(auth);
        }
        alert('Datei erfolgreich hochgeladen!');
      },
      headers: {
        Authorization: auth
      },
      type: 'POST',
      cache: false,
      crossDomain: true
    })

    $('#fileinput').value = '';
  }

  return r.readAsText(file, 'ISO-8859-1');
  
}

$(function() {
  $.support.cors = true;

  $('#fileinput')[0].addEventListener('change', function(evt) {
    uploadFile(evt.target.files[0]); 
  });

  var fileDropper = $('.wrapper')[0];

  fileDropper.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  });

  fileDropper.addEventListener('drop', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    uploadFile(evt.dataTransfer.files[0]);
  });
});
