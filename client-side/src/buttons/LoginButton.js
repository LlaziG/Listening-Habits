import React, { Component } from 'react';
import './LoginButton.css';

class LoginButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Button" onClick={this.props.clickAction}>
                <img src={this.props.img} />
                <span>{this.props.text}</span>
            </div>
        );
    }
}

export default LoginButton;
