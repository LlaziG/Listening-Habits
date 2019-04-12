import React, { Component } from 'react';
import { Thumbnail } from '../images/index';
import './ArtisticListing.css';

class ArtisticListing extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="listing">
                <Thumbnail img={this.props.img} alt={this.props.alt} />
                <div className="label">
                    <p>
                        <span className='name'>{this.props.name} {this.props.nameSecondary && "-"} <span>{this.props.nameSecondary}</span></span>
                        <span className='subname'>{this.props.subname}</span>
                    </p>

                    <p className="footer">{this.props.footer}</p>
                </div>
            </div>
        );
    }
}

export default ArtisticListing;