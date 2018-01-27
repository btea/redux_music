import React from 'react'
import {Link} from 'react-router-dom'

export default class List extends React.Component{
    render(){
        // console.log(this.props);
        let list = this.props.item;
        return(
            <Link to={'/single/' + list.id}>
                <li className="user_song_list">
                    <div className="cover">
                        <img src={list.coverImgUrl} alt=""/>
                    </div>
                    <div className="show_info">
                        <div className="name">{list.name}</div>
                        <div className="counts">
                            <span className="count">{list.trackCount}首,</span>
                            <span className="play_count">播放{list.playCount}次</span>
                        </div>
                    </div>
                </li>
            </Link>
        )
    }
}