import React from "react";
import { useSelector } from "react-redux";
// import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import GigCard from "../common/GigCard/GigCard";
import ArrowSlider from "../common/slider/ArrowSlider";

function PopularGigs() {
  const tempGigList = useSelector((state) => state.tempGigList);

  return (
    <>
      {/* {tempGigList?.isLoading ? (
        <ContainerSpinner backgroundColor="#fff" />
      ) : ( */}
      <section className="gig-list">
        <div className="container">
          <div className="section-title">
            <h2>
              Most popular Gigs
              {/* <a href="#" target="_blank"> Logo Design </a> */}
            </h2>
          </div>

          <div className="section-wrapper" id="testClass">
            <style type="text/css">
              {`
            .slick-slide {
              width: 19.5%;
            }
          `}
            </style>
            {tempGigList?.data && (
              <ArrowSlider
                variableWidth={tempGigList?.data.length > 5 ? false : true}
                slidesToShow={Math.min(tempGigList?.data.length, 5)}
              >
                {tempGigList?.data.map((item) => {
                  return (
                    <div key={item?.id}>
                      <GigCard
                        data={item}
                        id={item?.id}
                        wishlist={item?.is_wishlist}
                        fetchType="indexPage"
                      />
                    </div>
                  );
                })}
              </ArrowSlider>
            )}
          </div>
        </div>
      </section>
      {/* )} */}
    </>
  );
}

export default PopularGigs;
