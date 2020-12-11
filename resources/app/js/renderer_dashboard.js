const { remote } = require('electron');
var server = remote.getGlobal('sharedObject').server;

$('#server-name').text(server)

$('#state-box').hover(function(){
    $('#state').text('On ?');
}, function (){
    $('#state').text('Off');
});

$(document).on('click', '#players-box', (e) =>{
    
})