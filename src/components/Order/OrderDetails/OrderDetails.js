import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import OrderLayout from "../OrderLayout";
import MainContent from "./MainContent";
import SideBar from "./SideBar";
import "./styles/OrderDetails.scss";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {sendCheckoutData} from "../redux/action";

function OrderDetails({orderItem, gigs}) {
	let price =
		gigs?.gig_packages && gigs?.gig_packages[orderItem?.packageIndex]?.price;
	let extra_day = orderItem?.hasExtraDeliveryDuration
		? gigs?.gig_packages[orderItem?.packageIndex]?.extra_fast_day
		: 0;
	let days =
		gigs?.gig_packages &&
		gigs?.gig_packages[orderItem?.packageIndex]?.delivery_duration;
	let subPrice = orderItem?.hasExtraDeliveryDuration
		? gigs?.gig_packages[orderItem?.packageIndex]?.extra_fast_price
		: 0;
	let extraDays = orderItem?.hasExtraDeliveryDuration
		? gigs?.gig_packages[orderItem?.packageIndex]?.extra_fast_day
		: 0;
	let gigPackageMeta =
		gigs?.gig_packages && gigs?.gig_packages[orderItem?.packageIndex]?.metas;

	let gigPackageTitle = gigs?.gig_packages && {
		title: gigs?.gig_packages[orderItem?.packageIndex].package_title,
		description: gigs?.gig_packages[orderItem?.packageIndex].title,
		revision: gigs?.gig_packages[orderItem?.packageIndex].revision,
	};

	const [initialPrice, setInitialPrice] = useState(price);
	const [subTotal, setSubTotal] = useState();
	const [totalDays, setTotalDays] = useState();
	// const [gigPackageMeta, setGigPackageMeta] = useState(gig_package_meta)
	const handleInitialPrice = value => {
		setInitialPrice(value);
	};

	const handleSubtotal = (condition, value, day) => {
		let latestPrice = subTotal >= 0 ? subTotal : subPrice;
		let latestDays = totalDays >= 0 ? totalDays : extraDays;
		condition === "add" && setSubTotal(latestPrice + Number(value));
		condition === "sub" && setSubTotal(latestPrice - Number(value));
		condition === "add" && setTotalDays(latestDays + Number(day));
		condition === "sub" && setTotalDays(latestDays - Number(day));
	};

	const [extraServices, setExtraServices] = useState();
	const [extraMeta, setExtraMeta] = useState();
	const [customExtraServices, setCustomExtraServices] = useState();

	const findExtraTotal = () => {
		return (
			extraServices &&
			Object.keys(extraServices)
				.map(item => extraServices[item]?.quantity * extraServices[item]?.price)
				.reduce((total, list) => total + (list || 0))
		);
	};

	const findExtraTotalDays = () => {
		return (
			extraServices &&
			Object.keys(extraServices)
				.map(item => extraServices[item]?.days)
				.reduce((total, list) => total + (list || 0))
		);
	};

	const findMetaTotal = () => {
		return (
			extraMeta &&
			Object.keys(extraMeta)
				.map(item => extraMeta[item]?.quantity * extraMeta[item]?.price)
				.reduce((total, list) => total + (list || 0))
		);
	};

	const findMetaTotalDays = () => {
		return (
			extraMeta &&
			Object.keys(extraMeta)
				.map(item => extraMeta[item]?.days)
				.reduce((total, list) => total + (list || 0))
		);
	};

	const findCustomExtraTotal = () => {
		return (
			customExtraServices &&
			Object.keys(customExtraServices)
				.map(
					item =>
						customExtraServices[item]?.quantity *
						customExtraServices[item]?.price
				)
				.reduce((total, list) => total + (list || 0))
		);
	};
	const findCustomExtraTotalDays = () => {
		return (
			customExtraServices &&
			Object.keys(customExtraServices)
				.map(item => customExtraServices[item]?.days)
				.reduce((total, list) => total + (list || 0))
		);
	};
	const findextra_services = () => {
		return (
			extraServices &&
			Object.keys(extraServices)
				.map(item => {
					return {
						quantity: extraServices[item]?.quantity,
						id: extraServices[item]?.id,
					};
				})
				.filter(item => item.quantity)
		);
	};
	const findextra_meta = () => {
		return (
			extraMeta &&
			Object.keys(extraMeta)
				.map(item => {
					return {
						quantity: extraMeta[item]?.quantity,
						id: extraMeta[item]?.id,
					};
				})
				.filter(item => item.quantity)
		);
	};
	const findcustom_extra_services = () => {
		return (
			customExtraServices &&
			Object.keys(customExtraServices)
				.map(item => {
					return {
						quantity: customExtraServices[item]?.quantity,
						id: customExtraServices[item]?.id,
					};
				})
				.filter(item => item.quantity)
		);
	};
	const [initialValues, setInitialValues] = useState({
		gig_id: gigs?.id,
		gig_package_id: gigs?.gig_packages[orderItem?.packageIndex]?.id,
		has_extra_delivery: orderItem?.hasExtraDeliveryDuration,
		extra_services: findextra_services() || [],
		quantity: "1",
		custom_extra_services: findcustom_extra_services() || [],
		per_package_meta: findextra_meta() || [],
	});
	const history = useHistory();
	const handleHistory = data => {
		history.push({
			pathname: `/checkout/payments/${data?.order_code}`,
		});
	};
	const dispatch = useDispatch();
	const onSubmit = async () => {
		await dispatch(
			sendCheckoutData(
				{
					...initialValues,
					per_package_meta: findextra_meta() || [],
					extra_services: findextra_services() || [],
					custom_extra_services: findcustom_extra_services() || [],
				},
				handleHistory
			)
		);
	};
	return (
    <>
      {gigs ? (
        <OrderLayout>
          <div className="OrderDetailMain">
            <Container>
              {/* <Row>
              <div className="alertRequirment">
                <FaInfoCircle />
                <span>
                  Hey! aahna_va is waiting for your requirements right after you
                  complete the order
                </span>
                <Link to="/">Okay, got it</Link>
              </div>
            </Row> */}
              <Row>
                <Col md={8}>
                  <MainContent
                    handleSubtotal={handleSubtotal}
                    handleInitialPrice={handleInitialPrice}
                    orderItem={orderItem}
                    extraMeta={extraMeta}
                    setExtraMeta={setExtraMeta}
                    extraServices={extraServices}
                    setExtraServices={setExtraServices}
                    customExtraServices={customExtraServices}
                    setCustomExtraServices={setCustomExtraServices}
                    gigs={gigs}
                    initialValues={initialValues}
                    gigPackageMeta={gigPackageMeta}
                    gigPackageTitle={gigPackageTitle}
                    setInitialValues={setInitialValues}
                  />
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                  <SideBar
                    shipping_days={gigs?.gig_packages[0]?.shipping_days}
                    onSubmit={onSubmit}
                    serviceCharge={gigs?.service_charge}
                    extraServiceTotal={findExtraTotal()}
                    extraMetaTotal={findMetaTotal()}
                    customExtraServiceTotal={findCustomExtraTotal()}
                    extraServiceTotalDays={findExtraTotalDays()}
                    extraMetaTotalDays={findMetaTotalDays()}
                    customExtraServiceTotalDays={findCustomExtraTotalDays()}
                    subTotal={subTotal >= 0 ? subTotal : subPrice}
                    totalDays={totalDays >= 0 ? totalDays : extraDays}
                    initialDays={days - extra_day}
                    initialPrice={initialPrice || price}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </OrderLayout>
      ) : (
        <>Loading ...</>
      )}
    </>
  );
}

export default OrderDetails;
