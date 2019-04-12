import React, { Component } from 'react';
import './Thumbnail.css';

class Thumbnail extends Component {
    constructor(props) {
        super(props);
        this.style = {
            "borderRadius": this.props.borderRadius || "none"
        }
    }
    render() {
        return (
            <div className="thumbnail" style={this.style}>
                <img className="blur" src={this.props.img} alt={"Blurred " + this.props.alt} />
                <img className="image" src={this.props.img} alt={this.props.alt} />
                <div className="ring"></div>
                <div className="ring ringOuter"></div>
            </div>
        );
    }
}

export default Thumbnail;