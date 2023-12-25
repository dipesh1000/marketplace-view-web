import React, { useEffect, useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useTitle from "../../../utils/useTitle";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import {
  fetchBuyerOrders,
  fetchOrders,
  fetchOrderStatus,
  fetchOrderStatusBuyer,
} from "../redux/Action";
import OrderTable from "./OrderTable";
import OrderTableBuyer from "./OrderTableBuyer";

const orderDefault = [
  {
    title: "Active",
    slug: "active",
  },
];

function OrderPage() {
  // eslint-disable-next-line
  const [totalCount, setTotalCount] = useState();
  const [activeCount, setActiveCount] = useState([]);
  const [type, setType] = useState("seller");
  const [currentStatus, setCurrentStatus] = useState("active");
  const [changeState, setChangeState] = useState(false);
  const [days, setDays] = useState();

  const dispatch = useDispatch();

  const { orders, orderStatus, loading } = useSelector(
    (state) => state.sellerOrders
  );
  const orderCount = orderStatus?.map((order) => {
    return { slug: order?.slug, order_count: order?.order_count };
  });
  useTitle("Fuchas - Orders");
  useEffect(() => {
    setTotalCount(orderCount);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    type === "seller" && dispatch(fetchOrderStatus());
    type === "buyer" && dispatch(fetchOrderStatusBuyer());
    setChangeState(true);
  }, [dispatch, type]);

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
        b?.slug === "late" ||
        b?.slug === "very_late"
          ? a + b?.order_count
          : a,
      0
    );
    !days && setActiveCount(count);
    type === "buyer" && dispatch(fetchBuyerOrders(currentStatus, days));
    type === "seller" && dispatch(fetchOrders(currentStatus, days));
    setChangeState(false);
    // eslint-disable-next-line
  }, [orderStatus, days]);

  useEffect(() => {
    days && currentStatus === "active" && setActiveCount(orders?.length);
    // eslint-disable-next-line
  }, [orders]);

  const handleClick = (item) => {
    type === "seller" && dispatch(fetchOrders(item.slug));
    type === "buyer" && dispatch(fetchBuyerOrders(item.slug));
    setCurrentStatus(item.slug);
    setDays();
  };

  return (
    <div className="gig-container">
      <Container>
        <div className="gig-header">
          <div className="title">Orders</div>
          <div>
            <SliderToggle
              title={
                type === "seller"
                  ? "Switch to get Order as Buyer"
                  : "Switch to get Order as Seller"
              }
              setType={setType}
              setDays={setDays}
            />
          </div>
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
                      className={currentStatus === item?.slug ? "active" : ""}
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
                      className={currentStatus === item?.slug ? "active" : ""}
                    >
                      {item.title}
                      {item?.order_count > 0 && (
                        <span className="badge">
                          {days && currentStatus === item?.slug
                            ? orders.length
                            : item?.order_count}
                        </span>
                      )}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
            {type === "seller" && (
              <OrderTable
                loading={loading}
                label={currentStatus}
                data={orders}
                days={days}
                setDays={setDays}
              />
            )}
            {type === "buyer" && (
              <OrderTableBuyer
                loading={loading}
                label={currentStatus}
                data={orders}
                days={days}
                setDays={setDays}
              />
            )}
          </Tab.Container>
        )}
      </Container>
    </div>
  );
}

export default OrderPage;

const SliderToggle = ({ title, setType, setDays }) => {
  const [active, setActive] = useState("inactive");
  const handleActive = (e) => {
    setActive(active === "active" ? "inactive" : "active");
    setType((prev) => (prev === "buyer" ? "seller" : "buyer"));
    setDays();
  };
  return (
    <div className="slide-btn">
      {title}
      <span className={`fake-toggle ${active}`} onClick={handleActive}></span>
    </div>
  );
};
