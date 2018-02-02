import React from 'react'


export default class UserInterface extends React.Component{
    render(){
        return <div className="user">
            <header>
                <div className="avatar">
                    <img src='' alt=""/>
                    <div className="name_level">
                        <span className="username"></span>
                        <span className="level"></span>
                        <span className="sign">签到</span>
                    </div>
                </div>
            </header>
            <section className="user_info_list">
                <div className="top">
                    <div className="my_news">
                        <i className="material-icons">mail_outline</i>
                        <span>我的消息</span>
                    </div>
                    <div className="member">
                        <span>VIP会员</span>
                    </div>
                    <div className="mall">
                        <i className="material-icons">shopping_cart</i>
                        <span>商城</span>
                    </div>
                    <div className="online">

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
                        <span>个性皮肤</span>
                    </div>
                    <div className="distinguish">
                        <span>听歌识曲</span>
                    </div>
                    <div className="timing">
                        <span>定时停止播放</span>
                    </div>
                    <div className="scan">
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
                    夜间模式
                </span>
                <span className="setting">
                    <i className="material-icons">settings</i>
                    设置
                </span>
                <span className="exit">
                    <i className="material-icons">power_settings_new</i>
                    退出
                </span>
            </footer>
        </div>
    }
}