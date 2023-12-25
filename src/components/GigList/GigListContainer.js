import React, { useEffect } from "react";
import FilterSection from "./FilterSection";
import GigView from "./GigView";
import ServiceSection from "./ServiceSection";
import Pagination from "./Pagination";
import "./style/style.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigByCategory } from "./redux/Action";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import useTitle from "../../utils/useTitle";

function GigListContainer() {
  const { slug, category } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGigByCategory(slug));
  }, [slug, dispatch]);

  const {
    gigList,
    gig_meta,
    filter_data,
    service_types,
    seller_details,
    thiscategory,
    loading,
  } = useSelector((state) => state.gigList);

  const { data } = useSelector((state) => state.category);
  const title = data?.find((item) => item?.slug === category);
  const child = title?.child?.find((item) => item?.slug === slug);
  useTitle(`${title ? title?.title : ""} - ${child ? child?.title : ""}`);

  return loading ? (
    <ContainerSpinner />
  ) : (
    <>
      <div className="category-container">
        <section className="category-page">
          <div className="container">
            <div className="breadcrumbs">
              <ul>
                <li>
                  <a href="/">Fuchas</a>{" "}
                  <i className="fas fa-chevron-right"></i>
                </li>
                <li>
                  <a href={`/categories/${category}`}>{title?.title}</a>{" "}
                  {/* <i className="fas fa-chevron-right"></i> */}
                </li>
              </ul>
            </div>
            <div className="title">
              <div className="tittle-text">
                <h1>{thiscategory?.title}</h1>
                <p>{thiscategory?.description}</p>
                {/* <div className="how-works">
                  <button>
                    <i className="fas fa-play-circle"></i> Learn more about
                    Social Media Marketing
                  </button>
                </div> */}
              </div>
            </div>

            <ServiceSection service_types={service_types} />
            <FilterSection
              filter_data={filter_data}
              gig_meta={gig_meta}
              seller_details={seller_details}
              total={gigList?.pagination?.total}
            />
            <GigView data={gigList} gigCardSlug={slug} />
            <Pagination
              data={gigList?.pagination}
              filter_data={filter_data}
              slug={slug}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default GigListContainer;
