import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from './actions/index'
import * as fetch from './fetch/index'
import PlayList from './components/playlist'
import {songlist} from "./actions/index";

class App extends React.Component{
    componentDidMount(){
        fetch.playList('动漫').then(res => {
            res.json().then(response => {
                this.props.actions.playlist(response.result.playlists)
            })
        })
    }

    render(){
        return(
            <div className="recommend">
                {
                    this.props.playlist ? this.props.playlist.length ?
                        <PlayList  list={this.props.playlist[0]}/> : '' : ''
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        playlist: state.playlist
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

