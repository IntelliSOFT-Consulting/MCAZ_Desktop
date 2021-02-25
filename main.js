// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const electron = require('electron')
const url = require('url')

const fs = require('fs')
const jetpack = require('fs-jetpack')

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const { ipcMain } = require('electron')

/**
  Listen to print messages and print the page to pdf.
*/
ipcMain.on('print', (event, arg) => {
  mainWindow.webContents.printToPDF({}).then((data) => {
    event.sender.send('printed', data.toString('base64'))
  }).catch(error => {
    throw error
  })
})

/**
  Listen to get-info messages and retrieve the device information - OS.
*/
ipcMain.on('get-info', (event, arg) => {
  const os = require('os')
  event.sender.send('get-info-reply', JSON.stringify({ device_type : os.platform(), version : app.getVersion() }))
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
