import React, { Component } from 'react';
import './HeadingTwo.css';

class HeadingTwo extends Component {
    constructor(props) {
        super(props);
        this.style = {
            margin: this.props.margin || "inherit"
        }
    }inherit
    render() {
        return (
            <div className="HeadingTwo" style={this.style}>{this.props.text}</div>
        );
    }
}

export default HeadingTwo;