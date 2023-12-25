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
                    height: "50px",
                    backgroundColor: "#fff",
                    width: "50px",
                    borderRadius: "50%",
                    textAlign: "center",
                    paddingTop: "10px",
                    boxShadow: "0 2px 5px 0 rgb(0 0 0 / 15%)"
            }
        }
        onClick={onClick}
        >
            <BiChevronRight style={{ fontSize: "30px", fontWeight: "400", color: "rgb(115 107 107)" }} />
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
                    height: "50px",
                    backgroundColor: "#fff",
                    width: "50px",
                    borderRadius: "50%",
                    textAlign: "center",
                    paddingTop: "10px",
                    boxShadow: "0 2px 5px 0 rgb(0 0 0 / 15%)"
            
            }
        }
        onClick={onClick}
        >
            <BiChevronLeft style={{ fontSize: "30px", fontWeight: "400", color: "rgb(115 107 107)" }} />
        </div>
    );
    }
function ArrowSlider({
    children, slidesToShow, variableWidth
}) {
    let widthStatus = variableWidth === true ? true : false
    const showItem = slidesToShow ? slidesToShow : 5
    var settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        slidesToShow: showItem,
        variableWidth: widthStatus,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
      };
    return (
        <>
        <style type="text/css">
                {`
                #testClass .slick-list{
                    margin: 0 -17px!important;
                }
                #testClass .slick-slide > div {
                    margin: 0 17px!important;
                }
                `}
            </style>
            <Slider {...settings}>
                {children}
            </Slider>
        </>
    )
}

export default ArrowSlider
