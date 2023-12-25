import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Rating from "../../Rating/Rating";
import * as yup from "yup";
import { useForm } from "../../common/form/useForm";
import { Field } from "formik";
import { useParams } from "react-router-dom";
import { sellerReviewSubmit } from "../redux/Action";
import { useDispatch } from "react-redux";

function SellerReviewForm({ seller }) {
  // eslint-disable-next-line
  const [rates, setRates] = useState(0);
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const initialValues = {
    rating: 0,
    message: "",
  };

  const validationSchema = yup.object({
    rating: yup
      .number()
      .required("Ratings is Required")
      .min(1, "Ratings is required"),
    message: yup.string().required("Message Field is Required"),
  });

  const onSubmit = (values) => {
    dispatch(sellerReviewSubmit(orderId, values));
  };

  const { CustomForm, CustomTextarea } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="Seller_reviewCotainer">
      <div className="review-header">
        Review your Experience with this buyer
      </div>
      <div className="seller_review_main">
        <div className="img-wrap">
          <img
            src={seller?.profileImage?.url?.resize}
            alt={seller?.profileImage?.alt}
          />
        </div>
        <CustomForm>
          <h5>{seller?.username}</h5>
          <div className="seller_rev">
            <div>
              <h6>Overall Experience</h6>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                molli
              </span>
            </div>
            <div className="rating_star">
              <Field component={Rating} name="rating" className="stars" />
            </div>
          </div>
          <div className="seller_text_area">
            <h5>Share some Details public</h5>
            {/* <Form.Control
              as="textarea"
              rows={4}
              placeholder="Why did you buy this Gig? Did the seller help you to achieve goal"
            /> */}
            <CustomTextarea
              name="message"
              rows={4}
              placeholder="Please leave a feedback"
            />
          </div>
          <Button className="publish_review_btn" type="submit">
            Public Review
          </Button>
        </CustomForm>
      </div>
    </div>
  );
}

export default SellerReviewForm;
