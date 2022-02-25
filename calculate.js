// 计算器的入口文件

const { app, BrowserWindow } = require('electron')
const path = require('path');

let win;
function createWindow() {
    win = new BrowserWindow({
        height: '800px',
        width: '1000px',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
    })


}
// 1.初始化应用之后，会触发监听ready 事件
app.on('ready', createWindow)


// 1.2 加载内容
// win.loadURL('http://www.baidu.com')   // 远程

// __dirname: 当前js文件所在的文件夹路径,绝对路径
win.loadURL(path.join(__dirname), './index.html')

// mac 系统：需要拼接 file 协议
// path.join('file://',__dirname,'./index.html')

// 1.3 调试工具
win.webContents.openDevTools(); // webContents: 控制和渲染页面的

// 1.4 关闭窗口， 关闭窗口前想做的事
win.on('close', function () {
    win = null;  // 关闭窗口
    app.quit();  // 关闭应用
})