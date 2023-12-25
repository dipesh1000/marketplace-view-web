import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import PageNotFound from "../../pages/PageNotFound/Index";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import GigSingleContainer from "./GigSingleContainer";
import GigSingleNav from "./GigSingleNav";
import { getSingleGigDetails, getSingleGigFeedback } from "./redux/Action";
import "./styles/gigSingle.scss";

function GigSingle() {
  const { filterData } = useSelector((state) => state.gigDetails);
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleGigDetails(param.slug));
    dispatch(getSingleGigFeedback(param.slug, filterData));
    // dispatch(getProfileInfoStep("personal"))
    // eslint-disable-next-line
  }, [param.slug]);

  const { isLoading, gigs } = useSelector((state) => state.gigDetails);

  return isLoading ? (
    <ContainerSpinner />
  ) : param?.username === gigs?.seller?.username ? (
    <>
      <GigSingleNav slug={param?.slug} />
      <GigSingleContainer />
    </>
  ) : (
    <PageNotFound subtitle="Gig Seller mismatched" />
  );
}

export default GigSingle;
