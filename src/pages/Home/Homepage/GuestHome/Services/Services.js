import React from "react";
import Slider from "react-slick";
import "./Services.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const servicesList = [
  {
    id: 1,
    title: "Build you brand",
    name: "Logo Design",
    url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png",
  },
  {
    id: 2,
    title: "Customize your site",
    name: "Wordpress",
    url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png",
  },
  {
    id: 3,
    title: "Share your message",
    name: "Voice Over",
    url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png",
  },
  {
    id: 4,
    title: "Engage your audiences",
    name: "Voice Explainer",
    url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png",
  },
  {
    id: 5,
    title: "Reach more customers",
    name: "Social Media",
    url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png",
  },
  {
    id: 6,
    title: "Build you brand",
    name: "Logo Design",
    url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png",
  },
];
function ServiceNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        height: "50px",
        backgroundColor: "#fff",
        width: "50px",
        borderRadius: "50%",
        textAlign: "center",
        paddingTop: "10px",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 15%)",
      }}
      onClick={onClick}
    >
      <BiChevronRight
        style={{
          fontSize: "30px",
          fontWeight: "400",
          color: "rgb(115 107 107)",
        }}
      />
    </div>
  );
}

function ServicePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        height: "50px",
        backgroundColor: "#fff",
        width: "50px",
        borderRadius: "50%",
        textAlign: "center",
        paddingTop: "10px",
        boxShadow: "0 2px 5px 0 rgb(0 0 0 / 15%)",
      }}
      onClick={onClick}
    >
      <BiChevronLeft
        style={{
          fontSize: "30px",
          fontWeight: "400",
          color: "rgb(115 107 107)",
        }}
      />
    </div>
  );
}
function Services() {
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    nextArrow: <ServiceNextArrow />,
    prevArrow: <ServicePrevArrow />,
  };

  return (
    <>
      <section className="popular-services">
        <div className="container">
          <div className="title">
            <h1>Popular professional services</h1>
          </div>

          <Slider {...settings}>
            {servicesList &&
              servicesList?.map((item) => {
                return (
                  <div className="section-box" key={item?.id}>
                    <a href="/">
                      <div className="text">
                        <h6>{item.title}</h6>
                        <h4>{item.name}</h4>
                      </div>
                      <div className="image">
                        <img src={item.url} alt="" title="" />
                      </div>
                    </a>
                  </div>
                );
              })}
          </Slider>
        </div>
      </section>
    </>
  );
}

export default Services;
