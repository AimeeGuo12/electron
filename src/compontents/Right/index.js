import React, { useState, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
// import { connect } from 'react-redux'
import routerLeftTopMap from '../react-router/routerLeftTopMap'
function Right() {
    return (
        <div>
            <Router>
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
                       
        </div>
    )
}

export default Right