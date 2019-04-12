import React, { Component } from 'react';
import './RefWrapper.css';

class RefWrapper extends Component {
    constructor(props) {
        super(props);
        this.childNode = React.createRef();
    }
    getWidth() {
        return this.childNode.current.offsetWidth;
    }
    movePosition(x) {
        this.childNode.current.style.right = (x + "px");
        return x;
    }
    render() {
        return (
            <div
                ref={this.childNode}
                className={"RefWrapper " + (this.props.className || "")}>
                {this.props.elements}
            </div>
        );
    }
}

export default RefWrapper;
