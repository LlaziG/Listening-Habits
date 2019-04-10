import React, { Component } from 'react';
import './Thumbnail.css';

class Thumbnail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="thumbnail">
                <img className="blur" src={this.props.img} />
                <img className="image" src={this.props.img} />
                <div className="ring"></div>
                <div className="ring ringOuter"></div>
            </div>
        );
    }
}

export default Thumbnail;