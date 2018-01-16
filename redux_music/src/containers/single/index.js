import React from 'react'
import * as fetch from '../../fetch/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions/index'

class Single extends React.Component{

    componentDidMount(){
        let listid = this.props.match.params.listid;
        console.log(fetch)
        fetch.songList(listid).then(res => {
            res.json().then(response => {
                this.props.actions.songlist(response.playlist)
                console.log(response)
            })
        })
    }

    render(){
        console.log(this.props);
        return(
            <div>single123</div>
        )
    }
}

function mapStateToProps(state){
    return {
        songlist: state.songlist.list
    }
}
function  mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Single)