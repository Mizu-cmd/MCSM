const { remote } = require('electron');
const app = remote.app;
var server = remote.getGlobal('sharedObject').server;

let documents = app.getPath('documents');


$('#open-folder').on('click', function(){
    require('child_process').exec('start "" "'+documents+'/MCSM/'+server+'" ');
})

$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        placement : 'top',
        trigger : 'hover',
        html : true,
        container: 'body'
    });
});