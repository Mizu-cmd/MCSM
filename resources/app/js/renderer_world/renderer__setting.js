const { remote } = require('electron');
var server = remote.getGlobal('sharedObject').server;
const { info } = require('console');
const app = remote.app;


$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip()
})
