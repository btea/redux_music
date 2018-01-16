import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore,compose} from 'redux'
import reducers from './reducers/index'
import Links from './route/index'
import './iconfont/material-icons.css';


let store = createStore(
    reducers,
    compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Links />
    </Provider>,
    document.getElementById('root')
);