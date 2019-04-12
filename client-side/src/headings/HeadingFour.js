import React, { Component } from 'react';
import './HeadingFour.css';

class HeadingFour extends Component {
    constructor(props) {
        super(props);
        this.style = {
            margin: this.props.margin || "inherit",
            textDecoration : !this.props.active && "line-through",
            opacity : !this.props.active && 1
        }
    }
    render() {
        return (
            <div className="HeadingFour" style={this.style}>{this.props.text}</div>
        );
    }
}

export default HeadingFour;