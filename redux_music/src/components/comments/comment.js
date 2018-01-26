import React from 'react'
import SingleComment from './singleComment'
import * as fetch  from '../../fetch/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions/index'
import './comment.css'
import {Spin} from 'antd'

class Comment extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         comments: this.props.comments,
    //         hotComments: this.props.comments.hotComments, /*热评*/
    //         commentList: this.props.comments.comments, /*所有评论*/
    //         id: this.props.id,
    //         offset: 20, /*每页评论的数量*/
    //         page: 0, /*页数*/
    //         isMore: true, /*是否还有更多评论*/
    //         isObtain: false, /**是否继续加载**/
    //         loading: false, /* 加载动画*/
    //         bgImg: this.props.bgImg /*封面*/
    //     }
    // }

    obtain(){
        if(this.props.comments.more){
            let id = this.props.comments.id;
            let page = this.props.comments.page;
            this.props.actions.comments({
                loading: true
            });
            fetch.comment(id,page).then(res => {
                res.json().then(response => {
                    let list = {
                        comments: this.props.comments.comments.concat(response.comments),
                        page: page +1,
                        loading: false,
                        more: response.more
                    };
                    this.props.actions.comments(list);
                    // console.log(response);
                })
            })
        }else{
            alert('没有更多评论了');
        }
    }

    componentDidMount(){
        // 滚动加载
        window.addEventListener('scroll',() => {
            let target = this.refs.comment_list;
            if(target){
                let style = window.getComputedStyle(target,null) || target.currentStyle;
                let height = +style.height.split('px')[0];
                let viewHeight = document.documentElement.clientHeight;
                let scrollTop = document.documentElement.scrollTop;
                // 最大值40
                if(scrollTop + viewHeight - height >= 30){
                    this.obtain();
                }
            }

        })
    }
    back(){
        window.history.go(-1);
    }
    render(){
        let comment = this.props.comments;
        if(comment){
            return(
                <div className="comment_list" ref="comment_list">
                    <div className="header">
                        <i className="material-icons back" onClick={() => this.back()}>arrow_back</i>
                        <span>评论({comment.total})</span>
                    </div>
                    <p className="hot_comment_title">精彩评论</p>
                    <ul className="hot_comment">
                        {
                            comment.hotComments.map((item,index) => {
                                return <SingleComment info={item} key={index}/>
                            })
                        }
                    </ul>
                    <p className="new_comment">最新评论</p>
                    <ul className="all_comment">
                        {
                            comment.comments.map((item,index) => {
                                return <SingleComment info={item} key={index}/>
                            })
                        }
                    </ul>
                    <div className="refresh" style={{display: comment.loading ? 'block' : 'none'}}>
                        <i className="material-icons">refresh</i>
                    </div>
                </div>
            )
        }else{
            return(
                    <div className="spin">
                        <Spin />
                    </div>
                )

        }
    }
}

function mapStateToProps(state) {
    return{
        comments: state.comments
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Comment)