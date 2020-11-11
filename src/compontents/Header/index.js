import React, { useState, useReducer } from 'react';

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
                <span className='m-app-logo'>网</span>
                <div className='m-app-page'>
                    {/* <span className='m-app-page-prev' onClick={() => clickHandle('prev')}>{'<'}</span> */}
                    {/* <span className='m-app-page-next' onClick={() => clickHandle('next')}>{'>'}</span> */}
                </div>
            </div>
            <div className='m-app-right'>
                <img src="" alt="" />
                <span>{'冬日限定'}</span>
                <span></span>
                <span>开通VIP</span>
                <div className='m-app-right-tool'>
                    <span>设置</span>
                    <span>主题</span>
                    <span>消息</span>
                </div>
            </div>
        </div>
    )
}

export default Header