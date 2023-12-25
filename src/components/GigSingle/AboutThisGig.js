import React from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

function AboutThisGig() {
  const { gigs } = useSelector((state) => state.gigDetails, shallowEqual);
  return (
    <>
      <div className="AboutThisGig">
        <h4>About This Gig</h4>
        <div
          className="textContainer"
          dangerouslySetInnerHTML={{ __html: gigs?.description }}
        ></div>
        <hr />
        <Row>
          {gigs?.gig_metas?.map((meta) => (
            <React.Fragment key={meta?.id}>
              {meta?.gig_meta_values?.length > 0 && (
                <Col md={4} key={meta.id}>
                  <div className="metaData">
                    <p>{meta.title}</p>
                    {meta?.gig_meta_values?.map((value, index) => (
                      <span key={index} className="commaSeperator">
                        {value.title}
                      </span>
                    ))}
                  </div>
                </Col>
              )}
            </React.Fragment>
          ))}
        </Row>
      </div>
    </>
  );
}
export default AboutThisGig;
