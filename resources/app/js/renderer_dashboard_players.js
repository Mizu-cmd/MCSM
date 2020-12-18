const { remote } = require('electron');
const app = remote.app;
var server = remote.getGlobal('sharedObject').server;

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
                skin: "https://crafatar.com/avatars/57390498ec4640b68ab1de522e88ddf8"
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
