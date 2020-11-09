// 顶部菜单栏  在主进程
const { Menu, BrowserWindow } = require('electron')
let template = [
    {
        label: '文件(F)',
        accelerator: 'F',
        submenu: [
            {
                label: '新建文件',
                click: () => {
                    let win = new BrowserWindow({
                        width: 500,
                        height: 500,
                        webPreferences: {
                            nodeIntegration: true,
                            enableRemoteModule: true
                        }
                    })
                    win.loadFile('index3.html')
                    win.webContents.openDevTools()
                    win.on('closed', function () {
                        win = null
                    })
                }
            },
            {
                label: '打开文件'
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销'
            },
            {
                label: '恢复'
            }
        ]
    },
    {
        label: '选择',
        submenu: [
            {
                label: '全选'
            },
            {
                label: '展开选定内容'
            }
        ]
    },
    {
        label: '查看',
        submenu: [
            {
                label: '命令面板'
            },
            {
                label: '外观',
                submenu: [
                    {
                        label: '全屏'
                    },
                    {
                        label: '居中布局'
                    }
                ]
            }
        ]
    },
    {
        label: '转到',
        submenu: [
            {
                label: '返回'
            },
            {
                label: '上次编辑位置'
            }
        ]
    },
    {
        label: '运行',
        submenu: [
            {
                label: '启动调试'
            },
            {
                label: '切断断点'
            }
        ]
    }
]

let m = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(m)