import React from 'react'
import './playinterface.css'
import * as Actions from '../../actions/index'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as fetch from '../../fetch/index'

class PlayInterface extends React.Component{
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

        this.props.actions.playInfo({
            isShow: false
        });
    }


    componentDidMount(){
        console.log(this.props);
        console.log(fetch);
        fetch.lyric(this.props.info.id).then(res => {
            res.json().then(response => {
                if(response.nolyric){
                    this.props.actions.playInfo({
                        lyric: [{
                            lyric: '纯音乐，请欣赏',
                            time: '[00:00:00]'
                        }]
                    })
                }else{
                    this.lyricFormat(response.lrc.lyric);
                    console.log(response);
                }
            })
        })

    }
    lyricFormat(lyric){
        if(lyric){
            // 匹配时间(数组)(时间包含毫秒)
            let reg = new RegExp(/\[.{8,9}\]/);
            let newReg = new RegExp(/\[.{2}\:.{2}\]/); //时间只包含分秒，包括冒号只有五位
            // newLyr(数组)(包含时间和歌词);
            let newLyr = lyric.split(/\n/);
            newLyr.splice(newLyr.length - 1,1);//删除最后一段多余  最后一段似乎可不删除？
            // 匹配了时间之后新的歌词
            // 处理时间只有五位的歌词
            for(let i = 0; i < newLyr.length; i++){
                if(newReg.test(newLyr[i])){
                    newLyr[i] = '[' + newLyr[i].split(/\[|\]/)[1] + '.00]' + newLyr[i].split(/\[|\]/)[2]
                }
            }
            for(let i = 0; i < newLyr.length; i++){
                if(!reg.test(newLyr[i])){
                    newLyr[i] = '[00:00:00]' + newLyr[i];
                }
            }
            let newLyric = newLyr.join('\n');
            let lastTime = newLyric.match(/\[.{8,9}\]/g);
            let lastLyric = newLyric.split(reg);
            lastLyric.splice(0,1);
            lastTime.push(time_show(this.props.info.time));
            lastLyric.push('');
            let lyricInf = [];
            for(let i = 0; i < lastTime.length; i++){
                lyricInf.push({
                    time: lastTime[i],
                    lyric: lastLyric[i]
                })
            }
            this.props.actions.playInfo({
                lyric: lyricInf
            })
        }
    }

    componentWillUnmount(){
        // 离开组件之后底部播放栏重新开始显示
        this.props.actions.playInfo({
            isShow: true
        });
    }
    // 修改播放状态
    play(){
        let state = this.props.info;
        let playInfo = this.props.actions.playInfo;
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
    }
    // 返回上一级
    back(){
        window.history.go(-1);
    }


    render(){
        let state = this.props.info;
        console.log(state);
        let playInfo = this.props.actions.playInfo;
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
                                {
                                    this.props.info.lyric ?
                                        this.props.info.lyric.map((item,index) => {
                                            return <p key={index} data-time={item.time.slice(1,6)} className={index === this.props.info.cur ? 'line_lyric show':'line_lyric'}>{item.lyric}</p>
                                        }) : ''
                                }
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
                        <span className="played_time">{time_show(state.currentTime*1000)}</span>
                        <div className="rate" ref="pro_bar_w">
                            <div className="buffer" >
                                {/*{time_show(this.state.buffer)}*/}
                            </div>
                            <div className="played" >
                            </div>
                        </div>
                        <span className="total_time">{time_show(state.time)}</span>

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

function mapStateToProps(state){
    return {
        info: state.playInfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayInterface)

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