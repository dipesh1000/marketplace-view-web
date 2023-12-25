import React from "react";
import { Dropdown, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/TimestamptoDate";

function OrderTableBuyer({ label, data, loading, setDays, days }) {
  return (
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
              <Dropdown.Item onClick={() => setDays(7)} value="7">
                Last 7 Days
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDays(14)} value="14">
                Last 14 Days
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDays(30)} value="30">
                Last 30 Days
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDays(60)} value="60">
                Last 2 Months
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setDays(90)} value="90">
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
            <th>SELLER</th>
            <th>GIG</th>
            <th>START DATE</th>
            <th>DELIVERED AT</th>
            <th>TOTAL</th>
            <th width="160px">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div>Loading....</div>
          ) : (
            data?.map((order, index) => (
              <tr key={order.id}>
                <td className="col-cell colSelect"></td>
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
                  <span>{order.user.name}</span>
                </td>
                <td className="col-cell colGig">
                  <Link
                    to={`/users/dashboard/singleorders/${order?.order_code}`}
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
                <td className="col-cell colTotal">{order.total_price}</td>
                <td className="col-cell colStatus">
                  <span>{order.status}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {data?.length === 0 && (
        <div className="table-footer">No active Orders to show.</div>
      )}
    </>
  );
}

export default OrderTableBuyer;
