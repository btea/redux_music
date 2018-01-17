import React from 'react'
import * as fetch from '../../fetch/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions/index'
import {Link} from 'react-router-dom'
import './index.css'
import ListCoverDetail from './listCoverDetail'

class Single extends React.Component{
    componentDidMount(){
        let listid = this.props.match.params.listid;
        fetch.songList(listid).then(res => {
            res.json().then(response => {
                this.props.actions.songlist(response.playlist);
            })
        })
    }

    render(){
        console.log(this.props);
        let list = this.props.list;
        if(list){
            return(
                <div className="playlist_detail">
                    <header>
                        <Link to='/'>
                            <span className="back">
                                  <i className="material-icons">arrow_back</i>
                            </span>
                        </Link>
                        <span className="message">
                           {list.description}
                        </span>
                        <span className="play_list_song_search">
                            <i className="material-icons">search</i>
                        </span>
                    </header>
                    <div className="container">
                        <div className="container_header">
                            <div className="detail_cover">
                                <div className="cover_img_playCount" onClick={this.props.actions.listCover}>
                                    <img src={list.coverImgUrl} alt=""/>
                                    <span className="count">
                                        <i className="material-icons">headset</i>
                                        <span className="play_count">{playCount(list.playCount)}</span>
                                    </span>
                                </div>
                                <div className="name_creator">
                                    <h1 className="name">{list.name}</h1>
                                    <div className="creator">
                                        <img className="avatar" src={list.creator.avatarUrl} alt=""/>
                                        <span className="creator_name">{list.creator.nickname}</span>
                                        <i className="material-icons">chevron_right</i>
                                    </div>
                                </div>
                            </div>



                        </div>

                    </div>
                    <ListCoverDetail info={list.creator}/>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }

    }
}
// playCount
function playCount(count){
    if(count < 100000){
        return count;
    }else{
        return Math.floor(count / 100000) + '万';
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