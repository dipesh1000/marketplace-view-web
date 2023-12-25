import React from 'react'
import { Container } from 'react-bootstrap';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Slider from "react-slick";
import './Testinomials.css'

const servicesList = [
    {
        id: 1,
        title: "Tim and Dan Joo, Co-Founders",
        content: `"When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does."`,
        url: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted-logo-x2.321d79d.png",
        thumbnail: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg"
    },
    {
        id: 2,
        title: "Brighid Gannon (DNP, PMHNP-BC), Co-Founder ",
        content: `"When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does."`,
        url: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted-logo-x2.321d79d.png",
        thumbnail: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg"
    },
    {
        id: 3,
        title: "Brighid Gannon (DNP, PMHNP-BC), Co-Founder ",
        content: `"When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does."`,
        url: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lavender-logo-x2.89c5e2e.png",
        thumbnail: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg"
    },

]
function ServiceNextArrow(props) {
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
    
    function ServicePrevArrow(props) {
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
function Testinomials() {
    var settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        nextArrow: <ServiceNextArrow />,
        prevArrow: <ServicePrevArrow />
      };
    return (
        <section className="testimonial">
            <Container className="pl-3 pr-3">
                <Slider {...settings}>
                {
                    servicesList && servicesList.map((item, index) => {
                        return (
                            <div key={index} className="w-100">
                                <div className="row">
                                    <div className="col-md-5 my-auto">
                                        <div className="image">
                                            <img src={item.thumbnail} alt="" title="" />
                                        </div>
                                    </div>
                                    <div className="col-md-7 my-auto">
                                        <div className="text">
                                            <h4>
                                                {item.title}
                                                <span className="company-logo">
                                                    <img src={item.url} alt="" title="" />
                                                </span>
                                            </h4>
                                            <blockquote>
                                                {item.content}
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </Slider>
            </Container>
        </section>
    )
}

export default Testinomials
