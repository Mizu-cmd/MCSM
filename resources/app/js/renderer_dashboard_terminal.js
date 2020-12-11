const ipc = require("electron").ipcRenderer;
const { FitAddon } = require("../../../node_modules/xterm-addon-fit");

const { remote } = require('electron');
const app = remote.app;

let documents = app.getPath('documents');

var term = new Terminal({
    theme: {
        background: '#263238',
      }
});
const fitAddon = new FitAddon();

term.reset();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();

ipc.send("terminal.keystroke",'cd ' + documents + '/MCSM/' + remote.getGlobal('sharedObject').server);


ipc.on("terminal.incomingData", (event, data) => {
    term.write(data);
});

term.onData(e => {
    ipc.send("terminal.keystroke", e);
    console.log(e)
});