import React from 'react'
import './userInterface.css'
import {Link} from 'react-router-dom'

export default class UserInterface extends React.Component{

    _switch(e){
        let target = e.target;
        if(target.className === 'user'){
            this.props.userStatus();
        }
    }

    render(){
        return <div className="user" onClick={(e) => {this._switch(e)}} style={{left: this.props.status ? '0' : '-100%'}} ref="user">
            <div className="user_header">
                <div className="avatar">
                    <Link to={"/userInfo/" + '木暮睦'}>
                        <img src='https://p1.music.126.net/Lav4ZF0cpMNTU67EwSwgSQ==/1364493977702847.jpg' alt=""/>
                    </Link>
                    <div className="name_level">
                        <span className="username">木暮睦</span>
                        <span className="level">Lv8</span>
                        <span className="sign">签到</span>
                    </div>
                </div>
            </div>
            <section className="user_info_list">
                <div className="top">
                    <div className="my_news">
                        <i className="material-icons">mail_outline</i>
                        <span>我的消息</span>
                    </div>
                    <div className="member">
                        <i className="material-icons">gamepad</i>
                        <span>VIP会员</span>
                    </div>
                    <div className="mall">
                        <i className="material-icons">shopping_cart</i>
                        <span>商城</span>
                    </div>
                    <div className="online">
                        <i className="material-icons">cast</i>
                        <span>
                            在线听歌免流量
                        </span>
                    </div>
                </div>
                <div className="middle">
                    <div className="my_friends">
                        <i className="material-icons">perm_identity</i>
                        <span>我的好友</span>
                    </div>
                    <div className="nearby">
                        <i className="material-icons">room</i>
                        <span>附近的人</span>
                    </div>
                </div>
                <div className="bottom">
                    <div className="skin">
                        <i className="material-icons">album</i>
                        <span>个性皮肤</span>
                    </div>
                    <div className="distinguish">
                        <i className="material-icons">keyboard_voice</i>
                        <span>听歌识曲</span>
                    </div>
                    <div className="timing">
                        <i className="material-icons">access_time</i>
                        <span>定时停止播放</span>
                    </div>
                    <div className="scan">
                        <i className="material-icons">crop_free</i>
                        <span>扫一扫</span>
                    </div>
                    <div className="alarm_clock">
                        <i className="material-icons">alarm</i>
                        <span>音乐闹钟</span>
                    </div>
                    <div className="driving_mode">
                        <i className="material-icons">time_to_leave</i>
                        <span>驾驶模式</span>
                    </div>
                    <div className="cloud">
                        <i className="material-icons">cloud_queue</i>
                        <span>音乐云盘</span>
                    </div>
                </div>
            </section>
            <footer>
                <span className="nigth">
                    <i className="material-icons">brightness_2</i>
                    <span>夜间模式</span>
                </span>
                <span className="setting">
                    <i className="material-icons">settings</i>
                    <span> 设置</span>
                </span>
                <span className="exit">
                    <i className="material-icons">power_settings_new</i>
                    <span> 退出</span>
                </span>
            </footer>
        </div>
    }
}