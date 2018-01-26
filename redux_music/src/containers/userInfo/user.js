import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as fetch from '../../fetch/index'
import * as Actions from '../../actions/index'
import './user.css'
import List from './list'
import {Spin} from 'antd'

class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            marginLeft: 0
        }
    }
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
                console.log(response);
                action({list: _list});
            })
        });


        // 底部滚动滑动
        let slide = this.refs.slide,x,_x;
        let user = this.props.user;
        let width,style,marginLeft;
        style = window.getComputedStyle(slide,null) || slide.currentStyle;
        width = +style.width.split('px')[0];
        marginLeft = user.marginLeft;
        console.log(marginLeft);
        touch(slide);
        function touch(target){
            target.addEventListener('touchstart',judge,false)

            target.addEventListener('touchend',judge,false)

            target.addEventListener('touchmove',judge,false)
        }
        let that = this;
        function judge(event){

            switch(event.type){
                case 'touchstart':
                    x = event.touches[0].clientX;
                    break;
                case 'touchend':
                    if(_x - x >= 0){
                        // 处于最左边时，向右滑动不响应
                        if(_x - x >= width / 6){
                            that.setState({
                                index: that.state.index - 1,
                                marginLeft: that.state.marginLeft + width /3
                            });
                            // action({_index: user._index - 1,marginLeft: marginLeft + width/3});
                        }else{
                            that.setState({
                                index: that.state.index,
                                marginLeft: that.state.marginLeft
                            });
                            // action({_index: user._index,marginLeft: marginLeft});
                        }
                        // alert('向右滑动')
                    }else{
                        if(x - _x >= width / 6){
                            that.setState({
                                index: that.state.index + 1,
                                marginLeft: that.state.marginLeft - width / 3
                            });
                            // action({_index: user._index + 1,marginLeft: marginLeft - width/3});
                        }else{
                            that.setState({
                                index: that.state.index,
                                marginLeft: that.state.marginLeft
                            });
                            // action({_index: user._index,marginLeft: marginLeft});
                        }
                        // 位于最右边时，向左滑动不响应
                        // alert('向左滑动')
                    }
                    // console.log(_x - x);
                    // console.log('滑动结束')
                    break;
                case 'touchmove':
                    _x = event.touches[0].clientX;

                    if(that.state.index === 0){
                        // 位于最左边时
                        if(_x >= x){
                            return false;
                        }
                    }if(that.state.index === 2){
                        // 位于最右边时
                        if(_x <= x){
                            return false;
                        }
                    }
                    slide.style.marginLeft = (marginLeft + (_x -x)) + 'px';
                    break;
            }
        }

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
        console.log(this.state);
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
                        <span className="follows">关注{user.follows}</span>
                         &nbsp;&nbsp;|&nbsp;&nbsp;
                        <span className="followed">粉丝{user.followeds}</span>
                    </div>
                    <div className="follow_new">
                        <span className="follow_container">
                            <span className="icon add">
                                <i className="material-icons">add</i>
                                <span className="add_follow">关注</span>
                            </span>
                            <span className="icon message">
                                <i className="material-icons">mail_outline</i>
                            </span>
                        </span>

                    </div>
                </div>
                <footer className="footer">
                    <div className="nav">
                        <span className="music active">音乐</span>
                        <span className="status">动态</span>
                        <span className="about">关于TA</span>
                    </div>
                    <div className="footer_container" ref="slide" style={{marginLeft: this.state.marginLeft + 'px'}}>
                        <div className="list">
                            <div className="container">

                                <div className="title">
                                    <span className="list_num">歌单({user.playlistCount})</span>
                                    <span className="publish_count">共被收藏{user.playlistBeSubscribedCount}次</span>
                                </div>
                            </div>
                            {
                                user.list ? user.list.map((item,index) => {
                                    return <List item={item} key={index}/>
                                }) : <div className="spin"><Spin /></div>
                            }
                        </div>
                        <div className="dynamic">嗯，还没有动态</div>
                        <div className="about">
                            about
                        </div>
                    </div>
                </footer>
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