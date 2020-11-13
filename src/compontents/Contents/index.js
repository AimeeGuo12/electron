import React, { useState, useReducer } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import routerLeftTopMap from '../react-router/routerLeftTopMap'
import './index.less'
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
// import { connect } from 'react-redux'

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
function Contents() {

    return (
        <Layout>
            <Router>
                <Sider>
                    <div className='app-left'>
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




                        {otherMenu.map((menuItem, ind) => {
                            return (
                                <ul key={ind}>
                                    <span>{menuItem.label}</span>
                                    {menuItem.children && menuItem.children.map((item, index) => {
                                        return <li key={item.label}>{item.label}</li>
                                    })}
                                </ul>
                            )
                        })}
                    </div>
                </Sider>
                <Content>

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
                </Content>
            </Router>
        </Layout>
    )
}

export default Contents