import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { shallowEqual, useSelector } from "react-redux";

function GigSingleSlider() {
  const { gigs } = useSelector((state) => state.gigDetails, shallowEqual);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [pause, setPause] = useState(true);

  const vidControl = useRef(null);
  useEffect(() => {
    const handlePlayVideo = (e) => {
      if (!vidControl?.current?.contains(e.target)) {
        vidControl?.current?.pause();
        setPause(true);
      }
    };
    document.addEventListener("mousedown", handlePlayVideo);
    return () => {
      document.removeEventListener("mousedown", handlePlayVideo);
    };
  }, [pause]);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    asNavFor: ".slider-nav",
  };
  const settingsThumbs = {
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    arrows: true,
    infinite: true,
    dots: false,
    focusOnSelect: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <div className="SingleSliderWrapper">
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          {gigs?.gig_images &&
            Object.keys(gigs.gig_images).map((slide) => (
              <div className="SingleSliderMain" key={gigs.gig_images[slide].id}>
                <figure key={gigs.gig_images[slide].id}>
                  <div
                    style={{
                      background: `url(${gigs.gig_images[slide].url.full})`,
                      backgroundSize: "100%",
                    }}
                    className="singleSliderImg"
                  ></div>
                </figure>
              </div>
            ))}
          {gigs?.gig_video && (
            <div className="SingleSliderMain">
              <video
                className="video_Frame"
                onClick={() => setPause(false)}
                ref={vidControl}
                src={gigs?.gig_video?.url}
                controls
                controlsList="nodownload"
              />
            </div>
          )}
        </Slider>
      </div>
      <div className="singleThumbnailWrapper">
        <Slider
          {...settingsThumbs}
          asNavFor={nav1}
          ref={(slider) => setSlider2(slider)}
          slidesToShow={6}
          swipeToSlide={true}
          focusOnSelect={true}
          infinite={true}
        >
          {gigs?.gig_images &&
            Object.keys(gigs?.gig_images)?.map((slide) => (
              <div className="slick-slide" key={gigs.gig_images[slide].id}>
                <img
                  className="slick-slide-image"
                  src={gigs.gig_images[slide].url.resize}
                  alt={gigs.gig_images[slide].alt}
                />
              </div>
            ))}
          {gigs?.gig_video && (
            <div className="slick-slide">
              <img
                className="slick-slide-image"
                src={gigs?.gig_video?.thumbnail_url}
              />
            </div>
          )}
        </Slider>
      </div>
    </>
  );
}

export default GigSingleSlider;

const CustomNextArrow = (props) => {
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
};

const CustomPrevArrow = (props) => {
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
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "rgb(148 144 144 / 22%)",
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
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "rgb(148 144 144 / 22%)",
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
};
