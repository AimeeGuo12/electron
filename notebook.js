const { app, BrowserWindow, ipcRenderer, BrowserView, globalShortcut } = require('electron');
// 使用IPC模块来调用主进程或者渲染进程
// ipcMain.handle('perform-action', (event, ...args) => {
//     // ... do actions on behalf of the Renderer
// })
// ipcRenderer.invoke('perform-action', ...args)
// const S3 = require('aws-sdk/clients/s3')
const httpServer = require('http-server')
const fs = require('fs');
const root = fs.readdirSync('/')

// console.log(root)
const closeWindow = () => {
    // 手动进行垃圾回收
    win = null;
};
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,  // To access the Node.js API from the Renderer process, you need to set the nodeIntegration preference to true
            enableRemoteModule: true
        }
    })
    // 要写在ready里
    globalShortcut.register('ctrl+e', () => {
        win.loadURL('http://baidu.com') // ctrl+e打开百度页面
    })
    // 有时候可能已经被占用，所以进行判断来进行下一步得操作
    let register = globalShortcut.isRegistered('ctrl+e') ? 'Register Success' : 'Register fail'
    win.loadFile('../index.html')
    win.webContents.openDevTools()
    win.on('closed', closeWindow)
}
app.setAppUserModelId('my-electron-app')

// document.write(app.isReady())
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
app.on('before-quit', () => {
    return e
})

app.on('will-quit', function () {
    // 关闭前注销快捷键
    globalShortcut.unregister('ctrl+e');
    // 注销全部快捷键
    globalShortcut.unregisterAll()
})

