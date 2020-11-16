import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'


const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    let node=useRef(null)


    useEffect(()=> {
        if(editStatus) {
            node.current.focus()
        }
    }, [editStatus])
    return (
        <ul className='list-group list-group-flush file-list'>
            {files.map(file => {
                <li
                    className='list-group-item bg-light row d-flex align-items-center file-item mx-0'
                    key={file.id}
                >
                    {(file.id !== editStatus) &&
                        <div>
                            <span className='col-2'>
                                <FontAwesomeIcon
                                    size='lg'
                                    icon={faMarkdown}
                                />
                            </span>
                            <span
                                className='col-10 c-link'
                                onClick={() => { onFileClick(file.id)}}
                            >
                                {file.title}
                            </span>
                        </div>
                    }

                    {
                        ((file.id === editStatus)) &&
                        <div>
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
                                onClick={() => {closeSearch(file)}}
                            >
                                <FontAwesomeIcon
                                    title='关闭'
                                    size='lg'
                                    icon={faTimes}
                                />
                            </button>
                        </div>
                    }

                </li>
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