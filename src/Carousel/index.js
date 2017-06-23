import React from 'react';
import  Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class CarouselComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Slider {...settings}>
                {this.props.children}
            </Slider>
        )
    }
}


