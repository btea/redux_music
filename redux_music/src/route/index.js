// import {BrowserRouter as Router,Route} from 'react-router-dom'
import {HashRouter as Router,Route} from 'react-router-dom'
import Single from './../containers/single/index'
import React from 'react'
import App from '../App'
import Player from './player'
import PlayInterface from '../containers/playInterface/playinterface'
import Comment from '../components/comments/comment'
import UserInfo from '../containers/userInfo/user'
import Search from '../containers/search/search'
import {connect} from 'react-redux'
import * as Actions from '../actions/index'
import {bindActionCreators} from 'redux'

class Links extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={App}/>
                    <Route path="/single/:listid" component={Single}/>
                    <Route path="/playInterface" component={PlayInterface} />
                    <Route path="/comment" component={Comment}/>
                    <Route path="/userInfo/:name" component={UserInfo}/>
                    <Route path="/search" component={Search} />
                    <Player info={this.props.playInfo} playInfo={this.props.action.playInfo} />
                </div>
            </Router>
        )
    }
}
function mapStateToProps(state){
    return{
        playInfo: state.playInfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Links)