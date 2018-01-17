import React from 'react'

export default class SongList extends React.Component{
    render(){
        console.log(this.props);
        let listInfo = this.props.list;
        return(
            <div className="song_list">
                <div className="total"></div>
                <ul className="list_show">
                    {
                        listInfo ?  listInfo.map((item,index) => {
                            return <li key={index}>{item}</li>
                        }) : <div>loading...</div>
                    }
                </ul>
            </div>
        )
    }
}