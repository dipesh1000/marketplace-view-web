import React from "react";
import { Link, useParams } from "react-router-dom";
import useTitle from "../../utils/useTitle";
import ContainerSpinner from "../common/ContainerSpinner/ContainerSpinner";
import CategoryFooterInfo from "./CategoryFooterInfo";
import "./CategoryList.scss";

function CategoryList({ categoryList }) {
  const { category } = useParams();
  useTitle(categoryList?.thiscategory?.title);
  return categoryList?.isLoading ? (
    <ContainerSpinner />
  ) : (
    <>
      <section className="parent-category">
        <div className="container">
          <div className="desktop-title">
            <div className="image">
              <img
                src="https://fiverr-res.cloudinary.com/w_iw_div_3.0,q_auto,f_auto/general_assets/categories/assets/f3/mobile_Graphic_and_Design.jpg"
                alt=""
              />
            </div>
            <div className="tittle-text">
              <h1>{categoryList?.thiscategory?.title}</h1>
              <p>{categoryList?.thiscategory?.description}</p>
              <div className="how-works">
                <button>
                  <i className="fas fa-play-circle"></i> How Fiverr Works
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="desktop-category-list">
                <ul className="cateory-box">
                  <li className="current-category">
                    {categoryList?.thiscategory?.title}
                  </li>
                  {categoryList?.child?.map((cat, index) => {
                    return (
                      <li key={cat.id}>
                        <Link to={`${category}/${cat.slug}`}>{cat.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                {categoryList?.child?.map((cat, index) => {
                  return (
                    <div key={index} className="col-md-4 mobile-category-list">
                      <div className="category-box-wrapper">
                        <Link to={`${category}/${cat.slug}`}>
                          <div className="image">
                            <img
                              src={cat?.image?.thumbnail?.url?.full}
                              alt={cat?.title}
                            />
                          </div>
                          <div className="text">
                            <span className="title">{cat?.title}</span>
                            <span className="arrow-icon">
                              <i className="fas fa-chevron-right"></i>
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CategoryFooterInfo />
    </>
  );
}

export default CategoryList;
