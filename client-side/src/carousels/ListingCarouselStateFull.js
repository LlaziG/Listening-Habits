import React, { Component } from 'react';
import './ListingCarousel.css';
import './ListingCarouselStateFull.css';
import { HeadingFour } from '../headings/index';
import { ButtonHeading } from '../buttons/index';

class ListingCarouselStateFull extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 }
        this.indexSwitch = this.indexSwitch.bind(this);
    }
    indexSwitch(index) {
        this.setState(state => {
            return { activeIndex: index }
        });
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="Switches">
                    {this.props.elements.map((el, index) => {
                        if (index < this.props.elements.length - 1) {
                            return <React.Fragment key={index} >
                                <span onClick={(e) => this.indexSwitch(index)}>
                                    <ButtonHeading key={"button-" + index} text={el.button} active={this.state.activeIndex === index} /></span>
                                <HeadingFour key={"separator-" + index} text=" / " margin="15px" />
                            </React.Fragment>
                        }
                        else {
                            return <React.Fragment key={index} >
                                <span onClick={(e) => this.indexSwitch(index)}>
                                    <ButtonHeading key={"button-" + index} text={el.button} active={this.state.activeIndex === index} />
                                </span>
                            </React.Fragment>
                        }
                    })}
                </div>

                <div className="Carousels">
                    {this.props.elements.map((el, index) => {
                        if (index === this.state.activeIndex) {
                            return <React.Fragment key={"carousel-" + index}>
                                {el.element}
                            </React.Fragment>
                        }
                        // else {
                        //     return null
                        // }
                    })}
                </div>
            </div>
        );
    }
}

export default ListingCarouselStateFull;