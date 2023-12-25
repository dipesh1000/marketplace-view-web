import React from 'react'
import Slider from 'react-slick';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={
            {
                 ...style, 
                    display: "block", 
                    height: "30px",
                    backgroundColor: "#fff",
                    width: "25px",
                    borderRadius: "50% 0 0 50%",
                    textAlign: "center",
                    paddingTop: "2px",
                    boxShadow: "0 2px 5px 0 rgb(0 0 0 / 15%)"
            }
        }
        onClick={onClick}
        >
            <BiChevronRight style={{ fontSize: "25px", fontWeight: "300", color: "rgb(115 107 107)" }} />
        </div>
        
    );
    }
    
    function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={
            { ...style, 
                    display: "block", 
                    height: "30px",
                    backgroundColor: "#fff",
                    width: "25px",
                    borderRadius: "0 50% 50% 0",
                    textAlign: "center",
                    paddingTop: "2px",
                    boxShadow: "0 2px 5px 0 rgb(0 0 0 / 15%)"
            
            }
        }
        onClick={onClick}
        >
            <BiChevronLeft style={{ fontSize: "25px", fontWeight: "300", color: "rgb(115 107 107)" }} />
        </div>
    );
}
function CardSlider({children}) {
    var settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
      };
    return (
        <>
            <style type="text/css">
                {`
                    #card-item .slick-prev {
                        left: 0;
                    }
                    #card-item  .slick-next {
                        right: 0;
                    }
                    #card-item .slick-arrow { 
                        opacity: 0; 
                        transition: all .25s ease-in-out; 
                        -moz-transition: all .25s ease-in-out; 
                        -webkit-transition: all .25s ease-in-out; 
                    } 
                    #card-item:hover .slick-arrow{ 
                            opacity: 1; 
                    }
                `}
            </style>
            <Slider {...settings}>
                {children}
            </Slider>
        </>
    )
}

export default CardSlider
