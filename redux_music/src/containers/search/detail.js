import React from 'react'
import * as fetch from '../../fetch/index'

// 单曲
export class SongDetail extends React.Component{
    play(){
        let id = this.props.id;
        let target = this.props.item;
        fetch.songDetail(id).then(res => {
            res.json().then(response => {
                this.props.action.playInfo({
                    picUrl: target.al.picUrl,
                    url: response.data[0].url,
                    name: target.name,
                    singer: target.ar[0].name,
                    play: true,
                    time: target.dt,
                    id: id,
                    lyricTime: null,
                    lyric: null,
                    cur: 0
                })
            })
        })

    }
    render(){
        let item = this.props.item;
        return(
                <div className="single_song" onClick={() => {this.play()}}>
                    <div className="singer_name">
                        <div className="song_name">{item.name}</div>
                        <div className="singer_ar">{item.ar[0].name + '-' + item.al.name}</div>
                    </div>
                    <div className="icon">
                        <i className="material-icons">more_vert</i>
                    </div>
                </div>
        )
    }
}
// 歌手
export class ArtistDetail extends React.Component{
    render(){
        let artist = this.props.artists;
        console.log(artist);
        return(
            <div className="single_artist">
                <div className="avatar">
                    <img src={artist.img1v1Url} alt=""/>
                </div>
                <div className="name">
                    {artist.name}
                </div>
            </div>
        )
    }
}
// 专辑
export class AlbumDetail extends React.Component{
    render(){
        console.log(this.props);
        let albums = this.props.albums;
        return (
            <div className="single_album">
                <div className="avatar">
                    <img src={albums.picUrl} alt=""/>
                </div>
                <div className="name_time">
                    <div className="name">{albums.name}</div>
                    <div className="artist_time">
                        <span className="artist">{albums.artist.name}</span>
                        <span className="time">{time(albums.publishTime)}</span>
                    </div>
                </div>
            </div>
        )
    }
}

function time(t){
    let _time = new Date(t);
    let year = _time.getFullYear();
    let month = _time.getMonth() + 1;
    let date = _time.getDate();
    return year + '.' + month + '.' + date;
}