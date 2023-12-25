import React, {useState} from "react";
import { FaRegClock, FaShippingFast } from "react-icons/fa";
import {BiRevision} from "react-icons/bi";
import {Button, Form} from "react-bootstrap";
import {FaCheck} from "react-icons/fa";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {openModal} from "../../redux/Modal/Modal.action";
import {checkGigUser} from "../../utils/Helper";

function GigSinglePackage({values, setValues}) {
	const {gigs} = useSelector(state => state.gigDetails, shallowEqual);
	const {isAuthenticated} = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const [updatePrice, setUpdatePrice] = useState();
	const [check, setCheck] = useState(true);
	const handleOrderItem = () => {
		setCheck(prev => !prev);
		// eslint-disable-next-line
		setValues({...values, [0]: check});
		check &&
			setUpdatePrice(
				gigs?.gig_packages[0]?.price + gigs?.gig_packages[0]?.extra_fast_price
			);
		!check && setUpdatePrice(gigs?.gig_packages[0]?.price);
	};
	const history = useHistory();
	const handleHistory = (slug, packageIndex) => {
		slug &&
			history.push({
				pathname: `/checkout/customize/${slug}`,
				state: {
					packageIndex: packageIndex,
					hasExtraDeliveryDuration: values[packageIndex] || false,
				},
			});
	};
	//   useEffect(() => {
	//     setUpdatePrice(gigs?.gig_packages[0]?.price * val);
	//   }, [val]);
	return (
		<div id='comparepackages' className='gigSinglePackage'>
			<h3 className='gigSingleTitle'>Order Details</h3>
			{gigs?.gig_packages
				.filter(i => i.status === 1)
				.map((item, index) => {
					return (
            <div key={index} className="orderDetails">
              <div className="orderDetailsInner">
                <h3>{item?.title}</h3>
                <p>{item?.description}</p>
                <div className="GigPackageFeature">
                  <h6>
                    <FaRegClock /> {item?.delivery_duration} days
                  </h6>
                  <h6>
                    <BiRevision /> 5 Revisions
                  </h6>
                  {item.shipping_days ? (
                    <h6>
                      <FaShippingFast /> {item.shipping_days} Days
                    </h6>
                  ) : null}
                </div>
                <div className="orderFeature">
                  {item?.metas
                    .filter((i) => i.type === "Checkbox")
                    .map((feature, index) => {
                      return (
                        <div key={index} className="featureItem">
                          <span
                            className={`${
                              feature.value === "" ? "" : "active"
                            }`}
                          >
                            <FaCheck />
                          </span>
                          {feature?.title}
                        </div>
                      );
                    })}
                </div>
                {/* <hr /> */}
                {/* <div className="gigQuantity">
                                        <b>Gig Quantity</b>
                                        <Form.Control as="select" onChange={handleChange}>
                                            <option value="5">1</option>
                                            <option value="10">2</option>
                                            <option value="15">3</option>
                                            <option value="20">4</option>
                                        </Form.Control>
                                    </div> */}
              </div>
              {gigs?.gig_packages[0]?.extra_fast_day == null ? null : (
                <div className="extraService">
                  <div className="extraServiceItem">
                    <Form.Check
                      type="checkbox"
                      id={`default-checkbox`}
                      label={`Delivery Time (+ ${gigs?.gig_packages[0]?.extra_fast_day} day)`}
                      value={true}
                      onChange={handleOrderItem}
                    />
                    <span>$5</span>
                  </div>
                </div>
              )}
              {!checkGigUser(gigs?.seller?.username) && (
                <div className="contBtn">
                  <Button
                    onClick={() =>
                      isAuthenticated
                        ? handleHistory(gigs?.slug, 0)
                        : dispatch(openModal("login"))
                    }
                  >
                    Continue ($
                    {updatePrice ? updatePrice : gigs?.gig_packages[0]?.price})
                  </Button>
                </div>
              )}
            </div>
          );
				})}
		</div>
	);
}

export default GigSinglePackage;
