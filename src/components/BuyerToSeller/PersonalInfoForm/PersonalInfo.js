import React, { useEffect } from "react";
import "../../../pages/Dashboard/SellerForm/StepsFrom/imageStyle.css";
import { getLanguageList } from "../../../redux/language/Language.action";
import { useDispatch, useSelector } from "react-redux";
import {
  addPersonalInfo,
  getProfileInfoStep,
} from "../../../redux/Profile/Profile.action";
import { PersonalInfoValidation } from "../../../components/yup/PersonalInfoValidation";
import { serialize } from "object-to-formdata";
import PersonalInfoForm from "./PersonalInfoForm";
import { useHistory } from "react-router";
import { getCountryList } from "../../../redux/Country/Country.action";
import { profileUpdateImage } from "../../../redux/Auth/Auth.action";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";

function PersonalInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  let step = "personal";
  useEffect(() => {
    dispatch(getLanguageList());
    dispatch(getProfileInfoStep(step));
    dispatch(getCountryList());
    // eslint-disable-next-line
  }, []);

  const profile = useSelector((state) => state.profile);

  let initialValues = {
    first_name: profile?.data?.personal?.first_name || "",
    last_name: profile?.data?.personal?.last_name || "",
    profile_preview: profile?.data?.personal?.profile_image || null,
    profile_image: null,
    country: profile?.data?.personal?.country || "",
    step: "personal",
    language: profile?.data?.personal?.language || [],
    description: profile?.data?.personal?.description || "",
  };

  const handleRoute = () => {
    history.push(`/seller_onboarding/professional_info`);
  };

  const handleProfileUpdate = (data) => {
    dispatch(profileUpdateImage(data));
  };

  const onSubmit = (values) => {
    const serializeOptions = {
      indices: true,
      allowEmptyArrays: false,
    };

    dispatch(
      addPersonalInfo(
        serialize(values, serializeOptions),
        null,
        handleRoute,
        handleProfileUpdate
      )
    );
  };

  return profile?.isLoading ? (
    <ContainerSpinner />
  ) : (
    <>
      <PersonalInfoForm
        initialValue={initialValues}
        validationSchema={PersonalInfoValidation}
        onSubmit={onSubmit}
        postLoading={profile?.postLoading}
      />
    </>
  );
}

export default React.memo(PersonalInfo);
