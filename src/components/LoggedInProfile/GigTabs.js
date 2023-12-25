import React, { useEffect } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { profileGigFetch } from "../../redux/Profile/Profile.action";
import GigCardProfile from "../common/GigCard/GigCardProfile";
import { fetchGigStatus } from "../Gig/GigPage/redux/Action";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";

function GigTabs() {
  const dispatch = useDispatch();
  const { gigStatus, loading } = useSelector((state) => state.gig);
  const { profileGig } = useSelector((state) => state.profile);

  const gigFilter = (filterKey) => {
    return profileGig?.gigs?.filter(
      (item) => item.status_id?.toString() === filterKey?.toString()
    );
  };

  useEffect(() => {
    dispatch(profileGigFetch());
    dispatch(fetchGigStatus());
  }, [dispatch]);

  return (
    <div className="gig-viewer-tabs">
      <Container>
        <div className="gig-viewer-wrapper">
          <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
            <div className="gig-filter-line">
              <Nav variant="tabs" className="flex-row">
                {gigStatus?.map(
                  (item, index) =>
                    index < 4 && (
                      <Nav.Item key={index}>
                        <Nav.Link eventKey={index}>{item.title}</Nav.Link>
                      </Nav.Item>
                    )
                )}
              </Nav>
            </div>

            {!loading && (
              <Tab.Content>
                {profileGig?.gigs &&
                  gigStatus?.map((item, index) => (
                    <Tab.Pane eventKey={index} key={item.id}>
                      <Row>
                        {gigFilter(item.id)?.map((data, index) => (
                          <Col sm={4} key={index}>
                            <GigCardProfile data={data} />
                          </Col>
                        ))}
                      </Row>
                    </Tab.Pane>
                  ))}
              </Tab.Content>
            )}
            <div className="create_new_Gig">
              <Link to="/">
                <div className="new_gig_box">
                  <AiFillPlusCircle />
                  <span>Create a New Gig</span>
                </div>
              </Link>
            </div>
          </Tab.Container>
        </div>
      </Container>
    </div>
  );
}

export default GigTabs;
