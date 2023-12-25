import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Col, Form, Row } from "react-bootstrap";

function OrderItem({
  show,
  setShow,
  gigs,
  packageIndex,
  initialValues,
  setInitialValues,
  handleInitialPrice,
}) {
  const handleClick = () => {
    setShow(!show);
  };
  let price = gigs?.gig_packages[packageIndex]?.price;
  const handleGigNumber = (e) => {
    setInitialValues({ ...initialValues, quantity: e.target.value });
    handleInitialPrice(e.target.value * price);
  };

  let image = gigs?.gig_images;
  return (
    <>
      <div className="OrderItem">
        <div className="orderImage">
          {/* eslint-disable-next-line*/}
          <img
            src={image[Object.keys(image)[0]]?.url?.resize}
            alt={image[Object.keys(image)[0]]?.alt}
          />
        </div>
        <div className="orderContent">
          <p>
            <Link>{gigs?.title}</Link>
          </p>
          <div className="reviews">
            <span className="fill">
              <i className="fas fa-star"></i>
            </span>
            <span className="fill">
              <i className="fas fa-star"></i>
            </span>
            <span className="fill">
              <i className="fas fa-star"></i>
            </span>
            <span className="fill">
              <i className="fas fa-star"></i>
            </span>
            <span className="fill">
              <i className="fas fa-star"></i>
            </span>
            <span>
              <b>{gigs?.seller?.rating?.average_rating}</b>(12344 reviews)
            </span>
          </div>
          <span className="whatsInclude" onClick={handleClick}>
            {show ? "Hide" : "View"} What included{" "}
            {show ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}{" "}
          </span>
        </div>
        <div className="cardPricing">
          <div className="qtyForm">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label sm="4">Qty</Form.Label>
              <Col sm="8">
                <Form.Control size="sm" as="select" onChange={handleGigNumber}>
                  {[...Array(20).keys()].map((item, index) => (
                    <option value={item + 1} key={index}>
                      {item + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </div>
          <div className="orderPrice">
            <b>$ {price}</b>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderItem;
