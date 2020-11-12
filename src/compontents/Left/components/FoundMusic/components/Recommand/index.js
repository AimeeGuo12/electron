import { Divider } from 'antd';
import React, { useState, useReducer } from 'react';
// import{remote} from 'electron';

// import shell from 'shell';
import { Carousel } from 'antd';
import img1 from '../../../../../../static/image/img1.jpg';
import img2 from '../../../../../../static/image/img2.jpg';
import img3 from '../../../../../../static/image/img3.jpg';
import img4 from '../../../../../../static/image/img4.jpg';
import img5 from '../../../../../../static/image/img5.jpg';
// const {shell} = remote.Shell
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const imagePlay = [
    {
        src: img1,
        type: 'song',
        url: ''
    },
    {
        src: img2,
        type: 'song',
        url: ''
    },
    {
        src: img3,
        type: 'web',
        url: 'http://baidu.com'
    },
    {
        src: img4,
        type: 'song',
        url: ''
    },
    {
        src: img5,
        type: 'song',
        url: ''
    },
]
function Recommand() {
    
    function imgHandle(type, url) {
        if(type === 'song') {
            //  播放当前音乐
        } else {
            // shell.openExternal(url)
            window.open(url)
        }
    }
    return (
        <div>
            <Carousel autoplay={false} style={{textAlign: 'center'}}>
                    {imagePlay.map((item, index)=> {
                        return(
                            <div style={contentStyle}>
                                <img src={item.src} alt="" width='50%' onClick={imgHandle(item.type, item.url)}/>
                            </div>
                        )
                    })}
            </Carousel>
            <div>
                <div>推荐歌单</div>

            </div>
        </div>
    )
}

export default Recommand