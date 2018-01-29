import React from 'react'
import './classify.css'
import {SongDetail,ArtistDetail} from './detail'
import {Spin} from 'antd'
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
export class Albums extends React.Component{
    render(){
        return <div>专辑</div>
    }
}
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
export class PlayLists extends React.Component{
    render(){
        return <div>歌单</div>
    }
}
export class UserProfiles extends React.Component{
    render(){
        return <div>用户</div>
    }
}
export class Mvs extends React.Component{
    render(){
        return <div>视屏</div>
    }
}
export class DjRadios extends React.Component{
    render(){
        return <div>主播电台</div>
    }
}