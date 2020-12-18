var net = require('net');



$('a').on("click",function(){
    transitionToPage($(this).attr('link'));
    console.log('cliked');
});

$(document).ready(function(){
    $('.preloader').fadeOut('slow');
});

var client = new net.Socket();
client.connect(1487, '127.0.0.1', function () {
    console.log('connected')
});

client.on('error', function(ex) {
    console.log('Not connected');
});

client.on('data', function(data){
    console.log(data)
    console.log(JSON.parse(JSON.stringify(data)).players['number'][0]);
});

