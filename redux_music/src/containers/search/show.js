import React from 'react'
import {Songs,Albums,Artists,PlayLists,UserProfiles,Mvs,DjRadios} from "./classify"

export default class Show extends React.Component{

    render(){
        let info = this.props._list;
        switch (info.search_type){
            case "1":
                return <Songs songs={info.songs} action={this.props.action}/>;
            case "10":
                return <Albums albums={info.albums}/>;
            case "100":
                return <Artists artists={info.artists}/>;
            case "1000":
                return <PlayLists playlists={info.playlists}/>;
            case "1002":
                return <UserProfiles userprofiles={info.userprofiles}/>;
            case "1004":
                return <Mvs mvs={info.mvs}/>;
            case "1009":
                return <DjRadios djradios={info.djRadios}/>;
            default:
                return <div></div>
        }
    }
}