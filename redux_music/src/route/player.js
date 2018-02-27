import React from 'react'
import './player.css'
import {Link} from 'react-router-dom'
import * as fetch from '../fetch/index'
export default class Player extends React.Component{

    componentDidUpdate(){
        if(this.props.info.play){
            this.refs.audio.play();
        }else{
            this.refs.audio.pause();
        }
    }

    // 监听音频播放进度
    song(){
        let time = this.props.info.time;
        let audio = this.refs.audio;
        let curTime = audio.currentTime;
        if(audio.buffered.length){
            let buffered = audio.buffered.end(0);
            this.props.playInfo({
                currentTime: curTime,
                percentage: curTime * 1000 / time,
                buffered: buffered
            });
        }
        // 当前音频播放结束之后，播放列表中下一首
        if(audio.ended){
            let info = this.props.info;
            let target = info.lists[info.playIndex + 1];
            this.props.playInfo({
                play: false
            });
            if(target){
                fetch.songDetail(target.id).then(res => {
                    res.json().then(response => {
                        let h = this.props.info.containerHeight;
                        let play = response.data[0];
                        this.props.playInfo({
                            picUrl: target.al.picUrl,
                            url: play.url,
                            name: target.name,
                            singer: target.ar[0].name,
                            play: true,
                            time: target.dt,
                            id: target.id,
                            lyricTime: null,
                            lyric: null,
                            cur: 0,
                            top: h/2 - 15,
                            playIndex: info.playIndex + 1
                        });
                    })
                })
            }
        }else{
            this.ring(this.props.info.percentage * 2 - 0.5);
        }

        if(this.props.info.lyricTime){
            let h = this.props.info.containerHeight;
            let time = time_show(curTime*1000); //当前播放时间
            for(let i = 0; i < this.props.info.lyricTime.length; i++){
                if(this.props.info.lyricTime[i] !== '00:00'){
                    if(time >= this.props.info.lyricTime[i] && time < this.props.info.lyricTime[i+1]){
                        this.props.playInfo({
                            cur: i,
                            top: h/2 - 15 - this.totalTop(i)
                        });
                    }
                }
            }
        }else{
            if(this.props.info.lyric){
                let p = document.querySelectorAll('.lyric_show p');
                let lyricTime = [];
                for(let  i = 0; i < this.props.info.lyric.length; i++){
                    lyricTime.push(this.props.info.lyric[i].time.slice(1,6));
                }
                this.props.playInfo({
                    lyricTime: lyricTime,
                    startTop: this.startTop(p)
                })
            }
            // let p = document.querySelectorAll('.lyric_show p');
            // if(p.length){
            //     let lyricTime = [];
            //     for(let  i = 0; i < p.length; i++){
            //         lyricTime.push(p[i].dataset.time);
            //     }
            //     this.props.playInfo({
            //         lyricTime: lyricTime,
            //         startTop: this.startTop(p)
            //     })
            // }
        }
    }
    // 获取每一行歌词的高度
    startTop(list){
        let style,height;
        let total = [];
        for(let i = 0; i < list.length; i++){
            style = window.getComputedStyle(list[i],null) || list[i].currentStyle;
            height = +style.height.split('px')[0];
            total.push(height);
        }
        return total;
    }

    // 计算当前滚动总高度
    totalTop(i){
        let num = 0;
        let arr = this.props.info.startTop;
        for(let j = 0; j < i; j++){
            num += arr[j];
        }
        return num;
    }


    componentDidMount(){
        // 动画

        this.ring(-0.5)

    }
    ring(position){
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,30,30);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#3eedef';
        ctx.arc(15,15,11,-Math.PI / 2,Math.PI * position);
        ctx.stroke();
    }



    play_pause(){

        let status = this.props.info.play;
        if(status){
            this.refs.audio.pause();
        }else{
            this.refs.audio.play();
        }
        this.props.playInfo({
            play: !status
        })
    }
    render(){
        let info = this.props.info;
        let status = info.play;
        let path = {
            pathname: '/playInterface',
            target: this.refs.audio
        };
        return(
            <div className="bottom_player" style={{display: info.isShow ? 'block' : 'none'}}>
                <div className="play_img">
                    <Link to= {path}>
                        <img src={info.picUrl} alt=""/>
                    </Link>
                </div>
                <audio src={info.url || require('../source/qiansixi.mp3')} ref="audio" onTimeUpdate={() => {this.song()}}>
                </audio>
                <div className="play_message">
                    <Link to= {path}>
                        <div className="song_name">{info.name}</div>
                        <div className="singer_ar">{info.singer}</div>
                    </Link>
                </div>

                <div className="play_pause" onClick={() => {this.play_pause()}}>
                    {/*播放进度*/}
                    <canvas ref="canvas" id = "canvas" width='30' height='30'>
                        can't support canvas!
                    </canvas>
                    <i className="material-icons" style={{display: status ?  'none' : 'block' }}>play_circle_outline</i>
                    <i className="material-icons" style={{display: status ?  'block': 'none'}}>pause_circle_outline</i>
                </div>
            </div>
        )
    }
}

function time_show(time){
    if(time){
        let minutes = Math.floor(time/1000/60);
        let seconds = Math.floor(time/1000 - minutes*60);
        minutes = minutes >= 10 ? minutes : '0' + minutes;
        seconds = seconds >= 10 ? seconds : '0' + seconds;
        return minutes + ':' + seconds;
    }else{
        return '00:00';
    }

}