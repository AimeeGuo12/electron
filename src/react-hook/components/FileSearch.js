import react, {useState} from 'react';

const FileSearch = ({title, onFileSearch}) => {
    const [ inputActive, setInputActive] = useState(false);
    const [value, setValue] = useState('');

    return (
        <div>
            {!inputActive && 
            <div className='d-flex justify-content-between align-item'>
                <span>{title}</span>
                <button
                type='button'
                className='btn btn-primary'
                onClick={()=> {setInputActive(true)}}
                >搜索</button>
            </div>
            }
        </div>
    )
}

export default FileSearch