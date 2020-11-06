// 调用外部的浏览器打开网页，需要使用shell模块
const { shell } = require('electron')

let aHref = document.querySelector('#aHref')

aHref.onclick = function (e) {
    e.preventDefault()
    let href = this.getAttribute('href')
    shell.openExternal(href)
}

// 打开子窗口
let mybtn = document.querySelector('#mybtn')
mybtn.onclick = function (e) {
    window.open('./popup_page.html')
}
// 监听子窗口传递过来的信息
window.addEventListener('message', (msg) => {
    let mytext = document.querySelector('#mytext')
    mytext.innerHTML = JSON.stringify(msg.data) // 返回的是json格式的？
})