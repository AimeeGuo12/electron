const { remote } = require('electron')

const { Menu, getGlobal } = remote // 主进程使用的， 渲染进程使用remote模块来获得

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

let text = document.getElementById('text')
let btn = document.getElementById('btn')

window.onload = function () {
    const act = getGlobal('act');
    const myField = getGlobal('myField').name
    text.innerHTML = getGlobal('myField').name

    btn.onclick = function () {
        getGlobal('myField').name = '从index4渲染进程修改的，code秘密花园';
        text.innerHTML = getGlobal('myField').name
    }
}