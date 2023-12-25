import React, { useEffect, useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import "./styles/ManageContact.scss";
import ManageContactTable from "./ManageContactTable";
import { fetchOrders, fetchOrderStatus } from "../OrderList/redux/Action";

const orderDefault = [
  {
    title: "Buyers",
    slug: "buyers",
  },
  {
    title: "Sellers",
    slug: "sellers",
  },
];
const contact = [
  {
    username: "blueradiumdesign",
    buyer:
      "https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/88f1321c8300f012946189700fd8144b-1623752449960/5002fb8c-8595-48f3-a415-72db274b5939.jpg",
    ordercompleted: 1,
    budget: "$70",
    last_order: "Apr 05, 20",
  },
  {
    username: "manishshaz",
    buyer:
      "https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/88f1321c8300f012946189700fd8144b-1623752449960/5002fb8c-8595-48f3-a415-72db274b5939.jpg",
    ordercompleted: 3,
    budget: "$100",
    last_order: "Sept 19, 17",
  },
];
function ManageContact() {
  // eslint-disable-next-line
  const [count, setCount] = useState([]);
  const collectCount = [];
  const [active, setActive] = useState("active");
  const [currentStatus, setCurrentStatus] = useState("Active");
  // eslint-disable-next-line
  const handleActive = (e) => {
    setActive(active === "active" ? "inactive" : "active");
  };
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.sellerOrders);

  useEffect(() => {
    dispatch(fetchOrders("active"));
    dispatch(fetchOrderStatus());
  }, [dispatch]);

  const handleClick = (item) => {
    dispatch(fetchOrders(item.slug));
    setCurrentStatus(item.title);
  };
  return (
    <div className="gig-container">
      <Container>
        <div className="gig-header">
          <div className="title">My Contact</div>
          <div className="search-btn">
            <div className="search-field">
              <input type="text" placeholder="Search requests" />
              <button type="button">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
          <div className="gig-filter-bar request-counter">
            <Nav variant="tabs" className="flex-row">
              {orderDefault.map((item, index) => (
                <Nav.Item key={index}>
                  <Nav.Link eventKey={index} onClick={() => handleClick(item)}>
                    My {item.title}
                    {/* {count[index]?.value > 0 && <span className="badge">{count[index]?.value}</span>} */}
                  </Nav.Link>
                  <span>10</span>
                </Nav.Item>
              ))}
            </Nav>
            {/* <span className="left-order-level"><GiBookPile /> 10 Offers left Today</span> */}
          </div>
          <ManageContactTable
            loading={loading}
            label={currentStatus}
            count={collectCount}
            setCount={setCount}
            data={contact}
          />
        </Tab.Container>
      </Container>
    </div>
  );
}

export default ManageContact;
