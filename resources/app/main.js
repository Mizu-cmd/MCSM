const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {shell} = require("electron");

var mainWindow = null;

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
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    mainWindow.loadURL("file://"+__dirname+"/index.html")
    mainWindow.toggleDevTools();
})