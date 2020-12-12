const { remote } = require('electron');
var server = remote.getGlobal('sharedObject').server;
var ip = require('../../../node_modules/ip');
var http = require('http');

$('#server-name').text(server)

$('#state-box').hover(function(){
    $('#state').text('On ?');
}, function (){
    $('#state').text('Off');
});

$('#ip').text(ip.address())
$('#num-players').text('4/50');

$(document).on('click', '#ip-box', (e) =>{
    copyToClipboard($('#ip'));
    $('[data-toggle="tooltip"]').attr('data-original-title', 'Copied !')
    $('[data-toggle="tooltip"]').tooltip('hide')
    $('[data-toggle="tooltip"]').tooltip('show')
    $('#ip-box').css('transform', 'scale(1.2)')
    setTimeout(
        function() 
        {
            $('#ip-box').css('transform', 'scale(1)')
        }, 80);
})

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip()
})