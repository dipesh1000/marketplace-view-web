import React, { useEffect } from "react";
import GigView from "../GigList/GigView";
import Pagination from "../GigList/Pagination";
import "./styles/styles.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import { postSearch } from "./redux/Action";
import { getLanguageList } from "../../redux/language/Language.action";
import { getCountryList } from "../../redux/Country/Country.action";
import SearchFilterSection from "./SearchFilterSection";
import useTitle from "../../utils/useTitle";

function SearchList() {
  const { searchTerm } = useParams();
  const { search, filter_data, isLoading } = useSelector(
    (state) => state.search
  );
  const { language } = useSelector((state) => state.lang);
  const countryList = useSelector((state) => state.countryList);
  const dispatch = useDispatch();
  useTitle(`Fuchas / Search Results for '${searchTerm}'`);

  useEffect(() => {
    dispatch(
      postSearch({
        ...filter_data,
        search: searchTerm,
        sorting_by: "new",
      })
    );
    // eslint-disable-next-line
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getLanguageList());
    dispatch(getCountryList());
  }, [dispatch]);

  return isLoading ? (
    <ContainerSpinner />
  ) : (
    <>
      <div className="search-container">
        <section className="category-page">
          <div className="container">
            <div className="search-header">
              <span className="search-title">
                Results for &#65282;{searchTerm}&#65282;
              </span>
            </div>
            <SearchFilterSection
              filter_data={filter_data}
              total={search?.gigs?.data?.length}
              searchTerm={searchTerm}
              language={language}
              countryList={countryList}
            />
            <GigView
              data={search}
              filter_data={filter_data}
              type="Search"
              searchTerm={searchTerm}
            />
            <Pagination
              // data={gigList?.pagination}
              // filter_data={filter_data}
              slug={searchTerm}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default SearchList;
