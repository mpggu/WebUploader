function storePassword(password) {
  if (typeof Storage === 'undefined') {
    return;
  }

  localStorage.password = password;
}

function getPassword() {
  if (typeof Storage === 'undefined') {
    return '';
  }

  return localStorage.password || '';
}

function uploadFile(file) {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    if (!file) {
      return alert('Datei konnte nicht geladen werden!');
    }

    var auth = prompt('Passwort bitte!', getPassword());

    var r = new FileReader();
    r.onload = function(e) {
      var contents = e.target.result;
      
      var http = new XMLHttpRequest();
      var url = 'http://sudocode.me:6767/api/v1/vplan';

      http.onreadystatechange = function() { 
        if (http.readyState === 4 && http.status !== 200) {
          console.log(http);
          return alert('Fehler beim Hochladen der Datei: ' + http.statusText);
        } else if (http.readyState === 4 && http.status === 200) {
          alert('Erfolgreich hochgeldaden');
          if (!getPassword()) {
            storePassword(auth);
          }
        }
      }

      http.open('POST', url, true);
      http.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      http.setRequestHeader('Authorization', auth);

      http.send(JSON.stringify({
        vplan: contents
      }));

      document.getElementById('fileinput').value = "";
    }
    return r.readAsText(file, 'ISO-8859-1');
  }
}

document.getElementById('fileinput').addEventListener('change', function(evt) {
  uploadFile(evt.target.files[0]); 
}, false);


var fileDropper = document.getElementsByClassName('wrapper')[0];

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