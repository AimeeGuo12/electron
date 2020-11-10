import React, {useState, useReducer} from 'react';

const initState = {
    name: '',
    pwd: '',
    isLoading: false,
    error: '',
    isLoggedIn: false
}

function loginReducer(state, action) {
    switch(action.type){
        case 'login':
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case 'success':
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true
            }
        case 'name': 
            return {
                ...state,
                name: action.payload.name
            }
        case 'pwd': 
            return {
                ...state,
                pwd: action.payload.pwd
            }
        case 'error':
            return {
                ...state,
                error: action.payload.error,
                name: '',
                pwd: '',
                isLoading: false,
                isLoggedIn: false
            }
    }
       
}

function LoginPage() {
    const [state, dispatch] = useReducer(loginReducer, initState)
    const {name, pwd, isLoading, error, isLoggedIn} = state
    
    const onLogin = (e) => {
        console.log('登陆')
        e.preventDefault();
        console.log('登陆。。。。')
        dispatch({type: 'login'})
        if(name && pwd) {
            dispatch({type: 'success'})
        } else {
            dispatch({
                type: 'error',
                payload: {error: '错'}
            })
        }
        
        // login({ name, pwd })  // 这个login是登陆接口
        //         .then(() => {
        //             dispatch({ type: 'success' });
        //         })
        //         .catch((error) => {
        //             dispatch({
        //                 type: 'error',
        //                 payload: { error: error.message }
        //             });
        //         });
    }

    const nameHandle = (e) => {
        dispatch({
            type: 'name',
            payload: {name: e.target.value}
        })
    }
    const passWord = (e) => {
        dispatch({
            type: 'pwd',
            payload: {pwd: e.target.value}
        })
    }
    return (
        <div>
            <input type="text" value={name} onChange={(e) => nameHandle(e)}/>
            <input type="" value={pwd} onChange={(e) => passWord(e)}/>
            <button onClick={(e) => onLogin(e)}>登陆</button>
        </div>
    )
}

export default LoginPage;