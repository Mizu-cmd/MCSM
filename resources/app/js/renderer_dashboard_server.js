const { remote } = require('electron');
const app = remote.app;
var server = remote.getGlobal('sharedObject').server;

let documents = app.getPath('documents');


$('#open-folder').on('click', function(){
    require('child_process').exec('start "" "'+documents+'/MCSM/'+server+'" ');
})

$('[data-toggle="popover-hover"]').popover({
    html: true,
    trigger: 'hover',
    placement: 'bottom',
    content: function () { return '<img src="' + $(this).data('img') + '" />'; }
  });

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip()
})