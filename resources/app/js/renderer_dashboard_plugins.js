const { remote } = require('electron');
var server = remote.getGlobal('sharedObject').server;
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
    for (i in value){
        $('#plugins').append(
            '<tr><th>'+value[i].name+'</th></tr>'
            );
        }
    });
}

$(document).on('click', '.plugin-link', (e) =>{

    const url = 'http://api.spiget.org/v2/resources/'+$(e.target).attr('id')+'/download'; // link to file you want to download
    const path = documents+'/MCSM/'+$(e.target).text().toLowerCase().replace(/[^a-zA-Z0-9]/g, "") + '/'+server+'.jar';

    const request = http.get(url, function(response) {
        var file = fs.createWriteStream(path);
        response.pipe(file);
        return;
    });
});

http.request(options, callback).end();