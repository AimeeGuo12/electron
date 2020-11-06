const { app, BrowserWindow, ipcRenderer, Notification, BrowserView, globalShortcut } = require('electron');
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

    // require('./main/menu.js')
    // win.loadFile('index.html')
    win.loadFile('./notebook/index.html')
    // const url = path.resolve('file:', __dirname, 'index.html');
    // console.log(url);
    // win.loadURL(url);
    win.webContents.openDevTools()

    // // BrowserView 页面中镶嵌页面
    // let view = new BrowserView()
    // win.setBrowserView(view)
    // view.setBounds({ x: 0, y: 120, width: 1000, height: 680 })
    // view.webContents.loadURL('http://baidu.com')

    win.on('closed', closeWindow)
}
app.setAppUserModelId('my-electron-app')
function showNotification() {
    debugger
    const notification = {
        title: 'Basic Notification',
        body: 'Notification from the Main process',
        requireInteraction: true
    }
    new Notification('teat', notification).show()
}
// document.write(app.isReady())
app.whenReady().then(createWindow).then(showNotification)
// app.on('ready', createWindow)
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
// event.preventDefault()
// httpServer.createServer().listen(8080)

// ws服务器
const webSocketServer = require('ws').Server;
wss = new webSocketServer({ port: 1212 })
wss.on('connect', (ws) => {
    // 有客户端连接时，打印一条日志
    console.log('client connected')
    // 创建‘message'监听
    ws.on('message', (message) => {
        console.log(message)
    })
})


// 此案例在index.html中关闭 
// // child_process 该模块主要用于创建子进程
// const myChildProccess = require('child_process');

// // 打开一个子进程notepad++
// // 调用这个对象的spwan()方法, 启动一个子进程. 该方法接受一个字符串参数, 是子进程的路径, 注意路径的书写方式
// const mySpawn = myChildProccess.spawn(
//     'D:\\AG\\Notepad++\\notepad++.exe');

// // 监听消息, 关闭子进程
// const ipcMain = require('electron').ipcMain;
// // ipcMain 模块是类 EventEmitter 的实例.当在主进程中使用它的时候，它控制着由渲染进程(web page)发送过来的异步或同步消息.从渲染进程发送过来的消息将触发事件.
// // 简单的说, ipcMain是使用在主进程中的, 负责监听从渲染进程中发送出来的消息.
// // ( 还记得吗? 渲染进程是通过ipcRenderer发送消息的. )
// // 我们用ipcMain对象监听了消息kill-child-now, 并且绑定了一个回调函数. 一旦收到这个消息, 就会触发这个回调函数.
// ipcMain.on('kill-child-now', (e, appUrl) => {
//     // 收到消息, 关闭进程
//     mySpawn.kill();
// });