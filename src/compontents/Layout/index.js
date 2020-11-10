import React, { useState, useReducer } from 'react';
import './index.less';
function Layout() {

    return (
        <div className='m-app'>
            <div className='m-app-header'>
                <div className='m-app-left'>
                    <div className='m-app-logo'>网</div>
                    <div className='m-app-page'>
                        <div className='m-app-page-prev' onClick=''>{'<'}</div>
                        <div className='m-app-page-next' onClick=''>{'>'}</div>
                    </div>
                </div>
                <div className='m-app-right'></div>
            </div>
        </div>
    )
}

export default Layout