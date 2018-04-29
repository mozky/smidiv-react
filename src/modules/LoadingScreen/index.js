import React, { Component } from 'react'
import './LoadingScreen.css'

export default class LoadingScreen extends Component {
    render() {
        return (
            <div id="Loading">
                <div className="loader"></div>
            </div>
        )
    }
}