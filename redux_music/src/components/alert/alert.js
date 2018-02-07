import React from 'react'
import './alert.css'

export default class AlertTips extends React.Component{
    render(){
        console.log(this.props);
        return <div className="alert red">{this.props.word}</div>
    }
}