import React, { useState } from 'react'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

import SimpleMDE from "react-simplemde-editor"
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import Loader from './components/Loader'

import {v4 as uuidv4} from 'uuid'
import {flattenArr, objToArr} from './utils/helper'
import fileHelper from './utils/fileHelper'
import useIpcRenderer from './hooks/useIpcRenderer'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css"  // 记得导入编辑器的样式
import defaultFiles from './utils/defaultFiles'

// require node.js modules  有的bug不能require webpack拦截了，去node_modules中查找不到，报错 这时使用window.require
// const { join, basename, extname, dirname } = require('path')
// const { remote, ipcRenderer } = require('electron')
// const Store = require('electron-store')
const { join, basename, extname, dirname } = window.path
const { remote, ipcRenderer } = window.electron
const fileStore = new window.Store({'name': 'fileStore'})
const settingsStore = new window.Store({'name': 'Settings'})

// 电脑存储位置在 C:\Users\Administrator\AppData\Roaming\cloud-doc
// 使用：fileStore.set('key',value) fileStore.get('key') fileStore.delete('key')
// The data is saved in a JSON file in $ app.getPath('userData').
//如果需要加密存储 就用下面的
//const store = new Store({encryptionKey: '加密值'});
const saveFilesToStore = (files) => {
  // we don't have to store any info in file system, eg: isNew, body ,etc
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const {id, path, title, createdAt} = file
    result[id] = {
      id,
      path,
      title,
      createdAt,
    }
    return result
  }, {})
  fileStore.set('files', filesStoreObj)
}
function App() {
  const [files, setFiles] = useState(fileStore.get('files') || {})
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const [searchedFiles, setSearchedFiles] = useState([])
  const [isLoading, setLoading] = useState(false)

  const filesArr = objToArr(files)
  const savedLocation = settingsStore.get('savedFileLocation') || remote.app.getPath('documents') // remote.app.getPath('documents') 用户的文档目录
  // const activeFile = files.find(file=> { return file.id === activeFileID}) // find不改变原数组，返回符合条件的第一个元素，返回的是元素本身，而不是数组，这里是个对象
  // const openedFiles = openedFileIDs.map((openID) => {
  //   return files.find(file => file.id === openID)
  // })
  const activeFile = files[activeFileID]
  const openedFiles = openedFileIDs.map((openID) => {
    return files[openID]
  })


  const fileClick = (fileID) => {
    setActiveFileID(fileID)
    // const currentFile = files[fileID]
    // const {id, title} = currentFile

    if (!openedFileIDs.includes(fileID)){
      // setOpenedFileIDs(openedFileIDs => [ ...openedFileIDs, fileID])
      setOpenedFileIDs([ ...openedFileIDs, fileID ])
      // console.log(openedFileIDs)
    }

  }
  const tabClick = (fileID) => {
    setActiveFileID(fileID)
  }

  const closeTab = (fileID) => {
    const tabsWithout = openedFileIDs.filter(openId => openId !== fileID)
    setOpenedFileIDs(tabsWithout)

    if(tabsWithout.length > 0) {
      setActiveFileID(tabsWithout[0])
    } else {
      setActiveFileID('')
    }
  }

  const fileSearch = (keyword) => {
    const searchFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchedFiles(searchFiles)
  }

  const fileChange = (id, value) => {
    if (value !== files[id].body){
      const newFile = {...files[id], body: value}
      setFiles({ ...files, [id]: newFile}) 

      // update unsavedIDs
      if(!unsavedFileIDs.includes(id)) {
        setUnsavedFileIDs([ ...unsavedFileIDs, id])
      }
    }
  }

  const deleteFile = (id) => {
    if (files[id].isNew) {
      const {[id]: value, ...afterDelete} = files  // [id]的[] 别忘！！
      setFiles(afterDelete)
    } else {
      fileHelper.deleteFile(files[id].path).then(() => {
        const {[id]: value, ...afterDelete} = files
        setFiles(afterDelete)
        saveFilesToStore(afterDelete)
        closeTab(id)
      })
    }
  }

  const updateFileName = (id, title, isNew) => {
     // newPath should be different based on isNew
    // if isNew is false, path should be old dirname + new title
    const newPath = isNew? join(savedLocation, `${title}.md`)
    : join(dirname(files[id].path), `${title}.md`)

    const modifiedFile = {...files[id], title, isNew: false, path: newPath}
    const newFiles = { ...files, [id]: modifiedFile}

    if (isNew) {
      fileHelper.writeFile(newPath, files[id].body).then(() => {
        setFiles(newFiles)
        saveFilesToStore(newFiles)
      })
    } else {
      const oldPath = files[id].path
      fileHelper.renameFile(oldPath, newPath).then(()=>{
        setFiles(newFiles)
        saveFilesToStore(newFiles)
      })
    }
  }
  // useEffect(() => {
 
  // }, [])
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : filesArr
 
  const createNewFile = () => {
    const newID = uuidv4()
    const newFile = {
      id: newID,
      title: '',
      body: '##请输入MarkDown',
      createdAt: new Date().getTime(),
      isNew: true,
    }
    setFiles({...files, [newID]: newFile})
  }

  const saveCurrentFile = () => {
    console.log(activeFile)
    const {title, body, path} = activeFile
    fileHelper.writeFile(path, body).then(() => {
      setUnsavedFileIDs(unsavedFileIDs.filter(id => id !== activeFile.id))

    })
  }
 const importFiles = () => {
   remote.dialog.showOpenDialog({
     title: '选择导入的 MarkDown 文件',
     properties: ['openFile', 'multiSelections'],
     filter: [
       {name: 'MarkDown files', extensions: ['md']}
     ]
   }).then(paths => {
     if (Array.isArray) {
       // filter out the path we already have in electron store
        // ["/Users/liusha/Desktop/name1.md", "/Users/liusha/Desktop/name2.md"]
       const filteredPaths = paths.filter(path => {
         const alreadyAdded = Object.values(files).find(file => {
           return file.path === path
         })
         return !alreadyAdded
       })

       const importFilesArr = filteredPaths.forEach(path => {
         return {
           id: uuidv4(),
           title: basename(path, extname(path)),
           path
         }
       })
       const newFiles = {...files, ...flattenArr(importFilesArr)}
       setFiles(newFiles)
       saveFilesToStore(newFiles)
       if (importFilesArr.length > 0) {
        remote.dialog.showMessageBox({
          type: 'info',
          title: `成功导入了${importFilesArr.length}个文件`,
          message: `成功导入了${importFilesArr.length}个文件`,
        })
      }
     }
   })
 }

  // 菜单栏的行为  从主进程发送过来的
  useIpcRenderer({
    'create-new-file': createNewFile,
    'import-file': importFiles,
    'save-edit-file': saveCurrentFile,
    // 'active-file-uploaded': activeFileUploaded,
    // 'file-downloaded': activeFileDownloaded,
    // 'files-uploaded': filesUploaded,
    'loading-status': (message, status) => { setLoading(status) }
  })
  return (
    <div className="App container-fluid px-0">
      { isLoading && <Loader/>}
      <div className="row no-gutters">
        <div className="col-4 bg-light left-panel">
          <FileSearch
            title='My Document'
            onFileSearch={fileSearch}
          >
          </FileSearch>
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onSaveEdit={updateFileName}
            onFileDelete={deleteFile}
          ></FileList>

          <div className='row no-gutters button-group'>
            <div className='col'>
              <BottomBtn
                text={'新建'}
                colorClass={'btn-primary'}
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className='col'>
              <BottomBtn
                text={'导入'}
                colorClass={'btn-success'}
                icon={faFileImport}
                onBtnClick={importFiles}
              />
            </div>
          </div>
        </div>
        <div className="col-8 right-panel">
          {!activeFile &&
            <div className="start-page">
                选择或者创建新的 Markdown 文档
            </div>
          }

          {
            activeFile &&
            //React.Fragment
            <>  
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={closeTab}
              />
              <SimpleMDE
              id="your-custom-id"
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => {fileChange(activeFile.id, value)}}
                options={{
                  minHeight: '515px',
                  autofocus: true,
                //   toolbar: [
                //     'bold',
                //     'italic',
                //     'heading',
                //     '|',
                //     'quote',
                //     'code',
                //     'table',
                //     'horizontal-rule',
                //     'unordered-list',
                //     'ordered-list',
                //     '|',
                //     'link',
                //     'image',
                //     '|',
                //     'side-by-side',
                //     'fullscreen',
                //     '|',
                //     'guide'
                //  ]
                }}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
