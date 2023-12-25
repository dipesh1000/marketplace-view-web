import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Slider from "react-slick";
import "./Inspire.css";

const inspiredByList = [
  {
    name: "mijalzagier",
    skill: "Packaging Design",
    thumbnail:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/f23a46693ef0e611430e232cbc989e2b-1617004615068/mijalzagier.png",
    profile:
      "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/58960b09956dc710d2d5a33573261936-1554984111113/750ccab0-8a64-4c91-b9a4-d10039dbf79c.jpg",
  },
  {
    name: "christophbrandi",
    skill: "Illustration",
    thumbnail:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_2.0/v1/attachments/generic_asset/asset/f23a46693ef0e611430e232cbc989e2b-1617004615106/skydesigner.png",
    profile:
      "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/b615b780b5c813d932953d05ec10f811-1596879215580/6b4a9867-ad06-415f-b307-11177ae30fdd.jpeg",
  },
  {
    name: "noneyn",
    skill: "Flyer Design",
    thumbnail:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/f23a46693ef0e611430e232cbc989e2b-1617004615069/noneyn.png",
    profile:
      "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/23b01eca3b78e2869e149efe15d3066a-1613424545655/0aaffa8e-01e0-4dcb-b56d-674e9b9c4bf5.jpg",
  },
  {
    name: "eveeelin",
    skill: "Logo Design",
    thumbnail:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/f23a46693ef0e611430e232cbc989e2b-1617004615077/eveeelin.jpeg ",
    profile:
      "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/27bdb82e27e444fe2b27aa7b3083cee8-1591694084918/f79ede47-da5f-440a-bf23-57ed9ef7d363.png",
  },
  {
    name: "skydesigner",
    skill: "Web & mobbile Design",
    thumbnail:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/f23a46693ef0e611430e232cbc989e2b-1617004615106/skydesigner.png",
    profile:
      "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/79cf5c7a560e6668555338b2831480e1-1539770224917/2bb8af3c-4cce-42a8-a699-f11177524084.png",
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
function Inspire() {
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    nextArrow: <ServiceNextArrow />,
    prevArrow: <ServicePrevArrow />,
  };
  return (
    <section className="get-inspired">
      <div className="container">
        <div className="title">
          <h2>Get inspired with projects made by our freelancers</h2>
        </div>
        <Slider {...settings}>
          {inspiredByList &&
            inspiredByList.map((item, index) => {
              return (
                <div key={index} className="box-wrapper">
                  <div className="image">
                    <a href="/">
                      <img src={item.thumbnail} alt="" title="" />
                    </a>
                  </div>
                  <div className="text">
                    <div className="profile-icon">
                      <a href="/">
                        <img src={item.profile} alt="" title={item.skill} />
                      </a>
                    </div>
                    <div className="info">
                      <h5>
                        <a href="/"> {item.skill}</a>
                      </h5>
                      <span>
                        <a href="/"> by {item.name}</a>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </section>
  );
}

export default Inspire;
