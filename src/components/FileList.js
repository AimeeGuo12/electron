import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'
import useContextMenu from '../hooks/useContextMenu'
import {getParentNode} from '../utils/helper'
const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    let node = useRef(null)
    const enterPressed = useKeyPress(13)
    const escPressed = useKeyPress(27)
    const closeSearch = (editItem) => {
        setEditStatus(false)
        setValue('')
        // 如果正在编辑一个新增的文件名，关闭即删除此次新增
        if (editItem.isNew) {
            onFileDelete(editItem.id)
        }
    }
    useEffect(() => {
        const editItem = files.find(file => file.id === editStatus)  // ? ===editStatus?
        if (enterPressed && editStatus && value.trim() !== '') {
            onSaveEdit(editItem.id, value, editItem.isNew)
            setEditStatus(false)
            setValue('')
        }
        if(escPressed && editStatus) {
            closeSearch(editItem)
        }
    })
    useEffect(() => {
        const newFile = files.find(file => file.isNew)
        if (newFile) {
            // 这里变为存入的是文件id
          setEditStatus(newFile.id)
          setValue(newFile.title)
        }
      }, [files])
    useEffect(() => {
        if (editStatus) {
            // 聚焦
            node.current.focus()
        }
    }, [editStatus])
    const clickedItem = useContextMenu([
        {
            label: '打开',
            click: () => {
                // 由于这里获取到的clickedItem 不是li 而是里面的子节点 所以通过子节点获取到li
                const parentElement = getParentNode(clickedItem.current, 'file-item')
                if (parentElement) {
                    onFileClick(parentElement.dataset.id)
                  }
            }
        },
        {
            label: '重命名',
            click: () => {
              const parentElement = getParentNode(clickedItem.current, 'file-item')
              if (parentElement) {
                const { id, title } = parentElement.dataset
                setEditStatus(id)
                setValue(title)
              }
            }
          },
          {
            label: '删除',
            click: () => {
              const parentElement = getParentNode(clickedItem.current, 'file-item')
              if (parentElement) {
                  console.log(parentElement, parentElement.dataset.id)
                onFileDelete(parentElement.dataset.id)
              }
            }
          },
    ], '.file-list', [files]) // files中如loader等有任何变化都会触发

    return (
        <ul className='list-group list-group-flush file-list'>
            {files.map(file => {
                return (
                    <li
                        className='list-group-item bg-light row d-flex align-items-center file-item mx-0'
                        key={file.id}
                        data-id={file.id}  // 通过这种方法获取点击元素的 id和title element.dataset.id
                        data-title={file.title}
                    >
                        {(file.id !== editStatus && !file.isNew) &&
                            <>
                                <span className='col-2'>
                                    <FontAwesomeIcon
                                        size='lg'
                                        icon={faMarkdown}
                                    />
                                </span>
                                <span
                                    className='col-10 c-link'
                                    onClick={() => { onFileClick(file.id) }}
                                >
                                    {file.title}
                                </span>
                                
                                {/* <button className='icon-button col-1' type='btn' onClick={() => {onSaveEdit(file.id)}}>编辑</button> */}
                                {/* <button className='icon-button col-1' type='btn' onClick={() => {onFileDelete(file.id, file.title, file.isNew)}}>删除</button> */}
                            </>
                        }

                        {
                            ((file.id === editStatus || file.isNew)) &&
                            <>
                                <input
                                    className='form-control col-10'
                                    value={value}
                                    ref={node}
                                    placeholder='请输入文件名称'
                                    onChange={(e) => { setValue(e.target.value) }}
                                />
                                <button
                                    type='button'
                                    className='icon-button col-2'
                                    onClick={() => { closeSearch(file) }}
                                >
                                    <FontAwesomeIcon
                                        title='关闭'
                                        size='lg'
                                        icon={faTimes}
                                    />
                                </button>
                            </>
                        }
                    </li>
                )
            })}
        </ul>
    )
}

FileList.protoTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func
}

export default FileList