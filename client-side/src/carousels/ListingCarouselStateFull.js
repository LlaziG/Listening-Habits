import React, { Component } from 'react';
import './ListingCarousel.css';
import './ListingCarouselStateFull.css';
import { RefWrapper } from '../helpers/index';
import { HeadingFour } from '../headings/index';
import { ListingCarousel } from '../carousels/index'

class ListingCarouselStateFull extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="Switches">
                    <HeadingFour text="My Artists" active={false}/>

                    <HeadingFour text=" / " margin="15px" active={true}/>

                    <HeadingFour text="My Tracks" active={true}/>
                </div>

                <div className="Carousels">
                    {this.props.elements}
                </div>
            </div>
        );
    }
}

export default ListingCarouselStateFull;