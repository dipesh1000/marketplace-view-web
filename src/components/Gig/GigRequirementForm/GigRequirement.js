import React, { useEffect } from "react";
import Form from "./GigRequirementForm";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchsingleGig } from "../GigPage/redux/Action";
import { updateGigRequirement } from "./redux/Action";
import { hideSpinner, showSpinner } from "../../common/Spinner/redux/Action";

function GigRequirementAdd() {
  const options = [{ value: "desing" }, { value: "new Design" }];
  const dispatch = useDispatch();

  const { slug } = useParams();
  useEffect(() => {
    dispatch(fetchsingleGig(slug));
    dispatch(hideSpinner());
    // eslint-disable-next-line
  }, []);
  const { singleGig } = useSelector((state) => state.gig);
  const initialValues = {
    step: "requirements",
    requirements: singleGig?.gig_requirements || [],
  };
  const validationSchema = yup.object({
    step: yup.string().required("Step is Required"),
    requirements: yup
      .array()
      .of(
        yup.object().shape({
          question: yup.string(),
          is_required: yup.string(),
          type: yup.string(),
        })
      )
      .min(1, "Make sure you add atleast one Requirement for the Buyer"),
  });

  const history = useHistory();
  const handleHistory = () => {
    history.push(`/users/seller_dashboard/manage_gigs/${slug}/gigs_gallery`);
  };
  const onSubmit = (values, error) => {
    dispatch(showSpinner());
    dispatch(updateGigRequirement(values, singleGig.id, handleHistory));
  };

  return (
    <Form
      initialValue={initialValues}
      singleGig={singleGig}
      options={options}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
}

export default React.memo(GigRequirementAdd);
