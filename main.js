const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const fs = require('fs')
const jetpack = require('fs-jetpack')

//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1200, height: 600, icon: path.join(__dirname, 'assets/icons/mac/icon.icns') })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  console.log(app.getPath("home"))

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



const { ipcMain } = require('electron')

/**
  Listen to print messages and print the page to pdf.
*/
ipcMain.on('print', (event, arg) => {
  mainWindow.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    event.sender.send('printed', data.toString('base64'))

  })
})

/**
  Listen to get-info messages and retrieve the device information - OS.
*/
ipcMain.on('get-info', (event, arg) => {
  const os = require('os')
  event.sender.send('get-info-reply', JSON.stringify({ device_type : os.platform() }))
})

ipcMain.on('save-file', (event, arg) => {
  const documents = app.getPath("documents")
  jetpack.dir(documents + '/mcaz-desktop')

  const json = JSON.parse(arg)
  var savedFiles = []
  for(var i = 0; i < json.length; i++) {
    const file = json[i]
    jetpack.write(documents + '/mcaz-desktop/' + file.name, JSON.stringify(file.data))
    savedFiles.push(documents + '/mcaz-desktop/' + file.name)

  }
  event.sender.send('saved-file', JSON.stringify({ status : "OK", saved : savedFiles }))
})
