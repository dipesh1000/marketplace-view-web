import React from "react";
import GigCard from "../common/GigCard/GigCard";

function GigView({ data, gigCardSlug, type, searchTerm, filter_data }) {
  return (
    <>
      <div className="gig-list row-list">
        <div className="section-wrapper">
          <div className="row">
            {type === "Search"
              ? data?.gigs?.data?.map((item, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={item?.id}>
                    <GigCard
                      data={item}
                      id={item?.id}
                      wishlist={item?.is_wishlist}
                      fetchType="searchCard"
                      postData={{
                        ...filter_data,
                        search: searchTerm,
                      }}
                    />
                  </div>
                ))
              : data?.data?.map((item, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={item?.id}>
                    <GigCard
                      data={item}
                      id={item?.id}
                      wishlist={item?.is_wishlist}
                      fetchType="categoryCard"
                      postData={gigCardSlug}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default GigView;
