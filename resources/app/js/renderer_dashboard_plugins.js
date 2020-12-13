const { remote } = require('electron');
const fs = require('fs');
var http = require('http');

const app = remote.app;
let documents = app.getPath('documents');

var options = {
    host: 'api.spiget.org',
    path: '/v2/resources/free?size=20&page=1&sort=latest&fields=name%2Cfile',
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
    for (i in value)
    $('#plugins').append('<br/><span id= href=https://www.spigotmc.org/'+value[i].file.url+'>'+value[i].name+'</span>');
});
}

http.request(options, callback).end();

const url = 'http://www.spigotmc.org/resources/quickshop-reremake-1-16-ready-say-hello-with-rgb.62575/download?version=371816'; // link to file you want to download
const path = documents+'/plugin.jar' // where to save a file

const request = http.get(url, function(response) {
    if (response.statusCode === 200) {
        var file = fs.createWriteStream(path);
        console.log('200');
        response.pipe(file);
    } else{
        console.log(response.statusCode);
    }
    request.setTimeout(60000, function() { // if after 60s file not downlaoded, we abort a request 
        request.abort();
    });
});