import React, { Component } from 'react';
import './ButtonHeading.css';

class ButtonHeading extends Component {
    render() {
        return (
            <div className={"ButtonHeading" + (this.props.active ? " active" : "")}>{this.props.text}</div>
        );
    }
}

export default ButtonHeading;