import React from "react";
import { Card, Table } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

function OrderItem({ singleOrder, resolution_data }) {
  return (
    <div className="order-item">
      <Card>
        <Card.Body>
          <span className="beforeLevel">Star</span>
          <div className="cards-header">
            <div>
              <h2 className="d-inline-block">
                Order #{singleOrder?.order_code}
              </h2>
              <Link
                to={`/${singleOrder?.user?.username}/${singleOrder?.gig?.slug}`}
              >
                <small>View Gig</small>
              </Link>
              <div className="buyer-detail">
                Buyer:
                <ul>
                  <li>
                    {singleOrder?.user?.name} <span>(View History)</span>
                  </li>
                  <li>
                    <span>{singleOrder?.order_date}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order_pricing_top">
              <h2>${singleOrder?.total_price}</h2>
            </div>
          </div>
          <div className="CardTable">
            <Table borderless>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Duration</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tr>
                <td>
                  <b className="gigs_title">{singleOrder?.gig?.title}</b>
                  <h6 className="pt-2">{singleOrder?.package_title}</h6>
                  <ul className="ListofOrderFeature">
                    {singleOrder?.order_includes?.map((item) => (
                      <li key={item.id}>
                        <FaCheck className="active" /> {item.title}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{singleOrder?.quantity}</td>
                <td>{singleOrder?.delivery_time} Day</td>
                <td>${singleOrder?.price}</td>
              </tr>
              {singleOrder?.extra_fast_delivery_price != null && (
                <tr>
                  <td>
                    <b>Extra Fast Delivery</b>
                  </td>
                  <td></td>
                  <td>{singleOrder?.extra_fast_delivery_day} Days</td>
                  <td>${singleOrder?.extra_fast_delivery_price}</td>
                </tr>
              )}
              {singleOrder?.order_options?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <b>{item.title}</b>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.extra_value} Days</td>
                  <td>${item.extra_price}</td>
                </tr>
              ))}
              {resolution_data?.length > 0 && (
                <>
                  <tr>
                    <td className="text-left modifield_order">
                      <b className="gigs_title modifield__order">
                        {" "}
                        Modified Order Details{" "}
                      </b>
                    </td>
                  </tr>
                  {resolution_data
                    ?.filter(
                      (list) =>
                        list?.type === "seller_modify_order" &&
                        list?.approved_at != null &&
                        list?.rejected_at == null
                    )
                    ?.map((elem) =>
                      elem?.options?.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <b>{item.title}</b>
                          </td>
                          <td>{item.quantity}</td>
                          <td>{item.extra_value || 0} Days</td>
                          <td>$ {item.extra_price}</td>
                        </tr>
                      ))
                    )}
                </>
              )}
            </Table>
          </div>
          <hr />
          <div className="order-ttl">
            <b>Total ${singleOrder?.total_price}</b>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default OrderItem;
