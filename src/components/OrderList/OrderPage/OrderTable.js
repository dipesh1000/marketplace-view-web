import React from "react";
import { Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import "./styles/Styles.scss";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import { formatDate } from "../../../utils/TimestamptoDate";

function OrderTable({ label, data, loading, days, setDays }) {
  const handleDropdown = (e) => {
    e.preventDefault();
    setDays(e.target.getAttribute("value"));
  };
  return loading ? (
    <ContainerSpinner />
  ) : (
    <>
      <div className="table-header">
        <div className="header-title">{label} Orders</div>
        <div className="day-filter">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              {days
                ? days > 30
                  ? `Last ${days / 30} months`
                  : `Last ${days} days`
                : "Filter By Days"}
              <i className="fas fa-caret-down "></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={handleDropdown}
                href="#/action-1"
                value="7"
              >
                Last 7 Days
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleDropdown}
                href="#/action-2"
                value="14"
              >
                Last 14 Days
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleDropdown}
                value="30"
                href="#/action-3"
              >
                Last 30 Days
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleDropdown}
                value="60"
                href="#/action-3"
              >
                Last 2 Months
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleDropdown}
                value="90"
                href="#/action-3"
              >
                Last 3 Months
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Table hover size="sm" className="ordersTable">
        <thead>
          <tr>
            <th className="colSelect"></th>
            <th className="colBuyer">BUYER</th>
            <th className="colGig">GIG</th>
            <th className="colDueOn">START DATE</th>
            <th className="colDeliveredAt">DELIVERED AT</th>
            <th className="colTotal">TOTAL</th>
            <th></th>
            <th className="colStatus">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((order, index) => (
            <tr key={order.id}>
              <td className="col-cell colSelect">
                {/* <input type="checkbox" />
                    <FaRegStar /> */}
              </td>
              <td className="col-cell colBuyer">
                {order?.user?.profileImage ? (
                  <div
                    className="buyerImage"
                    style={{
                      backgroundImage: `url(${order?.user?.profileImage?.url?.full})`,
                    }}
                  ></div>
                ) : (
                  <div
                    className="buyerImage"
                    style={{
                      backgroundImage:
                        "url('https://fiverr-res.cloudinary.com/image/upload/t_profile_small,q_auto,f_auto/v1/attachments/profile/photo/e4abf05d5fdee7a409b46aa70d69f237-1604287731936/25edbab4-a03c-4fdb-b037-18536a235fda.jpg')",
                    }}
                  ></div>
                )}
                <span>{order?.user?.username}</span>
                {/* <div className="buyerRepeater"><TiArrowRepeatOutline /></div> */}
              </td>
              <td className="col-cell colGig">
                <Link
                  to={`/users/seller_dashboard/singleorders/${order?.order_code}`}
                >
                  {order.gig.title}
                </Link>
              </td>
              <td className="col-cell colDueOn">{order.order_date}</td>
              <td className="col-cell colDeliveredAt">
                {order.delivered_at !== null
                  ? formatDate(order.delivered_at, "MMM DD, YYYY (HH:mm A)")
                  : "Yet to be delivered"}
              </td>
              <td className="col-cell colTotal">${order.total_price}</td>
              <td className="col-cell colReview">
                {order?.rating ? (
                  <div className="ReviewBox">
                    <FaRegStar />
                    <span>{order?.rating}</span>
                  </div>
                ) : (
                  ""
                )}
              </td>
              <td className="col-cell colStatus">
                <span>{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {data?.length === 0 && (
        <div className="table-footer">No active Orders to show.</div>
      )}
    </>
  );
}

export default OrderTable;
