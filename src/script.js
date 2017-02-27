function uploadFile(evt) {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    var file = evt.target.files[0];

    if (!file) {
      return alert('Datei konnte nicht geladen werden!');
    }

    var auth = prompt('Passwort bitte! :)');

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
        }
      }

      http.open('POST', url, true);
      http.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      http.setRequestHeader('Authorization', auth);

      http.send(JSON.stringify({
        vplan: contents
      }));
    }
    r.readAsText(file, 'ISO-8859-1');
  }
}

document.getElementById('fileinput').addEventListener('change', uploadFile, false);