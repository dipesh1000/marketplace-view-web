import React, { useEffect } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerOffer } from "./redux/Action";

function BuyerOfferTable({ data, loading, label, setOfferCount }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSellerOffer());
  }, [dispatch]);
  const { sellerOffer } = useSelector((state) => state.buyerRequest);
  useEffect(() => {
    setOfferCount(sellerOffer?.length);
    // eslint-disable-next-line
  }, [sellerOffer]);

  return (
    <>
      <div className="table-header">
        <div className="header-title">{label} Buyer Request</div>
        <div className="day-filter">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              All Subcategories
              <i className="fas fa-caret-down "></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                //   onClick={handleDropdown}
                href="/"
                value="7"
              >
                Webdesign
              </Dropdown.Item>
              <Dropdown.Item
                //   onClick={handleDropdown}
                href="/"
                value="14"
              >
                Grapgic Design
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="offer-request-table">
        <Table hover size="sm">
          <thead>
            <tr>
              <th>Offer</th>
              <th>Duration</th>
              <th>Price</th>
              <th colSpan={2}>Request</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div>Loading....</div>
            ) : (
              sellerOffer?.map((order, index) => (
                <tr key={order?.id}>
                  <td className="col-cell col-offer-1">
                    <h4>{order?.gig?.title}</h4>
                    <div class="content">{order?.description}</div>
                    {!order?.offer_include ? (
                      ""
                    ) : (
                      <ul className="offer_feature">
                        {order?.offer_include?.map((tag, index) => (
                          <li>
                            <FaCheck /> {tag?.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="col-cell col-offer-2">
                    {order?.delivery_time} days
                  </td>
                  <td className="col-cell col-offer-2">$ {order?.budget}</td>
                  <td className="col-cell col-offer-3">
                    <div
                      className="profile__img"
                      style={{
                        backgroundImage: `url(${order?.buyer_request_offer?.user?.profileImage?.url?.resize})`,
                      }}
                    ></div>
                  </td>
                  <td className="col-cell col-offer-2">
                    <h4>{order?.buyer_request_offer?.user?.username}</h4>
                    <div className="request_project">
                      {order?.buyer_request_offer?.description}
                    </div>
                    <div className="meta_details">
                      <div className="meta_item">
                        Delivery Time -{" "}
                        {order?.buyer_request_offer?.delivery_time} days
                      </div>
                      <div className="meta_item">
                        Budget - ${order?.buyer_request_offer?.budget}
                      </div>
                    </div>
                    <div className="file-list">
                      {/* {order?.buyer_request_offer?.files?.map((list, index) => (
                          ))} */}
                      <a href="/">
                        <i className="fa fa-download"></i>Hello file name
                      </a>
                      <a href="/">
                        <i className="fa fa-download"></i>Hello file name
                      </a>
                      <a href="/">
                        <i className="fa fa-download"></i>Hello file name
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      {data?.length === 0 && (
        <div className="table-footer">No active Orders to show.</div>
      )}
    </>
  );
}

export default BuyerOfferTable;
