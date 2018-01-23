import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from './actions/index'
import * as fetch from './fetch/index'
import PlayList from './components/playlist'
import 'antd/dist/antd.css'

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
            <div className="index">
                <header>
                    <div className="sidebar">
                        <i className="material-icons">menu</i>
                    </div>
                    <div className="center_menu">
                        <i className="material-icons">audiotrack</i>
                        <i className="material-icons">track_changes</i>
                        <i className="material-icons">person_outline</i>
                    </div>
                    <div className="search">
                        <i className="material-icons">search</i>
                    </div>
                </header>

                <div className="recommend">
                    {
                        this.props.playlist ? this.props.playlist.length ?
                            <PlayList  list={this.props.playlist[0]}/> : '' : ''
                    }
                </div>
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

