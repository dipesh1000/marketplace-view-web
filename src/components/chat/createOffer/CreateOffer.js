import React, { useEffect, useRef, useState } from "react";
import { useForm } from "../../common/form/useForm";
import "./style/style.scss";
import * as yup from "yup";
import { Field } from "formik";
import { openModal } from "../../../redux/Modal/Modal.action";
import { useDispatch, useSelector } from "react-redux";
import ContainerSpinner from "../../common/ContainerSpinner/ContainerSpinner";
import { createOffer } from "./redux/Action";

function CreateOffer({ data }) {
  const dispatch = useDispatch();
  const [packageItem, setPackageItem] = useState();
  const [image, setImage] = useState("");
  const { offerOption, isLoading, chatGig } = useSelector(
    (state) => state.chatOffer
  );
  useEffect(() => {
    const gig = chatGig?.filter((item) => item?.id === data?.gigId);
    const packages =
      data?.packageId &&
      gig[0]?.gig_packages?.filter(
        (item) => item?.package_id === data?.packageId
      );
    setImage(
      gig[0].gig_images[Object.keys(gig[0]?.gig_images)[0]]?.url?.resize
    );
    setPackageItem(packages);
    // eslint-disable-next-line
  }, []);

  const initialValues = {
    description: "",
    gig_id: data?.gigId,
    budget: packageItem ? packageItem[0]?.price : "",
    delivery_time: packageItem ? packageItem[0]?.delivery_duration : "",
    revision: packageItem ? packageItem[0]?.revision : "",
    expired_in: "",
    offer_include: packageItem
      ? packageItem[0]?.metas?.filter(
          (item) => item?.value !== "" && item?.value !== "off"
        )
      : [],
  };

  const validationSchema = yup.object({
    description: yup.string().required(),
    delivery_time: yup
      .number()
      .required("Required")
      .min(0, "Required")
      .positive("Required"),
    budget: yup
      .number()
      .required("Required")
      .min(0, "Required")
      .positive("Required"),
  });

  const onSubmit = (values) => {
    dispatch(
      createOffer({ chat_room_id: data?.chatRoom, ...values }, data?.chatRoom)
    );
  };

  const handleSelectPackage = () => {
    dispatch(openModal("selectPackage", data));
  };

  const handleBack = () => {
    dispatch(openModal("selectGig", data?.chatRoom));
  };

  const { CustomTextarea, CustomSelect, CustomInput, CustomForm } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return isLoading ? (
    <ContainerSpinner height="80vh" />
  ) : (
    <div className="create-offer-modal">
      <div className="title-wrapper">
        <div className="title">
          I will convert psd, sketch or xd to HTML using bootstrap 4, cc3
        </div>
        <div className="select-btn" onClick={handleSelectPackage}>
          Select a Package
        </div>
      </div>
      <CustomForm>
        <div className="textarea-section">
          <div className="img-wrapper">
            <img src={image} alt="" />
          </div>
          <div className="textarea-wrapper">
            <CustomTextarea
              rows={4}
              placeholder="Describe your Offer"
              maxLength="1500"
              counter
              max="1500"
              maxText=""
              name="description"
            />
          </div>
        </div>
        <div className="terms">
          <h6>Define the terms of your offer and what it includes.</h6>
          <div className="term-wrapper">
            <div className="revision-wrap">
              <div className="title">Revision (optional)</div>
              <CustomSelect
                name="revision"
                options={[
                  { value: "1", id: "1" },
                  { value: "2", id: "2" },
                  { value: "3", id: "3" },
                  { value: "4", id: "4" },
                  { value: "5", id: "5" },
                  { value: "6", id: "6" },
                  { value: "7", id: "7" },
                ]}
              />
            </div>
            <div className="delivery-wrap">
              <div className="title">Delivery</div>
              <CustomInput name="delivery_time" type="number" min="1" />
            </div>
            <div className="price-wrap">
              <div className="title">Price</div>
              <CustomInput name="budget" preon="$" type="number" min="1" />
            </div>
          </div>
        </div>
        <Field component={ExpireOffer} />
        <div className="main-title">Offer Includes</div>
        <div className="offer-wrapper">
          <ul>
            {offerOption?.map((item) =>
              item?.selection_type === "Checkbox" ? (
                <Field component={IncludeItems} item={item} />
              ) : item?.selection_type === "Select" ? (
                <Field component={IncludeItemSelect} item={item} />
              ) : null
            )}
          </ul>
        </div>
        <div className="create-offer-footer">
          <div className="back-btn" onClick={handleBack}>
            Back
          </div>
          <button type="submit">Send Offer</button>
        </div>
      </CustomForm>
    </div>
  );
}

export default CreateOffer;

const ExpireOffer = ({ form, item }) => {
  const [checked, setChecked] = useState(false);
  const expire = useRef(null);
  const handleCheck = (e) => {
    if (e.target.checked) {
      form.setFieldValue("expired_in", expire.current.value);
      setChecked(true);
    } else {
      form.setFieldValue("expired_in", "");
      setChecked(false);
    }
  };

  const handleChange = (e) => {
    form.setFieldValue(e.target.name, e.target.value);
  };
  return (
    <div className="expire-wrap">
      <div>
        <input type="checkbox" onChange={handleCheck} />
        <div className="title">Offer Expiration Time</div>
      </div>
      <select
        name="expired_in"
        id=""
        disabled={!checked}
        ref={expire}
        onChange={handleChange}
      >
        <option value="1">1 day</option>
        <option value="2">2 days</option>
      </select>
    </div>
  );
};

const IncludeItems = ({ form, item }) => {
  const [active, setActive] = useState("");
  const [tick, setTick] = useState(false);
  const handleCheck = (e) => {
    setTick((prev) => !prev);
    let value = form.values?.offer_include?.filter(
      (val) => val?.meta_id !== item?.id
    );

    if (e.target.checked) {
      form.setFieldValue("offer_include", [
        { meta_id: item?.id, value: "on", title: item?.title },
        ...value,
      ]);
      setActive("active");
    } else {
      form.setFieldValue("offer_include", value);
      setActive("");
    }
  };
  useEffect(() => {
    let value = form.values?.offer_include?.filter(
      (val) => val?.meta_id === item?.id
    );
    setTick(Boolean(value[0]?.value === "on"));
    // eslint-disable-next-line
  }, []);
  return (
    <li className={active}>
      <div>
        <input type="checkbox" onChange={handleCheck} checked={tick} />
        <div className="title">{item?.title}</div>
      </div>
    </li>
  );
};

const IncludeItemSelect = ({ form, item }) => {
  const [checked, setChecked] = useState(false);
  const [tick, setTick] = useState(false);
  const [active, setActive] = useState("");
  const select = useRef(null);
  const handleCheck = (e) => {
    setTick((prev) => !prev);
    let value = form.values?.offer_include?.filter(
      (val) => val?.meta_id !== item?.id
    );

    if (e.target.checked) {
      form.setFieldValue("offer_include", [
        { meta_id: item?.id, value: select.current.value, title: item?.title },
        ...value,
      ]);
      setChecked(true);
      setActive("active");
    } else {
      form.setFieldValue("offer_include", value);
      setChecked(false);
      setActive("");
    }
  };
  const handleChange = (e) => {
    let value = form.values?.offer_include?.filter(
      (val) => val?.meta_id !== item?.id
    );
    form.setFieldValue("offer_include", [
      { meta_id: item?.id, value: select.current.value, title: item?.title },
      ...value,
    ]);
  };
  useEffect(() => {
    let value = form.values?.offer_include?.filter(
      (val) => val?.meta_id === item?.id
    );
    if (Boolean(value[0]?.value)) {
      setTick(true);
      select.current.value = value[0]?.value;
      setChecked(true);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <li className={active}>
      <div>
        <input type="checkbox" onChange={handleCheck} checked={tick} />
        <div className="title">{item?.title}</div>
      </div>
      <select
        name=""
        id=""
        disabled={!checked}
        ref={select}
        onChange={handleChange}
      >
        {item?.value?.map((list) => (
          <option value={list}>{list}</option>
        ))}
      </select>
    </li>
  );
};
