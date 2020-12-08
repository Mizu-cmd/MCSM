const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {shell} = require("electron");
const fs = require("fs");

var mainWindow = null;
let dir = app.getPath('documents') + '/MCSM/';

app.on("window-all-closed", function(){
    if (process.platform != "darwin"){
        app.quit();
    }
})

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
            enableRemoteModule: true
        }
    })

    fs.access(dir, (err) => {
        if (err) {
            fs.mkdir(dir, { recursive: false }, (err) => {
                if (err) throw err;
              })
        }
      })

    mainWindow.loadURL("file://"+__dirname+"/html/start.html")
    mainWindow.toggleDevTools();
})