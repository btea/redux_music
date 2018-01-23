import React from 'react'
import * as fetch from '../../fetch/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions/index'
import {Link} from 'react-router-dom'
import './index.css'
import ListCoverDetail from './listCoverDetail'
import SongList from '../../components/songlists/index'
import {Spin} from 'antd'

class Single extends React.Component{
    componentDidMount(){
        let listid = this.props.match.params.listid;
        fetch.songList(listid).then(res => {
            res.json().then(response => {
                this.props.actions.songlist(response.playlist);
            })
        });
        window.addEventListener('scroll',() => {
            let target = this.refs.header;
            if(target){
                let num = 50;
                let top = document.documentElement.scrollTop;
                let opacity = top / num;
                if(opacity <= 1){
                    target.style.opacity = 1 - opacity;
                }
            }
        })
    }
    render(){
        let list = this.props.list;
            return(
                // 阻止滚动穿透  滚动定位进一步完善？？？！！！
                <div className="playlist_detail" style={{position: this.props.status ? 'fixed' : 'relative'}}>
                    <header ref="header">
                        <Link to='/'>
                            <span className="back">
                                  <i className="material-icons">arrow_back</i>
                            </span>
                        </Link>
                        <span className="message">
                           {list ? list.description : ''}
                        </span>
                        <span className="play_list_song_search">
                            <i className="material-icons">search</i>
                        </span>
                    </header>
                    <div className="container">
                        <div className="container_header">
                            <div className="detail_cover">
                                <div className="cover_img_playCount" onClick={this.props.actions.listCover}>
                                    <img src={list ? list.coverImgUrl : ''} alt=""/>
                                    <span className="count">
                                        <i className="material-icons">headset</i>
                                        <span className="play_count">{playCount(list ? list.playCount : null)}</span>
                                    </span>
                                </div>
                                <div className="name_creator">
                                    <h1 className="name">{list ? list.name : ''}</h1>
                                    <div className="creator">
                                        <img className="avatar" src={list ? list.creator.avatarUrl : ''} alt=""/>
                                        <span className="creator_name">{list ? list.creator.nickname : ''}</span>
                                        <i className="material-icons">chevron_right</i>
                                    </div>
                                </div>
                            </div>
                            <div className="icon_list">
                                <ul className="icon">
                                    <li className="collection">
                                        <i className="material-icons">collections</i>
                                        <div className="num">{playCount(list ? list.subscribedCount : null)}</div>
                                    </li>
                                    <li className="comment">
                                        <i className="material-icons">chat</i>
                                        <div className="num">{playCount(list ? list.commentCount : null)}</div>
                                    </li>
                                    <li className="share">
                                        <i className="material-icons">share</i>
                                        <div className="num">{playCount(list ? list.shareCount : null)}</div>
                                    </li>
                                    <li className="download">
                                        <i className="material-icons">file_download</i>
                                        <div>下载</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {
                            list ? <SongList list={list.tracks} play={this.props.actions.playInfo} /> : <div className="spin">
                                <Spin />
                            </div>
                        }
                    </div>
                    <ListCoverDetail info={list} state={this.props.status} listCover={this.props.actions.listCover}/>
                </div>
            )

    }
}
// playCount
function playCount(count){
    if(count){
        if(count < 100000){
            return count;
        }else{
            return Math.floor(count / 100000) + '万';
        }
    }else{
        return '-'
    }

}
function mapStateToProps(state){
    return {
        list: state.songlist.list,
        status: state.coverStatus
    }
}
function  mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Single)