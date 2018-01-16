import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default class PlayList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props.list);
        return(
            <div className="playlist_box">
                {
                    this.props.list.map((item,index) => {
                        return <Link to='/single' key={index}>
                            <div className="list_container" data-id={item.id}>
                                <div className="cover">
                                    <img src={item.coverImgUrl} alt=""/>
                                </div>
                                <div className="playCount">
                                    <i className="material-icons">headset_mic</i>
                                </div>
                                <div className="description">
                                    {item.name}
                                </div>
                            </div>
                        </Link>
                    })
                }
            </div>
        )
    }
}