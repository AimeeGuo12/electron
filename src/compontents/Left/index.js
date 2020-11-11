import React, { useState, useReducer } from 'react';

const topMenu = [
    {
        label: '发现音乐',
        icon: ''
    },
    {
        label: '视频',
        icon: ''
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
        <div>
            <ul>
                {topMenu.map((menu) => {
                    return (
                        <li key={menu.label}>
                            <span>{menu.label}</span>
                            {menu.icon && <span>.</span>}
                        </li>
                    )
                })}
            </ul>
            {otherMenu.map((menuItem) => {
                return (
                    <ul>
                        <span>{menuItem.label}</span>
                        {menuItem.children && menuItem.children.map((item) => {
                            return <li>{item.label}</li>
                        })}
                    </ul>
                )
            })}
        </div>
    )
}

export default Left