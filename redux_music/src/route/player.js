import React from 'react'
import './player.css'
import {Link} from 'react-router-dom'
export default class Player extends React.Component{

    play_pause(){
        if(this.props.status){
            this.refs.audio.pause();
        }else{
            this.refs.audio.play();
        }
        this.props.statu();
    }

    song(e){
        let audio = e.target;
        if(audio.ended){
           this.props.statu();
        }
    }

    render(){
        console.log(this.props);
        let info = this.props.info;
        let status = this.props.status;
        console.log(info);
        return(

                <div className="bottom_player" >
                    <div className="play_img">
                        <Link to='/playInterface'>
                            <img src={info.picUrl} alt=""/>
                        </Link>
                    </div>

                    <audio src={info.url} ref="audio" onTimeUpdate={(e) => {this.song(e)}}>

                    </audio>
                    <div className="play_message">
                        <Link to='/playInterface'>
                            <div className="song_name">{info.name}</div>
                            <div className="singer_ar">{info.singer}</div>
                        </Link>
                    </div>

                    <div className="play_pause" onClick={() => {this.play_pause()}}>
                        <i className="material-icons" style={{display: status ?  'none' : 'block' }}>play_circle_outline</i>
                        <i className="material-icons" style={{display: status ?  'block': 'none'}}>pause_circle_outline</i>
                    </div>
                </div>


        )
    }
}