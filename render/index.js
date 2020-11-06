// const ipcRenderer = require('electron').ipcRenderer;
// h5拖放API应用
let content = document.querySelector('.content');
const fs = require('fs');
// 引入iconv-lite包，解决windows下以GBK编码时中文乱码的问题
const iconv = require('iconv-lite');
content.ondragenter = content.ondragover = content.ondragleave = function (e) {
    return false
};
content.ondrop = function (e) {
    e.preventDefault();
    // 得到拖过来的txt文件的地址
    let path = e.dataTransfer.files[0].path;
    // 通过fs模块读取对应的文件，然后渲染到content容器
    fs.promises.readFile(path, { encoding: 'binary' })
        .then(data => {
            const buf = new Buffer(data, 'binary');
            content.innerHTML = iconv.decode(buf, 'GBK');
        })
        .catch(err => {
            console.log(err)
        })
};

// const { Notification } = require('electron');
function showNotification() {
    const notificationOption = {
        title: 'Basic Notification',
        body: 'Notification from the Main process',
        requireInteraction: true
    }
    let n = new Notification('test', notificationOption)
    n.show()
    console.log(n)
}

let btn = document.getElementById('btn')
btn.onclick = function () {
    console.log('触发了')
    console.log(Notification)
    // console.log(Notification.isSupported())
    showNotification()
}

// 简单的说, main.js是主进程, renderes.js是渲染进程, 在渲染进程调用ipcRenderer.send()方法, 可以发送消息. 在主进程可以收到消息,
// 如果你给这个消息绑定了回调, 收到消息后, 就会触发回调.
function killChildProcess() {
    // 发消息，由html的按钮调用，给主进程发消息，回调中关闭进程
    // ipcRenderer 模块是一个 EventEmitter 类的实例. 它提供了有限的方法，你可以从渲染进程向主进程发送同步或异步消息. 也可以收到主进程的响应.
    const ipcRenderer = require('electron').ipcRenderer;
    ipcRenderer.send('kill-child-now', 'get async message');
}