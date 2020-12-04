const { BrowserWindow } = require('electron')

class AppWindow extends BrowserWindow {
    constructor(config, urlLocation) {
        const basicConfig = {
            width: 800,
            height: 600,
            webPreference: {
                // nodeIntegration: true,
                enableRemoteModule: true // 外部一设置这个就被覆盖了 嘤嘤嘤  这两个设置了以后对于新版本的remote模块才能在electron中找到
            },
            show: false,
            backgroundColor: '#efefef',
        }
        const finalConfig = {...basicConfig, ...config}
        super(finalConfig)
        this.loadURL(urlLocation)
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = AppWindow