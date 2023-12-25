import React from "react";
import Slider from "react-slick";
import styles from "./MainSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const mainSliderList = [
  {
    id: 1,
    url: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049983/bg-hero-1-1792-x1.png",
    title: "The Text",
  },
  {
    id: 2,
    url: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/d14871e2d118f46db2c18ad882619ea8-1599835783966/bg-hero-3-1792-x1.png",
    title: "The Another",
  },
  {
    id: 3,
    url: "https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049970/bg-hero-5-1792-x1.png",
    title: "The Third",
  },
];

function MainSider() {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className={styles.slideWrap}>
        <Slider {...settings}>
          {mainSliderList &&
            mainSliderList?.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    style={{ background: `url(${item.url})` }}
                    className={styles.slideItem}
                  />
                </div>
              );
            })}
        </Slider>
      </div>
    </>
  );
}

export default MainSider;
