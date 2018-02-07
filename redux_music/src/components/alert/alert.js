import React from 'react'
import './alert.css'

export default class AlertTips extends React.Component{
    render(){
        return(
            <div className="alert" style={{display: this.props.alertShow ? 'block' : 'none'}}>
                <div className="alert_red">{this.props.word}</div>
            </div>
        )
    }
}