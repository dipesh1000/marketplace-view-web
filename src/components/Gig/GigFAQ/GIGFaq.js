import React, { useEffect } from "react";
import Form from "./GIGFaqForm";
import * as yup from "yup";
import { useParams, useHistory } from "react-router";
import { updateGigFaq } from "./redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { fetchsingleGig } from "../GigPage/redux/Action";
import { showSpinner } from "../../common/Spinner/redux/Action";

function GIGFaq() {
  const { slug } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchsingleGig(slug));
    // eslint-disable-next-line
  }, []);

  const { singleGig } = useSelector((state) => state.gig);

  const initialValues = {
    step: "description_faqs",
    description: singleGig?.description || "",
    faqs: singleGig?.faqs || [],
  };

  const validationSchema = yup.object({
    description: yup
      .string()
      .required("Description is required")
      .test(
        "len",
        "Description should have at least 120 words",
        (val) =>
          val?.split(" ").filter((word) => {
            return word !== "";
          }).length >= 120
      ),
    faqs: yup.array().of(
      yup.object().shape({
        title: yup
          .string()
          .required("Title is Required")
          .max(120, "Title must be less than 120 Charachters"),
        description: yup
          .string()
          .required("Description is Required")
          .max(300, "Description must be less than 300 Charachters"),
      })
    ),
  });

  const handleHistory = () => {
    history.push(
      `/users/seller_dashboard/manage_gigs/${slug}/gigs_requirement`
    );
  };
  const onSubmit = (values) => {
    dispatch(showSpinner());
    dispatch(updateGigFaq(values, singleGig.id, handleHistory));
  };
  return (
    <Form
      initialValue={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
}

export default GIGFaq;
