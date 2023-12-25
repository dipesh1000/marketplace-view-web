import React from "react";
import DotSlider from "../common/slider/DotSlider";

function FrontBoxBannerComponent({ data }) {
  return (
    <section className="font-banner">
      <div className="container">
        <DotSlider>
          {data.map((item, index) => {
            return (
              <div key={item?.id} className="box-wrapper">
                <div className="new-box-wrapper">
                  <a href="/">
                    <style type="text/css">
                      {`
                                        .image${index}Objects {
                                            --image-url:url(${item.url});
                                        }
                                        `}
                    </style>
                    <div className={`background-image image${index}Objects`}>
                      <div className="text">
                        <h2>{item.title}</h2>
                        <p>{item.subtitle}</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </DotSlider>
      </div>
    </section>
  );
}

export default FrontBoxBannerComponent;
