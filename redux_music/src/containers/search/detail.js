import React from 'react'
import * as fetch from '../../fetch/index'
import {Link} from 'react-router-dom'

// 单曲
export class SongDetail extends React.Component{
    play(){
        let id = this.props.id;
        let target = this.props.item;
        fetch.songDetail(id).then(res => {
            res.json().then(response => {
                let data = response.data[0].url;
                if(data){
                    this.props.action.playInfo({
                        picUrl: target.al.picUrl,
                        url: data,
                        name: target.name,
                        singer: target.ar[0].name,
                        play: true,
                        time: target.dt,
                        id: id,
                        lyricTime: null,
                        lyric: null,
                        cur: 0
                    })
                }else{
                    this.props.action.alert();
                    setTimeout(() => {
                        this.props.action.alert()
                    },2000)
                }
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

// 歌单
export class PlayListDetail extends React.Component{
    render(){
        let playlists = this.props.playlists;
        return(
            <Link to={'/single/' + playlists.id}>
                <div className="single_playlist" data-id={playlists.id}>
                    <div className="avatar">
                        <img src={playlists.coverImgUrl} alt=""/>
                    </div>
                    <div className="name_creator">
                        <div className="name">{playlists.name}</div>
                        <div className="creator_count">
                            <span className="count">{playlists.trackCount}首</span>
                            <span className="creator">by{playlists.creator.nickname},</span>
                            <span className="playCount">播放{playCount(playlists.playCount)}次</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
// 视屏  视屏和mv？？？？？
export class MvDetail extends React.Component{
    render(){
        let mvs = this.props.mvs;
        return <div className="single_mv">
            <div className="cover">
                <img src={mvs.cover} alt=""/>
                <span className="count">{playCount(mvs.playCount)}</span>
            </div>
            <div className="name_duration">
                <div className="name">
                    <span className="mv">MV</span>
                    <span className="mv_name">{mvs.name}</span>
                </div>
                <div className="duration">
                    <span className="time">{duration(mvs.duration)}</span>
                    <span className="artist">{mvs.artistName}</span>
                </div>
            </div>
        </div>
    }
}

// 主播电台
export class DjRadioDetail extends React.Component{
    render(){
        let radios = this.props.radios;
        return <div className="single_radio">
            <div className="avatar">
                <img src={radios.picUrl} alt=""/>
            </div>
            <div className="name_nick">
                <div className="name">{radios.name}</div>
                <div className="nickname">{radios.dj.nickname}</div>
            </div>
        </div>
    }
}
// 用户
export class UserProfileDetail extends React.Component{
    render(){
        let user = this.props.user;
        return (
            <Link to={"/userInfo/" + user.nickname}>
                <div className="single_user">
                    <div className="avatar">
                        <img src={user.avatarUrl} alt=""/>
                    </div>
                    <div className="name_signature">
                        <div className="nickname">
                            <span className="name">{user.nickname}</span>
                            <span className="gender">{user.gender === 1 ? '男' : '女'}</span>
                        </div>
                        <div className="signature">{user.signature}</div>
                    </div>
                </div>
            </Link>
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
// 播放量
function playCount(count){
    if(count < 100000){
        return count;
    }else{
        return Math.round(count / 10000) + '万';
    }
}
// 时长
function duration(_duration){
    if(_duration < 60000){
        return '00:' + Math.floor(_duration/1000);
    }else{
        let minute = Math.floor(_duration / 1000 / 60);
        let second = Math.floor((_duration - minute * 60 *1000)/1000);
        let _minute = minute >= 10 ? minute : "0" + minute;
        let _second = second >= 10 ? second : "0" + second;
        return _minute + ':' + _second;
    }
}