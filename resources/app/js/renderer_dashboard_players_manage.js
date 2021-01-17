const { remote } = require('electron');
const app = remote.app;
var server = remote.getGlobal('sharedObject').server;

let documents = app.getPath('documents');

var guiRender = new GuiRender(option, $('#minerender-canvas').get(0));

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

var gui = [
        {
            name: "base",
            texture: "/gui/container/generic_54",
            uv: GuiRender.Positions.container.generic_54.uv,
            pos: [0, 0],
            layer: 0
        },
        {
            name: "bone",
            texture: "/item/bone",
            uv: [0, 0, 16, 16],
            pos: GuiRender.Helper.inventorySlot([0, 0], GuiRender.Positions.container.generic_54.top_origin, GuiRender.Positions.container.generic_54.item_offset),
            layer: 1
        },
        {
            name: "brick",
            texture: "/item/brick",
            uv: [0, 0, 16, 16],
            pos: GuiRender.Helper.inventorySlot([8, 4], GuiRender.Positions.container.generic_54.top_origin, GuiRender.Positions.container.generic_54.item_offset),
            layer: 1
        },
        {
            name: "brick",
            texture: "/item/apple",
            uv: [0, 0, 16, 16],
            pos: GuiRender.Helper.inventorySlot([1, 0], GuiRender.Positions.container.generic_54.top_origin, GuiRender.Positions.container.generic_54.item_offset),
            layer: 1
        },
        {
            name: "brick",
            texture: "/item/clock_09",
            uv: [0, 0, 16, 16],
            pos: GuiRender.Helper.inventorySlot([0, 2], GuiRender.Positions.container.generic_54.top_origin, GuiRender.Positions.container.generic_54.item_offset),
            layer: 1
        },
        {
            name: "brick",
            texture: "/item/egg",
            uv: [0, 0, 16, 16],
            pos: GuiRender.Helper.inventorySlot([2, 5], GuiRender.Positions.container.generic_54.top_origin, GuiRender.Positions.container.generic_54.item_offset),
            layer: 1
        },
        {
            name: "feather",
            texture: "/item/feather",
            uv: [0, 0, 16, 16],
            pos: GuiRender.Helper.inventorySlot([5, 3], GuiRender.Positions.container.generic_54.top_origin, GuiRender.Positions.container.generic_54.item_offset),
            layer: 1
        }
    ];
guiRender.render(gui);

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip()
})