var fs = require('fs');
const path = require('path');

const { remote } = require('electron');
const app = remote.app;

let documents = app.getPath('documents');

fs.readdir(documents + '/MCSM/', function (err, files){
    if (err !== null) {
        console.log(err)
        return
    }

    files.forEach(function (file){
        $('#servers').append($('<div class="row"></div>').append($('<div class="col mt-3 p-3 border border-stylish rounded mb-0 special-color-dark"></div>').text(file)))
    })
})