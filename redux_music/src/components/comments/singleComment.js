import React from 'react';

export  default class SingleComment extends React.Component{
    render(){
        let inf = this.props.info;
        // // let content = inf.content.replace('\n','</br>');
        // console.log(inf.content);
        // console.log(content);
        return(
            <li className="single_comment" id={inf.user.userId}>
                <div className="avatar">
                    <img src={inf.user.avatarUrl} alt=""/>
                </div>
                <div className="content">
                    <div className="name_time">
                        <div className="nickname_time">
                            <p className="nickname">{inf.user.nickname}</p>
                            <p className="release_time">{new Date(inf.time).toLocaleString()}</p>
                            {/*<p className="release_time">{Time_show(inf.time)}</p>*/}
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

// function Time_show(sentTime){
//     var time,showtime;
//     // var isIE = navigator.userAgent.indexOf('MSIE');
//     var isIe = function(){
//         return 'ActiveXObject' in window;
//     };
//     var isEdge = function () {
//         return navigator.userAgent.indexOf('Edge') > -1;
//     };
//     if(typeof sentTime == "number"){
//         time = sentTime;
//     }else{
//         time = +new Date(sentTime);
//     }
//     // 当天凌晨零点
//     var times,_zero;
//     if(isIe()){
//         if(navigator.userAgent.indexOf('MSIE') > -1){
//             times = new Date().toString().substr(0,10);
//             _zero = times + ' 00:00:00' + new Date().toString().substr(-14);
//         }else{
//             times = new Date().toString().substr(0,15);
//             _zero = times + " 00:00:00";
//         }
//     }else{
//         times = new Date().toString().substr(0,15);
//         _zero = times + " 00:00:00";
//     }
//     // 当天零点转换的毫秒数
//     var second_zero = +new Date(_zero);
//     // var currentTime = +new Date();
//
//     var _index = new Date(time).getDay();
//     var today_index = new Date().getDay();
//     // 判断是否是当天发送
//     if(time >= second_zero){
//         //当天发送，得到时分
//         //substr(startindex,count)  substring(startindex,endindex);
//         // var today = new Date(time).toLocaleTimeString('chinese',{hour12:false}).substr(0,5);
//
//         var today,time_str;
//         time_str = new Date(time).toLocaleTimeString();
//         if(isIe()){
//             if(navigator.userAgent.indexOf('MSIE') > -1){
//                 if(time_str.split(':')[0].length > 1){
//                     today = time_str.substr(0,5);
//                 }else{
//                     today = '0' + time_str.substr(0,4);
//                 }
//             }else{
//                 if(time_str.split(':')[0].length == 4){
//                     today = time_str.substr(0,8);
//                 }else{
//                     today = '0' + time_str.substr(0,7);
//                 }
//             }
//         } else{
//             if(isEdge()){
//                 if(time_str.split(':')[0].length == 3){
//                     today = '0' + time_str.substr(0,7);
//                 }else{
//                     today = time_str.substr(0,8);
//                 }
//             }else{
//                 today = new Date(time).toLocaleTimeString('chinese',{hour12:false}).substr(0,5);
//             }
//         }
//         showtime = today;
//
//     }else if(time < second_zero && time >= second_zero - (24 * 3600 * 1000)){
//         // 昨天发送
//         var yesterday;
//         var time_str = new Date(time).toLocaleTimeString();
//         if(isIe()){
//             if(navigator.userAgent.indexOf('MSIE') > -1){
//                 if(time_str.split(':')[0].length > 1){
//                     yesterday = '昨天' +  time_str.substr(0,5);
//                 }else{
//                     yesterday = '昨天0' + time_str.substr(0,4);
//                 }
//             }else{
//                 if(time_str.split(':')[0].length == 4){
//                     yesterday = '昨天' +  time_str.substr(0,8);
//                 }else{
//                     yesterday = '昨天0' + time_str.substr(0,7);
//                 }
//             }
//         }else{
//             if(isEdge()){
//                 if(time_str.split(':')[0].length == 3){
//                     yesterday = '昨天0' + new Date(time).toLocaleTimeString().substr(0,7);
//                 }else{
//                     yesterday = new Date(time).toLocaleTimeString().substr(0,8);
//                 }
//             }else{
//                 yesterday = '昨天' + new Date(time).toLocaleTimeString('chinese',{hour12:false}).substr(0,5);
//             }
//
//         }
//         showtime = yesterday;
//     }else if(time < second_zero - (24 * 3600 * 1000) && time >= (second_zero - (today_index - 1) * 24*3600*1000)){
//         var datas = ['周日','周一','周二','周三','周四','周五','周六'],longago;
//         var time_str = new Date(time).toLocaleTimeString();
//         if(isIe()){
//             if(navigator.userAgent.indexOf('MSIE') > -1){
//                 if(time_str.split(':')[0].length > 1){
//                     longago = datas[_index] + time_str.substr(0,5);
//                 }else{
//                     longago = datas[_index] + '0' + time_str.substr(0,4);
//                 }
//             }else{
//                 if(time_str.split(':')[0].length == 4){
//                     longago = datas[_index] + time_str.substr(0,8);
//                 }else{
//                     longago = datas[_index] + '0' + time_str.substr(0,7);
//                 }
//             }
//         }else{
//             if(isEdge()){
//                 if(time_str.split(':')[0].length == 3){
//                     longago = datas[_index] + '0' + new Date(time).toLocaleTimeString().substr(0,7);
//                 }else{
//                     longago = datas[_index] + new Date(time).toLocaleTimeString().substr(0,8);
//                 }
//             }else{
//                 longago = datas[_index] + new Date(time).toLocaleTimeString('chinese',{hour12:false}).substr(0,5);
//             }
//         }
//         showtime = longago;
//     }else{
//         var longlongago = new Date(time).toLocaleDateString();
//         showtime = longlongago;
//     }
//     return showtime;
// }