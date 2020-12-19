const { Console } = require('console');
const { remote } = require('electron');
const app = remote.app;
var server = remote.getGlobal('sharedObject').server;
var http = require('http');


let documents = app.getPath('documents');

$('[data-toggle="popover-hover"]').popover({
    html: true,
    trigger: 'hover',
    placement: 'bottom',
    content: function () { 
        return '<div id="skin-box" class="container"></div>'; 
        }    
  });

$('[data-toggle="popover-hover"]').hover(function () {
    setTimeout(
        function() 
        {
            $('#skin-box').append('<canvas id="skin_container"></canvas>');
            let skinViewer = new skinview3d.SkinViewer({
                canvas: document.getElementById("skin_container"),
                width: 200,
                height: 300,
                skin: "https://minotar.net/skin/Eky0z"
            });

            // Change viewer size
            skinViewer.width = 200;
            skinViewer.height = 300;

            // Load another skin

            // Control objects with your mouse!
            let control = skinview3d.createOrbitControls(skinViewer);
            control.enableRotate = true;
            control.enableZoom = false;
            control.enablePan = false;

            let walk = skinViewer.animations.add(skinview3d.WalkingAnimation);
            // Add another animation
            let rotate = skinViewer.animations.add(skinview3d.RotatingAnimation);
            rotate.resetAndRemove();
        }, 200);
});

var options = {
    host: 'localhost',
    port: 8081,
    path: '/players'
};

http.get(options, function(res){
    res.on("data", function(chunk) {
        for (var i in (Object.keys(JSON.parse(chunk.toString()).players).length)){
            var player = JSON.parse(chunk.toString()).players[i].name;
            $('#players-box').append('<div class="mt-3 p-3 border border-stylish rounded mb-0 animated fadeIn faster" style="background-color: #3e515b;"> <img src="https://crafatar.com/avatars/57390498ec4640b68ab1de522e88ddf8" data-toggle="popover-hover" style="width: 5%;"> <a class="h1 ml-2 mt-2" href="players-info.html" style="color: aliceblue; font-size: 20px;">EkyOz</a> <button type="button" class="btn btn float-right btn-sm" player="" style="background-color: #cc0000;" data-toggle="modal" data-target="#modal-ban">Ban</button> <button type="button" class="btn btn float-right btn-sm" player="" style="background-color: #FF8800;" data-toggle="modal" data-target="#modal-kick">Kick</button> <a href="players-info.html" player="" type="button" class="btn btn float-right btn-sm" style="background-color: #00C851;">Info</a> </div>')
        }
    });
});
