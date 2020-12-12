const fs = require('fs');
var http = require('http');

var options = {
    host: 'https://api.spiget.org',
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
    console.log(str);
});
}