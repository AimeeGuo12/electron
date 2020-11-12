import React, { useState, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
// import { connect } from 'react-redux'
import routerLeftTopMap from '../react-router/routerLeftTopMap'
import './index.less'
const topMenu = [
    {
        label: '发现音乐',
        icon: '',
        path: '/foundMusic'
    },
    {
        label: '视频',
        icon: '',
        path: '/video'
    },
    {
        label: '朋友',
        icon: '',
        path: '/friends'
    },
    {
        label: '直播',
        icon: '',
        path: '/playNow'
    },
    {
        label: '私人FM',
        icon: '',
        path: '/fM'
    },
]

const otherMenu = [
    {
        label: '我的音乐',
        icon: '',
        children: [
            {
                label: '本地音乐',
                icon: '',
            },
            {
                label: '下载管理',
                icon: '',
            },
        ]
    },
    {
        label: '创建的歌单',
        icon: '',
        children: [
            {
                label: '一场大雨'
            },
            {
                label: '真爱至上'
            }
        ]
    },
    {
        label: '朋友',
        icon: ''
    },
    {
        label: '直播',
        icon: ''
    },
    {
        label: '私人FM',
        icon: ''
    },
]
function Left() {

    return (
        <div className='app-left'>
            <Router>
                <ul>
                    {topMenu.map((menu) => {
                        return (
                            <li key={menu.label}>
                                <Link to={menu.path}><span>{menu.label}</span>
                                    {menu.icon && <span>.</span>}</Link>

                            </li>
                        )
                    })}
                </ul>
                <Switch>
                    {routerLeftTopMap.map((item, index) => {
                        return <Route key={index} path={item.path} exact render={props =>
                            // (!item.auth ? (<item.component {...props} />) :
                            //     (token ? <item.component {...props} /> :
                            //         <Redirect to={{
                            //             pathname: '/login', state: { from: props.location }
                            //         }} />)
                            // )
                            <item.component {...props} />
                        } />

                    })}
                    {/* // 所有错误路由跳转页面 */}
                    {/* <Route component={NotFound} /> */}
                </Switch>

            </Router>

            {otherMenu.map((menuItem) => {
                return (
                    <ul>
                        <span>{menuItem.label}</span>
                        {menuItem.children && menuItem.children.map((item, index) => {
                            return <li key={item.label}>{item.label}</li>
                        })}
                    </ul>
                )
            })}
        </div>
    )
}

export default Left