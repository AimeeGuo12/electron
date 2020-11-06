const fs = require('fs')

window.onload = function () {
    let btn = this.document.querySelector('#btn');
    let txtcontent = this.document.querySelector('#txtcontent');
    btn.onclick = function () {
        fs.readFile('./index2.txt', (err, data) => { // 这里的位置是相对于文件的 my-electron-app./index2.txt
            if (err) {
                console.log(err)
                return
            }
            console.log(data)
            txtcontent.innerHTML = data
        })
    }

}