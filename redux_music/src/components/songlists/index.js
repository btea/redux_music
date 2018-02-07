import React from 'react'
import './index.css'
import SongTemplate from './songTemplate'
import {Spin} from 'antd'



export default class SongList extends React.Component{
    componentDidMount(){
        let lists = [];
        let list = this.props.list;
        for(let i = 0; i < list.length; i++){
            lists.push(list[i]);
        }
        this.props.play({
            lists: lists
        });
    }
    render(){
        let listInfo = this.props.list;
        return(
            <div className="song_list">
                <div className="total">
                    <div className="icon_total">
                        <i className="material-icons">play_circle_outline</i>
                        <span className="total_num">
                            播放全部
                            <i className="num">{'(共' + listInfo.length + '首)'}</i>
                        </span>
                    </div>
                    <div className="more_list">
                        <i className="material-icons">list</i>
                        <span>多选</span>
                    </div>
                </div>
                <ul className="list_show">
                    {
                        listInfo ?  listInfo.map((item,index) => {
                            return <SongTemplate item = {item} key={index} index={index} play={this.props.play} />
                        }) : <div className="spin"><Spin /></div>
                    }
                </ul>

            </div>
        )
    }
}