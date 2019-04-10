import React, { Component } from 'react';
import './HeadingText.css';

class HeadingText extends Component {
    constructor(props) {
        super(props);
        this.styles = {
            "fontSize": this.props.fontSize || "1em",
            "color": this.props.color || "white",
            "fontFamily": this.props.fontFamily || "inherit",
            "display": this.props.inline || "block",
            "textTransform": this.props.textTransform || "inherit",
            "letterSpacing": this.props.letterSpacing || "0",
            "opacity": this.props.opacity || "1",
            "margin": this.props.margin || "inherit"
        }
    }
    render() {
        return (
            <div style={this.styles}>{this.props.text}</div>
        );
    }
}

export default HeadingText;