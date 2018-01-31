import React from 'react'
import * as fetch from '../../fetch/index'

export default class SongTemplate extends React.Component{
    // 点击的时候播放
    playStart(){
        console.log(this.props);
        let target = this.props.item;
        fetch.songDetail(target.id).then(res => {
            res.json().then(response => {
                let h = this.props.item.containerHeight;
                let play = response.data[0];
                this.props.play({
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
                    playIndex: this.props.index
                });
            })
        })
    }

    render(){
        let item = this.props.item;
        let index = this.props.index;
        return(
                <li className="single_List" onClick={() => this.playStart()} data-id={item.id}>
                    <div className="index">
                        {/*<i className="material-icons">volume_up</i>*/}
                        {index + 1}
                    </div>
                    <div className="singer_name">
                        <div className="song_name">{item.name}</div>
                        <div className="singer_ar">{item.ar[0].name + '-' + item.al.name}</div>
                    </div>
                    <div className="icon">
                        <i className="material-icons">more_vert</i>
                    </div>
                </li>
        )
    }
}