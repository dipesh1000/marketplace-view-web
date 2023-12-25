import React from "react";
import { useSelector } from "react-redux";
import GigCard from "../common/GigCard/GigCard";

function EditorPicks() {
  const tempGigList = useSelector((state) => state.tempGigList);

  return (
    <section className="gig-list row-list">
      <div className="container">
        <div className="section-title">
          <h2>Editors' picks</h2>
          <a href="/" target="_blank">
            See More <i className="fas fa-chevron-right"></i>
          </a>
        </div>
        <div className="section-wrapper">
          <ul>
            {tempGigList?.data &&
              tempGigList?.data.map((item, index) => {
                return (
                  <li key={item?.id}>
                    <GigCard
                      data={item}
                      id={item?.id}
                      wishlist={item?.is_wishlist}
                      fetchType="indexPage"
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default EditorPicks;
