const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1200, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

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

ipcMain.on('upload-data', (event, arg) => {
  const {net} = require('electron')

  const reqObj = JSON.parse(arg)
  const options = {
    url: reqObj.url,
    method: "POST",
  }
  const request = net.request(options)
  request.setHeader('Content-Type', 'application/json')
  request.setHeader('Accept', 'application/json')
  console.log(JSON.stringify(reqObj.body))
  request.write(JSON.stringify(reqObj.body))
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    //console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    var data = ""
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
      data += `${chunk}`
    })
    response.on('end', () => {
      event.sender.send('upload-reply', data)
      console.log('No more data in response.')
    })
  })
  request.end()
  //console.log(arg)  // prints "ping"

  event.sender.send('asynchronous-reply', 'pong')
})
