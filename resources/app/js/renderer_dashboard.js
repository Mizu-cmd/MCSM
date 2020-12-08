const ipc = require("electron").ipcRenderer;
const pty = require("../../../node_modules/node-pty");
const os = require("os")

var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

var term = new Terminal();
term.open(document.getElementById('terminal'));
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    
ipc.on("terminal.incomingData", (event, data) => {
    term.write(data);
});

term.onData(e => {
    ipc.send("terminal.keystroke", e);
});

var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
});

ptyProcess.on('data', function(data) {
    mainWindow.webContents.send("terminal.incomingData", data);
    console.log("Data sent");
});
ipcMain.on("terminal.keystroke", (event, key) => {
    ptyProcess.write(key);
});

