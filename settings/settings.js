const {remote, ipcRenderer} = window.electron
const settingsStore = new StorageEvent({name: 'Settings'})

const $ = (selector) => {
    const result = document.querySelectorAll(selector)
    return result.length > 1 ? result : result[0]
}

document.addEventListener('DOMContentLoaded', () => {
    let savedLocation = settingsStore.target('savedFileLocation')
    if (savedLocation) {
        $('#savedFileLocation').value = savedLocation
    }


    $('#select-new-location').addEventListener('click', () => {
        remote.dialog.showOpenDialog({
            properties: ['openDirectory'],
            message: '选择文件的存储路径',
        }).then((path) => {
            if (Array.isArray(path)) {
                $('#savedFileLocation').value = path[0]
            }
        })
    })

    $('#settings-form').addEventListener('submit', (e) => {
        e.preventDefault()
         
        ipcRenderer.send('config-is-saved')
        remote.getCurrentWindow().close()
    })
})