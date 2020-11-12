import React, { useState, useReducer } from 'react';

import logo from '../../static/image/logo.jpg';
import './index.less';
function Header() {

    function clickHandle(type) {
        if (type = 'prev') {

        } else {

        }
    }

    return (
        <div className='m-app-header'>
            <div className='m-app-left'>
                {/* <img src="logo" width='50%' height='50%' alt=""/> */}
                <span className='m-app-logo'>网</span>
                <div className='m-app-page'>
                    {/* <span className='m-app-page-prev' onClick={() => clickHandle('prev')}>{'<'}</span> */}
                    {/* <span className='m-app-page-next' onClick={() => clickHandle('next')}>{'>'}</span> */}
                </div>
            </div>
            <div className='m-app-right'>
                <img src="" alt="" style={{marginRight: '10px'}} />
                <span style={{marginRight: '10px'}}>{'冬日限定'}</span>
                <span style={{marginRight: '10px'}}></span>
                <span style={{marginRight: '10px'}}>开通VIP</span>
                <div className='m-app-right-tool'>
                    <span style={{marginRight: '10px'}}>设置</span>
                    <span style={{marginRight: '10px'}}>主题</span>
                    <span>消息</span>
                </div>
            </div>
        </div>
    )
}

export default Header