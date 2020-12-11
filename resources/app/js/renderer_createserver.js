var fs = require('fs');
var http = require('http');

const { remote } = require('electron');
const app = remote.app;

let documents = app.getPath('documents') + '/MCSM/';

$(document).ready(function() {
    
})

$(document).ready(function() {

  const $valueSpan = $('.min-ram-span');
  const $value = $('#min-ram');
  $valueSpan.html($value.val()+' Mo');
  $value.on('input change', () => {

    $valueSpan.html($value.val()+ ' Mo');
  });
});

$(document).ready(function() {

  const $valueSpan = $('.max-ram-span');
  const $value = $('#max-ram');
  $valueSpan.html($value.val()+' Mo');
  $value.on('input change', () => {

    $valueSpan.html($value.val()+' Mo');
  });
});

var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(cb);  // close() is async, call cb after close completes.
      });
    }).on('error', function(err) { // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
  };

$(document).on('click', '#btn-create',(e) =>{
  var selected = $('#version-dropdown option:selected').attr('value');
  download("http://cdn.getbukkit.org/spigot/spigot-" + selected + ".jar", documents + 'bukkit.jar');
});