var fs = require('fs');
var http = require('http');

const { remote } = require('electron');
const app = remote.app;

let documents = app.getPath('documents') + '/MCSM/';
var drag = $('#drag-file');
var attributes = drag.attr('class');

$(document).ready(function() {
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


  drag.on('drop', (event) => { 
    event.preventDefault(); 
    event.stopPropagation(); 
    var file = event.originalEvent.dataTransfer.files[0];

    console.log(file.path);
    $('#drag-file p').hide()
    drag.text(file.name)
}); 
  
drag.on('dragover', (e) => { 
    e.preventDefault(); 
    e.stopPropagation(); 
  }); 
  
drag.on('dragenter', (event) => { 
}); 
  
drag.on('dragleave', (event) => { 
    console.log('File has left the Drop Space'); 
}); 