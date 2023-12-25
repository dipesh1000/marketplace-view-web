import React from "react";
import "./Guides.css";
import "../../../main.css";

const GuidesList = [
  {
    title: "Start an online business and work from home",
    subTitle: "A complete guide to starting a small business online",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_450,dpr_1.0/v1/attachments/generic_asset/asset/d532c0ad4feed007b3899cebad595286-1599611560157/guide-start-online-business-552-x2.png",
  },
  {
    title: "Start an online business and work from home",
    subTitle: "A complete guide to starting a small business online",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_450,dpr_1.0/v1/attachments/generic_asset/asset/d532c0ad4feed007b3899cebad595286-1599611560157/guide-start-online-business-552-x2.png",
  },
  {
    title: "Start an online business and work from home",
    subTitle: "A complete guide to starting a small business online",
    image:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_450,dpr_1.0/v1/attachments/generic_asset/asset/d532c0ad4feed007b3899cebad595286-1599611560157/guide-start-online-business-552-x2.png",
  },
];
function Guides() {
  return (
    <section className="guides">
      <div className="container">
        <div className="title">
          <h2>Fuchas guides</h2>
          <a href="/" target="_blank">
            See More Guides <i className="fas fa-chevron-right"></i>
          </a>
        </div>
        <div className="row">
          {GuidesList &&
            GuidesList.map((item, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div className="box-wrapper">
                    <a href="/">
                      <div className="image">
                        <img src={item.image} alt="" title="" />
                      </div>
                      <div className="text">
                        <h5>{item.title}</h5>
                        <p>{item.subTitle}</p>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Guides;
