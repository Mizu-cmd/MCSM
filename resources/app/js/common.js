var net = require('net');

$('a').on("click",function(){
    transitionToPage($(this).attr('link'));
    console.log('cliked');
});

$(document).ready(function(){
    $('.preloader').fadeOut('slow');
});

