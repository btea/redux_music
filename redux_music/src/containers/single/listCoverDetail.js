import React from 'react'
import './index.css'

export default class ListCoverDetail extends React.Component{
    render(){
        let info = this.props.info;
        let state = this.props.state;
        if(info){
            return(
                <div className="list_detail" style={{display: state ? 'block' : 'none'}} onClick={this.props.listCover}>
                    <i className="material-icons">clear</i>
                    <div className="cover">
                        <img src={info.coverImgUrl} alt=""/>
                    </div>
                    <div className="list_name">
                        {info.name}
                    </div>
                    <hr/>
                    <div className="description">
                        {info.description}
                    </div>
                    <div className="tags">
                        <span className="tag_name">标签：</span>
                        {
                            info.tags.map((item,index) => {
                                return <span className="tag_" key={index}>{item}</span>
                            })
                        }
                    </div>
                    <div className="download_cover">
                        <span className="load">保存图片</span>
                        {/*<a href={info.coverImgUrl} download={ '图片' + format(info.coverImgUrl)}>保存封面</a>*/}
                    </div>
                </div>
            )
        }else{
            return(
                <div>loading...</div>
            )
        }

    }
}

// 获取图片格式
function format(url){
    let index = url.lastIndexOf('.');
    let formatStr = url.slice(index);
    return formatStr;
}