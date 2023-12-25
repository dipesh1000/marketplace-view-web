import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/Modal/Modal.action";
import CreateOfferBuyerRequest from "../../BuyerRequest/createOffer/CreateOffer";
import SelectGigBuyerRequest from "../../BuyerRequest/createOffer/SelectGig";
import AccountComplete from "../../BuyerToSeller/AccountSecurity/AccountComplete";
import AccountPhoneVarification from "../../BuyerToSeller/AccountSecurity/AccountPhoneVarification";
import AccountSecurityForm from "../../BuyerToSeller/AccountSecurity/AccountSecurityForm";
import CreateOffer from "../../chat/createOffer/CreateOffer";
import SelectGig from "../../chat/createOffer/SelectGig";
import SelectPackage from "../../chat/createOffer/SelectPackage";
import SendMessage from "../../GigSingle/SendMessage";
import { skipOrderRequirement } from "../../OrderList/redux/Action";
import DeliveryBox from "../../OrderList/SingleOrder/DeliveryBox";
import ProgressBox from "../../OrderList/SingleOrder/ProgressBox";
import SkipRequirementVerification from "../../OrderList/SingleOrder/SkipRequirementVerification";
import OrderCancelModal from "../../OrderList/SingleOrderBuyer/OrderCancelModal";
import "./modal.css";

function UseModal() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleCustom = () => {
    dispatch(skipOrderRequirement(modal?.extraValue));
    handleClose();
  };

  return (
    <>
      {modal.modalName === "account_security" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          size="md"
          dialogClassName="modal_width"
        >
          <Container className="pl-4 pr-4 pb-4 pt-2">
            <Modal.Header
              closeButton={true}
              className="border-bottom-0 pb-1 pt-1"
            ></Modal.Header>
            <AccountSecurityForm />
          </Container>
        </Modal>
      ) : modal.modalName === "phoneVerification" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          size="md"
          dialogClassName="modal_width"
        >
          <Container className="pl-4 pr-4 pb-4 pt-2">
            <Modal.Header
              closeButton={true}
              className="border-bottom-0 pb-1 pt-1"
            ></Modal.Header>
            <AccountPhoneVarification />
          </Container>
        </Modal>
      ) : modal.modalName === "SellerComplete" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          size="md"
          dialogClassName="modal_width"
        >
          <Container className="pl-4 pr-4 pb-4 pt-2">
            <Modal.Header
              closeButton={true}
              className="border-bottom-0 pb-1 pt-1"
            ></Modal.Header>
            <AccountComplete />
          </Container>
        </Modal>
      ) : modal.modalName === "SkipOrderVerfication" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          dialogClassName="modal_width"
          size="sm"
        >
          <Container className="SkipVerificationContainer">
            <Modal.Header
              closeButton={false}
              className="border-bottom-0 pt-1"
            ></Modal.Header>
            <SkipRequirementVerification />
            <Modal.Footer>
              <Button
                className="SkipFooterBtn SkipFooterBtnNo"
                onClick={() => handleClose()}
              >
                No
              </Button>
              <Button
                className="SkipFooterBtn SkipFooterBtnYes"
                onClick={handleCustom}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Container>
        </Modal>
      ) : modal.modalName === "deliveryModal" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          // dialogClassName="modal_width"
          size="lg"
        >
          <Modal.Header
            closeButton={true}
            className="border-bottom-0"
            style={{
              background: "#e8e8e8",
              fontSize: "18px",
              fontWeight: "600",
              color: "#5a5a5a",
            }}
          >
            Deliver Completed Work
          </Modal.Header>
          <DeliveryBox orderId={modal?.extraValue} />
        </Modal>
      ) : modal.modalName === "progressModal" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          // dialogClassName="modal_width"
          size="lg"
        >
          <Modal.Header
            closeButton={true}
            className="border-bottom-0"
            style={{
              background: "#e8e8e8",
              fontSize: "18px",
              fontWeight: "600",
              color: "#5a5a5a",
            }}
          >
            Deliver Progress Update
          </Modal.Header>
          <ProgressBox orderId={modal?.extraValue} />
        </Modal>
      ) : modal.modalName === "selectGig" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          dialogClassName="selectGigModal"
          // size="md"
        >
          <Modal.Header
            closeButton={true}
            className="border-bottom-0"
            style={{
              background: "#e8e8e8",
              fontSize: "18px",
              fontWeight: "600",
              color: "#5a5a5a",
            }}
          >
            Select a Gig
          </Modal.Header>
          <SelectGig chatRoom={modal?.extraValue} />
        </Modal>
      ) : modal.modalName === "createOffer" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          dialogClassName="selectGigModal"
          // size="lg"
        >
          <Modal.Header
            closeButton={true}
            className="border-bottom-0"
            style={{
              background: "#e8e8e8",
              fontSize: "18px",
              fontWeight: "600",
              color: "#5a5a5a",
            }}
          >
            Create Offer
          </Modal.Header>
          <CreateOffer data={modal?.extraValue} />
        </Modal>
      ) : modal.modalName === "selectPackage" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          dialogClassName="selectGigModal"
          // size="lg"
        >
          <Modal.Header
            closeButton={true}
            className="border-bottom-0"
            style={{
              background: "#e8e8e8",
              fontSize: "18px",
              fontWeight: "600",
              color: "#5a5a5a",
            }}
          >
            Select a package
          </Modal.Header>
          <SelectPackage data={modal?.extraValue} />
        </Modal>
      ) : modal.modalName === "sendMessageModal" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          // dialogClassName="modal_width"
          size="lg"
        >
          <Modal.Header
            closeButton={true}
            className="border-bottom-0"
            style={{
              background: "#e8e8e8",
              fontSize: "18px",
              fontWeight: "600",
              color: "#5a5a5a",
            }}
          >
            Send Message
          </Modal.Header>
          <SendMessage user_id={modal?.extraValue} />
        </Modal>
      ) : modal.modalName === "selectGigBuyerRequest" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          dialogClassName="selectGigModal"
          // size="md"
        >
          <Modal.Header
            closeButton={true}
            className="border-bottom-0"
            style={{
              background: "#e8e8e8",
              fontSize: "18px",
              fontWeight: "600",
              color: "#5a5a5a",
            }}
          >
            Select a Gig
          </Modal.Header>
          <SelectGigBuyerRequest requestId={modal?.extraValue} />
        </Modal>
      ) : modal.modalName === "createOfferBuyerRequest" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          dialogClassName="selectGigModal"
          // size="lg"
        >
          <Modal.Header
            closeButton={true}
            className="border-bottom-0"
            style={{
              background: "#e8e8e8",
              fontSize: "18px",
              fontWeight: "600",
              color: "#5a5a5a",
            }}
          >
            Create Offer
          </Modal.Header>
          <CreateOfferBuyerRequest data={modal?.extraValue} />
        </Modal>
      ) : modal.modalName === "orderCancel" ? (
        <Modal
          show={modal.modalStatus}
          onHide={handleClose}
          dialogClassName="selectGigModal"
          // size="lg"
        >
          <Modal.Header
            closeButton={true}
            className="border-bottom-0"
            style={{
              background: "#e8e8e8",
              fontSize: "18px",
              fontWeight: "600",
              color: "#5a5a5a",
            }}
          >
            Cancel Order
          </Modal.Header>
          <OrderCancelModal orderId={modal?.extraValue} />
        </Modal>
      ) : null}
    </>
  );
}

export default UseModal;
