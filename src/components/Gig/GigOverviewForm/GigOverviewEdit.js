import React, { useEffect } from "react";
import Form from "./GigOverviewForm";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editGigOverview } from "./redux/Action";
import { useHistory, useParams } from "react-router";
import { fetchsingleGig } from "../GigPage/redux/Action";

function GigOverviewEdit() {
  const options = [{ value: "desing" }, { value: "new Design" }];
  const dispatch = useDispatch();
  const { singleGig } = useSelector((state) => state.gig);

  const { slug } = useParams();
  useEffect(() => {
    dispatch(fetchsingleGig(slug));
  }, [slug, dispatch]);

  const { category, serviceType, searchTag } = useSelector(
    (state) => state.gigOverview
  );

  const getParentCat = (category_id) => {
    const id = category?.filter((item) => item.id === category_id);
    return id && id[0]?.parent_id;
  };
  const gigMeta = (data) => {
    return data.map((item) => {
      return {
        category_gig_meta: item.category_gig_meta,
        global: item.global,
        values: item.gig_meta_values.map((list) =>
          list.global_gig_meta_id.toString()
        ),
      };
    });
  };
  const initialValue = {
    title: singleGig?.title,
    category: singleGig?.category_id && getParentCat(singleGig?.category_id),
    category_id: singleGig?.category_id,
    servicetype_id: singleGig?.servicetype_id,
    gig_metas: singleGig && gigMeta(singleGig.gig_metas),
    search_tags: singleGig?.search_tags?.map((item) => item.id),
    status_id: singleGig?.status_id,
  };
  const validationSchema = yup.object({
    title: yup
      .string()
      .required("Title Field is required")
      .max(82, "Title Field must have less than 80 charachters")
      .test(
        "len",
        "Your Title should have at least 4 words",
        (val) =>
          val?.split(" ").filter((word) => {
            return word !== "";
          }).length >= 4
      )
      .test(
        "len",
        "Create a title with 15 characters minimum",
        (val) => val?.length > 15
      ),
    category: yup.string().required("Category is Required"),
    category_id: yup.string().required("Sub Category is Required"),
    servicetype_id: yup.string().nullable(),
    gig_metas: yup.object().nullable(),
    search_tags: yup
      .array()
      .min(1, "Tag list must contain at least 1 tag")
      .max(5, "Tag list must contain at most 5 tag"),
    status_id: yup.number(),
  });
  const history = useHistory();
  const handleHistory = (edit_slug) => {
    history.push(
      `/users/seller_dashboard/manage_gigs/${edit_slug}/gigs_pricing`
    );
  };

  const onSubmit = (values) => {
    dispatch(
      editGigOverview(
        { ...values, step: "overview" },
        singleGig.id,
        handleHistory,
        slug
      )
    );
  };

  return (
    singleGig && (
      <Form
        initialValue={initialValue}
        search_tags={singleGig?.search_tags}
        searchTag={searchTag}
        category={category}
        serviceType={serviceType}
        options={options}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      />
    )
  );
}

export default React.memo(GigOverviewEdit);
