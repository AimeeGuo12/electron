import React, {Component} from 'react'
// export default function Buttons () {
//     return(
//         <div>
//             <button>按钮</button>
//             <span> </span>
//         </div>
//     )
// }

export default class Buttons extends Component{
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            title2: props.title2
        }
        this.clickHandle = this.clickHandle.bind(this)
    }
     clickHandle() {
        let num = this.state.num
        let num1 = num + 1
        this.setState({
            num: num1
        })
    } 
    render() {
        return(
            <div>
                <span>{this.state.num}</span>
                <button onClick={this.clickHandle}>按钮</button>
                <div>{this.props.title}</div>
                <div>{this.state.title2}</div>
        </div>
        )
    }
}