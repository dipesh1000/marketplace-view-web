import React from "react";
import { useForm } from "../../common/form/useForm";
import * as yup from 'yup';
import { closeModal } from "../../../redux/Modal/Modal.action";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../redux/Action";

function OrderCancelModal({ orderId }) {
  const dispatch = useDispatch();
  const initialValues = {
    order_id: orderId,
    reason: "",
  };
  const validationSchema = yup.object({
    reason: yup.string().required('Please Submit the Reason')
  });
  const onSubmit = (values) => {
    dispatch(cancelOrder(values));
  };
  const { CustomTextarea, CustomForm } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <div className="order-cancel-modal">
      <CustomForm>
        <div className="reason-title">
          Give a Reason to Cancel Order
        </div>
        <CustomTextarea name="reason" rows={4} />
        <div className="title">Are you sure to cancel the order?</div>
        <div className="button-wrapper">
          <button type="submit">Yes</button>
          <div className="cancel-btn" onClick={()=>dispatch(closeModal())}>No</div>
        </div>
      </CustomForm>
     
    </div>
  );
}

export default OrderCancelModal;
