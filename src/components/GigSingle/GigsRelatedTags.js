import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function GigsRelatedTags() {
  const { gigs } = useSelector((state) => state.gigDetails, shallowEqual);
  return (
    <>
      <div className="relatedTagsWrapper">
        <div className="tagTitle">
          <h4>Related Tags</h4>
        </div>
        <div className="tagsList">
          {gigs?.related_tags.map((tag, index) => (
            <div key={tag?.id} className="tagItem">
              <Link to={`/gigs/${tag?.tag}`}>{tag.tag}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GigsRelatedTags;
