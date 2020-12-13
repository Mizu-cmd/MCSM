const { remote } = require('electron');
var server = remote.getGlobal('sharedObject').server;
var cp = require("child_process");
const app = remote.app;

let documents = app.getPath('documents');


$('#server-name').text(server)

$('#state-box').hover(function(){
    $('#state').text('On ?');
}, function (){
    $('#state').text('Off');
});

$('#ip').text('adrress')
$('#num-players').text('4/50');
$('#mc-version').text(remote.getGlobal('sharedObject').version)

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

$(document).ready(function(){
    $('#search').on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $('[role=main] div').filter(function() {
          if (!($(this).text().toLowerCase().indexOf(value) > -1)){
            $(this).css('opacity', 0.5)
          } else{
            $(this).css('opacity', 1)
          }
      });
    });
  });