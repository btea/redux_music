import React from 'react'

import * as fetch from '../../fetch/index'
import './search.css'

import {connect} from 'react-redux'
import * as Actions from '../../actions/index'
import {bindActionCreators} from 'redux'

class Search extends React.Component{



    _search(e){
        let word;
        if(e){
            word = e.target.innerText;
        }else{
            let _word = this.refs.keyword.value;
            word = _word.replace(/^\s+ | \s$/g,'');
        }
        if(word){
                fetch.search(this.props.list.search_type,word).then(res => {
                    res.json().then(response => {
                        let songs = response.result.songs;
                        console.log(response);
                    })
                })
        }
    }


    // 退回上一页
    back(){
        window.history.go(-1);
    }


    render(){
        console.log(this.props);
        let list = this.props.list;
        return(
            <div className="search_index">
                <div className="input_search">
                    <i className="material-icons" onClick={() => {this.back()}}>arrow_back</i>
                    <input type="text" autoFocus className="search_word" placeholder="带你走入音乐世界" ref='keyword'/>
                    <i className="material-icons" onClick={() => {this._search()}}>search</i>
                </div>
                <div className="search_word_list" style={{display: list.isSearch ? 'none': 'block'}}>
                    <p className="word">关键词搜索</p>
                    {
                        list.words.map((item,index) => {
                            return <span className="single_word" key={index} onClick={(e) => {this._search(e)}}>{item}</span>
                        })
                    }
                </div>
                {/*<div className="playlist_show" style={{display: list.isSearch? 'block': 'none'}}>*/}
                    {/*{*/}
                        {/*switch(list.type){*/}
                            {/**/}
                        {/*}*/}
                    {/*}*/}
                {/*</div>*/}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        list: state.search
    }
}
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search)