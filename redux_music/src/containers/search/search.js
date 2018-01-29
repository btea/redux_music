import React from 'react'

import * as fetch from '../../fetch/index'
import './search.css'
import  Show from './show'
import {connect} from 'react-redux'
import * as Actions from '../../actions/index'
import {bindActionCreators} from 'redux'
import {Spin} from 'antd'

class Search extends React.Component{


    // 搜索，搜索类型切换
    _search(e){
        let word,list = this.props.list,classify,search_type;
        if(e && e.target.className === 'single_word'){
            word = e.target.innerText;
            this.refs.keyword.value = word;
        }else{
            let _word = this.refs.keyword.value;
            word = _word.replace(/^\s+ | \s$/g,'');
        }
        if(word){
            this.props.action.search({
                isSearch: true
            });
            if(e && e.target.getAttribute('type')){
                search_type = e.target.getAttribute('type');
                this.props.action.search({
                    search_type: search_type
                });
                classify = list.type[search_type];
            }else{
                search_type = list.search_type;
                classify = list.type[list.search_type];
            }

            fetch.search(search_type,word).then(res => {
                res.json().then(response => {
                    console.log(response);
                    let songs = response.result[classify];
                    let obj = {isSearch: true};
                    obj[classify] = songs;
                    console.log(obj);
                    this.props.action.search(obj);
                })
            })
        }
    }
    // 退回上一页
    back(){
        window.history.go(-1);
    }


    render(){
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
                <div className="lists_show" style={{display: list.isSearch? 'block': 'none'}}>
                    <header className="nav">
                        <div className="classify">
                            <span className="songs" type="1" onClick={(e) => {this._search(e)}}>单曲</span>
                            <span className="artists" type="100" onClick={(e) => {this._search(e)}}>歌手</span>
                            <span className="albums" type="10" onClick={(e) => {this._search(e)}}>专辑</span>
                            <span className="playlists" type="1000" onClick={(e) => {this._search(e)}}>歌单</span>
                            <span className="mvs" type="1004" onClick={(e) => {this._search(e)}}>视频</span>
                            <span className="djRadios" type="1009" onClick={(e) => {this._search(e)}}>主播电台</span>
                            <span className="userprofiles" type="1002" onClick={(e) => {this._search(e)}}>用户</span>
                        </div>
                    </header>
                </div>
                {
                    list.isSearch ?  list.songs ?  <Show _list={list} action={this.props.action}/> : <div className="spin"> <Spin/></div> : ''
                }
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