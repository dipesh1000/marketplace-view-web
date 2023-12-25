import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import GigListContainer from "../../../components/GigList/GigListContainer";
import {
  fetchGigmetaByCategory,
  fetchSellerDetails,
  fetchServiceTypeByCategory,
} from "../../../components/GigList/redux/Action";
import TopHeader from "../../../layout/homeLayout/Header/Header";

function GigList() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGigmetaByCategory(slug));
    dispatch(fetchSellerDetails(slug));
    dispatch(fetchServiceTypeByCategory(slug));
  }, [slug]);
  return (
    <>
      <TopHeader />
      <GigListContainer />
    </>
  );
}

export default GigList;
