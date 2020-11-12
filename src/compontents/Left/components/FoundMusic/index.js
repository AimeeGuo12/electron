import React, { useState, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import routerMap from './routerMap';

import './index.less';

function FoundMusic() {
    return (
        <Router>
            <div className='found-m'>
                <ul>
                    <li><Link to='/foundMusic/recommand'>个性推荐</Link></li>
                    <li><Link to='/foundMusic/songList'>歌单</Link></li>
                    <li><Link to='/foundMusic/rank'>排行榜</Link></li>
                </ul>
                <Switch>
                    {routerMap.map((item, index) => {
                        return <Route key={index} path={item.path} exact render={props =>
                            <item.component {...props} />
                        } />
                    })}
                </Switch>

            </div>
        </Router>
    )
}
export default FoundMusic