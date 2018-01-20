import React from 'react'
import './playinterface.css'
export default class PlayInterface extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            state: this.props.location.state,
            playInfo: this.props.location.fun
        }
    }
    // 播放界面需要用到的数据
    // 已经缓冲的进度
    // 已经播放的进度/当前时间
    // 音乐总时长
    // 音频的地址
    // 音频的封面
    // 音频的id
    // 进度条长度
    // ...
    componentWillMount(){

        this.props.location.fun({
            isShow: false
        });
    }


    componentDidMount(){


    }

    componentWillUnmount(){
        // 离开组件之后底部播放栏重新开始显示
        this.props.location.state.fun({
            isShow: true
        });
    }
    // 修改播放状态
    play(){
        let state = this.props.location.state;
        let playInfo = this.props.location.fun;
        let audio = this.props.location.target;
        if(state.play){
            audio.pause();
            playInfo({
                play: false
            })
        }else{
            audio.play();
            playInfo({
                play: true
            })
        }
        // console.log(state.play);
        // console.log(playInfo);
        // console.log(this.props);
        // console.log(this.props.location.state)
        // console.log(this.props.location.fun)
    }


    // 返回上一级
    back(){
        window.history.go(-1);
    }
    render(){
        // console.log(this.props.location);
        let state = this.props.location.state;
        let playInfo = this.props.location.fun;
        return(
            <div>
                <div className="single_music">
                    <header className="back">
                        <i className="material-icons" onClick={() => {this.back()}}>arrow_back</i>
                        <div className="name">{state.name}</div>
                        <div className="arname">{state.singer}</div>
                    </header>

                    {/*播放动画*/}
                    <div className="container" ref='container'>
                        <i className="material-icons volume" style={{zIndex: state.lyricShow ? 1 : 0}}>volume_up</i>
                        <div className="volume_bar" style={{zIndex: state.lyricShow ? 1 : 0}}>
                            <div className="current_volume"  style={{width: state.volume*100 + '%'}}></div>
                            <div className="dot"></div>
                        </div>
                        <div className="lyric" style={{zIndex: state.lyricShow ? 1 : 0}}>
                            <div className="lyric_show" style={{top: state.top + 'px'}} >
                                {/*{*/}
                                    {/*this.state.lyric.map((item,index) => {*/}
                                        {/*return <p key={index} data-time={item.time.slice(1,6)} className={index === this.state.cur ? 'line_lyric show':'line_lyric'}>{item.lyric}</p>*/}
                                    {/*})*/}
                                {/*}*/}
                            </div>
                        </div>
                        <div className="bg_animation" style={{zIndex: state.lyricShow ? 0 : 1}} >
                            {/*<img src={state.picUrl} alt="" style={{animationPlayState: pause}} />*/}
                            <div className="download_dis_icon" style={{display: state.lyricShow ? 'none' : 'block'}}>
                                <i className="material-icons" style={{display: state.favorite ? 'inline-block': 'none'}} >favorite</i>
                                <i className="material-icons" style={{display: state.favorite ? 'none' : 'inline-block'}} >favorite_border</i>
                                <i className="material-icons" >arrow_downward<a ref="download"></a></i>
                                <span className="comment">
                                    <i className="material-icons" >message</i>
                                    <span className="total">{state.commentTotal > 999 ? '999+' : state.commentTotal > 99 ? '99+' : state.commentTotal}</span>
                                </span>
                                <i className="material-icons">more_vert</i>
                            </div>
                        </div>

                    </div>
                    {/*播放进度条*/}
                    <footer className="progress_bar">
                        <span className="played_time">{time_show(state.played)}</span>
                        <div className="rate" ref="pro_bar_w">
                            <div className="buffer" >
                                {/*{time_show(this.state.buffer)}*/}
                            </div>
                            <div className="played" >
                            </div>
                        </div>
                        <span className="total_time">{time_show(state.duration)}</span>

                        <div className="button_list">
                            <div className="per">
                                <i className="material-icons">skip_previous</i>
                            </div>
                            <div className="play_pause" onClick={() => {this.play()}}>
                                <i className="material-icons" style={{display: state.play ? 'block':'none'}}>pause</i>
                                <i className="material-icons" style={{display: state.play ? 'none':'block'}}>play_arrow</i>
                            </div>
                            <div className="next">
                                <i className="material-icons">skip_next</i>
                            </div>
                        </div>
                    </footer>
                </div>
                {/*<div className="comments_show" style={{display: state.commentShow ? 'block' : 'none'}}>*/}
                    {/*<Comment comments={this.state.comments} commentState={this.commentStatus.bind(this)} id={this.props.location.state.id} bgImg={this.props.location.state.picUrl}/>*/}
                {/*</div>*/}
            </div>
        )

    }
}

// 播放进度
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