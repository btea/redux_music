import React from 'react';
import {Link} from 'react-router-dom'

export  default class SingleComment extends React.Component{
    render(){
        let inf = this.props.info;
        // // let content = inf.content.replace('\n','</br>');
        // console.log(inf.content);
        // console.log(content);
        return(
            <li className="single_comment" id={inf.user.userId}>
                <Link to={"/userInfo/" + inf.user.nickname}>
                    <div className="avatar">
                        <img src={inf.user.avatarUrl} alt=""/>
                    </div>
                </Link>
                <div className="content">
                    <div className="name_time">
                        <div className="nickname_time">
                            <p className="nickname">{inf.user.nickname}</p>
                            <p className="release_time">{time(inf.time)}</p>
                        </div>
                        <p className="likedCount">
                            <i className="like_count">{inf.likedCount ? inf.likedCount : ''}</i>
                            <i className="material-icons">thumb_up</i>
                        </p>
                    </div>
                    <p className="content_des">{inf.content}</p>
                    <p className="replay" style={{display: inf.beReplied.length ? 'block' : 'none'}}>{ inf.beReplied.length ? '回复@' + inf.beReplied[0].user.nickname + ': '  + inf.beReplied[0].content : ''}</p>
                </div>
            </li>
        )
    }
}

// 时间处理(兼容各浏览器？？？)
function time(times){
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    // 计算今天零点所转换得到的毫秒数
    let zero = +new Date() - (hours * 3600 + minutes *60 + seconds) * 1000;
    let yesterday_zero = zero - 24*3600*1000; /*昨日凌晨*/
    let one = +new Date() - 3600 *1000 ;/*当前时间一小时内*/

    let hour = new Date(times).getHours();
    let minute = new Date(times).getMinutes();
    let _minute = new Date().getMinutes();

    if(times >= zero){
        // 评论发布时间距查看时间一小时内
        if(times > one){
            // 一分钟内
            if(+new Date() - times <= 60000){
                return '刚刚';
            }else{
                // 一小时内 当前查看时间和发布时间在同一准点的小时内，直接减
                if(_minute > minute){
                    return _minute - minute + '分钟前';
                }else{
                    return 60 - minute + _minute + '分钟前';
                }
            }
        }else{
            return two(hour) + ':' + two(minute);
        }

    }else if(times < zero && times >= yesterday_zero){
        return '昨天' + two(hour) + ':' + two(minute);
    }else{
        let year = new Date(times).getFullYear();
        let month = new Date(times).getMonth() + 1;
        let day = new Date(times).getDate();
        return year + '年' + two(month) + '月' + two(day) + '日';
    }
}
function two(_){
    return _ >= 10 ? _ : '0' + _;
}

