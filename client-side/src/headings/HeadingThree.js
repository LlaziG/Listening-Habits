import React, { Component } from 'react';
import './HeadingThree.css';

class HeadingThree extends Component {
    constructor(props) {
        super(props);
        this.style = {
            margin: this.props.margin || "inherit"
        }
    }
    render() {
        return (
            <div className="HeadingThree" style={this.style}>{this.props.text}</div>
        );
    }
}

export default HeadingThree;