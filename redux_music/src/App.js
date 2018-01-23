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
        let icon = ['audiotrack','track_changes','person_outline'];
        return(
            <div className="index">
                <header>
                    <div className="sidebar">
                        <i className="material-icons">menu</i>
                    </div>
                    <div className="center_menu">
                        {
                            icon.map((item,index) => {
                                return <i key={index} className={this.props.index == index ? 'material-icons active' : "material-icons"}>{item}</i>
                            })
                        }
                    </div>
                    <div className="search">
                        <i className="material-icons">search</i>
                    </div>

                </header>
                <div className="nav_title">
                    <div className="title">
                        <span className="music">音乐</span>
                        <span className="screen">视屏</span>
                        <span className="radio_station">电台</span>

                    </div>
                    <span className="bottom_animation" >
                    </span>
                </div>
                <div className="recommend">
                    <div className="recommend_icon">
                        <span className="radio">
                            <i className="material-icons">radio</i>
                        </span>
                        <span className="today">
                            <i className="material-icons">today</i>
                        </span>
                        <span className="list">
                            <i className="material-icons">queue_music</i>
                        </span>
                        <span className="rank">
                            <i className="material-icons">equalizer</i>
                        </span>
                    </div>
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
        playlist: state.playlist,
        index: state.indexStatus.index,
        sidebar: state.sidebar
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

