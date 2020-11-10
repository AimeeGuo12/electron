import React from 'react';
import ReactDOM from 'react-dom';
// useParams返回URL参数的key/value的对象。 使用它来访问当前<Route>的match.params
// hook中可以使用的路由api 有useHistory useLocation useParams useRouteMatch
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/index';
function Home(props) {
    console.log('Home=>', props);
    return <h2>Home</h2>
}

function About(props) {
    console.log('About=>', props);
    return <h2>About</h2>;
}

function Users(props) {
    console.log('Users=>', props);
    return <h2>Users</h2>;
}

function Topic() {
    let {topicId} = useParams()
    // useParams() 返回的数据 {topicId: "prop-state"}
    return <div>当前所在topic: {topicId}</div>
}


function Topics() {
    const match = useRouteMatch()
    console.log('match', match)
    // match.url: '/topics'  match.path: '/topics'
    return (<div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/components`}>components</Link>
            </li>
            <li>
                <Link to={`${match.url}/prop-state`}>prop-state</Link>
            </li>
        </ul>
       <Switch>
           <Route path={`${match.path}/:topicId`}>
                <Topic/>
           </Route>
           <Route path={match.path}>
                <h3>topic首页</h3>
           </Route>
       </Switch>
    </div>)
}
function ReactRouter() {
    return <BrowserRouter>
    <ScrollToTop></ScrollToTop>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/about'}>About</Link>
                    </li>
                    <li>
                        <Link to={'/users'}>Users</Link>
                    </li>
                    <li>
                        <Link to={'/topics'}>Topics</Link>
                    </li>
                </ul>
            </nav>
            {/* <Switch>通过查找所有的子<Route>并渲染与当前URL匹配的第一个<Route>的内容 */}
            <Switch>
                <Route path={'/about'}>
                    <About />
                </Route>
                <Route path={'/users'} children={<Users />}/>
                <Route path={'/topics'} children={<Topics />}/>
                <Route path={'/'}>
                    <Home />
                </Route>
            </Switch>
        </div>
    </BrowserRouter>
}
export default ReactRouter;