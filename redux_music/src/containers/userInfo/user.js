import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as fetch from '../../fetch/index'
import * as Actions from '../../actions/index'
import './user.css'
import List from './list'
import {Spin} from 'antd'

class UserInfo extends React.Component{
    componentDidMount(){
        // 隐藏底部播放栏
        this.props.action.playInfo({
            isShow: false
        });
        // 获取用户信息
        let action = this.props.action.userInfo;
        let name = this.props.match.params.name;
        fetch.user(name).then(res => {
            res.json().then(response => {
                let user = response.result.userprofiles[0];
                action(user);
                console.log(response);
            })
        });

        // 获取用户歌单
        fetch.userPlaylist(name).then(res => {
            res.json().then(response => {
                // 查询到的歌单有些乱入
                let list = response.result.playlists;
                let _list = list.filter(item => {
                    return item.creator.nickname === name;
                });
                action({list: _list});
            })
        })
    }
    componentWillUnmount(){
        this.props.action.playInfo({
            isShow: true
        });
    }

    back(){
        window.history.go(-1);
    }

    render(){
        console.log(this.props);
        let user = this.props.user;
        return(
            <div id="user">
                <header className="header">
                    <i className="material-icons" onClick={() => {this.back()}}>arrow_back</i>
                    <i className="material-icons">more_vert</i>
                </header>
                <div className="user_head" style={{backgroundImage: 'url(' + user.backgroundUrl + ')'}}>
                    <div className="avatar">
                        <img src={user.avatarUrl} alt=""/>
                    </div>
                    <div className="name_gender">
                        <span className="nickname">{user.nickname}</span>
                        <span className="icon gender" style={{backgroundPosition: '-70px 0px'}}>{user.gender}</span>
                    </div>
                    <div className="follow">
                        <span className="follows">关注 {user.follows}</span>
                        |
                        <span className="followed">粉丝 {user.followeds}</span>
                    </div>
                    <div className="follow_new">
                        <p className="icon add">关注</p>
                        <p className="icon message"></p>
                    </div>
                </div>
                <div className="container">
                    <div className="nav">
                        <span className="music active">音乐</span>
                        <span className="status">动态</span>
                        <span className="about">关于TA</span>
                    </div>
                    <div className="title">
                        <span className="list_num">歌单({user.playlistCount})</span>
                        <span className="publish_count">共被收藏{user.playlistBeSubscribedCount}次</span>
                    </div>
                </div>
                <ul className="list">
                    {
                        user.list ? list.map((item,index) => {
                            return <List item={item}/>
                        }) : <div className="spin"><Spin /></div>
                    }
                </ul>
            </div>
        )
    }


}
function mapStateToProps(state){
    return {
        user: state.userInfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        action: bindActionCreators(Actions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)