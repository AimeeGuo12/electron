import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Buttons from './compontents/button';
import LoginPage from './compontents/hook-reducer/index';
import ReactRouter from './compontents/react-router/index';
import Layout from './compontents/Layout/index';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
            {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Buttons title='标题' title2='hahah'></Buttons>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <LoginPage></LoginPage> */}
      <Layout></Layout>
      <ReactRouter />
      </BrowserRouter>

    </div>
  );
}

export default App;
