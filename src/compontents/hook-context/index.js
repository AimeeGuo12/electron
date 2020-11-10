    // 定义初始化值
    const initState = {
        name: '',
        pwd: '',
        isLoading: false,
        error: '',
        isLoggedIn: false,
    }
    // 定义state[业务]处理逻辑 reducer函数
    function loginReducer(state, action) {
        switch(action.type) {
            case 'login':
                return {
                    ...state,
                    isLoading: true,
                    error: '',
                }
            case 'success':
                return {
                    ...state,
                    isLoggedIn: true,
                    isLoading: false,
                }
            case 'error':
                return {
                    ...state,
                    error: action.payload.error,
                    name: '',
                    pwd: '',
                    isLoading: false,
                }
            default: 
                return state;
        }
    }
    // 定义 context函数
    const LoginContext = React.createContext();
    function LoginPage() {
        const [state, dispatch] = useReducer(loginReducer, initState);
        const { name, pwd, isLoading, error, isLoggedIn } = state;
        const login = (event) => {
            event.preventDefault();
            dispatch({ type: 'login' });
            login({ name, pwd })
                .then(() => {
                    dispatch({ type: 'success' });
                })
                .catch((error) => {
                    dispatch({
                        type: 'error',
                        payload: { error: error.message }
                    });
                });
        }
        // 利用 context 共享dispatch
        return ( 
            <LoginContext.Provider value={{dispatch}}>
                <LoginButton />
            </LoginContext.Provider>
        )
    }
    function LoginButton() {
        // 子组件中直接通过context拿到dispatch，出发reducer操作state
        const dispatch = useContext(LoginContext);
        const click = () => {
            if (error) {
                // 子组件可以直接 dispatch action
                dispatch({
                    type: 'error',
                    payload: { error: error.message }
                });
            }
        }
    }