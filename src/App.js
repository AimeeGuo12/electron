import logo from './logo.svg';
import FileSearch from './react-hook/components/FileSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-6 left-panel">
          {/* <h1>aaa</h1> */}
          <FileSearch
          title='请搜索你要查找的文档'
          onFileSearch={()=> {}}
          >
          </FileSearch>
        </div>
        <div className="col-6 right-panel">
          <h1>xxx</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
