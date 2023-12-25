import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Modal } from "react-bootstrap";
import { HiShare, HiHeart } from "react-icons/hi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IoFlag } from "react-icons/io5";
import ReportForm from "./ReportForm";
import { postGig } from "../List/redux/Action";
import { openModal } from "../../redux/Modal/Modal.action";

function GigSingleNav({ slug }) {
  const { gigs } = useSelector((state) => state.gigDetails, shallowEqual);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    isAuthenticated ? setShow(true) : dispatch(openModal("login"));
  };
  const fetchType = "singleGig";

  const handleAdd = () => {
    isAuthenticated
      ? dispatch(postGig({ gig_id: gigs?.id }, fetchType, slug))
      : dispatch(openModal("login"));
  };
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 127) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  const handlePdfClick = (file) => {
    window.open(file, "_blank");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.removeEventListener("scroll", handleScroll);
  }, []);
  let navbarClasses = ["navbar"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }
  return (
    <>
      <div
        className={` ${
          scrolled === true ? "fixed-top" : ""
        } gigSingleNavWrapper`}
      >
        <Navbar expand="lg" bg="white" className="gigSingleNav">
          <Container>
            <Nav
              className="mr-auto my-2 my-lg-0 gigSingleNavbar"
              // navbarScroll
              defaultActiveKey="#overview"
            >
              <Nav.Link href="#overview">Overview</Nav.Link>
              <Nav.Link href="#abouttheseller">About The Seller</Nav.Link>
              <Nav.Link href="#comparepackages">Compare Packages</Nav.Link>
              <Nav.Link href="#reviews">Reviews</Nav.Link>
            </Nav>
            <div className="justify-content-end">
              <div className="mainRightNav">
                {gigs?.gig_file?.map((file) => (
                  <div
                    key={file?.id}
                    className="RightNavFont"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={file?.name}
                    onClick={() => handlePdfClick(file?.url)}
                  >
                    <AiOutlineFilePdf className="navFont pdf" />
                  </div>
                ))}
                <div
                  className={`RightNavFont ${
                    gigs?.is_wishlist ? "gig-single-like" : ""
                  }`}
                  onClick={handleAdd}
                >
                  <HiHeart
                    className={`navFont ${gigs?.is_wishlist ? "like" : ""}`}
                    title="Like"
                  />
                </div>
                <span className="navFontCounter">
                  {gigs?.wishlist_count || 0}
                </span>
                <div
                  className="RightNavFont"
                  title="Report"
                  onClick={handleShow}
                >
                  <IoFlag className="navFont report-button" />
                  {/* <FaFlag className='navFont report-button' /> */}
                  {/* <BsFlagFill className='navFont report-button' /> */}
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
                <Link
                  className="share-button"
                  to={{
                    pathname: `https://facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=zrROdKbBX3k`,
                  }}
                  target="_blank"
                >
                  <div className="RightNavFont" title="Share">
                    <HiShare className="navFont fontShareicon" />
                  </div>
                </Link>
              </div>
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default GigSingleNav;
