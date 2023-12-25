import React, { useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import "./styles/BuyerRequest.scss";
import { Link } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuyerRequest, removeRequest } from "./redux/Action";
import { formatDate } from "../../utils/TimestamptoDate";
import { openModal } from "../../redux/Modal/Modal.action";

function BuyerRequestTable({ label, count, setCount, data, loading }) {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const [fullText, setFullText] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBuyerRequest());
  }, [dispatch]);
  const { buyerRequest } = useSelector((state) => state.buyerRequest);
  useEffect(() => {
    setCount(buyerRequest?.length);
    // eslint-disable-next-line
  }, [buyerRequest]);
  const handleRemoveRequest = (id) => {
    dispatch(removeRequest({ custom_buyer_offer_id: id }));
  };
  const handleModal = (id) => {
    dispatch(openModal("selectGigBuyerRequest", id));
  };
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
                href="#/action-1"
                value="7"
              >
                Webdesign
              </Dropdown.Item>
              <Dropdown.Item
                //   onClick={handleDropdown}
                href="#/action-2"
                value="14"
              >
                Grapgic Design
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Table hover size="sm" className="buyer-request-table">
        <thead>
          <tr>
            <th className="colDate">Date</th>
            <th className="colBuyer">Buyer</th>
            <th className="colRequest">Request</th>
            <th className="colOffers">Offers</th>
            <th className="colDuration">Duration</th>
            <th className="colBudget">Budget</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div>Loading....</div>
          ) : (
            buyerRequest?.map((order, index) => (
              <tr key={order?.id}>
                <td className="col-cell colDate">
                  {formatDate(order.created_at)}
                </td>
                <td className="col-cell colBuyer">
                  <div
                    className="buyerImage"
                    style={{
                      backgroundImage: `url(${order?.user?.profileImage?.url?.resize})`,
                    }}
                  ></div>
                </td>
                <td className="col-cell colRequest">
                  {order.description.length > 200 ? (
                    <div className="text_wrap">
                      {fullText ? (
                        <span>{order.description}</span>
                      ) : (
                        <>
                          <span>{truncate(order.description, 200)}</span>
                          <Link to="#" onClick={() => setFullText(true)}>
                            See More <TiArrowSortedDown />
                          </Link>
                        </>
                      )}
                    </div>
                  ) : (
                    <>{order.description}</>
                  )}
                  {/* {
                                !order.tags.length ? '' : 
                                <> 
                                    <ul className="tags">
                                    { order.tags.map((tag, index) => (
                                        <li>
                                            {tag}
                                        </li>
                                    ))
                                    }
                                    </ul>
                                </>
                            } */}
                </td>
                <td className="col-cell colOffers">{order.offers}</td>
                <td className="col-cell colDuration">
                  {order.delivery_time}
                  <div className="hideOption">
                    {/* eslint-disable-next-line */}
                    <a onClick={() => handleRemoveRequest(order?.id)}>
                      Remove Request
                    </a>
                  </div>
                </td>
                <td className="col-cell colBudget">
                  {order.budget}
                  <div className="hideOption">
                    <button
                      type="button"
                      onClick={() => handleModal(order?.id)}
                    >
                      {" "}
                      Send Offer
                    </button>
                  </div>
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

export default BuyerRequestTable;
