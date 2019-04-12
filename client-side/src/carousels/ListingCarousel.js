import React, { Component } from 'react';
import './ListingCarousel.css';
import { RefWrapper } from '../helpers/index';

class ListingCarousel extends Component {
    constructor(props) {
        super(props);
        this.childNode = React.createRef();
        this.wrapperNode = React.createRef();
        this.elementCount = this.props.elements.props.children.length;
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }
    componentDidMount() {
        this.minPosition = this.currentPosition = 0;
        this.viewPort = this.wrapperNode.current.offsetWidth;
        this.maxPosition = this.childNode.current.getWidth() - this.viewPort;
    }
    moveLeft() {
        this.currentPosition - this.viewPort <= this.minPosition
            ? this.currentPosition = this.childNode.current.movePosition(this.minPosition)
            : this.currentPosition = this.childNode.current.movePosition(this.currentPosition - this.viewPort)

    }
    moveRight() {
        this.currentPosition + this.viewPort >= this.maxPosition
            ? this.currentPosition = this.childNode.current.movePosition(this.maxPosition)
            : this.currentPosition = this.childNode.current.movePosition(this.currentPosition + this.viewPort)

    }
    render() {
        return (
            <div className="Carousel">
                <div className="control-left" onClick={this.moveLeft}>
                    <div className="previous"></div>
                </div>
                <div className="control-right" onClick={this.moveRight}>
                    <div className="next"></div>
                </div>
                <div
                    ref={this.wrapperNode}
                    className="ElementsWrapper">
                    <RefWrapper
                        className="Elements"
                        ref={this.childNode}
                        elements={this.props.elements}
                    />
                </div>
            </div>
        );
    }
}

export default ListingCarousel;