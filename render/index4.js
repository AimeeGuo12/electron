const { remote } = require('electron')

const { Menu } = remote // 主进程使用的， 渲染进程使用remote模块来获得

let rightTemplate = [
    {
        label: '复制',
        click: () => {
            console.log('复制内容')
        }
    },
    {
        label: '粘贴'
    }
]

let rtm = Menu.buildFromTemplate(rightTemplate)
// Menu.setApplicationMenu(rtm)
window.addEventListener('contextmenu', function (e) {
    e.preventDefault()
    rtm.popup({ window: remote.getCurrentWindow() })
})