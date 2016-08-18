// const remote = window.require('electron').remote;
console.log("ipc.js")
const ipcRenderer = require ('electron').ipcRenderer;
const ipcMain = require ('electron').ipcMain;
const Terminal = require('xterm');
const localGit = {test: 'testing'};
//module.exports = {renderer: ipcRenderer}