import React, { useState, useReducer } from 'react';

import HeaderPart from '../Header/index';
import LeftPart from '../Left/index';
import './index.less';
// function Layout() {

//     return (
//         <div className='m-app'>
//             <div>
//                 <Header></Header>
//             </div>
//             <div >
//                 <Left></Left>
//             </div>
//             <div>

//             </div>
//         </div>
//     )
// }

import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function Layout1() {
    return (

        <Layout>
            <Header>
                <HeaderPart></HeaderPart>
            </Header>
            <Layout>
                <Sider><LeftPart></LeftPart></Sider>
                <Content>Content</Content>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    )
}

export default Layout1