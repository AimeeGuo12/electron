import react from 'react';


class Canv extends react.Component{

    render() {
        <div className='canv'>
            <div className='mark-paper-wrap' ref={wrapRef}>
                <canvas
                ref={canvasRef}
                className='mark-paper-canvas'
                >
                    <p>xxxbu</p>
                </canvas>
            </div>
        </div>
    }
}