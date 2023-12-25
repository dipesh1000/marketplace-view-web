import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export const ExtraFastDay = ({
  gigPackage,
  handleSubtotal,
  setInitialValues,
  initialValues,
  hasExtraDelivery,
}) => {
  const [check, setCheck] = useState(hasExtraDelivery);
  const handleChange = (e) => {
    setCheck((prev) => !prev);
    !check &&
      handleSubtotal(
        "add",
        gigPackage?.extra_fast_price,
        gigPackage?.extra_fast_day
      );
    !check && setInitialValues({ ...initialValues, has_extra_delivery: true });
    check &&
      handleSubtotal(
        "sub",
        gigPackage?.extra_fast_price,
        gigPackage?.extra_fast_day
      );
    check &&
      setInitialValues({
        ...initialValues,
        has_extra_delivery: false,
      });
  };
  return (
    <div className="addExtra">
      <div className="details">
        <Form.Check
          type="checkbox"
          id={`default-checkbox-delivery`}
          checked={check ? true : false}
          label={`Extra Fast ${gigPackage?.extra_fast_day} Day Delivery`}
          onChange={handleChange}
        />
      </div>
      <div className="addpricing">
        <span>${gigPackage?.extra_fast_price} </span>
      </div>
    </div>
  );
};

// export const PackagePriceMeta = ({
//   item,
//   handleSubtotal,
//   setInitialValues,
//   initialValues,
// }) => {
//   const [check, setCheck] = useState(false);
//   const handleChange = (price, days, id) => {
//     setCheck((prev) => !prev);
//     !check && handleSubtotal("add", price, days);
//     !check && initialValues.per_package_meta.push(id);
//     check && handleSubtotal("sub", price, days);
//     check &&
//       setInitialValues({
//         ...initialValues,
//         per_package_meta: initialValues.per_package_meta.filter(
//           (list) => list != id
//         ),
//       });
//   };
//   return (
//     <div className="addExtra">
//       <div className="details">
//         <Form.Check
//           type="checkbox"
//           onChange={() =>
//             handleChange(item.additional_price, item.additional_value, item.id)
//           }
//           id={`default-checkbox-${item.id}`}
//           checked={check ? true : false}
//           label={`${item.title} (+${item.additional_value} Day)`}
//           price={item.additional_price}
//         />
//       </div>
//       <div className="addpricing">
//         <span>${item.additional_price}</span>
//       </div>
//     </div>
//   );
// };

export const PackagePriceMeta = ({ item, extraMeta, setExtraMeta }) => {
  const [check, setCheck] = useState(false);
  const [newPrice, setPrice] = useState(item.additional_price);

  const handleChange = (price, quantity = 1, days, id, isCheck = true) => {
    isCheck && setCheck((prev) => !prev);
    !check &&
      setExtraMeta({
        ...extraMeta,
        [item.id]: {
          id: id,
          quantity: quantity,
          days: days,
          price: price,
        },
      });
    check &&
      setExtraMeta({
        ...extraMeta,
        [item.id]: null,
      });
    check && setPrice(price);
  };
  const handleQuantity = (e, price, days, id) => {
    setPrice(price * e.target.value);
    setExtraMeta({
      ...extraMeta,
      [item.id]: {
        id: id,
        quantity: e.target.value,
        days: days,
        price: price,
      },
    });
  };

  return (
    <div className="addExtra">
      <div className="details">
        <Form.Check
          type="checkbox"
          onChange={() =>
            handleChange(
              item.additional_price,
              1,
              item.additional_value,
              item.id
            )
          }
          id={`default-checkbox-${item.id}`}
          checked={check ? true : false}
          label={`${item.title} (+${item.additional_value} Day)`}
        />
      </div>
      <div className="extra-holder">
        {check && (
          <div className="qty-Form">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label sm="4">Qty</Form.Label>
              <Col sm="8">
                <Form.Control
                  size="sm"
                  as="select"
                  onChange={(e) =>
                    handleQuantity(
                      e,
                      item.additional_price,
                      item.additional_value,
                      item.id
                    )
                  }
                >
                  {[...Array(20).keys()]?.map((item) => (
                    <option value={item + 1}>{item + 1}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </div>
        )}
        <div className="addpricing">
          <span>${newPrice}</span>
        </div>
      </div>
    </div>
  );
};

export const ExtraService = ({ item, extraServices, setExtraServices }) => {
  const [check, setCheck] = useState(false);
  const [newPrice, setPrice] = useState(item.extra_price);
  const handleChange = (price, quantity = 1, days, id, isCheck = true) => {
    isCheck && setCheck((prev) => !prev);
    !check &&
      setExtraServices({
        ...extraServices,
        [item.id]: {
          id: id,
          quantity: quantity,
          days: days,
          price: price,
        },
      });
    check &&
      setExtraServices({
        ...extraServices,
        [item.id]: null,
      });
    check && setPrice(price);
  };
  const handleQuantity = (e, price, days, id) => {
    setPrice(price * e.target.value);
    setExtraServices({
      ...extraServices,
      [item.id]: {
        id: id,
        quantity: e.target.value,
        days: days,
        price: price,
      },
    });
  };

  return (
    <div className="addExtra">
      <div className="details">
        <Form.Check
          type="checkbox"
          onChange={() =>
            handleChange(item.extra_price, 1, item.additional_day, item.id)
          }
          id={`default-checkbox-${item.id}`}
          checked={check ? true : false}
          label={
            `${item.title}` +
            (item.additional_day ? `(+${item.additional_day} Day)` : "")
          }
        />
      </div>
      <div className="extra-holder">
        {check && (
          <div className="qty-Form">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label sm="4">Qty</Form.Label>
              <Col sm="8">
                <Form.Control
                  size="sm"
                  as="select"
                  onChange={(e) =>
                    handleQuantity(
                      e,
                      item.extra_price,
                      item.additional_day,
                      item.id
                    )
                  }
                >
                  {[...Array(20).keys()]?.map((item) => (
                    <option value={item + 1}>{item + 1}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </div>
        )}
        <div className="addpricing">
          <span>${newPrice}</span>
        </div>
      </div>
    </div>
  );
};

export const CustomExtraService = ({
  item,
  customExtraServices,
  setCustomExtraServices,
}) => {
  const [check, setCheck] = useState(false);
  const [newPrice, setPrice] = useState(item.extra_price);

  const handleChange = (price, quantity = 1, days, id, isCheck = true) => {
    isCheck && setCheck((prev) => !prev);
    !check &&
      setCustomExtraServices({
        ...customExtraServices,
        [item.id]: {
          id: id,
          quantity: quantity,
          days: days,
          price: price,
        },
      });
    check &&
      setCustomExtraServices({
        ...customExtraServices,
        [item.id]: null,
      });
    check && setPrice(price);
  };
  const handleQuantity = (e, price, days, id) => {
    setPrice(price * e.target.value);
    setCustomExtraServices({
      ...customExtraServices,
      [item.id]: {
        id: id,
        quantity: e.target.value,
        days: days,
        price: price,
      },
    });
  };
  return (
    <div className="addExtra">
      <div className="details">
        <Form.Check
          type="checkbox"
          onChange={() =>
            handleChange(item.extra_price, 1, item.additional_day, item.id)
          }
          id={`default-checkbox-${item.id}`}
          checked={check ? true : false}
          label={`${item.title} (+${item.additional_day} Day)`}
        />
        <div className="detailsLevel">
          <p>{item.description}</p>
        </div>
      </div>
      <div className="extra-holder">
        {check && (
          <div className="qty-Form">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label sm="4">Qty</Form.Label>
              <Col sm="8">
                <Form.Control
                  size="sm"
                  as="select"
                  onChange={(e) =>
                    handleQuantity(
                      e,
                      item.extra_price,
                      item.additional_day,
                      item.id
                    )
                  }
                >
                  {[...Array(20).keys()]?.map((item) => (
                    <option value={item + 1}>{item + 1}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          </div>
        )}
        <div className="addpricing">
          <span>${newPrice}</span>
        </div>
      </div>
    </div>
  );
};
