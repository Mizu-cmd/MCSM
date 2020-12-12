const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require("fs");
const pty = require("../../node_modules/node-pty");
const os = require("os")
const { ipcMain } = require('electron');

var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

var mainWindow = null;
let dir = app.getPath('documents') + '/MCSM/';

global.sharedObject = {
    server: ''
  }

app.on("window-all-closed", function(){
    if (process.platform != "darwin"){
        app.quit();
    }
})

var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cwd: process.env.HOME,
    env: process.env
});

app.on("ready", function(){
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 480,
        autoHideMenuBar: true,
        useContentSize: true,
        transparent: false,
        frame: true,
        minWidth: 1024,
        minHeight: 480,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    })

    fs.access(dir, (err) => {
        if (err) {
            fs.mkdir(dir, { recursive: false }, (err) => {
                if (err) throw err;
              })
        }
      })


    mainWindow.loadURL("file://"+__dirname+'/html/loadserver.html')
    mainWindow.toggleDevTools();

    ptyProcess.on('data', function(data) {
        mainWindow.webContents.send("terminal.incomingData", data);
    });
    ipcMain.on("terminal.keystroke", (event, key) => {
        ptyProcess.write(key);
    });
})