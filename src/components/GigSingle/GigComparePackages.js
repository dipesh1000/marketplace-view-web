import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { checkGigUser } from "../../utils/Helper";
import "./styles/style.css";

function GigComparePackages({ values, setValues }) {
  const { gigs } = useSelector((state) => state.gigDetails, shallowEqual);

  const handleOrderItem = (val1, val2) => {
    setValues({ ...values, [val1]: val2 });
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
  const findPackageMeta = (meta_id, gigPackages) => {
    return gigPackages?.find((i) => i.meta_id === meta_id);
  };

  const getPrice = (item, index) => {
    return values[index]
      ? item?.extra_fast_price + item?.price
      : 0 + item?.price;
  };
  return (
    <>
      <div id="comparepackages" className="comparePackageWrapper">
        <h4>Compare Packages</h4>
        <div className="packageTable">
          <Table striped bordered hover>
            <tr className="packageType">
              <th>Package</th>
              {gigs?.gig_packages.map((item) => (
                <td key={item.id}>
                  <p className="price">${item?.price}</p>
                  <h6 className="packageType">{item?.package_title}</h6>
                  <b className="packageName">{item?.title}</b>
                </td>
              ))}
            </tr>
            <tr className="packageDetails">
              <th></th>
              <td>
                <p>{gigs?.gig_packages[0]?.description}</p>
              </td>
              <td>
                <p>{gigs?.gig_packages[1]?.description}</p>
              </td>
              <td>
                <p>{gigs?.gig_packages[2]?.description}</p>
              </td>
            </tr>
            {gigs?.compare_package_metas.map((feature, index) => (
              <tr key={index} className="packageFeature">
                <th>{feature.title}</th>
                {findPackageMeta(feature.meta_id, gigs?.gig_packages[0].metas)
                  .type === "Select" ? (
                  <td>
                    {findPackageMeta(
                      feature.meta_id,
                      gigs?.gig_packages[0].metas
                    ).value || 0}
                  </td>
                ) : (
                  <td>
                    <span
                      className={`${
                        findPackageMeta(
                          feature.meta_id,
                          gigs?.gig_packages[0].metas
                        ).value === "" ||
                        findPackageMeta(
                          feature.meta_id,
                          gigs?.gig_packages[0].metas
                        ).value === "off"
                          ? ""
                          : "check"
                      }`}
                    >
                      <FaCheck />
                    </span>
                  </td>
                )}
                {findPackageMeta(feature.meta_id, gigs?.gig_packages[1].metas)
                  .type === "Select" ? (
                  <td>
                    {findPackageMeta(
                      feature.meta_id,
                      gigs?.gig_packages[1].metas
                    ).value || 0}
                  </td>
                ) : (
                  <td>
                    <span
                      className={`${
                        findPackageMeta(
                          feature.meta_id,
                          gigs?.gig_packages[1].metas
                        ).value === "" ||
                        findPackageMeta(
                          feature.meta_id,
                          gigs?.gig_packages[1].metas
                        ).value === "off"
                          ? ""
                          : "check"
                      }`}
                    >
                      <FaCheck />
                    </span>
                  </td>
                )}
                {findPackageMeta(feature.meta_id, gigs?.gig_packages[1].metas)
                  .type === "Select" ? (
                  <td>
                    {findPackageMeta(
                      feature.meta_id,
                      gigs?.gig_packages[1].metas
                    ).value || 0}
                  </td>
                ) : (
                  <td>
                    <span
                      className={`${
                        findPackageMeta(
                          feature.meta_id,
                          gigs?.gig_packages[2].metas
                        ).value === "" ||
                        findPackageMeta(
                          feature.meta_id,
                          gigs?.gig_packages[2].metas
                        ).value === "off"
                          ? ""
                          : "check"
                      }`}
                    >
                      <FaCheck />
                    </span>
                  </td>
                )}
              </tr>
            ))}
            <tr className="packageFeature">
              <th>Delivery Time</th>
              <td>
                {gigs?.gig_packages[0]?.extra_fast_day === null ? (
                  <>{gigs?.gig_packages[0]?.delivery_duration} Days</>
                ) : (
                  <div className="radioWrapper">
                    <div className="radioItem radioInner">
                      <label
                        onClick={() => handleOrderItem(0, false)}
                        htmlFor="basic"
                      >
                        <input
                          type="radio"
                          id="basic"
                          name="basic"
                          value={gigs?.gig_packages[0]?.delivery_duration}
                        />
                        {gigs?.gig_packages[0]?.delivery_duration} Days
                      </label>
                    </div>
                    <div className="radioItem">
                      <label
                        onClick={() => handleOrderItem(0, true)}
                        htmlFor="basicExtra"
                      >
                        <input
                          type="radio"
                          id="basicExtra"
                          name="basic"
                          value={gigs?.gig_packages[0]?.extra_fast_day}
                        />
                        {gigs?.gig_packages[0]?.extra_fast_day} Days
                      </label>
                      <div className="text-center">
                        (+${gigs?.gig_packages[0]?.extra_fast_price})
                      </div>
                    </div>
                  </div>
                )}
              </td>
              <td>
                {gigs?.gig_packages[1]?.extra_fast_day === null ? (
                  <>{gigs?.gig_packages[1]?.delivery_duration} Days</>
                ) : (
                  <div className="radioWrapper">
                    <div className="radioItem radioInner">
                      <label
                        onClick={() => handleOrderItem(1, false)}
                        htmlFor="standard"
                      >
                        <input
                          type="radio"
                          id="standard"
                          name="standard"
                          value="0"
                        />
                        {gigs?.gig_packages[1]?.delivery_duration} Days
                      </label>
                    </div>
                    <div className="radioItem">
                      <label
                        onClick={() => handleOrderItem(1, true)}
                        htmlFor="standardExtra"
                      >
                        <input
                          type="radio"
                          id="standardExtra"
                          name="standard"
                          value="1"
                        />
                        {gigs?.gig_packages[1]?.extra_fast_day} Days
                      </label>
                      <div className="text-center">
                        (+${gigs?.gig_packages[1]?.extra_fast_price})
                      </div>
                    </div>
                  </div>
                )}
              </td>
              <td>
                {gigs?.gig_packages[2]?.extra_fast_day === null ? (
                  <>{gigs?.gig_packages[2]?.delivery_duration} Days</>
                ) : (
                  <div className="radioWrapper">
                    <div className="radioItem radioInner">
                      <label
                        onClick={() => handleOrderItem(2, false)}
                        htmlFor="premium"
                      >
                        <input
                          type="radio"
                          id="premium"
                          name="premium"
                          value="premium"
                        />
                        {gigs?.gig_packages[2]?.delivery_duration} Days
                      </label>
                    </div>
                    <div className="radioItem">
                      <label
                        onClick={() => handleOrderItem(2, true)}
                        htmlFor="premiumExtra"
                      >
                        <input
                          type="radio"
                          id="premiumExtra"
                          name="premium"
                          value="premiumExtra"
                        />
                        {gigs?.gig_packages[2]?.extra_fast_day} Days
                      </label>
                      <div className="text-center">
                        (+${gigs?.gig_packages[2]?.extra_fast_price})
                      </div>
                    </div>
                  </div>
                )}
              </td>
            </tr>
            {!checkGigUser(gigs?.seller?.username) && (
              <tr className="packageFeature">
                <th>Total</th>
                <td>
                  <div className="totalPrice">
                    ${getPrice(gigs?.gig_packages[0], 0)}
                  </div>
                  <Button
                    className="selectBtn"
                    onClick={() => handleHistory(gigs?.slug, 0)}
                  >
                    Select
                  </Button>
                </td>
                <td>
                  <div className="totalPrice">
                    ${getPrice(gigs?.gig_packages[1], 1)}
                  </div>
                  <Button
                    className="selectBtn"
                    onClick={() => handleHistory(gigs?.slug, 1)}
                  >
                    Select
                  </Button>
                </td>
                <td>
                  <div className="totalPrice">
                    ${getPrice(gigs?.gig_packages[2], 2)}
                  </div>
                  <Button
                    className="selectBtn"
                    onClick={() => handleHistory(gigs?.slug, 2)}
                  >
                    Select
                  </Button>
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>
    </>
  );
}

export default GigComparePackages;
