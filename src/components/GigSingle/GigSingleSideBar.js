import React, { useEffect, useState } from "react";
import { Button, Modal, Nav, Tab, Tabs } from "react-bootstrap";
import { FaRegClock, FaShippingFast } from "react-icons/fa";
import { BiRevision } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ReportForm from "./ReportForm";
import { FaCheck } from "react-icons/fa";
import { openModal } from "../../redux/Modal/Modal.action";
import { checkGigUser } from "../../utils/Helper";

const GigSingleSideBar = ({ values }) => {
  const { gigs } = useSelector((state) => state.gigDetails, shallowEqual);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () =>
    isAuthenticated ? setShow(true) : dispatch(openModal("login"));

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 127) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.removeEventListener("scroll", handleScroll);
  });
  let navbarClasses = ["navbar"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }
  const getPrice = (item, index) => {
    return values[index]
      ? item?.extra_fast_price + item?.price
      : 0 + item?.price;
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
  
  return (
    <div className="GigPackagewrapperSticky">
      <div className="GigPackagewrapper">
        {gigs?.hasMultiplePackage ? (
          <Tabs
            defaultActiveKey={gigs?.gig_packages[0]?.package_id}
            transition={false}
            id="noanim-tab-example"
          >
            {gigs?.gig_packages?.map((item, index) => {
              return (
                <Tab
                  key={item.package_id}
                  eventKey={item.package_id}
                  title={item.package_title}
                >
                  <div className="GigPackagewrapperInner">
                    <div className="GigPackageTitle">
                      <h5>{item.title}</h5>
                      <span>${getPrice(item, index)}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="GigPackageFeature">
                      <h6>
                        <FaRegClock /> {item?.delivery_duration} days
                      </h6>
                      {item?.revision && (
                        <h6>
                          <BiRevision /> {item?.revision} revisions
                        </h6>
                      )}
                      {item.shipping_days ? (
                        <h6>
                          <FaShippingFast /> {item.shipping_days} Days
                        </h6>
                      ) : null}
                    </div>
                    {/* <GigPackagesTabs /> */}
                    <div className="GigPackageListItems">
                      {item?.metas
                        .filter((i) => i.type === "Checkbox")
                        .map((meta) => (
                          <div className="ListItem" key={meta?.id}>
                            <FaCheck
                              className={` ${
                                meta.value === "" || meta.value === "off"
                                  ? ""
                                  : "active"
                              }`}
                            />
                            <p>{meta.title}</p>
                          </div>
                        ))}
                    </div>
                    {!checkGigUser(gigs?.seller?.username) && (
                      <Button
                        className="continueBtn"
                        onClick={() => handleHistory(gigs?.slug, index)}
                      >
                        Continue $ {getPrice(item, index)}
                      </Button>
                    )}
                    <Nav.Link href="#comparepackages">
                      Compare Packages
                    </Nav.Link>
                  </div>
                </Tab>
              );
            })}
          </Tabs>
        ) : (
          gigs?.gig_packages
            .filter((i) => i.status === 1)
            .map((item) => {
              return (
                <div className="GigPackagewrapperInner" key={item?.id}>
                  <div className="GigPackageTitle">
                    <h5>{item.title}</h5>
                    <span>${getPrice(item, 0)}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className="GigPackageFeature">
                    <h6>
                      <FaRegClock /> {item.delivery_duration} days
                    </h6>
                    {item.revision && (
                      <h6>
                        <BiRevision /> {item.revision} Revisions
                      </h6>
                    )}
                    {item.shipping_days ? (
                      <h6>
                        <FaShippingFast /> {item.shipping_days} Days
                      </h6>
                    ) : null}
                  </div>

                  <div className="GigPackageListItems">
                    {item?.metas
                      .filter((i) => i.type === "Checkbox")
                      .map((meta) => (
                        <div className="ListItem" key={meta?.id}>
                          <FaCheck
                            className={` ${meta.value === "" ? "" : "active"}`}
                          />
                          <p>{meta.title}</p>
                        </div>
                      ))}
                  </div>
                  {!checkGigUser(gigs?.seller?.username) && (
                    <Button
                      className="continueBtn"
                      onClick={() => handleHistory(gigs?.slug, 0)}
                    >
                      Continue $ {getPrice(item, 0)}
                    </Button>
                  )}
                  <Nav.Link href="#comparepackages">Compare Packages</Nav.Link>
                </div>
              );
            })
        )}
      </div>
      {!checkGigUser(gigs?.seller?.username) && (
        <>
          <div className="actionBtn">
            <div className="ContactSellerBtn">
              <Button
                variant="outline-secondary"
                onClick={() =>
                  isAuthenticated
                    ? dispatch(openModal("sendMessageModal", gigs?.seller?.id))
                    : dispatch(openModal("login"))
                }
              >
                Contact Seller
              </Button>
            </div>
            <div className="ContactSellerBtn">
              <Button variant="outline-danger" onClick={handleShow}>
                Report This Gig
              </Button>
            </div>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modalwrapper"
          >
            <Modal.Header closeButton>
              <div className="modal-title">Report This Gig</div>
            </Modal.Header>
            <Modal.Body>
              <ReportForm handleClose={handleClose} id={gigs?.id} />
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default GigSingleSideBar;
