import React, { useEffect } from "react";
import NewForm from "./NewPricingForm";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPackages,
  fetchPricingLimit,
  updateGigPricing,
} from "./redux/Action";
import { useHistory, useParams } from "react-router";
import { fetchsingleGig } from "../GigPage/redux/Action";
import { fetchCategoryPackageMeta } from "./redux/Action";

function GigPricingAdd() {
  const dispatch = useDispatch();

  const { slug } = useParams();
  useEffect(() => {
    dispatch(fetchsingleGig(slug));
    dispatch(fetchPackages());
    dispatch(fetchPricingLimit());
    // eslint-disable-next-line
  }, []);

  const { singleGig } = useSelector((state) => state.gig);

  useEffect(() => {
    singleGig?.category_id &&
      dispatch(fetchCategoryPackageMeta(singleGig?.category_id));
    // singleGig?.category_id && dispatch(hideSpinner());
    // eslint-disable-next-line
  }, [singleGig?.category_id]);

  const { categoryPackageMeta, allPackages, priceLimit } = useSelector(
    (state) => state.gigPricing
  );
console.log(singleGig, "pricingsingle");
  // useEffect(() => {
  //   if (loading) {
  //     dispatch(showSpinner());
  //   } else {
  //     dispatch(hideSpinner());
  //   }
  // }, [loading]);

  const initialValues = {
    step: "pricing",
    hasMultiplePackage: singleGig?.hasMultiplePackage ? true : false,
    hasExtraFastDelivery:
      singleGig?.gig_packages.filter((pkg) => pkg.has_extra_fast_delivery)
        ?.length > 0
        ? 1
        : 0,
    package: [
      singleGig?.gig_packages[0]
        ? singleGig?.gig_packages[0]
        : {
            package_id: allPackages && allPackages[0]?.id,
            title: "",
            description: "",
            delivery_duration: "",
            price: "",
            metas: [],
            extra_fast_price: "",
            extra_fast_day: "",
            revision: "",
            status: 1,
            package_price_meta: categoryPackageMeta
              ? categoryPackageMeta
                  .filter((meta) => meta?.has_package_price === 1)
                  .map((meta) => ({
                    active: 0,
                    has_additional_days: meta?.requires_additional_days
                      ? true
                      : false,
                    meta_id: meta.id,
                    additional_price: "",
                    additional_value: "",
                  }))
              : [],
          },
      singleGig?.gig_packages[1]
        ? singleGig?.gig_packages[1]
        : {
            package_id: allPackages && allPackages[1]?.id,
            title: "",
            description: "",
            delivery_duration: "",
            price: "",
            metas: [],
            extra_fast_price: "",
            extra_fast_day: "",
            revision: "",
            status: 0,
            package_price_meta: categoryPackageMeta
              ? categoryPackageMeta
                  .filter((meta) => meta?.has_package_price === 1)
                  .map((meta) => ({
                    active: 0,
                    has_additional_days: meta?.requires_additional_days
                      ? true
                      : false,
                    meta_id: meta.id,
                    additional_price: "",
                    additional_value: "",
                  }))
              : [],
          },
      singleGig?.gig_packages[2]
        ? singleGig?.gig_packages[2]
        : {
            package_id: allPackages && allPackages[2]?.id,
            title: "",
            description: "",
            delivery_duration: "",
            price: "",
            metas: [],
            extra_fast_price: "",
            revision: "",
            extra_fast_day: "",
            status: 0,
            package_price_meta: categoryPackageMeta
              ? categoryPackageMeta
                  .filter((meta) => meta?.has_package_price === 1)
                  .map((meta) => ({
                    active: 0,
                    has_additional_days: meta?.requires_additional_days
                      ? true
                      : false,
                    meta_id: meta.id,
                    additional_price: "",
                    additional_value: "",
                  }))
              : [],
          },
    ],
    extra_services: categoryPackageMeta
      ? categoryPackageMeta
          .filter((meta) => meta?.has_package_price === 0)
          .map((meta) => ({
            active: singleGig?.extra_services?.filter(
              (service) => service?.meta_id?.toString() === meta?.id?.toString()
            )[0]
              ? 1
              : 0,
            has_additional_days: meta?.requires_additional_days ? true : false,
            meta_id:
              singleGig?.extra_services?.filter((service) => {
                return service?.meta_id?.toString() === meta?.id?.toString();
              })[0]?.meta_id || meta.id,
            extra_price:
              singleGig?.extra_services?.filter((service) => {
                return service?.meta_id === meta?.id;
              })[0]?.extra_price || "",
            additional_day:
              singleGig?.extra_services?.filter(
                (service) => service?.meta_id === meta?.id
              )[0]?.additional_day || "",
          }))
      : [],
    custom_extra_services: singleGig?.custom_extra_services
      ? singleGig?.custom_extra_services
      : [],
  };

  const packageValid = {
    package_id: yup.number(),
    metas: yup.object().nullable(),
    extra_fast_price: yup.string().nullable(),
    extra_fast_day: yup.string().nullable(),
    revision: yup.string().nullable(),
    // price: yup.number().min(singleGig?.gigPricing?.priceLimit?.min_price, `Price Must be greater than Base Price`).required('Price is Required'),
    package_price_meta: yup.array().of(
      yup.object().shape({
        active: yup.boolean(),
        has_additional_days: yup.boolean(),
        additional_price: yup.number().when("active", {
          is: (val) => val === 1,
          then: yup.number().required("*"),
          otherwise: yup.number().nullable(),
        }),
        additional_value: yup.string().when(["active", "has_additional_days"], {
          is: (active, has_additional_days) =>
            active === 1 && has_additional_days === true,
          then: yup.string().required("*"),
          otherwise: yup.string().nullable(),
        }),
      })
    ),
  };

  const extraServiceValid = {
    active: yup.boolean(),
    has_additional_days: yup.boolean(),
    extra_price: yup.number().when("active", {
      is: (val) => val === 1, // alternatively: (val) => val == true
      then: yup.number().required("*"),
      otherwise: yup.number().nullable(),
    }),
    additional_day: yup.string().when("active", {
      is: true,
      then: yup.string().when("has_additional_days", {
        is: true,
        then: yup.string().required("*"),
      }),
    }),
  };

  const validationSchema = yup.object({
    hasMultiplePackage: yup.boolean(),
    package: yup.array().of(yup.object().shape(packageValid)),
    extra_services: yup.array().of(yup.object().shape(extraServiceValid)),

    custom_extra_services: yup.array().of(
      yup.object().shape({
        title: yup.string().required("*").max(20, "Maximum length : 20"),
        description: yup.string().required("*"),
        extra_price: yup.string().required("*"),
        additional_day: yup.string().required("*"),
      })
    ),
  });

  const history = useHistory();
  const handleHistory = () => {
    history.push(
      `/users/seller_dashboard/manage_gigs/${slug}/gigs_description_faq`
    );
  };
  const onSubmit = (values) => {
    // // alert("submit");
    // dispatch(showSpinner());
    dispatch(updateGigPricing(values, singleGig.id, handleHistory));
  };

  return (
    <NewForm
      initialValues={initialValues}
      singleGig={singleGig}
      allPackages={allPackages}
      categoryPackageMeta={categoryPackageMeta}
      validationSchema={validationSchema}
      priceLimit={priceLimit}
      onSubmit={onSubmit}
    />
  );
}

export default React.memo(GigPricingAdd);
