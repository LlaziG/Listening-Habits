import React, { Component } from 'react';
import './LoginButton.css';

class LoginButton extends Component {
    render() {
        return (
            <div className="Button" onClick={this.props.clickAction}>
                <img src={this.props.img} alt="Spotify Logo" />
                <span>{this.props.text}</span>
            </div>
        );
    }
}

export default LoginButton;
