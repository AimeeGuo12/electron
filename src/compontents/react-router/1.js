import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Routers from './routerMap'
// 公共头部组件
import Header from './common/header'
// 404页面
import NotFound from './containers/notFound'

// 以上代码最重要的点是Route组建里面用render属性替换component来渲染页面，
//根据routerMap.js中的每一条路由信息中的auth(自定义)字段来区分是否需要进
//行登陆拦截，再根据redux里面的token字段来判断是不是登陆状态，然后进行
//相关的操作。如果已经拦截了就把当前的路由通过Redirect的state来传递到登陆页面，
//在登陆页面打印this.props来看控制台的输出
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let token = this.props.token
        return (<Router>
            <div>
                <Header />
                <Switch>
                    {Routers.map((item, index) => {
                        return <Route key={index} path={item.path} exact render={props =>
                            (!item.auth ? (<item.component {...props} />) :
                                (token ? <item.component {...props} /> :
                                    <Redirect to={{
                                        pathname: '/login', state: { from: props.location }
                                    }} />)
                            )} />
                    })}
                    {/* // 所有错误路由跳转页面 */}
                    <Route component={NotFound} />
                </Switch>
            </div></Router>
        )
    }
} // redux拿到token并挂载到App的props上面 
const mapStateToProps = (state, ownProps) => {
    return { token: state.token }
}
export default connect(mapStateToProps)(App)

// https://www.imooc.com/article/75020

// 登陆成功方法 login.jsx
// setToken() {
//     let token = this.state.user + this.state.pwd  if (!token) return
//     let RedirectUrl = this.props.location.state ? this.props.location.state.from.pathname : '/'  // 修改redux中的token值
//     this.props.changeActive(token)  // 登陆成功之后的跳转
//     this.props.history.push(RedirectUrl)
// }