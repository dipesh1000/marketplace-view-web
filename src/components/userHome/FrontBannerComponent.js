import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DotSlider from "../common/slider/DotSlider";

function FrontBannerComponent({ slides }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="font-banner">
      <div className="container">
        <div className="box-wrapper">
          <div className="left-box-wrapper">
            <span>Hi {user?.username},</span>
            <p>Get offers from sellers for your project</p>

            <Link to="/users/manage_requests/new">Post a Request</Link>
          </div>
          <div className="right-box-wrapper">
            <DotSlider>
              {slides &&
                slides.map((item, index) => {
                  return (
                    <a href="/" key={index}>
                      <style type="text/css">
                        {`
                        .image${index}Object {
                            --image-url:url(${item.url});
                        }
                        `}
                      </style>
                      <div className={`background-image image${index}Object`}>
                        <div className="text">
                          <h2>{item.text}</h2>
                          <p>{item.refer}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
            </DotSlider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FrontBannerComponent;
