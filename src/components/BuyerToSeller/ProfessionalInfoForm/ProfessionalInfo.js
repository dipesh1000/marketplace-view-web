import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import ProfessionalInfoForm from "./ProfessionalInfoForm";
import { getCountryList } from "../../../redux/Country/Country.action";
import { getSuggestion } from "../../../redux/Professional/Professional.action";
import {
  addPersonalInfo,
  getProfileInfoStep,
} from "../../../redux/Profile/Profile.action";
import { serialize } from "object-to-formdata";
import { useHistory } from "react-router-dom";
import "./styling/Professional.css";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";

function ProfessionalInfo() {
  const dispatch = useDispatch();
  const history = useHistory();

  let step = "professional";
  useEffect(() => {
    dispatch(getCountryList());
    dispatch(getSuggestion());
    dispatch(getProfileInfoStep(step));
    // eslint-disable-next-line
  }, []);

  const profile = useSelector((state) => state.profile);

  // const allCountryList = countryList?.data?.map((item) => ({id: item.code, value: item.title}))

  let initialValues = {
    step: "professional",
    occupation: profile?.data?.professional?.occupation || [],
    skills: profile?.data?.professional?.skills || [],
    education: profile?.data?.professional?.education || [],
    certifications: profile?.data?.professional?.certifications || [],
    personal_website: profile?.data?.professional?.personal_website || "",
  };

  const validationSchema = yup.object({
    personal_website: yup.string(),
    occupation: yup.array().of(
      yup.object().shape({
        category_id: yup.string().required("* Required"),
        from: yup.string().required("* Required"),
        to: yup.string().required("* Required"),
        child_category_id: yup
          .array()
          .min(
            2,
            "Make sure you’ve added your years of experience and 2 to 5 of your strongest skills."
          )
          .max(
            5,
            "Make sure you’ve added your years of experience and 2 to 5 of your strongest skills."
          ),
      })
    ),
    skills: yup.array().min(1, "Set Atleast 1 Skill"),
  });

  const handleRoute = () => {
    history.push(`/seller_onboarding/linked_accounts`);
  };

  const onSubmit = (values, { setSubmitting }) => {
    const serializeOptions = {
      indices: true,
      allowEmptyArrays: false,
    };
    dispatch(addPersonalInfo(serialize(values, serializeOptions), handleRoute));
    setSubmitting(false);
  };
  return profile?.isLoading ? (
    <ContainerSpinner />
  ) : (
    <ProfessionalInfoForm
      initialValue={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      postLoading={profile?.postLoading}
    />
  );
}

export default React.memo(ProfessionalInfo);
