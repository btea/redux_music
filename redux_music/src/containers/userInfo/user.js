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
        // 获取一言
        fetch.speak().then(res => {
            res.json().then(response => {
                this.setState({
                    speak: response.hitokoto
                })
            })
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
        let width,style;
        style = window.getComputedStyle(slide,null) || slide.currentStyle;
        width = +style.width.split('px')[0];
        let left = 0; /*定义一个变量保存页面滑动时已经存在的marginleft值*/

        // 添加波纹效果
        let ripple = this.refs.ripple;
        let children = ripple.childNodes;
        for (let i = 0; i < children.length -1; i++){
            _ripple(children[i],i,this,width);
        }

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
                            if(that.state.index !== 0){
                                that.setState({
                                    index: that.state.index - 1,
                                    marginLeft: (that.state.index - 1) * width /3
                                });
                            }
                        }else{
                            that.setState({
                                index: that.state.index,
                                marginLeft: that.state.index * width/3
                            });
                        }
                    }else{
                        if(x - _x >= width / 6){
                            if(that.state.index !== 2){
                                that.setState({
                                    index: that.state.index + 1,
                                    marginLeft: (that.state.index + 1) * width/3
                                });
                            }
                        }else{
                            that.setState({
                                marginLeft: that.state.index * width/3
                            });
                        }
                        // 位于最右边时，向左滑动不响应
                        // alert('向左滑动')
                    }
                    break;
                case 'touchmove':
                    _x = event.touches[0].clientX;
                    if(that.state.index === 0){
                        // 位于最左边时
                        if(_x >= x){
                            break;
                        }else{
                            left = 0;
                        }
                    }else if(that.state.index === 2){
                        // 位于最右边时
                        if(_x <= x){
                            break;
                        }else{
                            left = width / 3 *2;
                        }
                    }else{
                        left = width / 3;
                    }
                    that.setState({
                        marginLeft: left + (x - _x)
                    });
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
                    <div className="nav" ref="ripple">
                        <span className="music active">音乐</span>
                        <span className="status">动态</span>
                        <span className="about">关于TA</span>
                        <span className="tag" style={{left: this.state.marginLeft/3 + 'px'}}></span>
                    </div>
                    <div className="footer_container" ref="slide" style={{marginLeft: -this.state.marginLeft + 'px'}}>
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
                        <div className="dynamic">{this.state.speak}</div>
                        <div className="about">
                            <div className="information">
                                <h5>个人信息</h5>
                                <div className="level">等级：<i>Lv8</i></div>
                                <div className="age">年龄：{age(user.birthday)}</div>
                                <div className="gender">性别：{user.gender === 2 ? '女' : '男'}</div>
                                <div className="region">地区：{user.provinces[user.province]}</div>
                                <div className="university">大学：{user.university || '未知'}</div>
                            </div>
                            <div className="introduce">
                                <h5>个人介绍</h5>
                                <p className="signature">{user.signature}</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
// 波纹效果
function _ripple(ele,i,that,w){
    let width = w;
    console.log(w);
    ele.addEventListener('click',function(event){
        that.setState({
            index: i,
            marginLeft: width / 3 * i
        });
        console.log(that);
        var self = this;
        self.style.position = "relative";
        self.style.cursor = "pointer";
        var style = self.currentStyle ? self.currentStyle : window.getComputedStyle(self,null);
        var w = style.width,h = style.height;
        // 转换成整数类型
        var $w = Number(w.split('px')[0]),$h = Number(h.split('px')[0]);
        // 鼠标点击的位置
        var _x = event.offsetX,_y = event.offsetY;
        var _div = document.createElement('div');
        _div.className = 'add_ripple';
        _div.style.cssText = 'width:' + $w + "px;height:" + $w + "px;left:" + (_x - $w/2) + "px;top:" + (_y - $w/2) + "px;";
        ele.appendChild(_div);
        setTimeout(() =>{
            ele.removeChild(_div);
        },1500)
    })
}

// 年龄计算
function age(_age){
    if(_age){
        let year = new Date(_age).getFullYear();
        if(year >= 2015){
            return '15后';
        }else if(year >= 2010){
            return '10后';
        }else if(year >= 2005){
            return '05后';
        }else if(year >= 2000){
            return '00后';
        }else if(year >= 1995){
            return '95后';
        }else if(year >= 1990){
            return '90后';
        }else if(year >= 1985){
            return '85后';
        }else if(year >= 1980){
            return '80后';
        }else{
            return '70前';
        }
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