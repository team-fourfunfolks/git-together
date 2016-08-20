// const remote = window.require('electron').remote;
console.log("ipc.js")
const ipcRenderer = require ('electron').ipcRenderer;
const ipcMain = require ('electron').ipcMain;
const Terminal = require('xterm');
const localGit = {test: 'testing'};
// const pty = require('pty.js');
//const exec = require('child-process');
//const fork = require('child-process').fork;
//module.exports = {renderer: ipcRenderer}