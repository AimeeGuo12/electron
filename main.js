//main.js是引入模块
// app模块：控制应用的生命周期
// BrowserWindow模块:创建浏览器窗口
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
    //主进程模块BrowserWindow用于创建和控制浏览器窗口。
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // resizable:false, // 是否可改变宽高，默认true
        // movable:false,   // 是否可拖拽，默认true
        webPreferences: {
            nodeIntegration: true,  // 是否集成Node.js
            enableRemoteModule: true // 是否允许渲染进程 调用主进程模块
            // 1.为了在渲染进程中使用require()，还需要启用 nodeIntegration 。
            // 2.从v9版本开始，remote除非将 enableRemoteModule 设置为true，否则不允许在渲染进程中使用。
        },
        // transparent: true, //通过将transparent选项设置为true, 还可以使无框窗口透明
        // frame: false,
        // titleBarStyle: 'hidden',
    })
    // 主进程中初始化全局变量
    global.act = 'smile';
    global.myField = { name: 'Aimee' }
    // 要写在ready里
    globalShortcut.register('ctrl+e', () => {
        win.loadURL('http://baidu.com') // ctrl+e打开百度页面
    })
    // 有时候可能已经被占用，所以进行判断来进行下一步得操作
    let register = globalShortcut.isRegistered('ctrl+e') ? 'Register Success' : 'Register fail'



    // 子窗口， 该child窗口将始终显示在top窗口顶部.
    // 子窗口不关闭，无法操作父窗口
    let child = new BrowserWindow({ parent: win, })
    child.loadURL('index3.html')
    child.show()

    //模态窗口 隐藏/最小化时子窗口显示
    //在所有平台上，可见性状态都会跟踪窗口是否隐藏/最小化。
    // let child = new BrowserWindow({ parent: win, modal: true, show: false })
    // child.loadURL('https://github.com')
    // child.once('ready-to-show', () => {
    //     child.show()
    // })

    require('./main/menu.js') // 修改菜单
    // win.loadFile('index.html')
    win.loadFile('index4.html')
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
app.whenReady().then(createWindow)
// app.on('ready', createWindow)



// net模块 使用 Chromium 的本地网络库发出 HTTP / HTTPS 请求  
// 它类似于Node.js 的HTTP和HTTPS模块，但使用Chromium的本地网络库而不是Node.js实现，从而更好地支持Web代理。

// 以下是您为什么可以考虑使用net模块而非本地Node.js模块的非详尽列表：

// 自动管理系统代理配置，支持wpad协议和代理pac配置文件。
// 自动隧道化HTTPS请求。
// 支持使用基本，摘要，NTLM，Kerberos或协商身份验证方案对代理进行身份验证。
// 支持流量监控代理：用于访问控制和监控的Fiddler-like代理。
// 该net模块API已经尽可能接近Node.js的API。包括类，方法，属性和事件名称的API组件类似于Node.js中常用的API组件。

// 例如，以下示例快速显示如何使用netAPI：
// app.on('ready', () => {
//     const { net } = require('electron')
//     const request = net.request('https://github.com')
//     request.on('response', (response) => {
//         console.log(`STATUS: ${response.statusCode}`) // 打印在终端了 不是控制台
//         console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
//         response.on('data', (chunk) => {
//             console.log(`BODY: ${chunk}`)
//         })
//         response.on('end', () => {
//             console.log('No more data in response.')
//         })
//     })
//     request.end()
// })
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