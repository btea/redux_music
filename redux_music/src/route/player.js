import React from 'react'
import './player.css'
import {Link} from 'react-router-dom'
export default class Player extends React.Component{

    componentDidUpdate(){
        if(this.props.info.play){
            this.refs.audio.play();
        }else{
            this.refs.audio.pause();
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if(this.props.info.play !== nextProps.info.play){
    //         return true;
    //
    //     }else{
    //         return false;
    //     }
    // }

    song(){
        let time = this.props.info.time;
        let audio = this.refs.audio;
        let curTime = audio.currentTime;

        try {
            let buffered = audio.buffered.end(0);
            this.props.playInfo({
                currentTime: curTime,
                percentage: curTime * 1000 / time,
                buffered: buffered
            });
        }catch(err){
            console.log(err);
        }

        if(audio.ended){
            this.props.playInfo({
                play: false
            })
        }else{
            // console.log(this.props);
            // let percentage = curTime * 1000 / time * 2;
            this.ring(this.props.info.percentage * 2 - 0.5);
        }
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
                <audio src={info.url} ref="audio" onTimeUpdate={() => {this.song()}}>
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