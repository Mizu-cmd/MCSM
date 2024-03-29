const { remote } = require('electron');
const app = remote.app;
var server = sessionStorage.getItem('server');
var http = require('http');

let documents = app.getPath('documents');

var player = sessionStorage.getItem('currentPlayer');
var ip;
var name;
var UUID;
var health;
var food;
var xp;
var mining;

var options = {
  host: 'localhost',
  port: 8081,
  path: '/players?p='+player,
};

http.get(options, function(res){
  res.on("data", function(chunk) {
      UUID = JSON.parse(chunk.toString()).players[0]['UUID'];
      name = JSON.parse(chunk.toString()).players[0]['name'];
      ip = JSON.parse(chunk.toString()).players[0]['IP'];
      health = JSON.parse(chunk.toString()).players[0]['health'];
      food = JSON.parse(chunk.toString()).players[0]['food'];
      xp = JSON.parse(chunk.toString()).players[0]['xp'];

      enableSkinView();
      writeInfo();
  });
});

var options = {
  host: 'localhost',
  port: 8081,
  path: '/mining?p='+player,
};

http.get(options, function(res){
  res.on("data", function(chunk) {
      mining = JSON.parse(chunk.toString()).players['topluck']+'%';
      $('#topluck').text(mining);
  });
});

function writeInfo(){
  $('#uuid-player').text(UUID);
  $('#player-name').text(player);
  $('#ip-player').text(ip);
  $('#player-health').css('width', health*5+'%');
  $('#player-food').css('width', food*5+'%');
  $('#player-xp').css('width', xp*100+'%');
}

function enableSkinView(){
  $('#skin-box').append('<canvas style="outline: none !important; box-shadow: none" id="skin_container"></canvas>');
  let skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin_container"),
    skin: "https://crafatar.com/skins/"+UUID
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
}


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