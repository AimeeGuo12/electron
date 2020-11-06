const { ipcRenderer, remote } = require('electron')
const { Menu, MenuItem, dialog } = remote;

let currentFile = null;
let isSaved = true;
let txtEditor = document.getElementById('txtEditor');

document.title = 'Notebook - Untitled'

// 增加右键菜单
const contextMenuTemplate = [
    { role: 'undo' },       //Undo菜单项
    { role: 'redo' },       //Redo菜单项
    { type: 'separator' },  //分隔线
    { role: 'cut' },        //Cut菜单项
    { role: 'copy' },       //Copy菜单项
    { role: 'paste' },      //Paste菜单项
    { role: 'delete' },     //Delete菜单项
    { type: 'separator' },  //分隔线
    { role: 'selectall' }   //Select All菜单项
]

const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
txtEditor.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu.popup(remote.getCurrentWindow());
});
//监控文本框内容是否改变
txtEditor.oninput = (e) => {
    if (isSaved) document.title += " *";
    isSaved = false;
}

// 监听与主进程的通信

ipcRenderer.on('action', (event, arg) => {
    switch (arg) {
        case 'new':
            askSaveIfNeed()
            currentFile = null;
            txtEditor.value = '';
            document.title = 'Notebook - Untitled'
            isSaved = true;
            break;
        case 'open':
            askSaveIfNeed()
            console.log(remote.getCurrentWindow())
            //使用： dialog.showOpenDialog([browserWindow, ]options[, callback])
            remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
                title: '请选择你所需要的文件',
                // defaultPath: 'xiaoying.jpg', // 这个是在文件名那个里
                filters: [
                    { name: "Text Files", extensions: ['txt', 'js', 'html', 'md'] },
                    { name: 'All Files', extensions: ['*'] }],
                properties: ['openFile'],
                // buttonLabel: '打开小樱图片',//'打开小樱图片'
            }).then((result) => {
                console.log(result)
                currentFile = result.filePaths[0]
                txtEditor.value = readText(currentFile)
                document.title = "Notepad - " + currentFile;
                isSaved = true;
            }).catch((err) => {
                //
            })
            break;
        case 'save':
            saveCurrentDoc()
            break;
        case 'exiting':
            askSaveIfNeed();
            ipcRenderer.sendSync('reqaction', 'exit');
            break;

    }
})

// 读取文件
readText = (file) => {
    const fs = require('fs')
    return fs.readFileSync(file)
}
saveCurrentDoc = () => {
    dialog.showSaveDialog({
        title: '保存文件',
    }).then(result => {
        console.log(result)
        fs.writeFileSync(result.filePath, '试一试啊')
    }).catch(err => {
        console.log(err)
    })
}
askSaveIfNeed = () => {
    if (isSaved) return;
    const response = dialog.showMessageBox(remote.getCurrentWindow(), {
        message: 'Do you want to save the current document?',
        type: 'question',
        buttons: ['Yes', 'No']
    });
    if (response == 0) saveCurrentDoc(); //点击Yes按钮后保存当前文档
}