import React, { useEffect, useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import { fetchBuyerOrders, fetchOrderStatusBuyer } from "../redux/Action";
import OrderTableBuyer from "./OrderTableBuyer";

const orderDefault = [
  {
    title: "Active",
    slug: "active",
  },
];

function OrderPageBuyer() {
  const [activeCount, setActiveCount] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("active");
  const [changeState, setChangeState] = useState(false);

  // const handleActive = (e) => {
  //   setActive(active == "active" ? "inactive" : "active");
  // };
  const dispatch = useDispatch();

  const { orders, orderStatus, loading } = useSelector(
    (state) => state.sellerOrders
  );

  useEffect(() => {
    dispatch(fetchBuyerOrders("active"));
    dispatch(fetchOrderStatusBuyer());
    setChangeState(true);
    // eslint-disable-next-line
  }, [dispatch]);

  const handleClick = (item) => {
    dispatch(fetchBuyerOrders(item.slug));
    setCurrentStatus(item.title);
  };
  useEffect(() => {
    // let count = 0;
    // orderStatus?.forEach(b=>
    //       (b?.slug === "inprogress" || b?.slug === "incomplete" || b?.slug === "revision" || b?.slug === "delivered") &&
    //       (count+= b?.order_count)
    //     );
    const count = orderStatus?.reduce(
      (a, b) =>
        b?.slug === "inprogress" ||
        b?.slug === "incomplete" ||
        b?.slug === "revision" ||
        b?.slug === "delivered" ||
        b?.slug === "very_late" ||
        b?.slug === "late"
          ? a + b?.order_count
          : a,
      0
    );
    setActiveCount(count);
    dispatch(fetchBuyerOrders("active"));
    setCurrentStatus("active");
    setChangeState(false);
    // eslint-disable-next-line
  }, [orderStatus]);

  return (
    <div className="main_content">
      <div className="gig-container">
        <Container>
          <div className="gig-header">
            <div className="title">Orders</div>
          </div>
          {changeState ? (
            <ContainerSpinner />
          ) : (
            <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
              <div className="gig-filter-bar">
                <Nav variant="tabs" className="flex-row">
                  {orderDefault.map((item, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link
                        eventKey={index}
                        onClick={() => handleClick(item)}
                      >
                        {item.title}
                        <span className="badge">
                          {activeCount > 0 && activeCount}
                        </span>
                        {/* {count[index]?.value > 0 && <span className="badge">{count[index]?.value}</span>} */}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                  {orderStatus?.map((item, index) => (
                    <Nav.Item key={index + 1}>
                      <Nav.Link
                        eventKey={index + 1}
                        onClick={() => handleClick(item)}
                      >
                        {item.title}
                        {item?.order_count > 0 && (
                          <span className="badge">{item?.order_count}</span>
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
              <OrderTableBuyer
                loading={loading}
                label={currentStatus}
                data={orders}
              />
            </Tab.Container>
          )}
        </Container>
      </div>
    </div>
  );
}

export default OrderPageBuyer;
