import React, { useState } from "react";
import useTitle from "../../../utils/useTitle";
import {
  CustomExtraService,
  ExtraFastDay,
  ExtraService,
  PackagePriceMeta,
} from "./AddExtraSevice";
import OrderItem from "./OrderItem";
import Services from "./Services";

function MainContent({
  orderItem,
  handleSubtotal,
  handleInitialPrice,
  extraServices,
  extraMeta,
  setExtraMeta,
  customExtraServices,
  setExtraServices,
  setCustomExtraServices,
  initialValues,
  setInitialValues,
  gigs,
  gigPackageMeta,
  gigPackageTitle,
}) {
  const serviceFilter = () => {
    return gigs?.extra_services?.filter(
      (item) =>
        !gigPackageMeta.some(
          (meta) =>
            meta.meta_id === item.meta_id &&
            meta.value !== "" &&
            meta.value !== "off"
        )
    );
  };

  const [show, setShow] = useState(false);
  useTitle("Order Details");
  return (
    <div className="orderDetailsWrapper">
      <div className="orderTitle">
        <h3>Customize Your Package</h3>
      </div>
      <OrderItem
        gigs={gigs}
        handleInitialPrice={handleInitialPrice}
        show={show}
        setShow={setShow}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        packageIndex={orderItem?.packageIndex || 0}
      />
      <div className={show ? "" : "d-none"}>
        <Services
          gigPackageMeta={gigPackageMeta}
          gigPackageTitle={gigPackageTitle}
        />
      </div>
      <hr />
      <div className="addExtraService">
        <div className="extraHeader">
          <h6>Add Extras</h6>
        </div>

        {gigs?.gig_packages[orderItem?.packageIndex]
          ?.has_extra_fast_delivery ? (
          <ExtraFastDay
            gigPackage={gigs?.gig_packages[orderItem?.packageIndex]}
            handleSubtotal={handleSubtotal}
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            hasExtraDelivery={orderItem?.hasExtraDeliveryDuration}
          />
        ) : null}
        <></>
        {gigs?.gig_packages &&
          gigs?.gig_packages[orderItem?.packageIndex]?.package_price_meta?.map(
            (item) => (
              <PackagePriceMeta
                item={item}
                extraMeta={extraMeta}
                setExtraMeta={setExtraMeta}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                key={item.id}
              />
            )
          )}
        {serviceFilter().map((item) => (
          <ExtraService
            item={item}
            extraServices={extraServices}
            setExtraServices={setExtraServices}
            handleSubtotal={handleSubtotal}
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            key={item.id}
          />
        ))}
        {gigs?.custom_extra_services?.map((item) => (
          <CustomExtraService
            item={item}
            customExtraServices={customExtraServices}
            setCustomExtraServices={setCustomExtraServices}
            handleSubtotal={handleSubtotal}
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}

export default MainContent;
