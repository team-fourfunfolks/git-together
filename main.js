const electron = require('electron')
const app = electron.app;
const ipcMain = require('electron').ipcMain;
const BrowserWindow = electron.BrowserWindow;
// const exec = require('child-process').exec;
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

// const fork = require('child-process').fork;
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // REMOVE /dist WHEN READY TO DEPLOY
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }

  mainWindow.webContents.on('did-finish-load', () => {
  console.log('loaded')
  })
});

ipcMain.on('term-input', function(event, input) {
  console.log(input)
  exec(input, function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    event.sender.send('reply', stdout)
  });
  // var foo = exec(input);
  // foo.stdout.on('data', function(data) {
  //   console.log('stdout: ', stdout)
  //   event.sender.send(stdout)
  // });
  // foo.stderr.on('data', function(data) {
  //   console.log('stderr: ', stderr)
  // })
  // foo.on('close', function(code) {
  //   console.log('closing code: ', code)
  // })


})
