import {BrowserRouter as Router,Route} from 'react-router-dom'
import Single from './../containers/single'
import React from 'react'
import App from '../App'

export default class Links extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={App} ></Route>
                    <Route path="/single/:listid" component={Single}/>
                </div>
            </Router>
        )
    }
}