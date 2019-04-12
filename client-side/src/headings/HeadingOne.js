import React, { Component } from 'react';
import './HeadingOne.css';

class HeadingOne extends Component {
    constructor(props) {
        super(props);
        this.style = {
            margin: this.props.margin || "inherit"
        }
    }
    render() {
        return (
            <div className="HeadingOne" style={this.style}>{this.props.text}</div>
        );
    }
}

export default HeadingOne;