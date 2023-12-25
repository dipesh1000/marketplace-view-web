import React from "react";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import GigCard from "../../common/GigCard/GigCard";
import FreelancerReviews from "./FreelancerReviews";
import { useParams } from "react-router-dom";

function FreelancerMainContainer({
  data,
  review,
  filterData,
  isLoading,
  reviewLoading,
}) {
  // const handleClick = () => {
  //   history.push('/seller_onboarding/personal_info');
  // };
  const { user } = useParams();

  return (
    <>
      <div className="main-contain">
        {isLoading ? (
          <ContainerSpinner backgroundColor="#fff" />
        ) : (
          <>
            <h2 className="freelancer-gigs">
              {data?.profile?.username}'s Gigs
            </h2>
            {data?.gigs?.length ? (
              <div className="gig-list row-list">
                <div className="section-wrapper">
                  <div className="row">
                    {data?.gigs?.map((item, index) => (
                      <div
                        className="col-lg-4 col-md-4 col-sm-6"
                        key={item?.id}
                      >
                        <GigCard
                          data={item}
                          id={item?.id}
                          wishlist={item?.is_wishlist}
                          fetchType="freelancer"
                          postData={user}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className=" py-4">No gigs from this freelancer.</p>
            )}
          </>
        )}
        <FreelancerReviews
          data={data}
          review={review}
          filterData={filterData}
          reviewLoading={reviewLoading}
        />
      </div>
    </>
  );
}

export default FreelancerMainContainer;
