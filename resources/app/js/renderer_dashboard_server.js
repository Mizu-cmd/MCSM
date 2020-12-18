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

$(document).ready(function() {

    const $valueSpan = $('.min-ram-span');
    const $value = $('#min-ram');
    $valueSpan.html($value.val()+' Mo');
    $value.on('input change', () => {
  
      $valueSpan.html($value.val()+ ' Mo');
    });
  });
  
  $(document).ready(function() {
  
    const $valueSpan = $('.max-ram-span');
    const $value = $('#max-ram');
    $valueSpan.html($value.val()+' Mo');
    $value.on('input change', () => {
  
      $valueSpan.html($value.val()+' Mo');
    });
  });
  
  $('#RCON-box').hide();

  $('#RCON').change(function() {
    if(this.checked) {
      $('#RCON-box').show();
      $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }else{
      $('#RCON-box').hide();
    }
});