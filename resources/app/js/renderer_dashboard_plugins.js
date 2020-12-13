const fs = require('fs');
var http = require('http');

$('[role = status]').css('opacity', '1');

var options = {
    host: 'api.spiget.org',
    path: '/v2/resources/free?size=20&page=1&fields=name%2Cfile',
  };

callback = function(response) {
var str = '';

//another chunk of data has been received, so append it to `str`
response.on('data', function (chunk) {
    str += chunk;
});

//the whole response has been received, so we just print it out here
response.on('end', function () {
    let value = JSON.parse(str);
    console.log(value.file);
    $('#plugins').append('<br/>'+value.name);
});
}

http.request(options, callback).end();

$(window).on('load',function() {
    console.log('loaded')
    $('body').css('opacity', 1)
});