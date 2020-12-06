var fs = require('fs');
var http = require('http');

const { remote } = require('electron');
const app = remote.app;

let documents = app.getPath('documents') + '/MCSM/';

$(document).ready(function() {
    download("http://cdn.getbukkit.org/spigot/spigot-1.16.4.jar", documents+"bukkit.jar")
})

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