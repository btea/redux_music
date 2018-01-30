import React from 'react'
import './classify.css'
import {SongDetail,ArtistDetail,AlbumDetail,PlayListDetail,MvDetail,DjRadioDetail,UserProfileDetail} from './detail'
import {Spin} from 'antd'

// 单曲
export class Songs extends React.Component{
    render(){
        let songs = this.props.songs;
        return <div className="songs">
            {
                songs.map((item,index) => {
                    return <SongDetail item={item} key={index} action={this.props.action} id={item.id}/>
                })
            }
        </div>
    }
}
// 专辑
export class Albums extends React.Component{
    render(){
        let albums = this.props.albums;
        return <div className='albums'>
            {
                albums ? albums.map((item,index) => {
                    return <AlbumDetail key={index} albums={item}/>
                }) : <div className="spin"><Spin/></div>
            }
        </div>
    }
}
// 歌手
export class Artists extends React.Component{
    render(){
        let artists = this.props.artists;
        return <div className="artists">
            {
                artists ? artists.map((item,index) => {
                    return <ArtistDetail key={index} artists={item}/>
                }) : <div className="spin"><Spin /></div>
            }
        </div>
    }
}
// 歌单
export class PlayLists extends React.Component{
    render(){
        let playlists = this.props.playlists;
        return <div className="playlists">
            {
                playlists ? playlists.map((item,index) => {
                    return <PlayListDetail key={index} playlists={item}/>
                }) : <div className="spin"><Spin /></div>
            }
        </div>
    }
}
export class UserProfiles extends React.Component{
    render(){
        let userprofiles = this.props.userprofiles;
        return <div className="userprofiles">
            {
                userprofiles ? userprofiles.map((item,index) =>{
                    return <UserProfileDetail key={index} user={item}/>
                }) : <div className="spin"><Spin/></div>
            }
        </div>
    }
}
// mv和视屏并不是同一个接口
export class Mvs extends React.Component{
    render(){
        let mvs = this.props.mvs;
        return <div className="mvs">
            {
                mvs ? mvs.map((item,index) => {
                    return <MvDetail key={index} mvs={item}/>
                }) : <div className="spin"><Spin /></div>
            }
        </div>
    }
}
export class DjRadios extends React.Component{
    render(){
        let radios = this.props.djradios;
        return <div className="radios">
            {
                radios ? radios.map((item,index) => {
                    return <DjRadioDetail key={index} radios={item}/>
                }) : <div className="spin"><Spin/></div>
            }
        </div>
    }
}