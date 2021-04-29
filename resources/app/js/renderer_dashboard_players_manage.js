const { remote } = require('electron');
const app = remote.app;
var server = remote.getGlobal('sharedObject').server;

var http = require('http');
var player = sessionStorage.getItem('currentPlayer');

let documents = app.getPath('documents');

var options = {
    host: 'localhost',
    port: 8081,
    path: '/inventorys?p='+player,
  };

var gui = [
    {
        name: "base",
        texture: "/gui/container/generic_54",
        uv: GuiRender.Positions.container.generic_54.uv,
        pos: [0, 0],
        layer: 0
    }
];
  
  http.get(options, function(res){
    res.on("data", function(chunk) {
        var guiRender = new GuiRender(option, document.getElementById("minerender-canvas"));
        for (i = 0; i< Object.keys(JSON.parse(chunk.toString()).players).length; i++){
            var material = JSON.parse(chunk.toString()).players[i]['material'];
            var slots = JSON.parse(chunk.toString()).players[i]['slots'];
            gui.push(
                {name: material.toLowerCase(), 
                texture: "/block/"+material.toLowerCase(), 
                uv: [0, 0, 16, 16],
                pos: GuiRender.Helper.inventorySlot([0+i, 0], GuiRender.Positions.container.generic_54.top_origin, GuiRender.Positions.container.generic_54.item_offset),
                layer: 0
            });
        }
        guiRender.render(gui);
    });
  });


var option = [
  {    // Whether to automatically resize the canvas
    controls: {
        enabled: false,      // Toggle controls
        zoom: false,         // Toggle zooming
        rotate: false,      // Toggle rotation
        pan: false           // Toggle panning
    },
    canvas: {               // Dimensions the canvas starts off with (undefined -> use window size)
        width: undefined,
        height: undefined
    },
    pauseHidden: true       // Whether to pause animations that aren't currently visible
}
]

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip()
})