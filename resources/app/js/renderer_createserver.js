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

const url = 'http://cdn.getbukkit.org/spigot/spigot-1.16.4.jar'; // link to file you want to download
const path = documents + 'bukkit.jar'; // where to save a file

const request = http.get(url, function(response) {
    if (response.statusCode === 200) {
        console.log('work')
        var file = fs.createWriteStream(path);
        response.pipe(file);
    }
    request.setTimeout(60000, function() { // if after 60s file not downlaoded, we abort a request 
        request.abort();
    });
});

$(document).on('click', '#btn-create',(e) =>{
  var selected = $('#version-dropdown option:selected').attr('value');
  //download("http://cdn.getbukkit.org/spigot/spigot-" + selected + ".jar", documents + 'bukkit.jar');
});

$(window).on('load',function() {
  console.log('loaded')
  $('body').css('opacity', 1)
});

