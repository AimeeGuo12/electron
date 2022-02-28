
// 用到的方法：buildFromTemplate , setApplicationMenu

// 选项：

// type：('normal' | 'separator' | 'submenu' | 'checkbox' | 'radio')
// label：标题
// accelerator：快捷键，区分 mac 及 win
// submenu：子菜单
// click：点击事件
// main.js中引用： require('./menu');

// menu.js引入模板
const { Menu } = require('electron');
// 1. 设置一个模板
let template = [
    {
        label: '文件',
        submenu: [
            {
                label: '新建文件',
                accelerator: 'ctrl + N',
                click: function(){
                    console.log('new file')
                }
            },
            {
                type: 'separator'
            },
            {
                label: '新建窗口',
                accelerator: (function(){
                    if(process.platform === 'darwin') { // mac基于Darwin
                        return 'alt + command + M'
                    } else {
                        return 'alt + ctrl + M'
                    }
                })(),
                click: function() {
                    console.log('new window')
                }
            },
            {
                type: 'separator'
            },
            {
                label:'自动保存',
                accelerator:'ctrl+S',
                type:'checkbox',
                checked:true,
                click:function(){
                  console.log('saved')
                }
            },
        ]
    },
    {
        label: '编辑'
    }
]

// 2.构建菜单（实例化一个菜单对象）
const menu = Menu.buildFromTemplate(template);
// 3. 设置菜单对象到应用中
Menu.setApplicationMenu(menu)