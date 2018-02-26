import React from 'react'
import {Router,Route,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from './actions/index'
import * as fetch from './fetch/index'
import PlayList from './components/playlist'
import UserInterface from './components/userInterface/userInterface'
import 'antd/dist/antd.css'

class App extends React.Component{

    componentDidMount(){
        fetch.playList('动漫').then(res => {
            res.json().then(response => {
                this.props.actions.playlist(response.result.playlists)
            })
        })
    }

    // 点击头像跳转之后隐藏用户信息列表
    componentWillUnmount(){
        // 如果显示，就修改为隐藏
        if(this.props.status){
            this.props.actions.userStatus();
        }
    }

    _switch(){
        this.props.actions.userStatus();
    }

    render(){
        let icon = ['audiotrack','track_changes','person_outline'];
        return(
            <div className="index">
                <UserInterface userStatus={this.props.actions.userStatus} status={this.props.status}/>
                <header>
                    <div className="sidebar" onClick={() => {this._switch()}}>
                        <i className="material-icons">menu</i>
                    </div>
                    <div className="center_menu">
                        {
                            icon.map((item,index) => {
                                return <i key={index} className={this.props.index === index ? 'material-icons active' : "material-icons"}>{item}</i>
                            })
                        }
                    </div>
                    <Link to='/search'>
                        <div className="search">
                            <i className="material-icons">search</i>
                        </div>
                    </Link>
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
                            <div>私人FM</div>
                        </span>
                        <span className="today">
                            <i className="material-icons">today</i>
                            <div>每日推荐</div>
                        </span>
                        <span className="list">
                            <i className="material-icons">queue_music</i>
                            <div>歌单</div>
                        </span>
                        <span className="rank">
                            <i className="material-icons">equalizer</i>
                            <div>排行榜</div>
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
        sidebar: state.sidebar,
        status: state.userStatus
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

