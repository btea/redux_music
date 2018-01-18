import {BrowserRouter as Router,Route} from 'react-router-dom'
import Single from './../containers/single/index'
import React from 'react'
import App from '../App'
import Player from './player'
import PlayInterface from '../containers/playInterface/playinterface'
import {connect} from 'react-redux'
import * as Actions from '../actions/index'
import {bindActionCreators} from 'redux'

class Links extends React.Component{
    render(){
        console.log(this.props);
        return(
            <Router>
                <div>
                    <Route exact path="/" component={App}/>
                    <Route path="/single/:listid" component={Single}/>
                    <Route path="/playInterface" component={PlayInterface} />
                    <Player info={this.props.playInfo} statu={this.props.action.playStatus} status={this.props.status}/>
                </div>
            </Router>
        )
    }
}
function mapStateToProps(state){
    return{
        playInfo: state.playInfo,
        status: state.playStatus
    }
}
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Links)