const { remote } = require('electron');
const app = remote.app;
var server = remote.getGlobal('sharedObject').server;
var http = require('http');

let documents = app.getPath('documents');

$('#skin-box').append('<canvas style="outline: none !important; box-shadow: none" id="skin_container"></canvas>');
let skinViewer = new skinview3d.SkinViewer({
  canvas: document.getElementById("skin_container"),
  skin: "https://crafatar.com/skins/57390498ec4640b68ab1de522e88ddf8"
});
skinViewer.width = 260;
skinViewer.height = 350;
let control = skinview3d.createOrbitControls(skinViewer);
control.enableRotate = true;
control.enableZoom = false;
control.enablePan = false;
let walk = skinViewer.animations.add(skinview3d.WalkingAnimation);
let rotate = skinViewer.animations.add(skinview3d.RotatingAnimation);
rotate.resetAndRemove();


$(document).on('click', '#uuid', (e) =>{
  copyToClipboard($('#uuid'));
  $('[data-toggle="tooltip"]').attr('data-original-title', 'Copied !')
  $('[data-toggle="tooltip"]').tooltip('hide')
  $('[data-toggle="tooltip"]').tooltip('show')
  $('#uuid').css('transform', 'scale(1.2)')
  setTimeout(
      function() 
      {
          $('#uuid').css('transform', 'scale(1)')
      }, 80);
})

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip()
})


var options = {
  host: 'localhost',
  port: 8000,
  path: '/players'
};

http.get(options, function(res){
  res.on("data", function(chunk) {
      console.log(JSON.parse(chunk.toString()).players[0]['IP']);
      $('#ip-player').text(JSON.parse(chunk.toString()).players[0]['IP']);
      $('#ip-uuid').text(JSON.parse(chunk.toString()).players[0]['UUID']);
  });
});