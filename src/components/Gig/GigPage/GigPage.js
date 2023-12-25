import React, { useEffect, useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useTitle from "../../../utils/useTitle";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import GigTable from "./GigTable";
import { fetchGigs, fetchGigStatus } from "./redux/Action";
import "./style/Gigpage.scss";

function GigPage() {
  const [count, setCount] = useState([]);
  const collectCount = [];
  const [active, setActive] = useState("active");
  const [days, setDays] = useState();

  // eslint-disable-next-line
  const [key, setKey] = useState("home");
  // eslint-disable-next-line
  const handleActive = (e) => {
    setActive(active === "active" ? "inactive" : "active");
  };
  const dispatch = useDispatch();
  const { gig, gigStatus, loading } = useSelector((state) => state.gig);

  const gigFilter = (filterKey) => {
    return gig?.filter(
      (item) => item.status_id?.toString() === filterKey?.toString()
    );
  };

  useTitle("Fuchas - Gigs");
  useEffect(() => {
    dispatch(fetchGigs(days));
  }, [dispatch, days]);

  useEffect(() => {
    dispatch(fetchGigStatus());
  }, [dispatch]);

  return (
    <div className="gig-container">
      <Container>
        <div className="gig-header">
          <div className="title">Gigs</div>
          {/* <div className='slide-btn'>
						Accepting Custom Order
						<span
							className={`fake-toggle ${active}`}
							onClick={handleActive}
						></span>
					</div> */}
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
          <div className="gig-filter-bar">
            <Nav variant="tabs" className="flex-row">
              {gigStatus?.map((item, index) => (
                <Nav.Item key={item?.id}>
                  <Nav.Link eventKey={index} onClick={() => setDays()}>
                    {item.title}
                    {count[index]?.value > 0 && (
                      <span className="badge">{count[index]?.value}</span>
                    )}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <div>
              <Link
                to={`/users/seller_dashboard/manage_gigs/create_gigs`}
                className="create-btn"
              >
                Create A new Gig
              </Link>
            </div>
          </div>

          {loading ? (
            <ContainerSpinner />
          ) : (
            <Tab.Content>
              {gig &&
                gigStatus?.map((item, index) => (
                  <Tab.Pane eventKey={index} key={item.id}>
                    <GigTable
                      gigFilter={gigFilter}
                      count={collectCount}
                      setCount={setCount}
                      filterKey={item.id}
                      label={`${item.title} Gigs`}
                      days={days}
                      setDays={setDays}
                    />
                  </Tab.Pane>
                ))}
            </Tab.Content>
          )}
        </Tab.Container>
      </Container>
    </div>
  );
}

export default GigPage;
