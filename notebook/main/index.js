const { app, BrowserWindow, Menu, MenuItem, ipcMain, globalShortcut } = require('electron');
// 使用IPC模块来调用主进程或者渲染进程
// ipcMain.handle('perform-action', (event, ...args) => {
//     // ... do actions on behalf of the Renderer
// })
// ipcRenderer.invoke('perform-action', ...args)
// const S3 = require('aws-sdk/clients/s3')
// import { menuTemplate } from './menuTemplate.js';
const httpServer = require('http-server')
const fs = require('fs');
const root = fs.readdirSync('/')
let safeExit = false;
const menuTemplate = [
    {
        label: 'File',
        submenu: []
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'reload'
            },
            {
                role: 'forcereload'
            },
            {
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Home Page',
                click() { require('electron').shell.openExternal('http://www.jianshu.com/u/a7454e40399d'); }
            }
        ]
    }
];

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
    win.loadFile('./notebook/index.html')

    //增加主菜单（在开发测试时会有一个默认菜单，但打包后这个菜单是没有的，需要自己增加）
    let menu = Menu.buildFromTemplate(menuTemplate);//从模板创建主菜单
    //在File菜单下添加名为New的子菜单
    menu.items[0].submenu.append(new MenuItem({ //menu.items获取是的主菜单一级菜单的菜单数组，menu.items[0]在这里就是第1个File菜单对象，在其子菜单submenu中添加新的子菜单
        label: "New",
        click() {
            win.webContents.send('action', 'new'); //点击后向主页渲染进程发送“新建文件”的命令
        },
        accelerator: 'CmdOrCtrl+N' //快捷键：Ctrl+N
    }));
    //在New菜单后面添加名为Open的同级菜单
    menu.items[0].submenu.append(new MenuItem({
        label: "Open",
        click() {
            win.webContents.send('action', 'open'); //点击后向主页渲染进程发送“打开文件”的命令
        },
        accelerator: 'CmdOrCtrl+O' //快捷键：Ctrl+O
    }));
    //再添加一个名为Save的同级菜单
    menu.items[0].submenu.append(new MenuItem({
        label: "Save",
        click() {
            win.webContents.send('action', 'save'); //点击后向主页渲染进程发送“保存文件”的命令
        },
        accelerator: 'CmdOrCtrl+S' //快捷键：Ctrl+S
    }));
    //添加一个分隔符
    menu.items[0].submenu.append(new MenuItem({
        type: 'separator'
    }));
    //再添加一个名为Exit的同级菜单
    menu.items[0].submenu.append(new MenuItem({
        role: 'quit'
    }));
    Menu.setApplicationMenu(menu); //注意：这个代码要放到菜单添加完成之后，否则会造成新增菜单的快捷键无效

    win.webContents.openDevTools()

    win.on('close', (e) => {
        if (!safeExit) {
            e.preventDefault();
            win.webContents.send('action', 'exiting')
        }
    })

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
//监听与渲染进程的通信
ipcMain.on('reqaction', (event, arg) => {
    switch (arg) {
        case 'exit':
            //做点其它操作：比如记录窗口大小、位置等，下次启动时自动使用这些设置；不过因为这里（主进程）无法访问localStorage，这些数据需要使用其它的方式来保存和加载，这里就不作演示了。这里推荐一个相关的工具类库，可以使用它在主进程中保存加载配置数据：https://github.com/sindresorhus/electron-store
            //...
            safeExit = true;
            app.quit();//退出程序
            break;
    }
})
app.on('will-quit', function () {
    // 关闭前注销快捷键
    globalShortcut.unregister('ctrl+e');
    // 注销全部快捷键
    globalShortcut.unregisterAll()
})

