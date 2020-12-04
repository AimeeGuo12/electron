import {useEffect} from 'react'
const {ipcRenderer} = window.electron

const useIpcRenderer = (keyCallbackMap) => {

    useEffect(() => {
        Object.keys(keyCallbackMap).forEach(key => {
            ipcRenderer.on(key, keyCallbackMap[key])
            // ipcRenderer.on用于监听由主进程发来的消息
            // 主进程向渲染进程发消息
            // mainWindow.webContents.send('action', 'exiting')
        })
        return () => {
            Object.keys(keyCallbackMap).forEach(key => {
                ipcRenderer.removeListener(key, keyCallbackMap[key])
            })
        };
    });
}

export default useIpcRenderer