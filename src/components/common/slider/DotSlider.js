import React from 'react'
import Slider from 'react-slick';

function DotSlider({
   children
}) {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000
      };
    return (
        <>
            <style type="text/css">
                {`
                    .slick-dots { 
                        bottom: 25px;
                        left: 26px;
                        text-align: left;
                    }
                    .slick-dots li.slick-active button:before { 
                        font-size: 12px;
                        color: #fff;
                        opacity: 1;
                    }
                    .slick-dots li button:before { 
                        font-size: 12px;
                        opacity: .5;
                    }
                `}
            </style>
            <Slider {...settings}>
                {children}
            </Slider>
        </>
    )
}

export default DotSlider
