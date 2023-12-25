import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import GigCard from "../common/GigCard/GigCard";
import { fetchTags } from "./redux/Action";
import "./styles/styles.scss";

const Tags = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const { tags, isLoading } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchTags(tag));
  }, [tag, dispatch]);
  return (
    <>
      <div className="tags-div container">
        <div className="tags-header">
          <h1>
            Get The Best {tag?.charAt(0).toUpperCase() + tag?.slice(1)} Services
          </h1>
          <div className="how-works">
            <button>
              <i className="fas fa-play-circle"></i> How Fiverr Works
            </button>
          </div>
        </div>
        {isLoading ? (
          <ContainerSpinner backgroundColor="#fff" />
        ) : (
          <div>
            <div className="gig-list row-list">
              <div className="section-wrapper">
                <div className="row d-flex">
                  {tags?.gigs?.data?.map((item, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={item?.id}>
                      <GigCard
                        data={item}
                        id={item?.id}
                        wishlist={item?.is_wishlist}
                        fetchType="tags"
                        postData={tag}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tags;
