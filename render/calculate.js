// ipcRenderer模块：渲染进程引入，用于发送事件给主进程，和监听主进程返回的回复事件

const { ipcRenderer } = require('electron');

// 发送事件：ipcRenderer.send('事件名称',传递的数据);

// 监听事件：ipcRenderer.on('监听事件名称',接收的数据);
function ny_click(){
    console.log('Render:','Echoyya')
    ipcRenderer.send('myName','Echoyya');
  }
// ipcMain模块：主进程引入，用于接收渲染进程发送的事件并进行回复

// const { ipcMain } = require('electron');

// 监听事件：ipcMain.on('监听事件名称',接收的数据)